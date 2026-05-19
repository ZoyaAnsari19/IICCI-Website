import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { President } from "@/components/President";
import { Manifesto } from "@/components/Manifesto";
import { GlobalPresence } from "@/components/GlobalPresence";
import { Services } from "@/components/Services";
import { WhyIndia } from "@/components/WhyIndia";
import { ForeignDesk } from "@/components/ForeignDesk";
import { CSR } from "@/components/CSR";
import { Women } from "@/components/Women";
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
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <President />
        <Manifesto />
        <GlobalPresence />
        <Services />
        <WhyIndia />
        <ForeignDesk />
        <CSR />
        <Women />
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
