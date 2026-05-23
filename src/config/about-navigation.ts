export type AboutNavItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const ABOUT_NAV: ReadonlyArray<AboutNavItem> = [
  {
    slug: "about",
    title: "About IICCI",
    description: "Our story, legacy & impact",
    icon: "fa-building-columns",
    href: "/about",
  },
  {
    slug: "mission-vision",
    title: "Mission & Vision",
    description: "Driving global trade forward",
    icon: "fa-bullseye",
    href: "/about/mission-vision",
  },
  {
    slug: "leadership",
    title: "Leadership",
    description: "Board & advisory council",
    icon: "fa-user-tie",
    href: "/about/leadership",
  },
  {
    slug: "recognition",
    title: "Recognition",
    description: "Awards & certifications",
    icon: "fa-medal",
    href: "/about/recognition",
  },
  {
    slug: "partnerships",
    title: "Partnerships",
    description: "Strategic global alliances",
    icon: "fa-handshake",
    href: "/about/partnerships",
  },
  {
    slug: "manifesto",
    title: "Manifesto",
    description: "1 Lakh Billionaires Vision",
    icon: "fa-flag",
    href: "/about/manifesto",
  },
] as const;
