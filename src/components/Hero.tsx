export const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-0 isolate min-h-screen overflow-hidden bg-radial-navy pb-20 lg:pb-28"
      style={{ paddingTop: "calc(var(--navbar-height, 5.5rem) + 1.5rem)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50"></div>

      {/* Aurora */}
      <div className="aurora"></div>

      {/* Particles container */}
      <div id="particles" className="absolute inset-0 pointer-events-none" suppressHydrationWarning></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left content */}
          <div className="lg:col-span-7 relative">
            {/* Eyebrow */}
            <div className="reveal-up inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8 group overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0 overflow-hidden rounded-full">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/80 font-medium">Established 1978 · 47 Years of Trade Excellence</span>
            </div>

            {/* Main headline */}
            <h1 className="hero-title font-display font-bold mb-6">
              <span className="block text-white">Connecting</span>
              <span className="block">
                <span className="text-gradient-gold italic font-serif font-normal">India</span>
                <span className="text-white"> to</span>
              </span>
              <span className="block text-gradient-royal">Global Trade</span>
              <span className="block text-white">Opportunities.</span>
            </h1>

            {/* Subhead */}
            <p className="text-base md:text-lg text-white/70 max-w-2xl mb-10 leading-relaxed reveal-up">
              The premier international chamber empowering importers, fostering global partnerships, and unlocking bilateral trade and investment opportunities across <span className="text-gold font-semibold">50+ countries</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12 reveal-up">
              <a href="#membership" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide btn-premium btn-shine shadow-gold">
                Become a Member
                <span className="w-6 h-6 rounded-full bg-navy-950 flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <i className="fas fa-arrow-right text-gold text-[10px]"></i>
                </span>
              </a>
              <a href="#global" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full glass border border-white/10 text-white text-sm font-semibold tracking-wide hover:border-gold/50 transition">
                <i className="fas fa-globe text-gold"></i>
                Explore Global Network
              </a>
              <button className="group inline-flex items-center gap-3 text-white/80 hover:text-white text-sm font-medium">
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition">
                  <i className="fas fa-play text-gold text-[10px] ml-0.5"></i>
                </span>
                Watch IICCI Narrative
              </button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 max-w-xl reveal-up">
              <div className="border-l border-gold/30 pl-4">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">10K+</div>
                <div className="text-[11px] uppercase tracking-wider text-white/50 mt-1">Importers</div>
              </div>
              <div className="border-l border-gold/30 pl-4">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">50+</div>
                <div className="text-[11px] uppercase tracking-wider text-white/50 mt-1">Countries</div>
              </div>
              <div className="border-l border-gold/30 pl-4">
                <div className="text-2xl md:text-3xl font-display font-bold text-white">$2.5B</div>
                <div className="text-[11px] uppercase tracking-wider text-white/50 mt-1">Trade Volume</div>
              </div>
            </div>
          </div>

          {/* Right - Globe visualization */}
          <div className="lg:col-span-5 relative min-h-[400px] md:min-h-[500px] lg:min-h-[640px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* SVG Globe */}
              <div className="relative w-full max-w-[600px] aspect-square">
                <svg viewBox="0 0 600 600" className="w-full h-full">
                  <defs>
                    <radialGradient id="globe-grad" cx="40%" cy="40%">
                      <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#142a4a" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#081120" stopOpacity="0.6" />
                    </radialGradient>
                    <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
                      <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Globe sphere */}
                  <circle cx="300" cy="300" r="220" fill="url(#globe-grad)" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
                  <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" strokeDasharray="2 6" className="globe-rotate" style={{ transformOrigin: "300px 300px" }} />

                  {/* Latitude lines */}
                  <g stroke="rgba(255,255,255,0.08)" fill="none" strokeWidth="0.5">
                    <ellipse cx="300" cy="300" rx="220" ry="50" />
                    <ellipse cx="300" cy="300" rx="220" ry="110" />
                    <ellipse cx="300" cy="300" rx="220" ry="170" />
                    <ellipse cx="300" cy="300" rx="220" ry="220" />
                    <line x1="80" y1="300" x2="520" y2="300" />
                    <line x1="300" y1="80" x2="300" y2="520" />
                  </g>

                  {/* Continents (simplified dot pattern) */}
                  <g fill="rgba(255,255,255,0.4)">
                    {/* Asia */}
                    {Array.from({ length: 60 }).map((_, i) => {
                      const angle = (i * 137.5) * Math.PI / 180;
                      const r = 80 + (i % 8) * 15;
                      const cx = 320 + Math.cos(angle) * r * 0.6;
                      const cy = 280 + Math.sin(angle) * r * 0.4;
                      const d = Math.sqrt((cx-300)**2 + (cy-300)**2);
                      if (d > 220) return null;
                      return <circle key={i} cx={cx} cy={cy} r="1.2" />
                    })}
                  </g>

                  {/* Trade routes */}
                  <g fill="none" stroke="url(#route-grad)" strokeWidth="1.5" filter="url(#glow)">
                    <path d="M 300 280 Q 200 200, 150 250" className="trade-route" style={{ animationDelay: "0s" }} />
                    <path d="M 300 280 Q 400 200, 480 280" className="trade-route" style={{ animationDelay: "0.5s" }} />
                    <path d="M 300 280 Q 380 380, 460 400" className="trade-route" style={{ animationDelay: "1s" }} />
                    <path d="M 300 280 Q 220 380, 140 360" className="trade-route" style={{ animationDelay: "1.5s" }} />
                    <path d="M 300 280 Q 350 180, 420 150" className="trade-route" style={{ animationDelay: "2s" }} />
                    <path d="M 300 280 Q 230 200, 180 160" className="trade-route" style={{ animationDelay: "2.5s" }} />
                  </g>

                  {/* India HQ - pulse */}
                  <g>
                    <circle cx="300" cy="280" r="6" fill="#d4af37" />
                    <circle cx="300" cy="280" r="12" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" from="6" to="40" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="300" cy="280" r="12" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" from="6" to="40" dur="2s" begin="1s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="2s" begin="1s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Country markers */}
                  {[
                    { cx: 150, cy: 250, label: 'UK' },
                    { cx: 480, cy: 280, label: 'JP' },
                    { cx: 460, cy: 400, label: 'AU' },
                    { cx: 140, cy: 360, label: 'BR' },
                    { cx: 420, cy: 150, label: 'RU' },
                    { cx: 180, cy: 160, label: 'US' },
                    { cx: 280, cy: 400, label: 'ZA' },
                    { cx: 360, cy: 320, label: 'AE' },
                  ].map((p) => (
                    <g key={p.label}>
                      <circle cx={p.cx} cy={p.cy} r="4" fill="#3b82f6" />
                      <circle cx={p.cx} cy={p.cy} r="8" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
                    </g>
                  ))}
                </svg>

                {/* Orbital satellite system — Bilateral, Live Trades, Delegation
                    each orbit the globe on a distinct ring at its own speed
                    and phase. Cards remain upright via a counter-rotation and
                    receive a subtle eased bob + soft glow. */}
                <div className="orbit-system" aria-hidden="false">
                  {/* Subtle orbit guide rings */}
                  <div className="orbit-ring orbit-ring-trades hidden md:block" />
                  <div className="orbit-ring orbit-ring-bilateral hidden md:block" />
                  <div className="orbit-ring orbit-ring-delegation hidden lg:block" />

                  {/* Bilateral — outer ring, clockwise */}
                  <div className="orbit-track orbit-bilateral hidden md:block">
                    <div className="orbit-card-pos">
                      <div className="orbit-counter">
                        <div className="orbit-float">
                          <div className="glass rounded-2xl p-3 shadow-premium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <i className="fas fa-arrow-trend-up text-emerald-400 text-xs"></i>
                              </div>
                              <div>
                                <div className="text-[10px] text-white/60 uppercase tracking-wider">Bilateral</div>
                                <div className="text-sm font-bold text-white">+28.4%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Trades — inner ring, counter-clockwise */}
                  <div className="orbit-track orbit-trades is-reverse hidden md:block">
                    <div className="orbit-card-pos">
                      <div className="orbit-counter">
                        <div className="orbit-float">
                          <div className="glass rounded-2xl p-3 shadow-premium">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                                <i className="fas fa-ship text-gold text-xs"></i>
                              </div>
                              <div>
                                <div className="text-[10px] text-white/60 uppercase tracking-wider">Live Trades</div>
                                <div className="text-sm font-bold text-white">2,847</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delegation — outermost ring, clockwise, slowest */}
                  <div className="orbit-track orbit-delegation hidden lg:block">
                    <div className="orbit-card-pos">
                      <div className="orbit-counter">
                        <div className="orbit-float">
                          <div className="glass rounded-2xl p-3 shadow-premium">
                            <div className="text-[10px] text-gold uppercase tracking-wider">Delegation</div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-lg">🇮🇳</span>
                              <i className="fas fa-arrow-right text-white/40 text-xs"></i>
                              <span className="text-lg">🇦🇪</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Static anchor card — kept gently floating to balance the composition */}
                <div className="absolute bottom-[5%] right-[-3%] glass rounded-2xl p-3 float-chip shadow-premium hidden lg:block z-10">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-gold-600 border-2 border-navy-950"></div>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-royal to-royal-dark border-2 border-navy-950"></div>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 border-2 border-navy-950"></div>
                    </div>
                    <div className="text-[10px] text-white/80 font-medium">10K+ Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud / partners marquee */}
        <div className="mt-16 lg:mt-20">
          <div className="text-center text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6">Trusted Partners & Trade Affiliations</div>
          <div className="marquee py-2 [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
            <div className="marquee-track">
              {['World Trade Organization', 'UNCTAD', 'FICCI', 'CII', 'ASSOCHAM', 'EXIM Bank', 'DGFT', 'Invest India', 'Make in India', 'APEDA', 'FIEO', 'Dubai Chamber'].map((p) => (
                <div key={p} className="flex items-center gap-3 text-white/40 hover:text-gold transition whitespace-nowrap">
                  <i className="fas fa-shield-halved text-xs"></i>
                  <span className="text-sm font-medium tracking-wide">{p}</span>
                </div>
              ))}
            </div>
            <div className="marquee-track" aria-hidden="true">
              {['World Trade Organization', 'UNCTAD', 'FICCI', 'CII', 'ASSOCHAM', 'EXIM Bank', 'DGFT', 'Invest India', 'Make in India', 'APEDA', 'FIEO', 'Dubai Chamber'].map((p) => (
                <div key={p} className="flex items-center gap-3 text-white/40 hover:text-gold transition whitespace-nowrap">
                  <i className="fas fa-shield-halved text-xs"></i>
                  <span className="text-sm font-medium tracking-wide">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade — prevents hero glow/orbits bleeding into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 bg-gradient-to-b from-transparent via-navy-950/90 to-navy-950 z-20 pointer-events-none"
        aria-hidden
      />
    </section>
  )
}
