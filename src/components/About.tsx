export const About = () => {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-royal/10 blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">About IICCI</span>
              </div>
              <h2 className="display-title font-display font-bold mb-6">
                <span className="text-white">A bridge between</span>
                <br />
                <span className="text-gradient-gold italic font-serif font-normal">India & the world.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                The <span className="text-white font-semibold">Indian Importers Chambers of Commerce & Industry (IICCI)</span> is a premier apex body representing the interests of Indian importers, exporters, and global businesses. We facilitate seamless international trade, foster bilateral partnerships, and unlock investment corridors across continents.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                For nearly five decades, IICCI has been the trusted voice of India's import community — driving policy advocacy, market access, and global business intelligence for our members.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['ISO 9001 Certified', 'Govt. Recognized', 'WTO Affiliated', 'UN Compact Member'].map((b) => (
                  <span key={b} className="px-3 py-1.5 rounded-full glass border border-white/10 text-[11px] text-white/80">{b}</span>
                ))}
              </div>

              <a href="#about" className="inline-flex items-center gap-3 text-gold font-semibold text-sm group">
                Read our complete story
                <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:bg-gold group-hover:text-navy-950 transition">
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </span>
              </a>
            </div>
          </div>

          {/* Right - Bento grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-6 gap-4 auto-rows-[minmax(140px,auto)]">
              {/* Mission - large */}
              <div className="col-span-6 md:col-span-4 md:row-span-2 glass-dark rounded-3xl p-7 card-lift border border-white/5 relative overflow-hidden group reveal-up">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold/10 blur-2xl group-hover:bg-gold/20 transition"></div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950 mb-5">
                    <i className="fas fa-bullseye text-lg"></i>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2">Our Mission</div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-3">
                    Empowering Indian importers to compete & lead globally.
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Drive bilateral and multilateral trade, advocate progressive policy, deliver world-class trade intelligence, and create a thriving ecosystem of global Indian businesses.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="col-span-6 md:col-span-2 row-span-2 bg-gradient-to-br from-royal to-royal-dark rounded-3xl p-6 card-lift relative overflow-hidden reveal-up">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="relative h-full flex flex-col">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2">Our Vision</div>
                  <h3 className="text-xl font-display font-bold text-white leading-tight mb-3">
                    To make India the world's most influential trade nation by 2047.
                  </h3>
                  <div className="mt-auto">
                    <div className="text-4xl font-display font-bold text-gold">2047</div>
                    <div className="text-xs text-white/70">Centenary Goal</div>
                  </div>
                </div>
              </div>

              {/* Legacy timeline */}
              <div className="col-span-3 md:col-span-2 glass-dark rounded-2xl p-5 card-lift border border-white/5 reveal-up">
                <i className="fas fa-landmark text-gold text-xl mb-3"></i>
                <div className="text-2xl font-display font-bold text-white">1978</div>
                <div className="text-xs text-white/60 mt-1">Founded in New Delhi</div>
              </div>

              {/* Tagline */}
              <div className="col-span-3 md:col-span-2 glass-dark rounded-2xl p-5 card-lift border border-white/5 reveal-up">
                <i className="fas fa-quote-left text-gold text-lg mb-2"></i>
                <div className="text-sm text-white font-semibold italic">"Trade is not just commerce, it is diplomacy."</div>
              </div>

              {/* Recognition */}
              <div className="col-span-6 md:col-span-2 glass-dark rounded-2xl p-5 card-lift border border-white/5 reveal-up">
                <div className="flex items-center gap-2 mb-2">
                  {[1,2,3,4,5].map((n) => <i key={n} className="fas fa-star text-gold text-xs"></i>)}
                </div>
                <div className="text-sm text-white font-semibold">Govt. of India Recognized</div>
                <div className="text-xs text-white/60 mt-1">Apex trade body</div>
              </div>

              {/* Values row */}
              <div className="col-span-6 glass-dark rounded-2xl p-5 card-lift border border-white/5 reveal-up">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { i: 'fa-shield-halved', t: 'Integrity' },
                    { i: 'fa-globe', t: 'Global Vision' },
                    { i: 'fa-lightbulb', t: 'Innovation' },
                    { i: 'fa-handshake', t: 'Partnership' },
                  ].map((v) => (
                    <div key={v.t} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                        <i className={`fas ${v.i} text-xs`}></i>
                      </div>
                      <span className="text-white/80 text-sm font-medium">{v.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
