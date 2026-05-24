import { SitePageShell } from "@/components/layouts/SitePageShell";
import { TradeVerticalsFull } from "@/components/TradeVerticalsFull";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Verticals | IICCI",
  description:
    "Explore 35+ industry sectors supported by IICCI — agriculture, electronics, defence, renewable energy, AI, EV manufacturing, logistics, pharmaceuticals, and more.",
};

export default function TradeVerticalsPage() {
  return (
    <SitePageShell>
      <main>
        <TradeVerticalsFull />
      </main>
    </SitePageShell>
  );
}
