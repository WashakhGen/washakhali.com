"use client";

import { useEffect, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { siGithub } from "simple-icons";
import { navLinks, person } from "@/lib/content";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Solid background after 40px of scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section crossing the middle band of the viewport is active
  useEffect(() => {
    // "top" is observed too so leaving the hero for the top clears the highlight
    const els = ["top", ...navLinks.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll and close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-[60px] max-w-[1120px] items-center justify-between gap-4 rounded-full border pr-2.5 pl-4 transition-[background-color,border-color] duration-500 sm:pl-5 ${
          scrolled || open
            ? "border-white/[0.12] bg-black/65 backdrop-blur-xl"
            : "border-white/[0.09] bg-black/25 backdrop-blur-md"
        }`}
        style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.06)" }}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={`${person.name} — home`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
          <img
            src={person.logo}
            alt=""
            width={94}
            height={40}
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
          />
          <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
            {person.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
                  active === link.id ? "bg-white/[0.08] text-text" : "text-white/65 hover:text-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={person.cv}
            download
            title="Download CV"
            aria-label="Download CV"
            className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-accent-1"
          >
            <FileDown size={18} aria-hidden />
          </a>
          <a
            href={person.github}
            target="_blank"
            rel="noreferrer"
            className="hidden size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-text sm:grid"
            aria-label="GitHub profile"
          >
            <BrandIcon icon={siGithub} size={18} />
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-grad px-4 py-2 text-[13.5px] font-semibold text-black transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Hire me
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-text hover:bg-white/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 -z-10 bg-bg/95 pt-24 backdrop-blur-xl lg:hidden"
      >
        <ul className="container-x flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li
              key={link.id}
              className="motion-safe:animate-[menu-in_0.6s_var(--ease)_both]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-baseline gap-4 border-b border-border py-4 text-4xl font-semibold tracking-tight ${
                  active === link.id ? "text-grad" : "text-text"
                }`}
              >
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li
            className="mt-8 flex flex-wrap gap-3 motion-safe:animate-[menu-in_0.6s_var(--ease)_both]"
            style={{ animationDelay: `${navLinks.length * 60}ms` }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-grad px-5 py-3 font-semibold text-black"
            >
              Hire me
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-border-2 px-5 py-3"
            >
              <BrandIcon icon={siGithub} size={16} /> GitHub
            </a>
            <a
              href={person.cv}
              download
              className="flex items-center gap-2 rounded-full border border-border-2 px-5 py-3"
            >
              <FileDown size={16} aria-hidden /> CV
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
