"use client";

export const ContactSection = () => {
  return (
    <section className="relative section-padding overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Get in touch
            </h2>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/10">
                <i className="fas fa-location-dot text-gold mt-1 w-5" />
                <div>
                  <div className="text-white font-semibold mb-1">Global Headquarters</div>
                  <p className="text-white/60 leading-relaxed">
                    IICCI Tower, Connaught Place,
                    <br />
                    New Delhi 110001, India
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/10">
                <i className="fas fa-phone text-gold w-5" />
                <a href="tel:+911145678900" className="text-white/80 hover:text-gold transition">
                  +91 11 4567 8900
                </a>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/10">
                <i className="fas fa-envelope text-gold w-5" />
                <a href="mailto:info@iicci.global" className="text-white/80 hover:text-gold transition">
                  info@iicci.global
                </a>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/10">
                <i className="fas fa-clock text-gold w-5" />
                <span className="text-white/70">Mon – Sat, 9:00 – 18:00 IST</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl glass border border-white/10 p-8 md:p-10">
            <h3 className="font-display text-xl font-bold text-white mb-2">Send a message</h3>
            <p className="text-white/60 text-sm mb-6">
              Our team will respond within one business day.
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We will get back to you shortly.");
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-gold/40 placeholder:text-white/40"
                />
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-gold/40 placeholder:text-white/40"
                />
              </div>
              <input
                type="text"
                placeholder="Company / Organization"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-gold/40 placeholder:text-white/40"
              />
              <textarea
                required
                rows={5}
                placeholder="How can IICCI help you?"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-gold/40 placeholder:text-white/40 resize-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide btn-premium shadow-gold"
              >
                Submit inquiry
                <i className="fas fa-paper-plane text-xs" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
