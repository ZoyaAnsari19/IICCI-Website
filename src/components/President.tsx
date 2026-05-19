export const President = () => {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-3xl rounded-full"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo card */}
          <div className="lg:col-span-5 reveal-up">
            <div className="relative max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-[2rem] border border-gold/20"></div>
              <div className="absolute -inset-8 rounded-[2.5rem] border border-gold/10"></div>

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-gradient shadow-premium">
                {/* Portrait - SVG placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950"></div>
                <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a2540" />
                      <stop offset="100%" stopColor="#081120" />
                    </linearGradient>
                    <radialGradient id="skin" cx="50%" cy="40%">
                      <stop offset="0%" stopColor="#e8b890" />
                      <stop offset="100%" stopColor="#b8855e" />
                    </radialGradient>
                  </defs>

                  {/* Background subtle */}
                  <rect width="400" height="500" fill="#0c1c34" />
                  <circle cx="200" cy="180" r="280" fill="url(#suit)" opacity="0.3" />

                  {/* Suit */}
                  <path d="M 80 500 L 80 380 Q 100 320, 160 300 L 240 300 Q 300 320, 320 380 L 320 500 Z" fill="url(#suit)" />
                  {/* Shirt */}
                  <path d="M 160 300 L 200 360 L 240 300 L 220 380 L 180 380 Z" fill="#f8fafc" />
                  {/* Tie */}
                  <path d="M 195 300 L 205 300 L 210 370 L 200 410 L 190 370 Z" fill="#d4af37" />

                  {/* Neck */}
                  <rect x="180" y="240" width="40" height="60" fill="url(#skin)" />
                  {/* Head */}
                  <ellipse cx="200" cy="180" rx="70" ry="85" fill="url(#skin)" />
                  {/* Hair */}
                  <path d="M 135 150 Q 150 90, 200 80 Q 260 85, 270 150 Q 265 135, 245 130 L 200 125 Q 165 130, 145 145 Z" fill="#1a1a1a" />
                  {/* Eyes hint */}
                  <ellipse cx="175" cy="180" rx="6" ry="3" fill="#1a1a1a" />
                  <ellipse cx="225" cy="180" rx="6" ry="3" fill="#1a1a1a" />
                  {/* Smile */}
                  <path d="M 180 220 Q 200 230, 220 220" stroke="#5a3a25" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Glasses outline */}
                  <g stroke="#1a1a1a" strokeWidth="1.5" fill="none">
                    <circle cx="175" cy="180" r="14" />
                    <circle cx="225" cy="180" r="14" />
                    <line x1="189" y1="180" x2="211" y2="180" />
                  </g>
                </svg>

                {/* Signature overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent">
                  <div className="text-gold text-2xl font-serif italic">Rajesh Kaithwas</div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold">
                  President
                </div>
              </div>

              {/* Floating quote chip */}
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-4 shadow-premium max-w-[200px] border border-gold/20">
                <i className="fas fa-quote-right text-gold text-2xl mb-2"></i>
                <div className="text-xs text-white/80 italic leading-snug">
                  "We don't just connect businesses, we connect futures."
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">President's Foreword</span>
            </div>

            <h2 className="display-title font-display font-bold mb-8 leading-tight">
              <span className="text-white">"India is poised to be the</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">trade superpower</span>{' '}
              <span className="text-white">of the 21st century — and IICCI will lead the charge."</span>
            </h2>

            <div className="space-y-5 text-white/70 leading-relaxed mb-10 max-w-2xl">
              <p>
                The world is witnessing an unprecedented shift in global trade dynamics. India, with its $3.7 trillion economy, demographic dividend, and ambitious vision of <span className="text-white font-semibold">Viksit Bharat 2047</span>, sits at the heart of this transformation.
              </p>
              <p>
                As President of IICCI, my commitment is to ensure that every Indian importer, manufacturer, and entrepreneur has access to the global stage — through trusted partnerships, advanced trade intelligence, and a chamber that genuinely fights for their interests.
              </p>
              <p className="text-white/80 font-medium italic">
                Together, we will build the next generation of global trade leaders from India.
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-white/10 max-w-2xl">
              <div>
                <div className="text-xl font-display font-bold text-white">Rajesh Kaithwas</div>
                <div className="text-sm text-gold mt-1">President</div>
                <div className="text-xs text-white/50 mt-0.5">Indian Importers Chambers of Commerce & Industry</div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="#" className="w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
