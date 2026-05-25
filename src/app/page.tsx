import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Services } from "@/app/services/page";
import { IndustryVerticalsSection } from "@/app/services/industryVerticals/page";
import { AIMachineLearningSection } from "@/app/services/machineLearning/page";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { CoreTeam } from "@/components/CoreTeam";
import { GlobalPresence } from "@/components/GlobalPresence";
import { WhyIndia } from "@/components/WhyIndia";
import { ForeignDesk } from "@/components/ForeignDesk";
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
      <main className="relative">
        <Hero />
        <About />
        <Stats />
        <Services />
        <IndustryVerticalsSection />
        <AIMachineLearningSection preview />
        <ObjectivesSection />
        <CoreTeam />
        <GlobalPresence />
        <WhyIndia />
        <ForeignDesk />
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
