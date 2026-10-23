import "server-only";
import * as simpleIcons from "simple-icons";

// Resolves simple-icons by slug. Server-only so the full icon set never reaches the client bundle;
// components pass the resolved { title, path, color } down as plain props.

export type ResolvedIcon = { title: string; path: string; color: string };

type SimpleIcon = { title: string; slug: string; path: string; hex: string };

const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as unknown as Record<string, SimpleIcon>)
    .filter((i) => i && typeof i === "object" && "slug" in i)
    .map((i) => [i.slug, i]),
);

/** Brand colour, lifted to the page text colour when too dark to read on near-black. */
function readable(hex: string): string {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.35 ? "var(--text)" : `#${hex}`;
}

export function getIcon(slug: string | null): ResolvedIcon | null {
  if (!slug) return null;
  const icon = bySlug.get(slug);
  if (!icon) return null;
  return { title: icon.title, path: icon.path, color: readable(icon.hex) };
}
