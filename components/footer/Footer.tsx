import { Heart } from "lucide-react";
import { isTodo, navLinks, person } from "@/lib/content";

export function Footer() {
  const contactLinks = [
    { label: "Email", href: `mailto:${person.email}`, raw: person.email },
    { label: "GitHub", href: person.github, raw: person.github },
    { label: "LinkedIn", href: person.linkedin, raw: person.linkedin },
  ].filter((l) => !isTodo(l.raw));

  return (
    <footer className="border-t border-border bg-bg-2">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
            <img src={person.logo} alt="" width={85} height={36} className="h-9 w-auto" />
            <span className="h-5 w-px bg-border-2" aria-hidden />
            <span className="font-medium">{person.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">{person.footerLine}</p>
        </div>

        <nav aria-label="Footer">
          <p className="kicker mb-3">Sections</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-muted transition-colors hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="kicker mb-3">Elsewhere</p>
          <ul className="grid gap-2 text-sm">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-x flex items-center justify-center gap-1.5 py-6 text-center font-mono text-xs text-dim">
          © 2026 {person.name} · Built with
          <Heart size={13} className="fill-accent-1 text-accent-1" aria-label="love" role="img" />
        </p>
      </div>
    </footer>
  );
}
