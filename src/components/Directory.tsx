export const Directory = () => {
  const members = [
    { name: 'Maverick Imports Pvt Ltd', sector: 'Electronics', country: 'India', tier: 'Gold' },
    { name: 'Spice Global Trading', sector: 'Agri & Spices', country: 'India', tier: 'Platinum' },
    { name: 'Pacific Auto Parts', sector: 'Automotive', country: 'Singapore', tier: 'Gold' },
    { name: 'Crescent Petrochem', sector: 'Energy', country: 'UAE', tier: 'Platinum' },
    { name: 'BlueOcean Logistics', sector: 'Logistics', country: 'India', tier: 'Silver' },
    { name: 'Heritage Textiles', sector: 'Textiles', country: 'India', tier: 'Gold' },
  ]

  return (
    <section className="relative section-padding overflow-hidden bg-white border-y border-navy-950/10">
      <div className="absolute inset-0 bg-grid-light bg-grid-fade opacity-40 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4">
              <i className="fas fa-address-book text-gold text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">Member Directory</span>
            </div>
            <h2 className="display-title font-display font-bold">
              <span className="text-navy-950">10,000+ verified businesses,</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">one network.</span>
            </h2>
          </div>
        </div>

        {/* Search bar */}
        <div className="glass-light rounded-2xl border border-navy-950/10 p-3 sm:p-4 mb-8 reveal-up shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
            <div className="flex items-center gap-3 px-2 md:px-4 md:flex-1 md:min-w-0">
              <i className="fas fa-search text-navy-950/40 shrink-0" aria-hidden />
              <input
                type="text"
                placeholder="Search companies, sectors, or countries..."
                className="bg-transparent outline-none flex-1 min-w-0 text-navy-950 placeholder:text-navy-950/40 text-sm py-2"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto md:shrink-0">
              <select className="flex-1 min-w-0 bg-navy-950/5 border border-navy-950/10 rounded-xl text-navy-950 text-sm px-3 py-2 outline-none">
                <option className="bg-white">All Sectors</option>
                <option className="bg-white">Electronics</option>
                <option className="bg-white">Agri</option>
                <option className="bg-white">Energy</option>
                <option className="bg-white">Textiles</option>
              </select>
              <select className="flex-1 min-w-0 bg-navy-950/5 border border-navy-950/10 rounded-xl text-navy-950 text-sm px-3 py-2 outline-none">
                <option className="bg-white">All Countries</option>
                <option className="bg-white">India</option>
                <option className="bg-white">UAE</option>
                <option className="bg-white">Singapore</option>
              </select>
              <button
                type="button"
                className="shrink-0 px-5 py-2 rounded-xl bg-gradient-gold text-navy-950 text-sm font-bold btn-premium whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 reveal-up">
          {['All', 'Importers', 'Exporters', 'Manufacturers', 'Distributors', 'Service Providers', 'Foreign Partners'].map((c, i) => (
            <button key={c} className={`px-4 py-2 rounded-full text-xs font-medium transition ${i === 0 ? 'bg-gold text-navy-950' : 'bg-navy-950/5 border border-navy-950/10 text-navy-950/70 hover:text-navy-950 hover:border-gold/40'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Member cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((m) => (
            <div key={m.name} className="group glass-light rounded-2xl p-5 border border-navy-950/10 card-lift cursor-pointer reveal-up shadow-sm hover:shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold ${m.tier === 'Platinum' ? 'bg-gradient-to-br from-navy-950/15 to-navy-950/5 text-navy-950 border border-navy-950/20' : m.tier === 'Gold' ? 'bg-gradient-to-br from-gold/20 to-gold/5 text-gold border border-gold/30' : 'bg-gradient-to-br from-zinc-400/20 to-zinc-600/5 text-zinc-600 border border-zinc-400/30'}`}>
                  {m.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${m.tier === 'Platinum' ? 'bg-navy-950/10 text-navy-950' : m.tier === 'Gold' ? 'bg-gold/10 text-gold' : 'bg-zinc-400/10 text-zinc-600'}`}>
                  {m.tier}
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-navy-950 mb-2 group-hover:text-gold transition">{m.name}</h3>
              <div className="flex items-center justify-between text-xs text-navy-950/60">
                <span className="flex items-center gap-1.5"><i className="fas fa-briefcase text-gold/70"></i> {m.sector}</span>
                <span className="flex items-center gap-1.5"><i className="fas fa-flag text-gold/70"></i> {m.country}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-navy-950/10 flex items-center justify-between text-xs">
                <button className="text-gold font-semibold hover:gap-3 flex items-center gap-2 transition-all">
                  View Profile <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
                <button className="text-navy-950/50 hover:text-navy-950 transition">
                  <i className="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal-up">
          <a href="#" className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-navy-950/5 border border-navy-950/10 text-navy-950 text-sm font-semibold hover:border-gold/40 transition">
            Browse all 10,000+ members
            <i className="fas fa-arrow-right text-[10px] text-gold"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
