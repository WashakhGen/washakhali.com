import { hero } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { Hero } from "@/components/hero/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main">
      <Hero tools={hero.tools.map(getIcon).filter((i) => i !== null)} />
      <StackMarquee />
      <Services />
      <Work />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}
