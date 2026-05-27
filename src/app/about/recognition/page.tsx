import { RecognitionSection } from "@/components/RecognitionSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recognition | IICCI",
  description:
    "IICCI awards, certifications, and institutional recognition — Govt. of India recognized, ISO 9001, WTO affiliated, UN Global Compact member.",
};

export default function RecognitionPage() {
  return <RecognitionSection />;
}
