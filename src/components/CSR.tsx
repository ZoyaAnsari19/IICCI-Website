export const CSR = () => {
  return (
    <section id="csr" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
              <i className="fas fa-seedling text-emerald-400 text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">CSR & UN SDG</span>
            </div>
            <h2 className="display-title font-display font-bold mb-6 reveal-up">
              <span className="text-white">Building a</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">sustainable</span>{' '}
              <span className="text-white">future, together.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg reveal-up max-w-xl">
              Aligned with UN Sustainable Development Goals, IICCI invests in projects that uplift communities, empower women, protect the planet, and create lasting economic value.
            </p>
          </div>

          {/* Earth visualization */}
          <div className="relative h-72 flex items-center justify-center reveal-up">
            <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-emerald-600 via-royal to-navy-900 shadow-premium animate-spin-slow" style={{ animationDuration: "60s" }}>
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
              <div className="absolute top-12 left-8 w-12 h-8 rounded-full bg-emerald-400/40 blur-sm"></div>
              <div className="absolute top-24 right-10 w-16 h-6 rounded-full bg-emerald-400/30 blur-sm"></div>
              <div className="absolute bottom-16 left-14 w-10 h-10 rounded-full bg-emerald-400/40 blur-sm"></div>
              <div className="absolute bottom-12 right-6 w-14 h-8 rounded-full bg-emerald-400/30 blur-sm"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 border border-gold/20 rounded-full animate-pulse"></div>
              <div className="absolute w-96 h-96 border border-gold/10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* SDG grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: 'fa-venus', title: 'Women Empowerment', color: 'from-pink-500 to-pink-700', sdg: 'SDG 5' },
            { icon: 'fa-graduation-cap', title: 'Education', color: 'from-rose-500 to-rose-700', sdg: 'SDG 4' },
            { icon: 'fa-screwdriver-wrench', title: 'Skill Development', color: 'from-orange-500 to-orange-700', sdg: 'SDG 8' },
            { icon: 'fa-leaf', title: 'Green Initiatives', color: 'from-emerald-500 to-emerald-700', sdg: 'SDG 13' },
            { icon: 'fa-recycle', title: 'ESG Projects', color: 'from-teal-500 to-teal-700', sdg: 'SDG 12' },
            { icon: 'fa-tractor', title: 'Rural Development', color: 'from-amber-500 to-amber-700', sdg: 'SDG 2' },
            { icon: 'fa-heart-pulse', title: 'Healthcare', color: 'from-red-500 to-red-700', sdg: 'SDG 3' },
            { icon: 'fa-lightbulb', title: 'Entrepreneurship', color: 'from-yellow-500 to-yellow-700', sdg: 'SDG 9' },
          ].map((c) => (
            <div key={c.title} className="group relative glass-dark rounded-2xl p-6 border border-white/5 card-lift overflow-hidden reveal-up">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl group-hover:opacity-40 transition`}></div>
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <i className={`fas ${c.icon} text-base`}></i>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">{c.sdg}</div>
                <h3 className="text-white font-display font-bold text-base">{c.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/40 group-hover:text-gold transition">
                  Learn more <i className="fas fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact counter */}
        <div className="mt-12 rounded-3xl p-8 lg:p-12 border-gradient bg-navy-900/60 backdrop-blur-xl reveal-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { v: '250K+', l: 'Lives Impacted' },
              { v: '50+', l: 'Active Projects' },
              { v: '12', l: 'States Reached' },
              { v: '₹85Cr', l: 'CSR Deployed' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{s.v}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
