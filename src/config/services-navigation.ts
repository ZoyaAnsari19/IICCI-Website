export type ServicesNavItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const SERVICES_NAV: ReadonlyArray<ServicesNavItem> = [
  {
    slug: "our-services",
    title: "Our Services",
    description: "15+ enterprise services for global trade",
    icon: "fa-briefcase",
    href: "/services",
  },
  {
    slug: "industry-verticals",
    title: "Industry Verticals",
    description: "35+ high-potential trade sectors",
    icon: "fa-layer-group",
    href: "/services/industryVerticals",
  },
  {
    slug: "farmer-support",
    title: "Farmer Support",
    description: "Empowering farmers with global agri-trade",
    icon: "fa-tractor",
    href: "/services/farmerSupport",
  },
  {
    slug: "upcoming-projects",
    title: "Upcoming Projects",
    description: "Live trade & investment opportunities",
    icon: "fa-rocket",
    href: "/services/upcomingProjects",
  },
] as const;
