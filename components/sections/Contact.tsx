"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, FileDown, Mail } from "lucide-react";
import { siGithub } from "simple-icons";
import { contact, isTodo, person } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the mailto button still works
    }
  };

  const mailto = `mailto:${person.email}?subject=${encodeURIComponent(contact.emailSubject)}&body=${encodeURIComponent(contact.emailBody)}`;

  const links = [
    { label: "LinkedIn", href: person.linkedin },
    { label: "GitHub", href: person.github, icon: siGithub },
  ].filter((l) => !isTodo(l.href));

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-36">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(182,255,59,0.08),transparent_70%)]"
      />
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          kicker={contact.kicker}
          title={contact.title}
          lead={contact.lead}
        />

        <Reveal index={2} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            <Mail size={16} aria-hidden /> {person.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-border-2 px-5 py-3.5 text-sm text-text transition-colors hover:border-accent-1/50"
          >
            {copied ? (
              <Check size={16} className="text-ok" aria-hidden />
            ) : (
              <Copy size={16} aria-hidden />
            )}
            {copied ? "Copied" : "Copy email"}
          </button>
          <a
            href={person.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border-2 px-5 py-3.5 text-sm text-text transition-colors hover:border-accent-1/50"
          >
            <FileDown size={16} aria-hidden /> Download CV
          </a>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-2 px-5 py-3.5 text-sm text-text transition-colors hover:border-accent-1/50"
            >
              {l.icon ? <BrandIcon icon={l.icon} size={15} /> : null}
              {l.label}
              <ArrowUpRight size={14} aria-hidden />
            </a>
          ))}
        </Reveal>
        <p role="status" aria-live="polite" className="sr-only">
          {copied ? "Email address copied" : ""}
        </p>

        <Reveal as="ul" index={3} className="mt-10 grid gap-2 text-[15px] text-muted">
          {contact.facts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-3 shrink-0 bg-accent-1/60" />
              {f}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
