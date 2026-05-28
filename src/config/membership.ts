import { delhiOffice } from "@/config/contact";

export const membershipFeeContactEmail = delhiOffice.emails[0].href;

export type MembershipTier = {
  name: string;
  tag: string;
  highlight: boolean;
  description: string;
  features: readonly string[];
};

export const membershipTiers: readonly MembershipTier[] = [
  {
    name: "Associate",
    tag: "Growing Businesses",
    highlight: false,
    description:
      "For importers, exporters, and trade enterprises building their international footprint.",
    features: [
      "Access to IICCI global network",
      "Member directory listing",
      "Monthly trade intelligence reports",
      "Event invitations",
      "Newsletter & policy updates",
      "Basic certification access",
      "Certificate of Origin guidance",
      "Community forum access",
    ],
  },
  {
    name: "Corporate",
    tag: "Most Popular",
    highlight: true,
    description:
      "For established importers and exporters scaling bilateral trade and B2B partnerships.",
    features: [
      "Everything in Associate, plus:",
      "Trade delegation participation",
      "Priority B2B matchmaking",
      "Dedicated relationship manager",
      "Free entry to flagship events",
      "Global certification programs",
      "Foreign desk consultation",
      "ECGC empanelment support",
      "Trade events & delegation access",
      "M&A advisory introductions",
    ],
  },
  {
    name: "Enterprise",
    tag: "For Global Leaders",
    highlight: false,
    description:
      "For multinational importers, exporters, and industry leaders driving strategic growth.",
    features: [
      "Everything in Corporate, plus:",
      "Bilateral government introductions",
      "Customized market entry programs",
      "White-glove advisory services",
      "Exclusive board access",
      "Co-branded global summits",
      "Unlimited foreign desk support",
      "Strategic JV facilitation",
    ],
  },
] as const;
