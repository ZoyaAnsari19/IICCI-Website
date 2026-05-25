export type MoreNavItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const MORE_NAV: ReadonlyArray<MoreNavItem> = [
  {
    slug: "csr-sdg",
    title: "CSR & SDG",
    description: "Sustainability & social impact",
    icon: "fa-leaf",
    href: "/more/csr-sdg",
  },
  {
    slug: "ai-innovation",
    title: "AI & Innovation",
    description: "Training & trade technology",
    icon: "fa-microchip",
    href: "/more/ai-innovation",
  },
  {
    slug: "women-wing",
    title: "Women Wing",
    description: "Women entrepreneurship",
    icon: "fa-venus",
    href: "/more/women-wing",
  },
  {
    slug: "trade-tools",
    title: "Trade Tools",
    description: "Live FX rates & import facts",
    icon: "fa-chart-line",
    href: "/trade-tools",
  },
  {
    slug: "resources",
    title: "Resources Center",
    description: "Downloads, guides & official documents",
    icon: "fa-folder-open",
    href: "/resources",
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Reach IICCI headquarters",
    icon: "fa-envelope",
    href: "/more/contact",
  },
] as const;
