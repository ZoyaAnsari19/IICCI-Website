export type TeamTier = "leadership" | "management" | "operations";

export type TeamDepartment =
  | "Governance"
  | "Trade Facilitation"
  | "Membership"
  | "Operations"
  | "Research"
  | "Administration"
  | "International Coordination";

export type OperationalTeamMember = {
  id: string;
  name: string;
  designation: string;
  tier: TeamTier;
  department: TeamDepartment;
  bio: string;
  image?: string;
  initials?: string;
};

/** Shared IICCI operational team — homepage Core Team & leadership Our Team */
export const OPERATIONAL_TEAM: readonly OperationalTeamMember[] = [
  {
    id: "geeta-kumar",
    name: "Mrs. Geeta Kumar",
    designation: "Trustee",
    tier: "leadership",
    department: "Governance",
    initials: "GK",
    bio: "Provides institutional oversight, fiduciary stewardship, and governance guidance that uphold IICCI's mission and member trust.",
  },
  {
    id: "tk-pandey",
    name: "Mr. T.K. Pandey",
    designation: "Director",
    tier: "leadership",
    department: "Governance",
    image: "/images/tk-pandey.png",
    bio: "Leads organizational direction, bilateral engagement, and high-level partnerships that strengthen IICCI's international trade facilitation mandate.",
  },
  {
    id: "prem-kishore",
    name: "Mr. Prem Kishore",
    designation: "Manager (Accounts & Finance)",
    tier: "management",
    department: "Administration",
    image: "/images/prem-kishor.png",
    bio: "Oversees financial governance, member billing, compliance reporting, and fiscal planning that supports transparent chamber administration.",
  },
  {
    id: "manoj-bhargava",
    name: "Mr. Manoj Kumar Bhargava",
    designation: "Marketing Manager",
    tier: "management",
    department: "Membership",
    image: "/images/manoj-kumar-bhargava.png",
    bio: "Drives brand visibility, member outreach, campaign strategy, and market communications across domestic and international trade ecosystems.",
  },
  {
    id: "pradeep-kumar",
    name: "Mr. Pradeep Kumar",
    designation: "Executive (Office & Field work)",
    tier: "management",
    department: "Operations",
    image: "/images/pradeep-kumar.png",
    bio: "Coordinates on-ground operations, delegation logistics, and member-facing field activities that keep IICCI programs running seamlessly.",
  },
  {
    id: "anand",
    name: "Mr. Anand",
    designation: "Peon",
    tier: "operations",
    department: "Administration",
    initials: "AN",
    bio: "Supports daily office operations, front-desk assistance, and field coordination to ensure a smooth experience for members and visitors.",
  },
] as const;

export const OPERATIONAL_TEAM_GOVERNANCE_NOTE =
  "Team members may also be designated Vice President, Director, or other governance roles per IICCI council resolutions, in addition to their operational titles listed above.";

export const OPERATIONAL_TEAM_DEPARTMENTS: readonly TeamDepartment[] = [
  "Governance",
  "Trade Facilitation",
  "Membership",
  "Operations",
  "Research",
  "Administration",
  "International Coordination",
];
