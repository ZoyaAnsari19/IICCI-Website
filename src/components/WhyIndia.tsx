export const WhyIndia = () => {
  return (
    <section id="verticals" className="relative section-padding overflow-hidden bg-radial-navy">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40 pointer-events-none" />
      <div className="aurora opacity-80" />
      <div className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-royal/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-semibold">Why India</span>
            </div>
            <h2 className="display-title font-display font-bold mb-6 reveal-up">
              <span className="text-white">The world&apos;s </span>
              <span className="text-gradient-gold italic font-serif font-normal">fastest growing</span>
              <span className="text-white"> major economy.</span>
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed reveal-up max-w-2xl">
              With a $3.7 trillion economy, 1.45 billion people, and the world&apos;s largest demographic dividend, India is uniquely positioned to become the global trade epicenter of the 21st century.
            </p>
          </div>
          <div className="lg:col-span-5 reveal-up">
            <div className="glass-dark rounded-2xl p-6 shadow-premium border border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                <i className="fas fa-chart-line text-gold" />
                <span className="uppercase tracking-wider font-semibold">GDP Growth Projection</span>
              </div>
              <div className="flex items-end gap-4 mb-4">
                <div>
                  <div className="text-5xl font-display font-bold text-white">
                    7.8<span className="text-2xl text-gold">%</span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">FY 2024-25 (RBI Est.)</div>
                </div>
                <div className="flex-1 ml-auto">
                  <svg viewBox="0 0 100 40" className="w-full" aria-hidden>
                    <defs>
                      <linearGradient id="growth-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 35 L 15 32 L 30 28 L 45 20 L 60 18 L 75 12 L 100 5 L 100 40 L 0 40 Z"
                      fill="url(#growth-grad)"
                    />
                    <path
                      d="M 0 35 L 15 32 L 30 28 L 45 20 L 60 18 L 75 12 L 100 5"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="100" cy="5" r="2" fill="#d4af37" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { value: '$3.7T', label: 'GDP Size', icon: 'fa-coins' },
            { value: '#3', label: 'Global PPP Rank', icon: 'fa-ranking-star' },
            { value: '63%', label: 'Working Age Pop.', icon: 'fa-users' },
            { value: '$83B', label: 'FDI 2024', icon: 'fa-arrow-trend-up' },
          ].map((m) => (
            <div
              key={m.label}
              className="glass-dark rounded-2xl p-6 border border-white/10 card-lift reveal-up"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">
                <i className={`fas ${m.icon} text-sm`} aria-hidden />
              </div>
              <div className="text-3xl font-display font-bold text-white">{m.value}</div>
              <div className="text-sm text-white/60 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Sectors split */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden border border-white/10 reveal-up">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3 font-semibold">
                Highest Import Demand
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Sectors driving India&apos;s import boom
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Electronics & Semiconductors', val: '$87B' },
                  { name: 'Machinery & Industrial Equipment', val: '$72B' },
                  { name: 'Petrochemicals & Energy', val: '$190B' },
                  { name: 'Precious Metals & Stones', val: '$65B' },
                  { name: 'Medical Devices & Pharma APIs', val: '$24B' },
                  { name: 'Agri & Food Processing', val: '$32B' },
                ].map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between py-3 border-b border-white/10 group"
                  >
                    <span className="text-white/90 text-sm group-hover:text-gold transition">{s.name}</span>
                    <span className="text-gold font-bold text-sm">{s.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass-dark rounded-3xl p-8 lg:p-10 border border-white/10 reveal-up">
            <div className="text-[10px] uppercase tracking-[0.25em] text-gold mb-3 font-semibold">
              State Opportunities
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">Top trade states</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { state: 'Maharashtra', share: '21%', focus: 'Mumbai Port, Finance' },
                { state: 'Gujarat', share: '19%', focus: 'Mundra, Petrochem' },
                { state: 'Tamil Nadu', share: '12%', focus: 'Chennai, Auto' },
                { state: 'Karnataka', share: '11%', focus: 'Tech, Aerospace' },
                { state: 'Delhi NCR', share: '9%', focus: 'Services, Trade' },
                { state: 'Haryana', share: '7%', focus: 'Manufacturing' },
              ].map((s) => (
                <div
                  key={s.state}
                  className="rounded-xl p-4 border border-white/10 hover:border-gold/40 hover:bg-white/5 transition group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{s.state}</span>
                    <span className="text-xs text-gold font-bold">{s.share}</span>
                  </div>
                  <div className="text-[11px] text-white/55">{s.focus}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FDI / EODB bar */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 reveal-up">
          {[
            {
              icon: 'fa-shield-halved',
              title: 'Ease of Doing Business',
              desc: 'Top 50 globally, 100+ position improvement since 2014',
            },
            {
              icon: 'fa-industry',
              title: 'Manufacturing Hub',
              desc: 'PLI schemes, $500B+ manufacturing target by 2030',
            },
            {
              icon: 'fa-rocket',
              title: 'Startup Ecosystem',
              desc: '3rd largest globally, 100+ unicorns and rising',
            },
          ].map((c) => (
            <div key={c.title} className="glass-dark rounded-2xl p-6 border border-white/10 card-lift">
              <i className={`fas ${c.icon} text-gold text-xl mb-3`} aria-hidden />
              <div className="font-display font-bold text-white mb-2">{c.title}</div>
              <div className="text-sm text-white/60">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
