import { LeadershipHero } from "@/components/LeadershipHero";
import { President } from "./President";
import { OrganizationalStructureSection } from "./OrganizationalStructureSection";
import { HonoraryDirectorsSection } from "./HonoraryDirectorsSection";
import { OurTeamSection } from "./OurTeamSection";
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
      {/* <MentorsForewordSection /> */}
      <OrganizationalStructureSection />
      <HonoraryDirectorsSection />
      <OurTeamSection />
    </>
  );
}
