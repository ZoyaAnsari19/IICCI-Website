export const ForeignDesk = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-navy"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-royal/10 blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
            <i className="fas fa-flag-checkered text-gold text-xs"></i>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Foreign Company Desk</span>
          </div>
          <h2 className="display-title font-display font-bold mb-4 reveal-up">
            <span className="text-white">Entering India?</span>{' '}
            <span className="text-gradient-gold italic font-serif font-normal">We make it seamless.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg reveal-up">
            A dedicated white-glove consulting desk for foreign companies, investors, and trade partners launching operations in India.
          </p>
        </div>

        {/* Process roadmap */}
        <div className="relative mb-16">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
          <div className="grid lg:grid-cols-6 gap-6">
            {[
              { step: '01', icon: 'fa-magnifying-glass-chart', title: 'Market Research', desc: 'Sector intel, sizing, competitive landscape' },
              { step: '02', icon: 'fa-route', title: 'Entry Strategy', desc: 'GTM playbook, structure, legal entity' },
              { step: '03', icon: 'fa-users-line', title: 'Distributor ID', desc: 'Vetted partners across all metros' },
              { step: '04', icon: 'fa-handshake', title: 'JV Partnerships', desc: 'Strategic alliances & co-investments' },
              { step: '05', icon: 'fa-gavel', title: 'Compliance & Tax', desc: 'RBI, FEMA, GST, regulatory clearance' },
              { step: '06', icon: 'fa-rocket', title: 'Launch & Scale', desc: 'Go-live support, scale advisory' },
            ].map((s) => (
              <div key={s.step} className="relative reveal-up">
                <div className="glass-dark rounded-2xl p-5 border border-white/10 card-lift">
                  <div className="relative w-16 h-16 rounded-2xl bg-navy-900 border border-gold/30 flex items-center justify-center mx-auto mb-4 group">
                    <i className={`fas ${s.icon} text-gold text-lg`}></i>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-navy-950 text-[10px] font-bold flex items-center justify-center">{s.step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm text-center mb-2">{s.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed text-center">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Big CTA */}
          <div className="lg:col-span-2 relative rounded-3xl p-8 lg:p-12 overflow-hidden bg-gradient-to-br from-royal-dark to-navy-950 border border-white/10 reveal-up">
            <div className="absolute inset-0 bg-grid opacity-10"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold/15 blur-3xl"></div>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                Backed by India's most trusted trade chamber.
              </h3>
              <p className="text-white/70 mb-8 max-w-xl">
                Our Foreign Company Desk has helped 200+ international businesses successfully enter India — from Fortune 500 corporations to emerging market leaders.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { v: '200+', l: 'Companies Served' },
                  { v: '35+', l: 'Countries of Origin' },
                  { v: '92%', l: 'Success Rate' },
                ].map((m) => (
                  <div key={m.l}>
                    <div className="text-3xl font-display font-bold text-gold">{m.v}</div>
                    <div className="text-xs text-white/60 mt-1">{m.l}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide btn-premium shadow-gold">
                Schedule a Consultation
                <i className="fas fa-arrow-right text-xs"></i>
              </a>
            </div>
          </div>

          {/* Services list */}
          <div className="glass-dark rounded-3xl p-8 border border-white/10 reveal-up">
            <h4 className="text-white font-display font-bold text-xl mb-6">Advisory Services</h4>
            <ul className="space-y-3">
              {[
                'India Entry Strategy',
                'Distributor Identification',
                'JV & Partnership Structuring',
                'Compliance & Taxation',
                'Sector Market Research',
                'Legal & Regulatory',
                'HR & Talent Strategy',
                'Operations Setup',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 group cursor-pointer">
                  <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center group-hover:bg-gold transition">
                    <i className="fas fa-check text-[9px] text-gold group-hover:text-navy-950 transition"></i>
                  </span>
                  <span className="text-sm text-white/80 group-hover:text-white transition">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
