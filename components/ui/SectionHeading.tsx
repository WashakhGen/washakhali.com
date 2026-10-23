import { WordReveal, type Part } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  id: string;
  kicker: string;
  title: Part[];
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Mono kicker + large statement with word-by-word reveal. `id` goes on the h2 for aria-labelledby. */
export function SectionHeading({ id, kicker, title, lead, align = "left", className = "" }: Props) {
  const center = align === "center";
  return (
    <div className={`max-w-4xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal as="p" className="kicker mb-5">
        — {kicker}
      </Reveal>
      <WordReveal id={id} parts={title} className="h2-fluid font-medium" />
      {lead ? (
        <Reveal
          as="p"
          index={3}
          className={`mt-6 max-w-2xl text-lg text-muted ${center ? "mx-auto" : ""}`}
        >
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}
