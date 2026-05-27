import { Manifesto } from "@/components/Manifesto";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto | IICCI — 1 Lakh Billionaires Vision",
  description:
    "The IICCI Manifesto — a bold national mission to nurture 100,000 Indian billion-rupee businesses by 2047 through capital, capability, and global market access.",
};

export default function ManifestoPage() {
  return <Manifesto />;
}
