export type VerticalCategory =
  | "manufacturing"
  | "technology"
  | "energy"
  | "agriculture"
  | "healthcare"
  | "infrastructure"
  | "services";

export type TradeVertical = {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat: string;
  category: VerticalCategory;
  featured?: boolean;
};

export const VERTICAL_CATEGORIES: ReadonlyArray<{
  id: VerticalCategory | "all";
  label: string;
}> = [
  { id: "all", label: "All Sectors" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "technology", label: "Technology" },
  { id: "energy", label: "Energy & Environment" },
  { id: "agriculture", label: "Agriculture & Food" },
  { id: "healthcare", label: "Healthcare & Pharma" },
  { id: "infrastructure", label: "Infrastructure & Logistics" },
  { id: "services", label: "Services & Finance" },
] as const;

export const TRADE_VERTICALS: ReadonlyArray<TradeVertical> = [
  {
    id: "agriculture-food",
    title: "Agriculture & Food Processing",
    description:
      "Farm-to-fork export corridors, agri-tech partnerships, and global food safety certifications.",
    icon: "fa-wheat-awn",
    stat: "$32B+ trade",
    category: "agriculture",
    featured: true,
  },
  {
    id: "electronics-tech",
    title: "Electronics & Technology",
    description:
      "Semiconductor sourcing, consumer electronics, and component supply chains across 50+ markets.",
    icon: "fa-microchip",
    stat: "$87B+ imports",
    category: "technology",
    featured: true,
  },
  {
    id: "defence-aerospace",
    title: "Defence & Aerospace",
    description:
      "Strategic procurement, offset partnerships, and dual-use technology transfer frameworks.",
    icon: "fa-jet-fighter",
    stat: "12% YoY growth",
    category: "manufacturing",
    featured: true,
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    description:
      "Solar, wind, and green hydrogen ecosystems with ESG-aligned bilateral trade programs.",
    icon: "fa-solar-panel",
    stat: "500 GW target",
    category: "energy",
    featured: true,
  },
  {
    id: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "AI infrastructure, enterprise automation, and cross-border data governance advisory.",
    icon: "fa-brain",
    stat: "40+ AI hubs",
    category: "technology",
    featured: true,
  },
  {
    id: "ev-manufacturing",
    title: "EV Manufacturing",
    description:
      "Battery cells, charging infrastructure, and electric mobility supply chain enablement.",
    icon: "fa-car-battery",
    stat: "30% EV adoption",
    category: "manufacturing",
    featured: true,
  },
  {
    id: "logistics-warehousing",
    title: "Logistics & Warehousing",
    description:
      "Multimodal freight, cold-chain logistics, and bonded warehouse facilitation.",
    icon: "fa-warehouse",
    stat: "200+ ports",
    category: "infrastructure",
    featured: true,
  },
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    description:
      "API sourcing, finished formulations, and WHO-GMP certified global distribution.",
    icon: "fa-pills",
    stat: "$24B+ market",
    category: "healthcare",
    featured: true,
  },
  {
    id: "textiles-apparel",
    title: "Textiles & Apparel",
    description:
      "Fabric sourcing, garment exports, and sustainable fashion supply chain integration.",
    icon: "fa-shirt",
    stat: "$18B+ exports",
    category: "manufacturing",
  },
  {
    id: "automotive-components",
    title: "Automotive Components",
    description:
      "Precision parts, OEM partnerships, and tier-1 supplier matchmaking globally.",
    icon: "fa-gears",
    stat: "4th largest auto",
    category: "manufacturing",
  },
  {
    id: "chemicals-petrochemicals",
    title: "Chemicals & Petrochemicals",
    description:
      "Specialty chemicals, polymers, and refinery-grade feedstock import facilitation.",
    icon: "fa-flask",
    stat: "$190B+ sector",
    category: "manufacturing",
  },
  {
    id: "medical-devices",
    title: "Medical Devices",
    description:
      "Diagnostic equipment, surgical instruments, and regulatory clearance support.",
    icon: "fa-stethoscope",
    stat: "15% CAGR",
    category: "healthcare",
  },
  {
    id: "gems-jewellery",
    title: "Gems & Jewellery",
    description:
      "Diamond sourcing, hallmarking standards, and luxury retail export corridors.",
    icon: "fa-gem",
    stat: "$65B+ imports",
    category: "manufacturing",
  },
  {
    id: "machinery-industrial",
    title: "Machinery & Industrial Equipment",
    description:
      "Heavy machinery, CNC systems, and industrial automation for Make in India.",
    icon: "fa-industry",
    stat: "$72B+ demand",
    category: "manufacturing",
  },
  {
    id: "steel-metals",
    title: "Steel & Metals",
    description:
      "Alloy sourcing, ferrous and non-ferrous metals for infrastructure and manufacturing.",
    icon: "fa-hammer",
    stat: "2nd largest producer",
    category: "manufacturing",
  },
  {
    id: "plastics-polymers",
    title: "Plastics & Polymers",
    description:
      "Resin imports, packaging materials, and circular economy partnerships.",
    icon: "fa-recycle",
    stat: "8% annual growth",
    category: "manufacturing",
  },
  {
    id: "paper-packaging",
    title: "Paper & Packaging",
    description:
      "Sustainable packaging, pulp imports, and e-commerce fulfilment materials.",
    icon: "fa-box-open",
    stat: "$12B+ market",
    category: "manufacturing",
  },
  {
    id: "leather-footwear",
    title: "Leather & Footwear",
    description:
      "Premium leather sourcing, footwear exports, and artisan craft corridors.",
    icon: "fa-shoe-prints",
    stat: "2nd largest producer",
    category: "manufacturing",
  },
  {
    id: "ceramics-glass",
    title: "Ceramics & Glass",
    description:
      "Construction ceramics, specialty glass, and architectural material imports.",
    icon: "fa-mug-hot",
    stat: "$4B+ imports",
    category: "manufacturing",
  },
  {
    id: "furniture-home",
    title: "Furniture & Home Décor",
    description:
      "Design-led sourcing, modular furniture, and global retail partnerships.",
    icon: "fa-couch",
    stat: "12% CAGR",
    category: "manufacturing",
  },
  {
    id: "marine-shipbuilding",
    title: "Marine & Shipbuilding",
    description:
      "Vessel components, maritime equipment, and port infrastructure supplies.",
    icon: "fa-ship",
    stat: "Sagarmala aligned",
    category: "infrastructure",
  },
  {
    id: "mining-minerals",
    title: "Mining & Minerals",
    description:
      "Critical minerals, rare earth elements, and resource security partnerships.",
    icon: "fa-mountain",
    stat: "Critical minerals",
    category: "infrastructure",
  },
  {
    id: "construction-infra",
    title: "Construction & Infrastructure",
    description:
      "Smart cities, metro systems, and large-scale infrastructure procurement.",
    icon: "fa-building",
    stat: "$1.4T pipeline",
    category: "infrastructure",
  },
  {
    id: "biotechnology",
    title: "Biotechnology",
    description:
      "Bio-pharma R&D, genomics partnerships, and life sciences innovation hubs.",
    icon: "fa-dna",
    stat: "Top 12 globally",
    category: "healthcare",
  },
  {
    id: "nanotechnology",
    title: "Nanotechnology",
    description:
      "Advanced materials, nano-coatings, and precision manufacturing applications.",
    icon: "fa-atom",
    stat: "Emerging sector",
    category: "technology",
  },
  {
    id: "space-technology",
    title: "Space Technology",
    description:
      "Satellite components, launch services, and ISRO-aligned commercial partnerships.",
    icon: "fa-satellite",
    stat: "Space economy",
    category: "technology",
  },
  {
    id: "telecommunications",
    title: "Telecommunications",
    description:
      "5G infrastructure, network equipment, and digital connectivity ecosystems.",
    icon: "fa-tower-cell",
    stat: "1.2B+ subscribers",
    category: "technology",
  },
  {
    id: "fintech-banking",
    title: "FinTech & Banking",
    description:
      "Cross-border payments, trade finance, and digital banking partnerships.",
    icon: "fa-building-columns",
    stat: "3rd largest FinTech",
    category: "services",
  },
  {
    id: "insurance-reinsurance",
    title: "Insurance & Reinsurance",
    description:
      "Marine cargo insurance, trade credit, and risk mitigation frameworks.",
    icon: "fa-shield-halved",
    stat: "Global coverage",
    category: "services",
  },
  {
    id: "real-estate-proptech",
    title: "Real Estate & PropTech",
    description:
      "Commercial real estate, smart buildings, and property technology solutions.",
    icon: "fa-city",
    stat: "$200B+ market",
    category: "services",
  },
  {
    id: "hospitality-tourism",
    title: "Hospitality & Tourism",
    description:
      "Luxury hospitality, MICE tourism, and experiential travel partnerships.",
    icon: "fa-hotel",
    stat: "10M+ arrivals",
    category: "services",
  },
  {
    id: "education-edtech",
    title: "Education & EdTech",
    description:
      "Global curriculum partnerships, vocational training, and digital learning platforms.",
    icon: "fa-graduation-cap",
    stat: "250M+ learners",
    category: "services",
  },
  {
    id: "media-entertainment",
    title: "Media & Entertainment",
    description:
      "Content licensing, OTT partnerships, and creative industry exports.",
    icon: "fa-film",
    stat: "$30B+ industry",
    category: "services",
  },
  {
    id: "water-sanitation",
    title: "Water & Sanitation",
    description:
      "Water treatment technology, desalination, and smart utility infrastructure.",
    icon: "fa-droplet",
    stat: "Jal Jeevan aligned",
    category: "energy",
  },
  {
    id: "waste-recycling",
    title: "Waste Management & Recycling",
    description:
      "Circular economy solutions, e-waste processing, and sustainability compliance.",
    icon: "fa-trash-can",
    stat: "ESG priority",
    category: "energy",
  },
  {
    id: "organic-natural",
    title: "Organic & Natural Products",
    description:
      "Certified organic exports, ayurveda, and wellness product global distribution.",
    icon: "fa-leaf",
    stat: "$2B+ exports",
    category: "agriculture",
  },
  {
    id: "spices-condiments",
    title: "Spices & Condiments",
    description:
      "Premium spice sourcing, FSSAI compliance, and gourmet export channels.",
    icon: "fa-pepper-hot",
    stat: "World's largest",
    category: "agriculture",
  },
  {
    id: "dairy-livestock",
    title: "Dairy & Livestock",
    description:
      "Dairy equipment, genetics, and livestock product trade facilitation.",
    icon: "fa-cow",
    stat: "1st in milk",
    category: "agriculture",
  },
  {
    id: "fisheries-aquaculture",
    title: "Fisheries & Aquaculture",
    description:
      "Marine exports, aquaculture technology, and blue economy partnerships.",
    icon: "fa-fish",
    stat: "Blue economy",
    category: "agriculture",
  },
  {
    id: "floriculture-horticulture",
    title: "Floriculture & Horticulture",
    description:
      "Cut flowers, nursery products, and precision horticulture exports.",
    icon: "fa-seedling",
    stat: "Premium exports",
    category: "agriculture",
  },
  {
    id: "sports-goods",
    title: "Sports Goods",
    description:
      "Athletic equipment manufacturing, sports tech, and global brand partnerships.",
    icon: "fa-futbol",
    stat: "Export hub",
    category: "manufacturing",
  },
  {
    id: "handicrafts-artisan",
    title: "Handicrafts & Artisan Goods",
    description:
      "Heritage crafts, GI-tagged products, and luxury artisan export programs.",
    icon: "fa-palette",
    stat: "GI tagged",
    category: "manufacturing",
  },
  {
    id: "toys-games",
    title: "Toys & Games",
    description:
      "Toy manufacturing clusters, safety certifications, and global retail sourcing.",
    icon: "fa-puzzle-piece",
    stat: "PLI supported",
    category: "manufacturing",
  },
] as const;

export const FEATURED_VERTICALS = TRADE_VERTICALS.filter((v) => v.featured);

export const TOTAL_VERTICAL_COUNT = TRADE_VERTICALS.length;
