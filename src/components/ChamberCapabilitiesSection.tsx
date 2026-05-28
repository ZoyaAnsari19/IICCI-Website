import Link from "next/link";
import { chamberCapabilities } from "@/config/chamber-capabilities";

export const ChamberCapabilitiesSection = () => {
  return (
    <section
      id="chamber-capabilities"
      aria-labelledby="chamber-capabilities-heading"
      className="relative section-padding overflow-hidden bg-white border-y border-navy-950/10"
    >
      <div className="absolute inset-0 bg-grid-light bg-grid-fade opacity-40 pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14 reveal-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4">
            <i className="fas fa-award text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70 font-semibold">
              Chamber Credentials
            </span>
          </div>
          <h2
            id="chamber-capabilities-heading"
            className="display-title font-display font-bold mb-4"
          >
            <span className="text-navy-950">Trusted services for</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              global trade
            </span>
          </h2>
          <p className="text-navy-950/60 text-base md:text-lg leading-relaxed">
            IICCI supports importers and exporters with institutional empanelments, official
            documentation, and high-impact trade events.
          </p>
        </div>

        <ul className="grid md:grid-cols-3 gap-5 lg:gap-6 list-none p-0 m-0">
          {chamberCapabilities.map((item) => (
            <li key={item.id} className="min-w-0 reveal-up">
              <article className="h-full flex flex-col rounded-3xl p-7 lg:p-8 glass-light border border-navy-950/10 card-lift shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <i className={`fas ${item.icon} text-lg`} aria-hidden />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20 whitespace-nowrap">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-950 mb-3">{item.title}</h3>
                <p className="text-sm text-navy-950/65 leading-relaxed flex-1">{item.description}</p>

                {item.href && item.cta ? (
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-950 hover:text-gold transition group"
                  >
                    {item.cta}
                    <i
                      className="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"
                      aria-hidden
                    />
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChamberCapabilitiesSection;
