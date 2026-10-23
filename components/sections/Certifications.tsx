import { ArrowUpRight, Award } from "lucide-react";
import { certifications, certificationsSection, isTodo } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="relative bg-bg-2 py-24 md:py-32"
    >
      <div className="container-x">
        <SectionHeading
          id="certifications-title"
          kicker={certificationsSection.kicker}
          title={certificationsSection.title}
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {certifications.map((cert, i) => {
            const icon = getIcon(cert.icon);
            return (
              <Reveal as="li" key={cert.title} index={i}>
                <article className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface p-6 transition-colors hover:border-border-2">
                  {cert.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      className="mb-5 aspect-[4/3] w-full rounded-lg border border-border object-cover"
                    />
                  ) : null}
                  <span
                    className="grid size-11 place-items-center rounded-xl border border-border-2 bg-bg/60"
                    style={{ color: icon?.color ?? "var(--accent-1)" }}
                  >
                    {icon ? <BrandIcon icon={icon} size={20} /> : <Award size={20} aria-hidden />}
                  </span>
                  <h3 className="mt-5 text-lg leading-snug font-medium tracking-tight">{cert.title}</h3>
                  <p className="mt-1.5 flex-1 font-mono text-xs text-muted">
                    {isTodo(cert.issuer) ? null : cert.issuer}
                    {cert.date ? ` · ${cert.date}` : null}
                  </p>
                  {cert.credentialUrl && !isTodo(cert.credentialUrl) ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 border-t border-border pt-4 text-sm text-text transition-colors hover:text-accent-1"
                    >
                      View credential <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
