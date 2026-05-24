import { SubpageHero } from "@/components/layouts/SubpageHero";
import { CSR } from "@/components/CSR";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR & SDG | IICCI",
  description:
    "IICCI corporate social responsibility — women empowerment, education, skill development, green initiatives, and ESG projects aligned with UN SDGs.",
};

export default function CsrSdgPage() {
  return (
    <>
      <SubpageHero
        title="CSR & SDG"
        tagline="Sustainability & social impact"
        badge="Responsible Commerce"
      />
      <CSR />
    </>
  );
}
