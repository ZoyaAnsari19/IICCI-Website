import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Circulars & Notifications | IICCI Media",
  description:
    "Official DGFT updates, customs notifications, trade policy circulars, and compliance alerts for Indian importers and exporters.",
};

export default function TradeCircularLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
