import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const tiers = [
  {
    name: "Associate",
    price: "21,000",
    original: "35,000",
    duration: "/ year",
    highlight: false,
    tag: "Limited Time Offer",
    features: [
      "Access to IICCI global network",
      "Member directory listing",
      "Monthly trade intelligence reports",
      "Event invitations (paid)",
      "Newsletter & policy updates",
      "Basic certification access",
      "Community forum access",
    ],
  },
  {
    name: "Corporate",
    price: "1,21,000",
    original: "1,75,000",
    duration: "/ year",
    highlight: true,
    tag: "Most Popular",
    features: [
      "Everything in Associate, plus:",
      "Trade delegation participation",
      "Priority B2B matchmaking",
      "Dedicated relationship manager",
      "Free entry to flagship events",
      "Global certification programs",
      "Foreign desk consultation (4 hrs)",
      "M&A advisory introductions",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    original: "",
    duration: "pricing",
    highlight: false,
    tag: "For Global Leaders",
    features: [
      "Everything in Corporate, plus:",
      "Bilateral govt. introductions",
      "Customized market entry programs",
      "White-glove advisory services",
      "Exclusive board access",
      "Co-branded global summits",
      "Unlimited foreign desk support",
      "Strategic JV facilitation",
    ],
  },
];

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
      <section
        id="membership"
        className="relative page-nav-offset mt-6 sm:mt-8 section-padding overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-navy" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/10 blur-3xl rounded-full" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 mb-4 reveal-up">
              <i className="fas fa-crown text-gold text-xs" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                Membership
              </span>
            </div>
            <h2 className="display-title font-display font-bold mb-4 reveal-up">
              <span className="text-white">Join the</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                global elite
              </span>{" "}
              <span className="text-white">of Indian trade.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg reveal-up">
              Choose a membership tier and unlock the platforms, partnerships, and opportunities that
              have helped 10,000+ businesses scale internationally.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12 reveal-up">
            <div className="relative rounded-2xl bg-gradient-to-r from-gold via-gold-300 to-gold p-[1.5px] shadow-gold">
              <div className="rounded-2xl bg-navy-950 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold">
                    <i className="fas fa-clock text-sm" />
                  </div>
                  <div>
                    <div className="text-white font-display font-bold text-sm">
                      Limited Time: Associate Membership at ₹21,000
                    </div>
                    <div className="text-xs text-white/60">
                      Save 40% — Offer ends Dec 31, 2025
                    </div>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-navy-950 text-xs font-bold btn-premium"
                >
                  Claim Offer <i className="fas fa-arrow-right text-[10px]" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl p-8 reveal-up ${
                  t.highlight
                    ? "bg-gradient-to-br from-navy-900 to-navy-950 border-2 border-gold shadow-gold"
                    : "glass-dark border border-white/10"
                } card-lift`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full bg-gradient-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                      {t.tag}
                    </div>
                  </div>
                )}
                {!t.highlight && t.tag && (
                  <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-3">
                    {t.tag}
                  </div>
                )}
                <h3 className="text-2xl font-display font-bold text-white mb-2">{t.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl text-gold">₹</span>
                  <span className="text-5xl font-display font-bold text-white">{t.price}</span>
                  <span className="text-sm text-white/50">{t.duration}</span>
                </div>
                {t.original && (
                  <div className="text-sm text-white/40 line-through mb-4">₹{t.original}</div>
                )}
                <p className="text-sm text-white/60 mb-6 mt-4">
                  Renewable annually • All-inclusive
                </p>

                <ul className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`shrink-0 mt-0.5 w-5 h-5 rounded-full ${
                          t.highlight ? "bg-gold" : "bg-gold/15"
                        } flex items-center justify-center`}
                      >
                        <i
                          className={`fas fa-check text-[9px] ${
                            t.highlight ? "text-navy-950" : "text-gold"
                          }`}
                        />
                      </span>
                      <span className="text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`block w-full py-3.5 rounded-full text-center text-sm font-bold btn-premium ${
                    t.highlight
                      ? "bg-gradient-gold text-navy-950 shadow-gold btn-shine"
                      : "glass border border-white/10 text-white hover:border-gold/40"
                  }`}
                >
                  {t.price === "Custom" ? "Contact Sales" : "Become a Member"}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center flex-wrap gap-x-8 gap-y-3 text-xs text-white/50 reveal-up">
            <span className="flex items-center gap-2">
              <i className="fas fa-shield-halved text-gold" />
              Secure Payments
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-rotate-left text-gold" />
              30-day Money Back
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-headset text-gold" />
              24/7 Member Support
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-certificate text-gold" />
              Govt. Recognized Body
            </span>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}