import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";

import { ObjectivesSection } from "@/components/ObjectivesSection";
import { LeadershipVisionSection } from "@/components/LeadershipVisionSection";
// import { MentorsForewordSection } from "@/app/about/leadership/MentorsForewordSection";
import { LeadershipHero } from "@/components/LeadershipHero";
import { CoreTeam } from "@/components/CoreTeam";
import { GlobalPresence } from "@/components/GlobalPresence";
import { WhyIndia } from "@/components/WhyIndia";
import { ForeignDesk } from "@/components/ForeignDesk";
import { Membership } from "@/components/Membership";
import { Training } from "@/components/Training";
import { Directory } from "@/components/Directory";
import { DownloadsResourcesSection } from "@/components/DownloadsResourcesSection";
import {
  ExchangeRatesProvider,
  LiveExchangeRatesSection,
  LiveExchangeRatesTicker,
} from "@/components/LiveExchangeRatesSection";
import { Footer } from "@/components/Footer";
export default function Home() {
  return (
    <>
      <ExchangeRatesProvider>
        <Navbar />
        <LiveExchangeRatesTicker />
        <main className="relative">
        <Hero />
        <div className="relative z-30">
          <Stats />
        </div>
        <ObjectivesSection />
        <LeadershipVisionSection />
        {/* <MentorsForewordSection /> */}
        <LeadershipHero embedded />
        <CoreTeam />
        <GlobalPresence />
        <WhyIndia />
        <ForeignDesk />
        <Membership />
        <Training />
        <Directory />
        <LiveExchangeRatesSection preview />
        <DownloadsResourcesSection preview />
        </main>
        <Footer />
      </ExchangeRatesProvider>
    </>
  );
}
