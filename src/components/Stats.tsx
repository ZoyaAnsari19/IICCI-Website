export const Stats = () => {
  const stats = [
    { value: 47, suffix: '+', label: 'Years of Legacy', icon: 'fa-landmark', desc: 'Since 1978' },
    { value: 50000, suffix: '+', label: 'Registered Businesses', icon: 'fa-users', desc: 'Active Members' },
    { value: 50, suffix: '+', label: 'Countries Connected', icon: 'fa-globe', desc: 'Global Reach' },
    { value: 500, suffix: '+', label: 'Trade Delegations', icon: 'fa-handshake', desc: 'Hosted & Led' },
    { value: 1000, suffix: '+', label: 'Business Matchmakings', icon: 'fa-people-arrows', desc: 'Successful Deals' },
  ]

  return (
    <section
      id="stats"
      className="relative section-padding overflow-hidden bg-white border-y border-navy-950/10"
    >
      <div className="absolute inset-0 bg-grid-light bg-grid-fade opacity-40 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 max-w-3xl mx-auto reveal-up px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">By the Numbers</span>
          </div>
          <h2 className="display-title font-display font-bold mb-4">
            <span className="text-navy-950">Empowering global trade</span>{' '}
            <span className="text-gradient-gold italic font-serif font-normal">at scale.</span>
          </h2>
          <p className="text-navy-950/60 text-base md:text-lg leading-relaxed">
            Five decades of fostering international commerce, bilateral relationships, and economic prosperity for Indian importers worldwide.
          </p>
        </div>

        <ul className="stats-grid list-none p-0 m-0">
          {stats.map((stat) => (
            <li key={stat.label} className="min-w-0">
              <article className="stats-card relative group glass-light rounded-2xl p-5 sm:p-6 lg:p-7 card-lift border border-navy-950/10 reveal-up h-full flex flex-col shadow-sm hover:shadow-lg">
                <div className="mb-4">
                  <div className="stats-card-icon w-10 h-10 shrink-0 rounded-xl bg-gold/10 flex items-center justify-center text-gold transition">
                    <i className={`fas ${stat.icon} text-sm`} aria-hidden />
                  </div>
                </div>

                <div className="mt-auto min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0 min-w-0">
                    <span
                      className="stat-value text-navy-950 tabular-nums counter break-normal"
                      data-target={stat.value}
                    >
                      0
                    </span>
                    <span className="stat-suffix text-gold font-bold">{stat.suffix}</span>
                  </div>
                  <p className="text-sm sm:text-base text-navy-950 font-semibold mt-2 leading-snug">{stat.label}</p>
                  <p className="text-xs text-navy-950/50 mt-1">{stat.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
