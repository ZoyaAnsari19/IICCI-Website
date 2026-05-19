export const Navbar = () => {
  const menuItems = [
    { label: 'About', href: '#about', mega: 'about' },
    { label: 'Membership', href: '#membership' },
    { label: 'Services', href: '#services', mega: 'services' },
    { label: 'Trade Verticals', href: '#verticals' },
    { label: 'Global Presence', href: '#global', mega: 'global' },
    { label: 'Events', href: '#events' },
    { label: 'Media', href: '#media' },
    { label: 'CSR & SDG', href: '#csr' },
    { label: 'AI & Innovation', href: '#ai' },
    { label: 'Women Wing', href: '#women' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top bar */}
      <div className="hidden lg:block border-b border-white/5 bg-navy-950/60 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-phone text-gold text-[10px]"></i>
              +91 11 4567 8900
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-envelope text-gold text-[10px]"></i>
              info@iicci.global
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-clock text-gold text-[10px]"></i>
              Mon - Sat, 9:00 - 18:00 IST
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              50+ Global Chapters Active
            </span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-gold transition" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-gold transition" aria-label="Twitter"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="hover:text-gold transition" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gold transition" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-gold transition" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav id="main-nav" className="transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold via-gold-300 to-gold-600 p-[1.5px] shadow-gold">
                <div className="w-full h-full rounded-lg bg-navy-950 flex items-center justify-center">
                  <span className="font-display font-black text-gold text-lg">II</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse"></div>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display font-bold text-white text-base tracking-tight">IICCI</div>
              <div className="text-[10px] text-white/50 tracking-[0.15em] uppercase">Global Trade Chamber</div>
            </div>
          </a>

          {/* Menu - desktop */}
          <ul className="hidden xl:flex items-center gap-7 text-sm font-medium">
            {menuItems.slice(0, 7).map((item) => (
              <li key={item.href ?? item.label} className={`has-mega-menu relative ${item.mega ? 'group' : ''}`}>
                <a href={item.href} className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 link-underline py-2">
                  {item.label}
                  {item.mega && <i className="fas fa-chevron-down text-[9px] opacity-60"></i>}
                </a>
                {item.mega === 'about' && (
                  <div className="mega-menu absolute top-full left-0 mt-2 w-[640px] glass-dark rounded-2xl p-6 shadow-premium border border-white/10">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: 'fa-building-columns', t: 'About IICCI', d: 'Our story, legacy & impact' },
                        { icon: 'fa-bullseye', t: 'Mission & Vision', d: 'Driving global trade forward' },
                        { icon: 'fa-user-tie', t: 'Leadership', d: 'Board & advisory council' },
                        { icon: 'fa-medal', t: 'Recognition', d: 'Awards & certifications' },
                        { icon: 'fa-handshake', t: 'Partnerships', d: 'Strategic global alliances' },
                        { icon: 'fa-flag', t: 'Manifesto', d: '1 Lakh Billionaires Vision' },
                      ].map((c) => (
                        <a key={c.t} href="#about" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition group/item">
                          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover/item:bg-gold group-hover/item:text-navy-950 transition">
                            <i className={`fas ${c.icon} text-sm`}></i>
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">{c.t}</div>
                            <div className="text-white/50 text-xs mt-0.5">{c.d}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {item.mega === 'services' && (
                  <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] glass-dark rounded-2xl p-6 shadow-premium border border-white/10">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: 'fa-globe', t: 'Trade Facilitation' },
                        { icon: 'fa-ship', t: 'Import Export' },
                        { icon: 'fa-certificate', t: 'Global Certification' },
                        { icon: 'fa-briefcase', t: 'Placement Program' },
                        { icon: 'fa-microchip', t: 'AI & ML Services' },
                        { icon: 'fa-people-arrows', t: 'Business Matchmaking' },
                        { icon: 'fa-handshake-angle', t: 'Bilateral Trade' },
                        { icon: 'fa-chart-line', t: 'Market Research' },
                        { icon: 'fa-link', t: 'Joint Ventures' },
                      ].map((c) => (
                        <a key={c.t} href="#services" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition group/item">
                          <div className="w-9 h-9 rounded-lg bg-royal/10 flex items-center justify-center text-royal-light group-hover/item:bg-gold group-hover/item:text-navy-950 transition">
                            <i className={`fas ${c.icon} text-sm`}></i>
                          </div>
                          <span className="text-white/80 text-sm font-medium group-hover/item:text-white">{c.t}</span>
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-white/50">15+ enterprise services for global trade</span>
                      <a href="#services" className="text-gold text-xs font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                        View all services <i className="fas fa-arrow-right text-[10px]"></i>
                      </a>
                    </div>
                  </div>
                )}
                {item.mega === 'global' && (
                  <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] glass-dark rounded-2xl p-6 shadow-premium border border-white/10">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold mb-3">Continents</div>
                        <div className="space-y-2">
                          {['Asia Pacific', 'Europe & UK', 'Middle East', 'Africa', 'Americas'].map((c) => (
                            <a key={c} href="#global" className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition group/i">
                              <span className="text-white/80 text-sm group-hover/i:text-white">{c}</span>
                              <i className="fas fa-arrow-right text-[10px] text-gold opacity-0 group-hover/i:opacity-100 transition"></i>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold mb-3">Featured Chapters</div>
                        <div className="space-y-2">
                          {[
                            { f: '🇮🇳', n: 'New Delhi HQ' },
                            { f: '🇦🇪', n: 'Dubai Chapter' },
                            { f: '🇸🇬', n: 'Singapore Chapter' },
                            { f: '🇺🇸', n: 'New York Chapter' },
                            { f: '🇬🇧', n: 'London Chapter' },
                          ].map((c) => (
                            <a key={c.n} href="#global" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                              <span className="text-xl">{c.f}</span>
                              <span className="text-white/80 text-sm">{c.n}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="relative group">
              <button className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5 link-underline py-2">
                More <i className="fas fa-chevron-down text-[9px] opacity-60"></i>
              </button>
              <div className="mega-menu absolute top-full right-0 mt-2 w-64 glass-dark rounded-2xl p-3 shadow-premium border border-white/10">
                {menuItems.slice(7).map((item) => (
                  <a key={item.href ?? item.label} href={item.href} className="block px-3 py-2 rounded-lg text-white/80 hover:bg-white/5 hover:text-white text-sm transition">{item.label}</a>
                ))}
              </div>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button id="search-btn" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full glass text-white/70 hover:text-white text-xs transition" aria-label="Search">
              <i className="fas fa-search text-xs"></i>
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] bg-white/10 rounded">⌘K</kbd>
            </button>

            <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full glass text-white/70 text-xs">
              <i className="fas fa-globe text-gold text-[10px]"></i>
              <select className="bg-transparent text-white/80 text-xs outline-none cursor-pointer">
                <option className="bg-navy-900">EN</option>
                <option className="bg-navy-900">हिं</option>
                <option className="bg-navy-900">عربي</option>
                <option className="bg-navy-900">中文</option>
              </select>
            </div>

            <button id="ai-toggle" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-gold hover:bg-gold hover:text-navy-950 text-xs font-semibold transition btn-shine">
              <i className="fas fa-robot text-xs"></i>
              <span className="hidden lg:inline">AI Assistant</span>
            </button>

            <a href="#membership" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-navy-950 text-xs font-bold tracking-wide btn-premium btn-shine shadow-gold">
              JOIN IICCI
              <i className="fas fa-arrow-right text-[10px]"></i>
            </a>

            {/* Mobile burger */}
            <button id="burger" className="xl:hidden w-10 h-10 rounded-lg glass flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition" aria-label="Menu">
              <span className="block w-5 h-[1.5px] bg-white transition-all"></span>
              <span className="block w-5 h-[1.5px] bg-white transition-all"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className="mobile-menu fixed top-0 right-0 h-screen w-full sm:w-96 bg-navy-950/98 backdrop-blur-2xl border-l border-white/10 z-50 xl:hidden overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold text-white text-lg">Menu</span>
            <button id="close-mobile" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-white hover:text-gold transition">
              <i className="fas fa-xmark"></i>
            </button>
          </div>
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={item.href ?? item.label}>
                <a href={item.href} className="flex items-center justify-between p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition group">
                  <span className="flex items-center gap-3">
                    <span className="text-gold text-xs font-mono">0{i + 1}</span>
                    <span className="text-base">{item.label}</span>
                  </span>
                  <i className="fas fa-arrow-right text-xs text-gold opacity-0 group-hover:opacity-100 transition"></i>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-white/10">
            <a href="#membership" className="block w-full py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold text-center btn-premium">JOIN IICCI</a>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/60">
              <a href="tel:+911145678900" className="flex items-center gap-2"><i className="fas fa-phone text-gold"></i> Call us</a>
              <a href="mailto:info@iicci.global" className="flex items-center gap-2"><i className="fas fa-envelope text-gold"></i> Email</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
