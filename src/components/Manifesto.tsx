export const Manifesto = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-royal-dark to-navy-950"></div>
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/15 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-royal/20 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6 reveal-up">
            <i className="fas fa-flag text-gold text-xs"></i>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">The IICCI Manifesto</span>
          </div>

          <h2 className="font-display font-bold mb-6 reveal-up leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}>
            <span className="text-white">Creating</span>
            <br />
            <span className="text-gradient-gold italic font-serif font-normal">1 Lakh Billionaires.</span>
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed reveal-up">
            A bold national mission to nurture <span className="text-gold font-semibold">100,000 Indian billion-rupee businesses</span> by 2047 — through capital, capability, and global market access.
          </p>
        </div>

        {/* Interactive pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            { num: '01', icon: 'fa-rocket', title: 'Ignite', desc: 'Identify high-potential MSMEs and provide elite mentorship from global business leaders.' },
            { num: '02', icon: 'fa-globe-asia', title: 'Globalize', desc: 'Open international markets via our 50+ chapters and bilateral trade corridors.' },
            { num: '03', icon: 'fa-coins', title: 'Capitalize', desc: 'Bridge access to global capital, FDI, sovereign wealth and venture funds.' },
            { num: '04', icon: 'fa-crown', title: 'Scale', desc: 'Build the operating infrastructure for businesses to cross the billion-rupee milestone.' },
          ].map((p) => (
            <div key={p.title} className="group relative glass-dark rounded-2xl p-7 border border-white/10 card-lift overflow-hidden reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/10 group-hover:to-transparent transition-all duration-700"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-950 transition">
                    <i className={`fas ${p.icon} text-lg`}></i>
                  </div>
                  <span className="text-5xl font-display font-bold text-white/5 group-hover:text-gold/20 transition">{p.num}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Big call to action */}
        <div className="relative max-w-5xl mx-auto reveal-up">
          <div className="relative rounded-3xl p-10 md:p-14 border border-gold/20 overflow-hidden bg-gradient-to-br from-navy-900/80 to-navy-950/80 backdrop-blur-xl shadow-premium">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-royal/20 blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">Join the Movement</div>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-3">
                  Be one of the <span className="text-gradient-gold">100,000.</span>
                </h3>
                <p className="text-white/60 max-w-xl">
                  Become a member of IICCI and gain access to the platforms, capital, and connections that turn ambitious businesses into global powerhouses.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a href="#membership" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide btn-premium btn-shine shadow-gold whitespace-nowrap">
                  Begin Your Journey
                  <i className="fas fa-arrow-right text-xs"></i>
                </a>
                <a href="#manifesto" className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white/70 hover:text-gold text-sm font-medium transition">
                  Read full manifesto <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
