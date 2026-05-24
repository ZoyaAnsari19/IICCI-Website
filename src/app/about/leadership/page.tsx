import { LeadershipHero } from "@/components/LeadershipHero";
import { President } from "@/components/President";
import { MentorsForewordSection } from "@/components/MentorsForewordSection";
import { OrganizationalStructureSection } from "@/components/OrganizationalStructureSection";
import { HonoraryDirectorsSection } from "@/components/HonoraryDirectorsSection";
import { OurTeamSection } from "@/components/OurTeamSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | IICCI",
  description:
    "Meet IICCI leadership — President, mentors, organizational structure, honorary directors, and the operational team behind global trade facilitation.",
};

export default function LeadershipPage() {
  return (
    <>
      <LeadershipHero />
      <President />
      <MentorsForewordSection />
      <OrganizationalStructureSection />
      <HonoraryDirectorsSection />
      <OurTeamSection />
    </>
  );
}
