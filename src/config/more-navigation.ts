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
    slug: "contact",
    title: "Contact",
    description: "Reach IICCI headquarters",
    icon: "fa-envelope",
    href: "/more/contact",
  },
] as const;
