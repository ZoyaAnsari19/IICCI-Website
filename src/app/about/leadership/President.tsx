import Image from "next/image";

export const President = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Photo card */}
          <div className="lg:col-span-5 reveal-up">
            <div className="relative max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-[2rem] border border-gold/20"></div>
              <div className="absolute -inset-8 rounded-[2.5rem] border border-gold/10"></div>

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-gradient shadow-premium bg-navy-950">
                <Image
                  src="/images/RK sir.png"
                  alt="Rajesh Kaithwas, President of IICCI"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-navy-950/10 pointer-events-none" aria-hidden />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">President's Foreword</span>
            </div>

            <h2 className="display-title font-display font-bold mb-8 leading-tight">
              <span className="text-navy-950">"India is poised to be the</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">trade superpower</span>{' '}
              <span className="text-navy-950">of the 21st century — and IICCI will lead the charge."</span>
            </h2>

            <div className="space-y-5 text-navy-950/70 leading-relaxed mb-10 max-w-2xl">
              <p>
                The world is witnessing an unprecedented shift in global trade dynamics. India, with its $3.7 trillion economy, demographic dividend, and ambitious vision of <span className="text-navy-950 font-semibold">Viksit Bharat 2047</span>, sits at the heart of this transformation.
              </p>
              <p>
                As President of IICCI, my commitment is to ensure that every Indian importer, manufacturer, and entrepreneur has access to the global stage — through trusted partnerships, advanced trade intelligence, and a chamber that genuinely fights for their interests.
              </p>
              <p className="text-navy-950/80 font-medium italic">
                Together, we will build the next generation of global trade leaders from India.
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-navy-950/10 max-w-2xl">
              <div>
                <div className="text-xl font-display font-bold text-navy-950">Rajesh Kaithwas</div>
                <div className="text-sm text-gold mt-1">President</div>
                <div className="text-xs text-navy-950/50 mt-0.5">Indian Importers Chambers of Commerce & Industry</div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition">
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
