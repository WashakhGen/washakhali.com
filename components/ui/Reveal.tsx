"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type Props = {
  as?: ElementType;
  index?: number;
  className?: string;
  children: ReactNode;
};

/** Fade + 16px rise once the element is 20% in view. `index` staggers siblings by 60ms. */
export function Reveal({ as: Tag = "div", index = 0, className = "", children }: Props) {
  const [ref, inView] = useInView<HTMLElement>({ once: true, threshold: 0.2 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
