export const Stats = () => {
  const stats = [
    { value: 47, suffix: '+', label: 'Years of Legacy', icon: 'fa-landmark', desc: 'Since 1978' },
    { value: 10000, suffix: '+', label: 'Importers Network', icon: 'fa-users', desc: 'Active Members' },
    { value: 50, suffix: '+', label: 'Countries Connected', icon: 'fa-globe', desc: 'Global Reach' },
    { value: 500, suffix: '+', label: 'Trade Delegations', icon: 'fa-handshake', desc: 'Hosted & Led' },
    { value: 1000, suffix: '+', label: 'Business Matchmakings', icon: 'fa-people-arrows', desc: 'Successful Deals' },
  ]

  return (
    <section className="relative section-padding overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30"></div>
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto reveal-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">By the Numbers</span>
          </div>
          <h2 className="display-title font-display font-bold mb-4">
            <span className="text-white">Empowering global trade</span>{' '}
            <span className="text-gradient-gold italic font-serif font-normal">at scale.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Five decades of fostering international commerce, bilateral relationships, and economic prosperity for Indian importers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`relative group glass-dark rounded-2xl p-6 lg:p-8 card-lift border border-white/5 reveal-up ${i === 2 ? 'lg:row-span-1 lg:col-span-1' : ''}`}>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-navy-950 text-gold transition">
                <i className={`fas ${stat.icon} text-sm`}></i>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="huge-number text-white tabular-nums counter" data-target={stat.value}>0</span>
                  <span className="text-3xl md:text-4xl font-bold text-gold ml-1">{stat.suffix}</span>
                </div>
                <div className="text-sm md:text-base text-white font-semibold mt-2">{stat.label}</div>
                <div className="text-xs text-white/50 mt-1">{stat.desc}</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
