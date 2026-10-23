// Tiny "diffusion-looking" renderer used by the denoise demos.
// A target RGBA image is blended with fresh Gaussian-ish noise; σ shrinks each step.

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** σ for step k of n, decaying faster at the end like a Karras-style schedule. */
export function sigmaAt(step: number, steps: number): number {
  const t = 1 - step / steps;
  return Math.pow(t, 1.7);
}

type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Writes one denoising step of `target` into `out`. Both are RGBA of the same size. */
export function denoiseStep(
  target: Uint8ClampedArray,
  out: ImageData,
  sigma: number,
  rand: () => number,
  tint: RGB = [255, 255, 255],
) {
  const d = out.data;
  const keep = 1 - sigma;
  for (let i = 0; i < target.length; i += 4) {
    // Sum of two uniforms: cheap bell-shaped noise
    const n = (rand() + rand()) * 0.5;
    const g = n * 255 * sigma;
    d[i] = target[i] * keep + (g * tint[0]) / 255;
    d[i + 1] = target[i + 1] * keep + (g * tint[1]) / 255;
    d[i + 2] = target[i + 2] * keep + (g * tint[2]) / 255;
    d[i + 3] = 255;
  }
}
