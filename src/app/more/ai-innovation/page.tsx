import { SubpageHero } from "@/components/layouts/SubpageHero";
import { Training } from "@/components/Training";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Innovation | IICCI",
  description:
    "IICCI training, certification, and innovation programs — import-export masterclasses, drone pilot training, and global trade skills.",
};

export default function AiInnovationPage() {
  return (
    <>
      <SubpageHero
        title="AI & Innovation"
        tagline="Training & trade technology"
        badge="Future Skills"
      />
      <Training />
    </>
  );
}
