export const Media = () => {
  const articles = [
    { tag: 'Press Release', date: 'Nov 12, 2025', title: 'IICCI signs landmark MoU with Dubai Chamber for $500M trade corridor', cat: 'partnership', size: 'lg' },
    { tag: 'News', date: 'Nov 8, 2025', title: 'India-Africa trade summit hosted by IICCI sees 200+ delegates', cat: 'event', size: 'md' },
    { tag: 'Media Coverage', date: 'Nov 1, 2025', title: 'President Kaithwas featured in Economic Times trade special', cat: 'press', size: 'md' },
    { tag: 'Video', date: 'Oct 28, 2025', title: 'Inside IICCI: A Documentary on India\'s import revolution', cat: 'video', size: 'md' },
    { tag: 'MOU', date: 'Oct 20, 2025', title: 'Strategic MOU with EXIM Bank for member financing', cat: 'partnership', size: 'sm' },
    { tag: 'Certificate', date: 'Oct 15, 2025', title: 'IICCI awarded "Trade Body of the Year" by Govt. of India', cat: 'award', size: 'sm' },
  ]

  return (
    <section id="media" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-navy"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <i className="fas fa-newspaper text-gold text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Media Center</span>
            </div>
            <h2 className="display-title font-display font-bold">
              <span className="text-white">Latest from</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">IICCI.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 reveal-up">
            {['All', 'News', 'Press', 'Videos', 'MOUs', 'Gallery'].map((f, i) => (
              <button key={f} className={`px-4 py-2 rounded-full text-xs font-medium transition ${i === 0 ? 'bg-gold text-navy-950' : 'glass border border-white/10 text-white/70 hover:text-white hover:border-gold/30'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {/* Featured */}
          <article className="md:col-span-2 md:row-span-2 group cursor-pointer reveal-up">
            <div className="relative h-[500px] md:h-full rounded-3xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 img-gradient-1"></div>
              <div className="absolute inset-0 bg-grid opacity-20"></div>
              <div className="absolute inset-0 flex items-end p-8">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-wider font-bold">{articles[0].tag}</span>
                    <span className="text-xs text-white/70">{articles[0].date}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-4 max-w-2xl">
                    {articles[0].title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-white/80 group-hover:text-gold transition">
                    Read full story <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
              {/* Video play icon for video */}
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <i className="fas fa-newspaper text-white text-sm"></i>
                </div>
              </div>
            </div>
          </article>

          {articles.slice(1).map((a, i) => (
            <article key={a.title} className="group cursor-pointer reveal-up">
              <div className={`relative ${i === 2 ? 'h-72' : 'h-64'} rounded-3xl overflow-hidden border border-white/10`}>
                <div className={`absolute inset-0 img-gradient-${(i % 4) + 1}`}></div>
                {a.cat === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold transition">
                      <i className="fas fa-play text-white text-base ml-1 group-hover:text-navy-950"></i>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur text-[9px] uppercase tracking-wider text-gold font-bold">{a.tag}</span>
                    <span className="text-[10px] text-white/60">{a.date}</span>
                  </div>
                  <h3 className="text-base font-display font-bold text-white leading-snug group-hover:text-gold transition">
                    {a.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 reveal-up">
          <a href="#" className="inline-flex items-center gap-3 px-7 py-3 rounded-full glass border border-white/10 text-white text-sm font-semibold hover:border-gold/40 transition">
            View all media coverage
            <i className="fas fa-arrow-right text-[10px] text-gold"></i>
          </a>
        </div>
      </div>
    </section>
  )
}
