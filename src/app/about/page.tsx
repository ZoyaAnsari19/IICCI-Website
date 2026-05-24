import { SubpageHero } from "@/components/layouts/SubpageHero";
import { About } from "@/components/About";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About IICCI | Indian Importers Chambers of Commerce & Industry",
  description:
    "Discover IICCI's story, legacy, and impact — empowering India's importing community through policy advocacy, trade facilitation, and global collaborations.",
};

export default function AboutPage() {
  return (
    <>
      <SubpageHero
        title="About IICCI"
        tagline="Our story, legacy & impact"
        badge="The Chamber"
      />
      <About />
      <ObjectivesSection />
    </>
  );
}
