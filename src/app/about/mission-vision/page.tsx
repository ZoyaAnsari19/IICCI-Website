import { MissionVisionSection } from "@/components/MissionVisionSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission & Vision | IICCI",
  description:
    "IICCI's mission and vision — empowering India's importing community and building a globally recognized chamber for international trade.",
};

export default function MissionVisionPage() {
  return <MissionVisionSection />;
}
