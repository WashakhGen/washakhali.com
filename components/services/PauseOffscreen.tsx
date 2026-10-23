"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

/** Pauses every CSS animation inside while the block is out of the viewport. */
export function PauseOffscreen({ className = "", children }: { className?: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "100px" });
  return (
    <div ref={ref} data-paused={!inView} className={className} aria-hidden>
      {children}
    </div>
  );
}
