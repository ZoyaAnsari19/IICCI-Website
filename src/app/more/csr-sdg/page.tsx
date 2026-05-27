import { CSR } from "@/components/CSR";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR & SDG | IICCI",
  description:
    "IICCI corporate social responsibility — women empowerment, education, skill development, green initiatives, and ESG projects aligned with UN SDGs.",
};

export default function CsrSdgPage() {
  return (
    <main>
      <CSR standalone />
    </main>
  );
}
