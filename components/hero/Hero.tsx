"use client";

// Layout and motion adapted from the hero in github.com/hari9618/Portfolio (used with permission),
// rewritten for this site's content, palette and reduced-motion handling.

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { hero } from "@/lib/content";
import { useMounted } from "@/lib/useMounted";
import type { ResolvedIcon } from "@/lib/icons";
import { BrandIcon } from "@/components/ui/BrandIcon";
import {
  AgentLogWindow,
  DiffusionWindow,
  TraceWindow,
  VoiceFlowWindow,
} from "@/components/hero/LiveWindows";

const ease = [0.22, 1, 0.36, 1] as const;

/** Rotating phrase whose container width glides to fit each phrase, so the centred line never jumps. */
function Rotator({ play }: { play: boolean }) {
  const [i, setI] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measure = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const read = () => {
      const kids = measure.current?.children;
      if (kids) setWidths(Array.from(kids, (k) => (k as HTMLElement).offsetWidth));
    };
    read();
    document.fonts?.ready.then(read);
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  useEffect(() => {
    if (!play || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % hero.rotating.length), 2300);
    return () => window.clearInterval(id);
  }, [play]);

  return (
    <>
      <span
        ref={measure}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap"
      >
        {hero.rotating.map((w) => (
          <span key={w} className="absolute whitespace-nowrap">
            {w}
          </span>
        ))}
      </span>
      <motion.span
        aria-hidden
        className="relative inline-block h-[1.3em] overflow-hidden align-top"
        animate={{ width: widths[i] ?? "auto" }}
        transition={{ duration: 0.5, ease }}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={hero.rotating[i]}
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease }}
            className="text-grad absolute top-0 left-0 leading-[1.3] whitespace-nowrap"
          >
            {hero.rotating[i]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      {/* Screen readers get the full list once instead of a changing word */}
      <span className="sr-only">{hero.rotating.join(", ")}</span>
    </>
  );
}

/** Headline word: large blur → sharp with a slight upward settle. */
function Word({
  children,
  delay,
  play,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  play: boolean;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block pb-[0.14em] align-bottom will-change-transform ${className}`}
      initial={{ opacity: 0, y: "0.32em", filter: "blur(12px)", scale: 1.03 }}
      animate={
        play
          ? { opacity: 1, y: "0em", filter: "blur(0px)", scale: 1, transitionEnd: { filter: "none" } }
          : undefined
      }
      transition={{ duration: 1.4, delay, ease }}
    >
      {children}
    </motion.span>
  );
}

/** Floating "live system" window with depth-based mouse parallax and a gentle bob. Desktop only. */
function Float({
  children,
  className,
  depth,
  delay,
}: {
  children: ReactNode;
  className: string;
  depth: number;
  delay: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, (v) => v * depth), { stiffness: 60, damping: 18 });
  const y = useSpring(useTransform(my, (v) => v * depth), { stiffness: 60, damping: 18 });
  useEffect(() => {
    const on = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [mx, my]);
  return (
    <motion.div style={{ x, y }} className={`absolute z-10 hidden xl:block ${className}`} aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: depth < 0 ? 0.82 : 1.14, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
        transition={{ duration: 1.6, delay, ease }}
      >
        <div
          className="floaty"
          style={
            {
              animationDelay: `${delay}s`,
              animationDuration: `${6 + Math.abs(depth) / 10}s`,
            } as CSSProperties
          }
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = (play: boolean, delay: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: play
    ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }
    : undefined,
  transition: { duration: 0.9, delay, ease },
});

export function Hero({ tools }: { tools: ResolvedIcon[] }) {
  const play = useMounted();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const [line1, line2] = hero.headline;

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate min-h-[100svh] overflow-hidden"
      >
        {/* Backdrop: a lime→yellow horizon glow (logo colours) and a soft core, no ambient motion */}
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(120%_70%_at_50%_115%,#1f3207_0%,#11190a_26%,#090b08_52%,#050605_76%,#040404_100%)]" />
        {/* Static 1px grid, faded toward the edges */}
        <div className="bg-grid absolute inset-0 -z-20 opacity-80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

        {play ? (
          <>
            <Float className="top-[17%] left-[1.5%] w-[232px] 2xl:left-[3%] 2xl:w-[268px]" depth={-26} delay={0.9}>
              <DiffusionWindow />
            </Float>
            <Float className="top-[15%] right-[1.5%] w-[232px] 2xl:right-[3%] 2xl:w-[262px]" depth={-18} delay={1.05}>
              <TraceWindow />
            </Float>
            <Float className="bottom-[13%] left-[1.5%] w-[232px] 2xl:left-[5%] 2xl:w-[262px]" depth={20} delay={1.2}>
              <AgentLogWindow />
            </Float>
            <Float className="right-[1.5%] bottom-[15%] w-[232px] 2xl:right-[5%] 2xl:w-[262px]" depth={28} delay={1.35}>
              <VoiceFlowWindow />
            </Float>
          </>
        ) : null}

        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="container-x relative z-20 flex min-h-[100svh] flex-col items-center justify-center pt-32 pb-24 text-center"
        >
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={
              play
                ? { opacity: 1, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }
                : undefined
            }
            transition={{ duration: 1, delay: 0.1, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[13px] text-white/85 backdrop-blur-md transition-colors hover:border-white/30"
          >
            <span className="pulse-dot" aria-hidden />
            <span className="sm:hidden">{hero.pillShort}</span>
            <span className="hidden sm:inline">{hero.pill}</span>
          </motion.a>

          <h1
            id="hero-title"
            className="font-serif text-[3.2rem] leading-[0.92] font-normal tracking-[-0.025em] sm:text-[5.2rem] md:text-[6.4rem] lg:text-[7.2rem]"
          >
            {line1.split(" ").map((w, i) => (
              <span key={`a${i}`}>
                <Word play={play} delay={0.25 + i * 0.1} className="text-white">
                  {w}
                </Word>{" "}
              </span>
            ))}
            <br />
            {line2.split(" ").map((w, i) => (
              <span key={`b${i}`}>
                <Word play={play} delay={0.65 + i * 0.1} className="text-grad pr-[0.04em] italic drop-shadow-[0_0_30px_rgba(182,255,59,0.35)]">
                  {w}
                </Word>{" "}
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(play, 1.1)}
            className="relative mt-7 text-lg leading-[1.3] font-medium tracking-tight text-white/90 sm:text-2xl"
          >
            {hero.rotatingPrefix} <Rotator play={play} />
          </motion.p>

          {/* Rendered without an entrance animation so it paints immediately (largest text block) */}
          <p className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/65 sm:text-[17px]">
            {hero.paragraph}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              {...fadeUp(play, 1.4)}
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_var(--accent-1)] transition-transform hover:scale-[1.03]"
            >
              {hero.primaryCta.label} <ArrowDown size={16} aria-hidden />
            </motion.a>
            <motion.a
              {...fadeUp(play, 1.5)}
              href={hero.secondaryCta.href}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-6 py-3.5 text-sm text-text backdrop-blur transition-colors hover:border-accent-1/50"
            >
              <FileDown size={16} className="text-accent-1" aria-hidden /> {hero.secondaryCta.label}
            </motion.a>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {tools.map((icon, i) => (
              <motion.li
                key={icon.title}
                className="flex items-center gap-2 text-[13px] text-white/55"
                initial={{ opacity: 0, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 1.6 + i * 0.06, ease }}
              >
                <span style={{ color: icon.color }}>
                  <BrandIcon icon={icon} size={15} />
                </span>
                {icon.title}
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#stack"
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : undefined}
            transition={{ delay: 2.4 }}
            aria-label="Scroll to next section"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/55 uppercase sm:flex [@media(max-height:860px)]:!hidden"
          >
            scroll
            <span className="scroll-cue relative h-9 w-px overflow-hidden bg-white/10" />
          </motion.a>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
