// Procedural "generated images" for the denoise demos. Each scene is drawn with vector
// shapes so the final, fully denoised frame reads as a clear picture at small sizes.

export type SceneName = "server-hall" | "gpu-die" | "observatory";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

const serverHall: Draw = (ctx, w, h) => {
  const vx = w / 2;
  const vy = h * 0.46;

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#050a06");
  sky.addColorStop(0.46, "#0f1f0c");
  sky.addColorStop(1, "#030503");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Floor grid converging on the vanishing point
  ctx.strokeStyle = "rgba(182,255,59,0.25)";
  ctx.lineWidth = Math.max(1, w / 220);
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(vx, vy);
    ctx.lineTo(vx + i * w * 0.22, h);
    ctx.stroke();
  }
  for (let k = 1; k <= 6; k++) {
    const y = vy + (h - vy) * Math.pow(k / 6, 1.8);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Two rows of racks with blinking LEDs
  for (const side of [-1, 1]) {
    for (let k = 0; k < 6; k++) {
      const t0 = k / 6;
      const t1 = (k + 0.82) / 6;
      const x0 = vx + side * (w * 0.08 + w * 0.42 * (1 - t0) ** 1.4);
      const x1 = vx + side * (w * 0.08 + w * 0.42 * (1 - t1) ** 1.4);
      const top0 = vy - h * 0.36 * (1 - t0) ** 1.2 - h * 0.03;
      const top1 = vy - h * 0.36 * (1 - t1) ** 1.2 - h * 0.03;
      const bot0 = vy + h * 0.5 * (1 - t0) ** 1.2 + h * 0.02;
      const bot1 = vy + h * 0.5 * (1 - t1) ** 1.2 + h * 0.02;
      ctx.fillStyle = k % 2 ? "#151b16" : "#1b231c";
      ctx.beginPath();
      ctx.moveTo(x0, top0);
      ctx.lineTo(x1, top1);
      ctx.lineTo(x1, bot1);
      ctx.lineTo(x0, bot0);
      ctx.closePath();
      ctx.fill();
      // LEDs
      for (let r = 0; r < 7; r++) {
        const f = (r + 0.5) / 7;
        const lx = x0 + (x1 - x0) * 0.35;
        const ly = top0 + (bot0 - top0) * f;
        const size = Math.max(1.2, (w / 90) * (1 - t0));
        ctx.fillStyle = (r + k) % 3 === 0 ? "#f5e642" : "#b6ff3b";
        ctx.fillRect(lx, ly, size, size * 0.7);
      }
    }
  }

  // Volumetric fog at the end of the aisle
  const fog = ctx.createRadialGradient(vx, vy, 0, vx, vy, w * 0.45);
  fog.addColorStop(0, "rgba(200,255,140,0.55)");
  fog.addColorStop(0.35, "rgba(182,255,59,0.18)");
  fog.addColorStop(1, "rgba(182,255,59,0)");
  ctx.fillStyle = fog;
  ctx.fillRect(0, 0, w, h);
};

const gpuDie: Draw = (ctx, w, h) => {
  const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.75);
  bg.addColorStop(0, "#1c1638");
  bg.addColorStop(1, "#05040b");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.rotate(-0.18);
  const s = w * 0.56;

  // Package + pins
  ctx.fillStyle = "#2a2d36";
  ctx.fillRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24);
  ctx.fillStyle = "#c9a54a";
  const pins = 9;
  for (let i = 0; i < pins; i++) {
    const p = -s * 0.5 + (i + 0.5) * (s / pins);
    const pw = s * 0.05;
    ctx.fillRect(p - pw / 2, -s * 0.74, pw, s * 0.1);
    ctx.fillRect(p - pw / 2, s * 0.64, pw, s * 0.1);
    ctx.fillRect(-s * 0.74, p - pw / 2, s * 0.1, pw);
    ctx.fillRect(s * 0.64, p - pw / 2, s * 0.1, pw);
  }

  // Iridescent die
  const die = ctx.createLinearGradient(-s / 2, -s / 2, s / 2, s / 2);
  die.addColorStop(0, "#5ce1ff");
  die.addColorStop(0.35, "#7a5cff");
  die.addColorStop(0.65, "#ff7ad9");
  die.addColorStop(1, "#ffd36a");
  ctx.fillStyle = die;
  ctx.fillRect(-s / 2, -s / 2, s, s);

  // Core grid
  ctx.strokeStyle = "rgba(10,8,25,0.55)";
  ctx.lineWidth = Math.max(1, w / 160);
  for (let i = 1; i < 6; i++) {
    const p = -s / 2 + (i * s) / 6;
    ctx.beginPath();
    ctx.moveTo(p, -s / 2);
    ctx.lineTo(p, s / 2);
    ctx.moveTo(-s / 2, p);
    ctx.lineTo(s / 2, p);
    ctx.stroke();
  }

  // Specular highlight
  const spec = ctx.createLinearGradient(-s / 2, -s / 2, s * 0.1, s * 0.1);
  spec.addColorStop(0, "rgba(255,255,255,0.55)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.fillRect(-s / 2, -s / 2, s, s);
  ctx.restore();
};

const observatory: Draw = (ctx, w, h) => {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#1a0f2e");
  sky.addColorStop(0.45, "#b0461d");
  sky.addColorStop(0.68, "#f5c242");
  sky.addColorStop(1, "#f5c242");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Stars in the upper sky
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  const stars = [
    [0.12, 0.08], [0.3, 0.14], [0.52, 0.06], [0.71, 0.12], [0.88, 0.07], [0.2, 0.22], [0.8, 0.24],
  ];
  for (const [x, y] of stars) ctx.fillRect(x * w, y * h, Math.max(1, w / 110), Math.max(1, w / 110));

  // Sun on the horizon
  const sun = ctx.createRadialGradient(w * 0.68, h * 0.66, 0, w * 0.68, h * 0.66, w * 0.18);
  sun.addColorStop(0, "#fff6d0");
  sun.addColorStop(0.55, "#ffd970");
  sun.addColorStop(1, "rgba(255,217,112,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, w, h);

  // Dunes
  ctx.fillStyle = "#5a2a12";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.72);
  ctx.quadraticCurveTo(w * 0.3, h * 0.62, w * 0.6, h * 0.74);
  ctx.quadraticCurveTo(w * 0.82, h * 0.8, w, h * 0.7);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fill();
  ctx.fillStyle = "#2a1208";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.86);
  ctx.quadraticCurveTo(w * 0.45, h * 0.76, w, h * 0.88);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fill();

  // Observatory dome silhouette with an open slit
  const cx = w * 0.32;
  const base = h * 0.7;
  const r = w * 0.15;
  ctx.fillStyle = "#140805";
  ctx.fillRect(cx - r * 0.95, base - r * 0.15, r * 1.9, r * 0.75);
  ctx.beginPath();
  ctx.arc(cx, base - r * 0.15, r, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#f5c242";
  ctx.fillRect(cx - r * 0.1, base - r * 1.1, r * 0.2, r * 0.75);
};

const scenes: Record<SceneName, Draw> = {
  "server-hall": serverHall,
  "gpu-die": gpuDie,
  observatory,
};

/** Renders a scene into an RGBA buffer of size w×h. */
export function sceneTarget(name: SceneName, w: number, h: number): Uint8ClampedArray {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  scenes[name](ctx, w, h);
  return ctx.getImageData(0, 0, w, h).data;
}
