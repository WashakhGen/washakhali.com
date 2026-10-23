import { ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { work, workSection, type WorkItem } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-bg-2 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          kicker={workSection.kicker}
          title={workSection.title}
          lead={workSection.lead}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3}>
              <ProjectCard item={item} />
            </Reveal>
          ))}
          <Reveal as="li" index={work.length % 3}>
            <a
              href={workSection.more.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-h-[260px] flex-col justify-between rounded-[var(--radius)] border border-dashed border-border-2 p-6 transition-colors hover:border-accent-1/50"
            >
              <BrandIcon icon={siGithub} size={28} className="text-muted group-hover:text-text" />
              <div>
                <h3 className="flex items-center gap-1.5 text-xl font-medium tracking-tight">
                  {workSection.more.title}
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-1"
                    aria-hidden
                  />
                </h3>
                <p className="mt-2 text-[15px] text-muted">{workSection.more.description}</p>
              </div>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ item }: { item: WorkItem }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius)] border border-border bg-surface p-6 transition-colors hover:border-border-2">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-accent-1/30 bg-accent-1/[0.07] px-2.5 py-0.5 font-mono text-[11px] text-accent-1">
          {item.task}
        </span>
        {item.org ? <span className="font-mono text-[11px] text-dim">{item.org}</span> : null}
      </div>

      <h3 className="mt-5 text-xl font-medium tracking-tight">{item.title}</h3>
      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{item.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
        {item.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-border-2 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex min-h-5 items-center gap-4 border-t border-border pt-4 text-sm">
        {item.links.github ? (
          <a
            href={item.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text transition-colors hover:text-accent-1"
          >
            <BrandIcon icon={siGithub} size={15} /> GitHub
            <ArrowUpRight size={14} aria-hidden />
          </a>
        ) : (
          <span className="font-mono text-[11px] text-dim">private · client work</span>
        )}
        {item.links.live ? (
          <a
            href={item.links.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-text transition-colors hover:text-accent-1"
          >
            Live <ArrowUpRight size={14} aria-hidden />
          </a>
        ) : null}
      </div>
    </article>
  );
}
