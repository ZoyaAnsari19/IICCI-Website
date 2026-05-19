export const CSR = () => {
  return (
    <section id="csr" className="relative section-padding overflow-hidden bg-white">

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4 reveal-up">
              <i className="fas fa-seedling text-emerald-500 text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">CSR & UN SDG</span>
            </div>
            <h2 className="display-title font-display font-bold mb-6 reveal-up">
              <span className="text-navy-950">Building a</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">sustainable</span>{' '}
              <span className="text-navy-950">future, together.</span>
            </h2>
            <p className="text-navy-950/70 text-base md:text-lg reveal-up max-w-xl">
              Aligned with UN Sustainable Development Goals, IICCI invests in projects that uplift communities, empower women, protect the planet, and create lasting economic value.
            </p>
          </div>

          {/* World globe */}
          <div className="relative flex items-center justify-center reveal-up min-h-[280px] md:min-h-[340px]">
            <div className="absolute w-[88%] max-w-[340px] aspect-square rounded-full bg-royal/10 blur-3xl" aria-hidden />
            <div className="relative w-full max-w-[320px] md:max-w-[360px] aspect-square">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full drop-shadow-2xl"
                role="img"
                aria-label="World globe showing continents"
              >
                <defs>
                  <radialGradient id="csr-ocean" cx="32%" cy="28%" r="68%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="45%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1e3a5f" />
                  </radialGradient>
                  <radialGradient id="csr-shine" cx="28%" cy="22%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                  <clipPath id="csr-globe-clip">
                    <circle cx="200" cy="200" r="158" />
                  </clipPath>
                </defs>

                <ellipse cx="200" cy="218" rx="150" ry="18" fill="rgba(8,17,32,0.08)" />

                <circle cx="200" cy="200" r="158" fill="url(#csr-ocean)" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.35" />

                <g clipPath="url(#csr-globe-clip)">
                  <g
                    className="animate-spin-slow"
                    style={{ transformOrigin: '200px 200px', animationDuration: '90s' }}
                  >
                    <g fill="#22c55e" stroke="#15803d" strokeWidth="0.8">
                      <path d="M 48 92 C 62 68 98 62 122 74 L 128 108 C 124 132 102 148 82 142 C 62 130 48 112 48 92 Z" />
                      <path d="M 118 58 L 148 54 L 154 70 L 136 78 L 118 72 Z" />
                      <path d="M 94 148 L 118 142 L 128 178 L 122 222 L 104 242 L 90 218 L 94 148 Z" />
                      <path d="M 164 80 L 200 74 L 210 94 L 196 110 L 168 106 Z" />
                      <path d="M 166 112 L 214 106 L 226 162 L 220 214 L 196 226 L 168 202 L 162 158 Z" />
                      <path d="M 206 104 L 234 108 L 240 132 L 216 140 Z" />
                      <path d="M 214 64 L 302 58 L 318 88 L 312 132 L 276 148 L 232 132 L 214 98 Z" />
                      <path d="M 244 126 L 268 120 L 274 152 L 250 158 Z" />
                      <path d="M 276 140 L 302 136 L 308 162 L 284 168 Z" />
                      <path d="M 272 196 L 316 190 L 324 214 L 296 226 L 272 210 Z" />
                      <path d="M 124 262 L 276 260 L 282 276 L 118 278 Z" opacity="0.55" />
                    </g>

                    <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7">
                      <ellipse cx="200" cy="200" rx="158" ry="42" />
                      <ellipse cx="200" cy="200" rx="158" ry="82" />
                      <ellipse cx="200" cy="200" rx="158" ry="122" />
                      <line x1="42" y1="200" x2="358" y2="200" />
                      <line x1="200" y1="42" x2="200" y2="358" />
                    </g>
                  </g>

                  <circle cx="200" cy="200" r="158" fill="url(#csr-shine)" pointerEvents="none" />
                </g>

                <circle cx="200" cy="200" r="168" fill="none" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.2" className="animate-pulse" />
                <circle cx="200" cy="200" r="182" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.12" />
              </svg>
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
            <div key={c.title} className="group relative glass-light rounded-2xl p-6 border border-navy-950/10 card-lift overflow-hidden reveal-up">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${c.color} opacity-20 blur-2xl group-hover:opacity-40 transition`}></div>
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <i className={`fas ${c.icon} text-base`}></i>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">{c.sdg}</div>
                <h3 className="text-navy-950 font-display font-bold text-base">{c.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-navy-950/50 group-hover:text-gold transition">
                  Learn more <i className="fas fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact counter */}
        <div className="mt-12 rounded-3xl p-8 lg:p-12 glass-light border border-navy-950/10 shadow-premium reveal-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { v: '250K+', l: 'Lives Impacted' },
              { v: '50+', l: 'Active Projects' },
              { v: '12', l: 'States Reached' },
              { v: '₹85Cr', l: 'CSR Deployed' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{s.v}</div>
                <div className="text-sm text-navy-950/70 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
