import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { ServiceVisual } from "@/lib/content";
import { PauseOffscreen } from "@/components/services/PauseOffscreen";
import { DiffusionPlayground } from "@/components/services/DiffusionPlayground";

// Small looping illustrations for each service card. Decorative (aria-hidden),
// CSS-only and paused off-screen — except the diffusion card, which is interactive.

const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties;

function Inference() {
  const lanes = [0, 1, 2, 3];
  return (
    <div className="flex h-full items-center gap-3 px-4">
      <div className="grid gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="h-1.5 w-8 rounded-full bg-border-2" />
        ))}
        <span className="mt-1 font-mono text-[9px] text-dim">queue</span>
      </div>
      <div className="relative grid flex-1 gap-2.5">
        {lanes.map((l) => (
          <div key={l} className="relative h-5">
            <span className="absolute top-1/2 h-px w-full bg-border" />
            <span
              className="travel absolute top-1/2 -mt-[3px] size-1.5 rounded-full bg-accent-1 shadow-[0_0_8px_var(--accent-1)]"
              style={{ ...delay(l * 0.6), "--dist": "calc(100cqw - 170px)" } as CSSProperties}
            />
          </div>
        ))}
      </div>
      <div className="grid gap-1.5">
        {lanes.map((l) => (
          <span
            key={l}
            className="glow-pulse grid h-[22px] w-[74px] place-items-center rounded-md border border-border-2 bg-surface font-mono text-[9px] whitespace-nowrap text-muted"
            style={delay(l * 0.6 + 2)}
          >
            gpu{l} · warm
          </span>
        ))}
      </div>
    </div>
  );
}

function Reliability() {
  const bars = Array.from({ length: 36 }, (_, i) => i);
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-4">
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="text-muted">inference-api · status</span>
        <span className="flex items-center gap-1.5 text-ok">
          <span className="pulse-dot !size-1.5" /> operational
        </span>
      </div>
      <div className="relative flex h-8 gap-[3px] overflow-hidden">
        {bars.map((i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm ${i === 23 ? "bg-warn" : "bg-ok/70"}`}
          />
        ))}
        <span className="scan absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
      <div className="relative h-4 font-mono text-[10.5px]">
        <p className="turn absolute text-warn" style={delay(0)}>
          ▲ alert · p95 latency above threshold
        </p>
        <p className="turn absolute text-muted" style={delay(2)}>
          → trace · cold start on model reload
        </p>
        <p className="turn absolute text-ok" style={delay(4)}>
          ✓ resolved · warm pool restored
        </p>
      </div>
    </div>
  );
}

function Evals() {
  const rows = ["faithfulness", "answer relevancy", "tool-call accuracy", "regression suite"];
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-4">
      {rows.map((r, i) => (
        <div key={r} className="flex items-center gap-3 font-mono text-[10.5px]">
          <span className="w-28 shrink-0 truncate text-muted">{r}</span>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border">
            <span
              className="fill-bar absolute inset-0 rounded-full bg-grad"
              style={{ ...delay(i * 0.25), width: `${92 - i * 7}%` }}
            />
          </span>
          <span className="flex items-center gap-0.5 text-ok">
            <Check size={11} /> pass
          </span>
        </div>
      ))}
    </div>
  );
}

function Saas() {
  return (
    <div className="flex h-full items-center justify-center p-3">
      <div className="flex h-full w-full overflow-hidden rounded-lg border border-border-2 bg-surface">
        <div className="w-14 space-y-1.5 border-r border-border p-2">
          <span className="block size-3 rounded bg-grad" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block h-1.5 rounded-full bg-border-2" />
          ))}
        </div>
        <div className="flex flex-1 gap-2 p-2.5">
          <div className="flex flex-1 items-end gap-1 rounded-md border border-border p-1.5">
            {[0.5, 0.8, 0.4, 0.9, 0.65, 1, 0.75].map((h, i) => (
              <span
                key={i}
                className="grow-y flex-1 rounded-sm bg-accent-1/70"
                style={{ height: `${h * 100}%`, ...delay(i * 0.12) }}
              />
            ))}
          </div>
          <div className="flex w-[42%] flex-col justify-end gap-1.5">
            <span className="turn ml-auto rounded-md bg-surface-2 px-1.5 py-1 font-mono text-[9px] text-text [animation-duration:5s]">
              spend this week?
            </span>
            <span
              className="turn rounded-md border border-border px-1.5 py-1 font-mono text-[9px] text-muted [animation-duration:5s]"
              style={delay(1.2)}
            >
              ↑ 12% vs last week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Voice() {
  const bars = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4">
      <div className="flex h-12 items-center gap-[3px]">
        {bars.map((i) => (
          <span
            key={i}
            className="eq-bar w-1 rounded-full bg-grad"
            style={{
              height: `${30 + ((i * 37) % 70)}%`,
              ...delay(-((i * 0.13) % 1.1)),
            }}
          />
        ))}
      </div>
      <div className="relative h-4 w-full text-center font-mono text-[10.5px]">
        <p className="turn absolute inset-x-0 text-muted" style={delay(0)}>
          ● listening…
        </p>
        <p className="turn absolute inset-x-0 text-accent-2" style={delay(2)}>
          ◆ thinking · calling book_slot()
        </p>
        <p className="turn absolute inset-x-0 text-accent-1" style={delay(4)}>
          ▶ speaking · &quot;You&apos;re booked for 3 pm.&quot;
        </p>
      </div>
    </div>
  );
}

const visuals = {
  inference: Inference,
  reliability: Reliability,
  evals: Evals,
  saas: Saas,
  voice: Voice,
} as const;

export function ServiceVisualFrame({ visual }: { visual: ServiceVisual }) {
  const frame =
    "relative h-40 overflow-hidden rounded-xl border border-border bg-bg/70 [container-type:inline-size]";
  if (visual === "diffusion") {
    return (
      <div className={frame}>
        <DiffusionPlayground />
      </div>
    );
  }
  const Visual = visuals[visual];
  return (
    <PauseOffscreen className={frame}>
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div className="relative h-full">
        <Visual />
      </div>
    </PauseOffscreen>
  );
}
