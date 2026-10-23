"use client";

// Adapted from github.com/hari9618/Portfolio (used with permission): window contents rewritten
// for LLM / RAG / diffusion / voice work, palette retuned, and loops pause when hidden.

import { Bot, Check, Mic, Volume2, Wrench } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { diffusionDemo } from "@/lib/content";
import { denoiseStep, hexToRgb, mulberry32, sigmaAt } from "@/lib/denoise";
import { sceneTarget } from "@/lib/scenes";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Looping tick index that wraps at `len`. Freezes on the last frame under reduced motion. */
function useLoop(len: number, ms = 100) {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setT((v) => (v + 1) % len);
    }, ms);
    return () => window.clearInterval(id);
  }, [len, ms, reduced]);
  return reduced ? len - 1 : t;
}

function GlassWindow({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0b0c10]/[0.88] backdrop-blur-sm"
      style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.07), 0 30px 60px -20px rgb(0 0 0 / 0.7)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="truncate font-mono text-[10px] text-white/50">{title}</span>
        <span className="ml-auto">{badge}</span>
      </div>
      {children}
    </div>
  );
}

const Live = ({ text = "live", tone = "accent" }: { text?: string; tone?: "accent" | "ok" }) => (
  <span
    className={`flex items-center gap-1 font-mono text-[9px] ${tone === "ok" ? "text-ok" : "text-accent-1"}`}
  >
    <span
      className={`size-1.5 animate-pulse rounded-full ${tone === "ok" ? "bg-ok" : "bg-accent-1"}`}
    />{" "}
    {text}
  </span>
);

/** Diffusion job: a tiny tile denoises step by step, then the result is uploaded. ~8 s loop. */
export function DiffusionWindow() {
  const t = useLoop(80, 100);
  const STEPS = diffusionDemo.steps;
  const step = Math.min(STEPS, Math.max(0, Math.floor((t - 8) / 6)));
  const done = step >= STEPS;
  const preset = diffusionDemo.presets[0];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef<Uint8ClampedArray | null>(null);
  const rand = useRef(mulberry32(5));

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    target.current ??= sceneTarget(preset.scene, 112, 112);
    const frame = ctx.createImageData(112, 112);
    denoiseStep(target.current, frame, sigmaAt(step, STEPS), rand.current, hexToRgb("#9aa79a"));
    ctx.putImageData(frame, 0, 0);
  }, [step, STEPS, preset]);

  return (
    <GlassWindow title="txt2img · job 7f3a" badge={<Live text="gpu0" />}>
      <div className="flex gap-3 p-3.5">
        <canvas
          ref={canvasRef}
          width={112}
          height={112}
          className={`size-[84px] shrink-0 rounded-lg border border-white/10 ${done ? "" : "[image-rendering:pixelated]"}`}
        />
        <div className="min-w-0 flex-1 font-mono text-[9.5px]">
          <p className="truncate text-white/80">&quot;{preset.prompt}&quot;</p>
          <p className="mt-1.5 text-white/55">1024² · euler_a · lora: v3</p>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-grad transition-[width] duration-500"
              style={{ width: `${(step / STEPS) * 100}%` }}
            />
          </div>
          <p className="mt-1.5 text-white/55">
            step {String(step).padStart(2, "0")}/{String(STEPS).padStart(2, "0")} · σ{" "}
            {sigmaAt(step, STEPS).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-between border-t border-white/[0.07] px-3 py-1.5 font-mono text-[9px] text-white/55">
        <span>diffusion api</span>
        <span className={done ? "text-ok" : ""}>{done ? "✓ uploaded → webhook" : "denoising…"}</span>
      </div>
    </GlassWindow>
  );
}

/** Langfuse-style trace: spans grow in sequence, tokens and cost tick up, eval score lands. */
export function TraceWindow() {
  const t = useLoop(80, 100);
  const spans = [
    { l: "agent.run", x: 0, w: 100, c: "bg-white/25" },
    { l: "retrieve", x: 4, w: 24, c: "bg-[#7db4ff]/70" },
    { l: "rerank", x: 28, w: 10, c: "bg-[#7db4ff]/50" },
    { l: "llm.generate", x: 38, w: 40, c: "bg-accent-1/80" },
    { l: "tool.sql", x: 78, w: 12, c: "bg-ok/70" },
    { l: "eval.judge", x: 90, w: 10, c: "bg-warn/80" },
  ];
  const p = Math.min(1, t / 60);
  return (
    <GlassWindow title="langfuse · trace 8f2c…" badge={<Live text="tracing" tone="ok" />}>
      <div className="space-y-1.5 p-3.5 font-mono text-[9.5px]">
        {spans.map((s) => {
          const vis = Math.max(0, Math.min(s.w, p * 100 - s.x));
          return (
            <div key={s.l} className="flex items-center gap-2">
              <span className="w-16 shrink-0 truncate text-white/55">{s.l}</span>
              <div className="relative h-2.5 flex-1 rounded-sm bg-white/[0.04]">
                <div
                  className={`absolute top-0 h-full rounded-sm ${s.c}`}
                  style={{ left: `${s.x}%`, width: `${vis}%` }}
                />
              </div>
            </div>
          );
        })}
        <div className="flex justify-between border-t border-white/[0.07] pt-2 text-white/50">
          <span>{Math.round(p * 2184).toLocaleString("en-US")} tok</span>
          <span>${(p * 0.0092).toFixed(4)}</span>
          <span className={p >= 1 ? "text-ok" : ""}>{p >= 1 ? "faith 0.94 ✓" : "scoring…"}</span>
        </div>
      </div>
    </GlassWindow>
  );
}

/** Streaming agent log. */
export function AgentLogWindow() {
  const lines = [
    { a: "supervisor", m: "plan → retrieve, answer, log", c: "text-white/80" },
    { a: "rag", m: "hybrid retrieve · top-8 reranked", c: "text-[#7db4ff]" },
    { a: "tool", m: 'query_expenses(month="03") ✓', c: "text-ok" },
    { a: "llm", m: "answer streamed · 412 tok", c: "text-accent-1" },
    { a: "guardrail", m: "grounding check passed", c: "text-ok" },
    { a: "eval", m: "faithfulness 0.94 → logged", c: "text-warn" },
  ];
  const t = useLoop(lines.length * 8 + 10, 140);
  const n = Math.min(lines.length, Math.floor(t / 8) + 1);
  return (
    <GlassWindow title="agents · run #4821" badge={<Live />}>
      <div className="h-[132px] space-y-1 p-3.5 font-mono text-[9.5px]">
        {lines.slice(0, n).map((l, i) => (
          <div key={i} className="truncate">
            <span className="text-white/55">›</span> <span className="text-white/60">{l.a}</span>{" "}
            <span className={l.c}>{l.m}</span>
          </div>
        ))}
      </div>
    </GlassWindow>
  );
}

/** Voice agent turn: a token travels STT → agent → tool → TTS, with a turn counter. */
export function VoiceFlowWindow() {
  const t = useLoop(40, 100);
  const step = Math.floor(t / 10);
  const nodes = [
    { I: Mic, l: "STT" },
    { I: Bot, l: "Agent" },
    { I: Wrench, l: "Tool" },
    { I: Volume2, l: "TTS" },
  ];
  const [turns, setTurns] = useState(1284);
  useEffect(() => {
    if (t === 39) setTurns((r) => r + 1);
  }, [t]);
  return (
    <GlassWindow title="voice-agent · bookings" badge={<Live text="active" tone="ok" />}>
      <div className="relative flex items-center justify-between px-4 py-5">
        <div className="absolute top-[38px] right-8 left-8 h-px bg-white/10" />
        <div
          className="absolute top-[38px] left-8 h-px bg-gradient-to-r from-accent-1/0 to-accent-1 transition-all duration-1000 ease-linear"
          style={{ width: `${(Math.min(step, 3) / 3) * 78}%` }}
        />
        {nodes.map(({ I, l }, i) => (
          <div key={l} className="relative z-10 flex flex-col items-center gap-1.5">
            <span
              className={`grid size-9 place-items-center rounded-xl border transition-all duration-500 ${
                step >= i
                  ? "border-accent-1/60 bg-accent-1/15 text-accent-1"
                  : "border-white/10 bg-white/[0.03] text-white/55"
              }`}
            >
              {step > i ? <Check size={16} /> : <I size={16} />}
            </span>
            <span className="font-mono text-[8.5px] text-white/50">{l}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-white/[0.07] px-3 py-1.5 font-mono text-[9px] text-white/55">
        <span>turns today</span>
        <span className="text-white/75">{turns.toLocaleString("en-US")}</span>
      </div>
    </GlassWindow>
  );
}
