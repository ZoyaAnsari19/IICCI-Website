"use client"

export const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-navy-950 border-t border-white/5">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-3xl rounded-full"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Newsletter top section */}
        <div className="py-16 lg:py-20 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                Stay ahead of global trade.
              </h3>
              <p className="text-white/60 max-w-md">
                Get weekly insights on bilateral trade, policy changes, and exclusive IICCI opportunities — straight to your inbox.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3 mb-4" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Welcome to the IICCI community."); }}>
                <div className="flex-1 relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm"></i>
                  <input type="email" required placeholder="Enter your work email" className="w-full pl-11 pr-4 py-4 rounded-full glass-dark border border-white/10 focus:border-gold/40 text-white placeholder:text-white/40 text-sm outline-none transition" />
                </div>
                <button type="submit" className="px-7 py-4 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold tracking-wide btn-premium btn-shine shadow-gold whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-[11px] text-white/40">
                We respect your privacy. Unsubscribe anytime. Read our <a href="#" className="text-gold hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-16 grid lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold via-gold-300 to-gold-600 p-[1.5px]">
                <div className="w-full h-full rounded-lg bg-navy-950 flex items-center justify-center">
                  <span className="font-display font-black text-gold text-lg">II</span>
                </div>
              </div>
              <div>
                <div className="font-display font-bold text-white">IICCI</div>
                <div className="text-[10px] text-white/50 tracking-[0.15em] uppercase">Global Trade Chamber</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-sm">
              Indian Importers Chambers of Commerce & Industry — the premier apex body connecting India to global trade opportunities since 1978.
            </p>

            <div className="space-y-2 text-sm text-white/70 mb-6">
              <div className="flex items-start gap-3">
                <i className="fas fa-location-dot text-gold mt-1 w-4"></i>
                <div>
                  <div className="text-white">Global Headquarters</div>
                  <div className="text-xs text-white/60">IICCI Tower, Connaught Place,<br />New Delhi 110001, India</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-phone text-gold w-4"></i>
                <a href="tel:+911145678900" className="hover:text-gold transition">+91 11 4567 8900</a>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-envelope text-gold w-4"></i>
                <a href="mailto:info@iicci.global" className="hover:text-gold transition">info@iicci.global</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { i: 'fa-linkedin-in', t: 'fab' },
                { i: 'fa-x-twitter', t: 'fab' },
                { i: 'fa-facebook-f', t: 'fab' },
                { i: 'fa-instagram', t: 'fab' },
                { i: 'fa-youtube', t: 'fab' },
                { i: 'fa-whatsapp', t: 'fab' },
              ].map((s) => (
                <a key={s.i} href="#" className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40 transition">
                  <i className={`${s.t} ${s.i} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Chamber</div>
              <ul className="space-y-2.5 text-sm">
                {['About IICCI', 'Leadership', 'Mission & Vision', 'Manifesto', 'Annual Reports', 'Careers'].map((l) => (
                  <li key={l}><a href="#" className="text-white/60 hover:text-white transition link-underline">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Services</div>
              <ul className="space-y-2.5 text-sm">
                {['Trade Facilitation', 'Foreign Desk', 'Certifications', 'Training', 'Drone Pilot', 'Matchmaking'].map((l) => (
                  <li key={l}><a href="#" className="text-white/60 hover:text-white transition link-underline">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Resources</div>
              <ul className="space-y-2.5 text-sm">
                {['Trade Reports', 'Market Intelligence', 'Policy Updates', 'Media Center', 'Events', 'Download Center'].map((l) => (
                  <li key={l}><a href="#" className="text-white/60 hover:text-white transition link-underline">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-4">Global Offices</div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { f: '🇮🇳', n: 'New Delhi (HQ)' },
                  { f: '🇦🇪', n: 'Dubai' },
                  { f: '🇸🇬', n: 'Singapore' },
                  { f: '🇬🇧', n: 'London' },
                  { f: '🇺🇸', n: 'New York' },
                  { f: '🇯🇵', n: 'Tokyo' },
                ].map((l) => (
                  <li key={l.n ?? l}><a href="#" className="text-white/60 hover:text-white transition flex items-center gap-2"><span>{l.f}</span> {l.n}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/50">
            © 2025 Indian Importers Chambers of Commerce & Industry. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-xs text-white/60">
            <a href="#" className="hover:text-gold transition">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition">Terms of Service</a>
            <a href="#" className="hover:text-gold transition">Cookie Policy</a>
            <a href="#" className="hover:text-gold transition">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Massive watermark */}
      <div className="pointer-events-none select-none -mb-10 lg:-mb-20 text-center overflow-hidden">
        <div className="font-display font-black text-transparent leading-none tracking-tighter" style={{ fontSize: "clamp(6rem, 18vw, 18rem)", background: "linear-gradient(180deg, rgba(212,175,55,0.1) 0%, transparent 90%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
          IICCI
        </div>
      </div>
    </footer>
  )
}
