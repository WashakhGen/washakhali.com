type SimpleIcon = { title: string; path: string };

type Props = { icon: SimpleIcon; size?: number; className?: string; label?: string };

/** Renders a simple-icons glyph in currentColor. Decorative unless `label` is given. */
export function BrandIcon({ icon, size = 18, className, label }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={icon.path} />
    </svg>
  );
}
