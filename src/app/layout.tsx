import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SiteClientInit } from "@/components/SiteClientInit";
import { Floats } from "@/components/Floats";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "IICCI – Indian Importers Chambers of Commerce & Industry | Global Trade",
  description:
    "Indian Importers Chambers of Commerce & Industry (IICCI) - Connecting India to Global Trade Opportunities. Empowering importers, global partnerships, international trade, investment opportunities, and bilateral business growth.",
  keywords: [
    "IICCI",
    "Indian Importers",
    "Chamber of Commerce",
    "International Trade",
    "Import Export",
    "Global Trade",
    "India Business",
    "Bilateral Trade",
  ],
  authors: [
    {
      name: "Indian Importers Chambers of Commerce & Industry",
    },
  ],
  openGraph: {
    title: "IICCI - Indian Importers Chambers of Commerce & Industry",
    description:
      "Connecting India To Global Trade Opportunities. A premium international chamber empowering importers and global partnerships.",
    type: "website",
  },
  other: {
    "theme-color": "#081120",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css"
        />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body className="bg-navy-950 text-white font-sans antialiased overflow-x-hidden">
        {children}
        <Floats />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"
          strategy="beforeInteractive"
        />
        <SiteClientInit />
      </body>
    </html>
  );
}
