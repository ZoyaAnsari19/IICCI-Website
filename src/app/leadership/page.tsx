import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Floats } from "@/components/Floats";
import { LeadershipHero } from "@/components/LeadershipHero";
import { President } from "@/components/President";
import { MentorsForewordSection } from "@/components/MentorsForewordSection";
import { MissionVisionSection } from "@/components/MissionVisionSection";
import { OrganizationalStructureSection } from "@/components/OrganizationalStructureSection";
import { HonoraryDirectorsSection } from "@/components/HonoraryDirectorsSection";
import { OurTeamSection } from "@/components/OurTeamSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | IICCI — Indian Importers Chambers of Commerce & Industry",
  description:
    "Explore IICCI leadership — President's foreword, mentors, organizational structure, honorary directors, and the operational team behind global trade facilitation.",
};

export default function LeadershipPage() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <LeadershipHero />
        <President />
        <MentorsForewordSection />
        <MissionVisionSection />
        <OrganizationalStructureSection />
        <HonoraryDirectorsSection />
        <OurTeamSection />
      </main>
      <Footer />
      <Floats />
    </>
  );
}
