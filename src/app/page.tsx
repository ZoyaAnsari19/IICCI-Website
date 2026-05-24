import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { CoreTeam } from "@/components/CoreTeam";
import { Manifesto } from "@/components/Manifesto";
import { GlobalPresence } from "@/components/GlobalPresence";
import { Services } from "@/app/services/page";
import { IndustryVerticalsSection } from "@/app/services/industryVerticals/page";
import { WhyIndia } from "@/components/WhyIndia";
import { ForeignDesk } from "@/components/ForeignDesk";
import { Media } from "@/components/Media";
import { Events } from "@/components/Events";
import { Membership } from "@/components/Membership";
import { Training } from "@/components/Training";
import { Directory } from "@/components/Directory";
import { Footer } from "@/components/Footer";
import { Floats } from "@/components/Floats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ObjectivesSection />
        <CoreTeam />
        <Manifesto />
        <GlobalPresence />
        <Services />
        <IndustryVerticalsSection />
        <WhyIndia />
        <ForeignDesk />
        <Media />
        <Events />
        <Membership />
        <Training />
        <Directory />
      </main>
      <Footer />
      <Floats />
    </>
  );
}
