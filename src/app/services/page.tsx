"use client";

import { useEffect, useState } from "react";

const INITIAL_VISIBLE_MOBILE = 4;
const INITIAL_VISIBLE_DESKTOP = 6;
const DESKTOP_MQ = "(min-width: 1024px)";

function useInitialVisibleCount() {
  const [count, setCount] = useState(INITIAL_VISIBLE_MOBILE);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const update = () =>
      setCount(mq.matches ? INITIAL_VISIBLE_DESKTOP : INITIAL_VISIBLE_MOBILE);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return count;
}

const services = [
  { icon: "fa-handshake", title: "Trade Facilitation", desc: "End-to-end import/export coordination, regulatory navigation, and bilateral trade enablement.", tag: "Core" },
  { icon: "fa-ship", title: "Import Export Support", desc: "Documentation, customs, logistics partnerships, and shipping optimization for global trade.", tag: "Operations" },
  { icon: "fa-certificate", title: "Global Certification Program", desc: "Internationally recognized certifications for products, processes, and trade professionals.", tag: "Certification" },
  { icon: "fa-briefcase", title: "Global Placement Program", desc: "Career placement and talent mobility across IICCI's 10K+ member companies worldwide.", tag: "Careers" },
  { icon: "fa-microchip", title: "AI & ML Services", desc: "Trade intelligence, predictive analytics, and AI-powered market entry advisory services.", tag: "Tech" },
  { icon: "fa-people-arrows", title: "Business Matchmaking", desc: "Curated B2B introductions, joint venture facilitation, and strategic global partnerships.", tag: "Network" },
  { icon: "fa-handshake-angle", title: "Bilateral Trade Assistance", desc: "Government-grade support for cross-border trade missions and bilateral agreements.", tag: "Diplomacy" },
  { icon: "fa-chart-line", title: "Market Research", desc: "Sector-specific intelligence, market sizing, and competitive landscape for 50+ countries.", tag: "Intelligence" },
  { icon: "fa-link", title: "Joint Ventures", desc: "Structuring, partner identification, and execution of JVs and strategic alliances.", tag: "Strategy" },
  { icon: "fa-gavel", title: "Regulatory Guidance", desc: "Compliance, taxation, customs, and policy advisory for global operations.", tag: "Legal" },
  { icon: "fa-file-invoice-dollar", title: "Transaction Advisory", desc: "Deal advisory, due diligence, and transaction structuring for cross-border deals.", tag: "Finance" },
  { icon: "fa-building-shield", title: "M&A Support", desc: "Inbound and outbound mergers, acquisitions, and corporate restructuring services.", tag: "M&A" },
  { icon: "fa-graduation-cap", title: "Import Export Training", desc: "Industry-leading training programs for new and seasoned trade professionals.", tag: "Training" },
  { icon: "fa-helicopter", title: "Drone Training", desc: "DGCA-approved drone pilot training and commercial drone operations certification.", tag: "Skills" },
  { icon: "fa-tractor", title: "Farmer Support Services", desc: "Empowering Indian farmers with export markets, certifications, and global agri-trade.", tag: "Agri" },
];

export function Services() {
  const [expanded, setExpanded] = useState(false);
  const initialVisible = useInitialVisibleCount();
  const visible = expanded ? services : services.slice(0, initialVisible);
  const hasMore = services.length > initialVisible;

  return (
    <section id="services" className="relative section-padding overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">Our Services</span>
            </div>
            <h2 className="display-title font-display font-bold mb-4">
              <span className="text-navy-950">Enterprise-grade services for</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">global growth.</span>
            </h2>
            <p className="text-navy-950/70 text-base md:text-lg">
              From trade facilitation to AI-powered intelligence — 15+ premium services designed to scale Indian businesses globally.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-navy-950/5 border border-navy-950/10 text-navy-950 text-xs font-semibold hover:border-gold/40 transition self-start reveal-up"
          >
            Talk to an expert
            <i className="fas fa-arrow-right text-[10px] text-gold"></i>
          </a>
        </div>

        <div id="services-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {visible.map((s, i) => (
            <div
              key={s.title}
              className={`service-card group glass-light rounded-2xl p-6 lg:p-7 border border-navy-950/10 card-lift cursor-pointer reveal-up${expanded || i < initialVisible ? " in-view" : ""}`}
              data-service-index={i}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-navy-950 group-hover:border-gold transition-all duration-500">
                  <i className={`fas ${s.icon} text-base`}></i>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-navy-950/50 px-2 py-1 rounded-full border border-navy-950/10">
                  {s.tag}
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-navy-950 mb-2 group-hover:text-gold transition">{s.title}</h3>
              <p className="text-sm text-navy-950/70 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-950/50 group-hover:text-gold transition flex items-center gap-2">
                  Learn more
                  <i className="fas fa-arrow-right text-[10px] transition-all group-hover:translate-x-1"></i>
                </span>
                <i className="fas fa-up-right-from-square text-navy-950/40 group-hover:text-gold transition"></i>
              </div>
            </div>
          ))}
        </div>

        {hasMore && !expanded && (
          <div className="mt-10 lg:mt-12 flex justify-center reveal-up in-view">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-navy-950 text-white text-sm font-semibold border border-navy-950/10 hover:border-gold/40 hover:shadow-gold transition-all duration-300"
              aria-expanded={false}
              aria-controls="services-grid"
            >
              View all
              <i className="fas fa-arrow-right text-[10px] text-gold" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <Services />
    </main>
  );
}
