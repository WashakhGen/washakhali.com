import { services, servicesSection } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientBorderCard } from "@/components/ui/GradientBorderCard";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisualFrame } from "@/components/services/ServiceVisuals";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          kicker={servicesSection.kicker}
          title={servicesSection.title}
          lead={servicesSection.lead}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} index={i % 3}>
              <GradientBorderCard className="h-full p-3 sm:p-3.5" tilt={s.visual !== "diffusion"}>
                <ServiceVisualFrame visual={s.visual} />
                <div className="px-3 pt-6 pb-4 sm:px-4">
                  <p className="font-mono text-[11px] tracking-wider text-dim uppercase">
                    {s.kicker}
                  </p>
                  <h3 className="mt-2.5 text-[1.6rem] leading-tight font-medium tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.description}</p>
                </div>
              </GradientBorderCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
