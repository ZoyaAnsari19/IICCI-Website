import { DownloadsResourcesSection } from "@/components/DownloadsResourcesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources Center | Downloads & Resources | IICCI",
  description:
    "Access IICCI membership forms, corporate profiles, trade guides, event brochures, training materials, certificates, and annual reports.",
};

export default function ResourcesPage() {
  return (
    <main>
      <DownloadsResourcesSection />
    </main>
  );
}
