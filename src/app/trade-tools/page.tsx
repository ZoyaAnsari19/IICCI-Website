import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveExchangeRatesSection } from "@/components/LiveExchangeRatesSection";

export const metadata = {
  title: "Trade Tools & Import Facts | Live Exchange Rates | IICCI",
  description:
    "Live foreign exchange rates against INR, trade intelligence tools, and import-export reference data for IICCI members.",
};

export default function TradeToolsPage() {
  return (
    <>
      <Navbar />
      <main className="relative pt-[var(--navbar-height,5.5rem)]">
        <section className="relative py-14 lg:py-16 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-white/10">
          <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Trade Tools
              </span>
            </div>
            <h1 className="display-title font-display font-bold text-white mb-4">
              Import Facts &{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Financial Intelligence
              </span>
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              Currency dashboards, live market crosses, and trade reference tools built for
              global importers and exporters.
            </p>
          </div>
        </section>
        <LiveExchangeRatesSection />
      </main>
      <Footer />
    </>
  );
}
