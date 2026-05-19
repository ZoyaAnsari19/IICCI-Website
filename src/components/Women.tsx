export const Women = () => {
  return (
    <section id="women" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-rose-950/30 to-navy-950"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
              <i className="fas fa-venus text-pink-400 text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Women Entrepreneurship Wing</span>
            </div>
            <h2 className="display-title font-display font-bold mb-6 reveal-up">
              <span className="text-white">She leads.</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">She builds.</span>{' '}
              <span className="text-white">She inspires.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 reveal-up">
              A powerful platform dedicated to nurturing women business leaders, fostering female entrepreneurship, and creating opportunities at the intersection of tradition and ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal-up">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold btn-premium btn-shine">
                Join Women Wing
                <i className="fas fa-arrow-right text-xs"></i>
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white text-sm font-medium hover:border-pink-400/40 transition">
                <i className="fas fa-play text-pink-400 text-xs"></i> Watch Stories
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: 'fa-rocket', title: 'Startup Empowerment', desc: 'Funding access, mentorship, and accelerator programs for women-led ventures.', color: 'pink' },
                { icon: 'fa-tractor', title: 'Rural Empowerment', desc: 'Self-help groups, micro-enterprises, and rural entrepreneurship in tier 3 India.', color: 'amber' },
                { icon: 'fa-graduation-cap', title: 'Skill Development', desc: 'Trade-specific training, certifications, and digital literacy programs.', color: 'royal' },
                { icon: 'fa-leaf', title: 'Sustainability Projects', desc: 'Green entrepreneurship and ESG-focused women-led initiatives.', color: 'emerald' },
              ].map((c) => (
                <div key={c.title} className="group glass-dark rounded-2xl p-6 border border-white/10 card-lift reveal-up">
                  <div className={`w-12 h-12 rounded-xl ${c.color === 'pink' ? 'bg-pink-500/15 text-pink-400' : c.color === 'amber' ? 'bg-amber-500/15 text-amber-400' : c.color === 'royal' ? 'bg-royal/10 text-royal-light' : 'bg-emerald-500/15 text-emerald-400'} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <i className={`fas ${c.icon} text-base`}></i>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Women leaders cards */}
            <div className="mt-6 glass-dark rounded-2xl p-6 border border-white/10 reveal-up">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-pink-400 font-semibold mb-1">Featured</div>
                  <h4 className="text-white font-display font-bold text-lg">Women Business Leaders</h4>
                </div>
                <a href="#" className="text-pink-400 text-xs font-semibold hover:text-pink-300 flex items-center gap-2">
                  View all <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: 'Priya Sharma', r: 'Founder, ExportHive' },
                  { n: 'Anita Patel', r: 'CEO, Spice Global' },
                  { n: 'Meera Iyer', r: 'MD, AgriTech Co.' },
                ].map((l, i) => (
                  <div key={l.n ?? l} className="rounded-xl bg-white/5 p-4 text-center group cursor-pointer hover:bg-white/10 transition">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${i === 0 ? 'from-pink-400 to-rose-600' : i === 1 ? 'from-amber-400 to-pink-600' : 'from-rose-400 to-purple-600'} mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl`}>
                      {l.n.split(' ').map(x => x[0]).join('')}
                    </div>
                    <div className="text-sm font-semibold text-white">{l.n}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{l.r}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
