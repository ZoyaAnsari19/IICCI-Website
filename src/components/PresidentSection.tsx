import Image from "next/image";
import Link from "next/link";

export const PresidentSection = () => {
  return (
    <section
      id="presidents-foreword"
      aria-labelledby="president-foreword-heading"
      className="relative section-padding overflow-hidden bg-white"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,800px)] h-[400px] bg-gold/10 blur-3xl rounded-full pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Photo card */}
          <div className="lg:col-span-5 reveal-up">
            <div className="relative max-w-md mx-auto w-full">
              <div className="absolute -inset-3 sm:-inset-4 rounded-[2rem] border border-gold/20 pointer-events-none" aria-hidden />
              <div className="absolute -inset-6 sm:-inset-8 rounded-[2.5rem] border border-gold/10 pointer-events-none" aria-hidden />

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-gradient shadow-premium bg-navy-950">
                <Image
                  src="/images/RK sir.png"
                  alt="Rajesh Kaithwas, President of IICCI"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-navy-950/10 pointer-events-none"
                  aria-hidden
                />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent">
                  <div className="text-gold text-xl sm:text-2xl font-serif italic">Rajesh Kaithwas</div>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold">
                  President
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-auto sm:-bottom-6 sm:-left-6 sm:right-auto glass-dark rounded-2xl p-4 shadow-premium sm:max-w-[200px] border border-gold/20">
                <i className="fas fa-quote-right text-gold text-2xl mb-2" aria-hidden />
                <p className="text-xs text-white/80 italic leading-snug">
                  &ldquo;We don&apos;t just connect businesses, we connect futures.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 reveal-up mt-8 sm:mt-10 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">
                President&apos;s Foreword
              </span>
            </div>

            <h2
              id="president-foreword-heading"
              className="display-title font-display font-bold mb-6 sm:mb-8 leading-tight"
            >
              <span className="text-navy-950">&ldquo;India is poised to be the</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">trade superpower</span>{" "}
              <span className="text-navy-950">
                of the 21st century — and IICCI will lead the charge.&rdquo;
              </span>
            </h2>

            <div className="space-y-5 text-navy-950/70 leading-relaxed mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">
              <p>
                The world is witnessing an unprecedented shift in global trade dynamics. India,
                with its $3.7 trillion economy, demographic dividend, and ambitious vision of{" "}
                <span className="text-navy-950 font-semibold">Viksit Bharat 2047</span>, sits at
                the heart of this transformation.
              </p>
              <p>
                As President of IICCI, my commitment is to ensure that every Indian importer,
                manufacturer, and entrepreneur has access to the global stage — through trusted
                partnerships, advanced trade intelligence, and a chamber that genuinely fights for
                their interests.
              </p>
              <p className="text-navy-950/80 font-medium italic">
                Together, we will build the next generation of global trade leaders from India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6 sm:pt-8 border-t border-navy-950/10 max-w-2xl">
              <div>
                <div className="text-xl font-display font-bold text-navy-950">Rajesh Kaithwas</div>
                <div className="text-sm text-gold mt-1">President</div>
                <div className="text-xs text-navy-950/50 mt-0.5">
                  Indian Importers Chambers of Commerce &amp; Industry
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" aria-hidden />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition"
                  aria-label="Twitter"
                >
                  <i className="fab fa-x-twitter" aria-hidden />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-full bg-navy-950/5 border border-navy-950/10 flex items-center justify-center text-navy-950/70 hover:text-gold hover:border-gold/40 transition"
                  aria-label="Email"
                >
                  <i className="fas fa-envelope" aria-hidden />
                </a>
              </div>
            </div>

            <Link
              href="/about/leadership"
              className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gold hover:text-gold-600 transition"
            >
              Meet full leadership
              <i className="fas fa-arrow-right text-xs" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresidentSection;
