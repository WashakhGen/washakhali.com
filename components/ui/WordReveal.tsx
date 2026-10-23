"use client";

import type { CSSProperties, ElementType } from "react";
import { useInView } from "@/lib/useInView";

/** A heading fragment. `accent` parts render in serif italic with the accent gradient. */
export type Part = { text: string; accent?: boolean; break?: boolean };

type Props = {
  as?: ElementType;
  parts: Part[];
  id?: string;
  className?: string;
  /** When provided, overrides the in-view trigger (e.g. play on mount instead of on scroll). */
  play?: boolean;
};

/** Heading whose words rise one by one when it scrolls into view. */
export function WordReveal({ as: Tag = "h2", parts, id, className = "", play }: Props) {
  const [ref, inView] = useInView<HTMLElement>({ once: true, threshold: 0.3 });
  const active = play ?? inView;
  let i = 0;

  return (
    <Tag ref={ref} id={id} className={`words ${active ? "is-in" : ""} ${className}`}>
      {parts.map((part, p) => (
        <span key={p}>
          {part.text
            .split(" ")
            .filter(Boolean)
            .map((word, w) => (
              <span key={w}>
                <span className="word" style={{ "--i": i++ } as CSSProperties}>
                  <span className={part.accent ? "accent-serif text-grad" : undefined}>
                    {word}
                  </span>
                </span>{" "}
              </span>
            ))}
          {part.break ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
