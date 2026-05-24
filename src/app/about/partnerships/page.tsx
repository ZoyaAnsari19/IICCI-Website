import { SubpageHero } from "@/components/layouts/SubpageHero";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships | IICCI",
  description:
    "IICCI strategic global partnerships — bilateral trade alliances, international chambers, industry bodies, and institutional collaborations.",
};

export default function PartnershipsPage() {
  return (
    <>
      <SubpageHero
        title="Partnerships"
        tagline="Strategic global alliances"
        badge="Global Collaboration"
      />
      <PartnershipsSection />
    </>
  );
}
