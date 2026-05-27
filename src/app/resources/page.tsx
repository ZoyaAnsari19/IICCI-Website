import { DownloadsResourcesSection } from "@/components/DownloadsResourcesSection";
import { TradeCircularsSection } from "@/components/TradeCircularsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources Center | Downloads & Resources | IICCI",
  description:
    "Access IICCI membership forms, corporate profiles, trade guides, trade circulars, DGFT updates, and official compliance notifications.",
};

export default function ResourcesPage() {
  return (
    <main>
      <DownloadsResourcesSection standalone />
      <TradeCircularsSection />
    </main>
  );
}
