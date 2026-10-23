import { hero } from "@/lib/content";
import { marqueeRows } from "@/lib/tools";
import { Marquee } from "@/components/ui/Marquee";

export function StackMarquee() {
  return (
    <section id="stack" aria-label="Tech stack" className="border-y border-border bg-bg-2 py-10">
      <p className="kicker mb-6 text-center">{hero.marqueeLabel}</p>
      <Marquee slugs={marqueeRows[0]} duration={45} />
      <Marquee slugs={marqueeRows[1]} duration={50} reverse />
    </section>
  );
}
