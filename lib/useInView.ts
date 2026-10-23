"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Options = IntersectionObserverInit & { once?: boolean };

/** Tracks whether an element is in the viewport. With `once`, stays true after first entry. */
export function useInView<T extends Element>(
  options: Options = {},
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { once = false, root, rootMargin = "0px", threshold = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { root, rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView];
}
