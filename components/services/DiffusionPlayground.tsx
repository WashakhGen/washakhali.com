"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Shuffle } from "lucide-react";
import { diffusionDemo } from "@/lib/content";
import { denoiseStep, hexToRgb, mulberry32, sigmaAt } from "@/lib/denoise";
import { sceneTarget } from "@/lib/scenes";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";

const RES = 160;
const STEP_MS = 170;
const STEPS = diffusionDemo.steps;

/** Interactive denoiser: scrub the step slider, press play, or switch prompts. */
export function DiffusionPlayground() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targets = useRef(new Map<number, Uint8ClampedArray>());
  const rand = useRef(mulberry32(11));
  const autoPlayed = useRef(false);
  const [preset, setPreset] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Auto-play once the first time the card is seen
  useEffect(() => {
    if (!inView || autoPlayed.current) return;
    autoPlayed.current = true;
    if (reduced) setStep(STEPS);
    else setPlaying(true);
  }, [inView, reduced]);

  // Advance while playing
  useEffect(() => {
    if (!playing) return;
    if (step >= STEPS) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step]);

  // Paint
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    let target = targets.current.get(preset);
    if (!target) {
      target = sceneTarget(diffusionDemo.presets[preset].scene, RES, RES);
      targets.current.set(preset, target);
    }
    const frame = ctx.createImageData(RES, RES);
    denoiseStep(target, frame, sigmaAt(step, STEPS), rand.current, hexToRgb("#9aa79a"));
    ctx.putImageData(frame, 0, 0);
  }, [preset, step]);

  const play = () => {
    setStep(0);
    setPlaying(!reduced);
    if (reduced) setStep(STEPS);
  };
  const shuffle = () => {
    setPreset((p) => (p + 1) % diffusionDemo.presets.length);
    play();
  };

  return (
    <div ref={ref} className="flex h-full gap-3 p-3">
      <canvas
        ref={canvasRef}
        width={RES}
        height={RES}
        role="img"
        aria-label={`Denoising preview: ${diffusionDemo.presets[preset].prompt}, step ${step} of ${STEPS}`}
        className={`aspect-square h-full shrink-0 rounded-lg border border-border ${
          step === STEPS ? "" : "[image-rendering:pixelated]"
        }`}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <p className="font-mono text-[10px] tracking-wider text-dim uppercase">prompt</p>
          <p className="mt-1 line-clamp-2 font-mono text-[11.5px] leading-snug text-text">
            {diffusionDemo.presets[preset].prompt}
          </p>
        </div>
        <div>
          <p className="flex items-center justify-between font-mono text-[10.5px] text-muted">
            <span>step {String(step).padStart(2, "0")}/{String(STEPS).padStart(2, "0")}</span>
            <span>σ {sigmaAt(step, STEPS).toFixed(2)}</span>
          </p>
          <input
            type="range"
            min={0}
            max={STEPS}
            value={step}
            aria-label="Denoising step"
            onChange={(e) => {
              setPlaying(false);
              setStep(+e.target.value);
            }}
            className="mt-1.5 w-full accent-[var(--accent-1)]"
          />
          <div className="mt-2 flex gap-1.5">
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-1 rounded-md bg-grad px-2.5 py-1 text-[11px] font-semibold text-black"
            >
              <Play size={11} aria-hidden /> Generate
            </button>
            <button
              type="button"
              onClick={shuffle}
              aria-label="Next prompt"
              className="inline-flex items-center gap-1 rounded-md border border-border-2 px-2 py-1 text-[11px] text-muted hover:text-text"
            >
              <Shuffle size={11} aria-hidden /> Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
