import type { CSSProperties } from "react";
import { getIcon } from "@/lib/icons";
import { BrandIcon } from "@/components/ui/BrandIcon";

type Props = { slugs: string[]; reverse?: boolean; duration?: number };

/** Infinite row of brand-coloured logo pills (CSS only). Duplicated once so the -50% loop is seamless. */
export function Marquee({ slugs, reverse = false, duration = 40 }: Props) {
  const icons = slugs.map(getIcon).filter((i) => i !== null);

  const row = (hidden: boolean) =>
    icons.map((icon) => (
      <li
        key={`${icon.title}-${hidden}`}
        aria-hidden={hidden || undefined}
        className="shrink-0 px-1.5 sm:px-2"
        style={{ "--brand": icon.color } as CSSProperties}
      >
        <span className="flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-2 pr-4 pl-2.5 transition-[border-color,background-color] duration-300 hover:border-[color-mix(in_srgb,var(--brand)_55%,transparent)] hover:bg-[color-mix(in_srgb,var(--brand)_10%,var(--surface))]">
          <span className="grid size-7 place-items-center rounded-full bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-[var(--brand)]">
            <BrandIcon icon={icon} size={16} />
          </span>
          <span className="text-sm font-medium whitespace-nowrap text-text">{icon.title}</span>
        </span>
      </li>
    ));

  return (
    <div className="marquee overflow-hidden py-2">
      <ul
        className="marquee-track"
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
