import { ArrowUpRight } from "lucide-react";
import { experience, experienceSection } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Simple vertical timeline: period on the left, role and highlights on the right. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          kicker={experienceSection.kicker}
          title={experienceSection.title}
        />

        <ol className="relative mt-14 max-w-4xl">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-border-2 md:left-[calc(11rem+16px)]"
          />
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.org}-${job.role}`}
              index={i}
              className="relative grid gap-2 pb-12 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0"
            >
              <p className="font-mono text-xs leading-6 text-dim md:pr-6 md:text-right">
                {job.period}
              </p>

              <div className="relative">
                <span
                  aria-hidden
                  className={`absolute top-[7px] -left-8 size-[11px] rounded-full border-2 md:-left-[21.5px] ${
                    i === 0 ? "border-accent-1 bg-accent-1" : "border-border-2 bg-bg"
                  }`}
                />
                <h3 className="text-xl font-medium tracking-tight">{job.role}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[15px] text-muted">
                  {job.orgUrl ? (
                    <a
                      href={job.orgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-text transition-colors hover:text-accent-1"
                    >
                      {job.org}
                      <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ) : (
                    <span className="text-text">{job.org}</span>
                  )}
                  {job.type ? <span className="font-mono text-[11px] text-dim">· {job.type}</span> : null}
                </p>
                <ul className="mt-4 max-w-[64ch] space-y-2 text-[15px] leading-relaxed text-muted">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-1/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
