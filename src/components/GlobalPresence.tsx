export const GlobalPresence = () => {
  // Country pins with approximate % positions on equirectangular world map
  const offices = [
    { name: 'New Delhi', country: 'India', x: 70, y: 42, type: 'hq', flag: '🇮🇳' },
    { name: 'Mumbai', country: 'India', x: 67, y: 48, type: 'office', flag: '🇮🇳' },
    { name: 'Dubai', country: 'UAE', x: 60, y: 44, type: 'chapter', flag: '🇦🇪' },
    { name: 'Singapore', country: 'Singapore', x: 79, y: 58, type: 'chapter', flag: '🇸🇬' },
    { name: 'London', country: 'UK', x: 47, y: 28, type: 'chapter', flag: '🇬🇧' },
    { name: 'New York', country: 'USA', x: 25, y: 32, type: 'chapter', flag: '🇺🇸' },
    { name: 'Tokyo', country: 'Japan', x: 87, y: 35, type: 'chapter', flag: '🇯🇵' },
    { name: 'Sydney', country: 'Australia', x: 90, y: 75, type: 'chapter', flag: '🇦🇺' },
    { name: 'Cape Town', country: 'South Africa', x: 53, y: 78, type: 'chapter', flag: '🇿🇦' },
    { name: 'São Paulo', country: 'Brazil', x: 33, y: 70, type: 'chapter', flag: '🇧🇷' },
    { name: 'Berlin', country: 'Germany', x: 50, y: 27, type: 'chapter', flag: '🇩🇪' },
    { name: 'Riyadh', country: 'Saudi Arabia', x: 57, y: 44, type: 'chapter', flag: '🇸🇦' },
  ]

  return (
    <section id="global" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-navy"></div>
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
            <i className="fas fa-globe text-gold text-xs"></i>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Global Presence</span>
          </div>
          <h2 className="display-title font-display font-bold mb-4 reveal-up">
            <span className="text-white">A network that spans</span>{' '}
            <span className="text-gradient-gold italic font-serif font-normal">six continents.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg reveal-up">
            Headquartered in New Delhi with international chapters across 50+ nations, IICCI is wherever Indian trade meets the world.
          </p>
        </div>

        {/* World map */}
        <div className="relative rounded-3xl glass-dark border border-white/10 p-6 md:p-10 overflow-hidden reveal-up">
          <div className="absolute inset-0 bg-gradient-to-b from-royal/5 to-transparent"></div>

          <div className="relative aspect-[2/1] w-full dot-map rounded-2xl overflow-hidden">
            {/* Trade corridors SVG */}
            <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="corridor" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
                  <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* India to world corridors */}
              <path d="M 70 21 Q 60 10, 47 14" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "0s" }} />
              <path d="M 70 21 Q 50 5, 25 16" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "0.4s" }} />
              <path d="M 70 21 Q 78 15, 87 17" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "0.8s" }} />
              <path d="M 70 21 Q 75 35, 79 29" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "1.2s" }} />
              <path d="M 70 21 Q 65 30, 60 22" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "1.6s" }} />
              <path d="M 70 21 Q 60 50, 53 39" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "2s" }} />
              <path d="M 70 21 Q 85 50, 90 37" fill="none" stroke="url(#corridor)" strokeWidth="0.3" className="trade-route" style={{ animationDelay: "2.4s" }} />
            </svg>

            {/* Pins */}
            {offices.map((o) => (
              <div key={o.name}
                className="absolute group cursor-pointer"
                style={{
                  left: `${o.x}%`,
                  top: `${o.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {o.type === 'hq' ? (
                  <>
                    <div className="absolute w-8 h-8 rounded-full bg-gold/30 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-ping"></div>
                    <div className="relative w-4 h-4 rounded-full bg-gold ring-4 ring-gold/30 shadow-gold"></div>
                  </>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-royal-light ring-2 ring-royal-light/30 group-hover:bg-gold group-hover:ring-gold/40 transition"></div>
                )}
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  <div className="glass-dark border border-gold/30 rounded-lg px-3 py-2 whitespace-nowrap shadow-premium">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{o.flag}</span>
                      <div>
                        <div className="text-xs text-white font-semibold">{o.name}</div>
                        <div className="text-[10px] text-gold uppercase tracking-wider">{o.type === 'hq' ? 'Headquarters' : 'Chapter'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold ring-2 ring-gold/30"></div>
                <span>Headquarters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-royal-light"></div>
                <span>International Chapter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-gold"></div>
                <span>Active Trade Corridor</span>
              </div>
            </div>
            <a href="#global" className="inline-flex items-center gap-2 text-gold text-xs font-semibold hover:gap-3 transition-all">
              View all 50+ chapters <i className="fas fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>

        {/* Regional stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {[
            { region: 'Asia Pacific', count: '18', flag: '🌏' },
            { region: 'Middle East', count: '8', flag: '🕌' },
            { region: 'Europe', count: '12', flag: '🇪🇺' },
            { region: 'Americas', count: '7', flag: '🌎' },
            { region: 'Africa', count: '5', flag: '🌍' },
            { region: 'Oceania', count: '2', flag: '🦘' },
          ].map((r) => (
            <div key={r.region} className="glass-dark rounded-xl p-4 border border-white/5 card-lift reveal-up">
              <div className="text-2xl mb-2">{r.flag}</div>
              <div className="text-2xl font-display font-bold text-white">{r.count}</div>
              <div className="text-xs text-white/50 mt-1">{r.region}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
