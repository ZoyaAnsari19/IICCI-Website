import Link from "next/link";
import { membershipFeeContactEmail, membershipTiers } from "@/config/membership";

export const MembershipSection = () => {
  return (
    <section
      id="membership"
      className="relative section-padding overflow-hidden bg-radial-navy"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-4 reveal-up">
            <i className="fas fa-crown text-gold text-xs" aria-hidden />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
              Membership
            </span>
          </div>
          <h2 className="display-title font-display font-bold mb-4 reveal-up">
            <span className="text-white">Membership categories</span>{" "}
            <span className="text-gradient-gold italic font-serif font-normal">
              &amp; benefits
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg reveal-up">
            Choose the tier that fits your trade ambitions. IICCI serves importers and exporters
            with platforms, partnerships, and global opportunities — with benefits tailored to each
            category.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {membershipTiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative rounded-3xl p-8 reveal-up ${
                tier.highlight
                  ? "bg-gradient-to-br from-navy-900 to-navy-950 border-2 border-gold shadow-gold"
                  : "glass-dark border border-white/10"
              } card-lift`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 rounded-full bg-gradient-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {tier.tag}
                  </div>
                </div>
              )}
              {!tier.highlight && (
                <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">
                  {tier.tag}
                </div>
              )}
              <h3 className="text-2xl font-display font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-white/60 mb-6">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={`shrink-0 mt-0.5 w-5 h-5 rounded-full ${
                        tier.highlight ? "bg-gold" : "bg-gold/15"
                      } flex items-center justify-center`}
                    >
                      <i
                        className={`fas fa-check text-[9px] ${
                          tier.highlight ? "text-navy-950" : "text-gold"
                        }`}
                        aria-hidden
                      />
                    </span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`mailto:${membershipFeeContactEmail}?subject=IICCI%20Membership%20Enquiry%20-%20${encodeURIComponent(tier.name)}`}
                className={`block w-full py-3.5 rounded-full text-center text-sm font-bold btn-premium ${
                  tier.highlight
                    ? "bg-gradient-gold text-navy-950 shadow-gold btn-shine"
                    : "glass border border-white/10 text-white hover:border-gold/40"
                }`}
              >
                Enquire About Membership
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/60 reveal-up">
          For membership fees, please contact{" "}
          <a
            href={`mailto:${membershipFeeContactEmail}?subject=IICCI%20Membership%20Fees`}
            className="text-gold hover:underline font-medium"
          >
            {membershipFeeContactEmail}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default MembershipSection;
