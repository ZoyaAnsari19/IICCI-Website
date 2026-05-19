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

  const navLinkClass =
    'text-navy-900/85 hover:text-navy-950 transition-colors flex items-center gap-1.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 nav-link link-underline'

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 shadow-[0_2px_20px_rgba(8,17,32,0.08)]"
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-[#0a192f] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between text-xs text-white/90">
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
            <span className="flex items-center gap-2 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              50+ Global Chapters Active
            </span>
            <div className="flex items-center gap-3 text-white/80">
              <a href="#" className="hover:text-gold transition" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:text-gold transition" aria-label="Twitter">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" className="hover:text-gold transition" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gold transition" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gold transition" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav id="main-nav" className="bg-white transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-md bg-navy-950 flex flex-col items-center justify-center leading-none shadow-sm">
              <span className="font-display font-black text-gold text-[11px] tracking-tight">II</span>
              <span className="font-display font-bold text-gold/90 text-[8px] tracking-wider">CCI</span>
            </div>
            <div className="hidden sm:block leading-tight max-w-[200px] lg:max-w-none">
              <div className="font-serif font-bold text-navy-950 text-sm lg:text-[15px] tracking-tight leading-snug">
                IICCI
              </div>
              <div className="text-[9px] lg:text-[10px] text-gray-500 tracking-[0.12em] uppercase font-sans">
                Global Trade Chamber
              </div>
            </div>
          </a>

          {/* Menu - desktop */}
          <ul className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {menuItems.slice(0, 7).map((item) => (
              <li
                key={item.href ?? item.label}
                className={`has-mega-menu relative ${item.mega ? 'group' : ''}`}
              >
                <a href={item.href} className={navLinkClass}>
                  {item.label}
                  {item.mega && (
                    <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
                  )}
                </a>
                {item.mega === 'about' && (
                  <div className="mega-menu absolute top-full left-0 mt-2 w-[640px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: 'fa-building-columns', t: 'About IICCI', d: 'Our story, legacy & impact' },
                        { icon: 'fa-bullseye', t: 'Mission & Vision', d: 'Driving global trade forward' },
                        { icon: 'fa-user-tie', t: 'Leadership', d: 'Board & advisory council' },
                        { icon: 'fa-medal', t: 'Recognition', d: 'Awards & certifications' },
                        { icon: 'fa-handshake', t: 'Partnerships', d: 'Strategic global alliances' },
                        { icon: 'fa-flag', t: 'Manifesto', d: '1 Lakh Billionaires Vision' },
                      ].map((c) => (
                        <a
                          key={c.t}
                          href="#about"
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition group/item"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold-700 group-hover/item:bg-gold group-hover/item:text-white transition">
                            <i className={`fas ${c.icon} text-sm`}></i>
                          </div>
                          <div>
                            <div className="mega-item-title text-navy-950 text-sm font-semibold">{c.t}</div>
                            <div className="mega-item-desc text-gray-500 text-xs mt-0.5">{c.d}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {item.mega === 'services' && (
                  <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100">
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
                        <a
                          key={c.t}
                          href="#services"
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition group/item"
                        >
                          <div className="w-9 h-9 rounded-lg bg-royal/10 flex items-center justify-center text-royal group-hover/item:bg-gold group-hover/item:text-white transition">
                            <i className={`fas ${c.icon} text-sm`}></i>
                          </div>
                          <span className="mega-item-title text-navy-900 text-sm font-medium group-hover/item:text-navy-950">
                            {c.t}
                          </span>
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500">15+ enterprise services for global trade</span>
                      <a
                        href="#services"
                        className="text-gold-600 text-xs font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        View all services <i className="fas fa-arrow-right text-[10px]"></i>
                      </a>
                    </div>
                  </div>
                )}
                {item.mega === 'global' && (
                  <div className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-3">
                          Continents
                        </div>
                        <div className="space-y-2">
                          {['Asia Pacific', 'Europe & UK', 'Middle East', 'Africa', 'Americas'].map((c) => (
                            <a
                              key={c}
                              href="#global"
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition group/i"
                            >
                              <span className="text-navy-900/80 text-sm group-hover/i:text-navy-950">{c}</span>
                              <i className="fas fa-arrow-right text-[10px] text-gold opacity-0 group-hover/i:opacity-100 transition"></i>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-3">
                          Featured Chapters
                        </div>
                        <div className="space-y-2">
                          {[
                            { code: 'IN', n: 'New Delhi HQ' },
                            { code: 'AE', n: 'Dubai Chapter' },
                            { code: 'SG', n: 'Singapore Chapter' },
                            { code: 'US', n: 'New York Chapter' },
                            { code: 'GB', n: 'London Chapter' },
                          ].map((c) => (
                            <a
                              key={c.n}
                              href="#global"
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group/ch"
                            >
                              <span className="mega-chapter-code" aria-hidden>
                                {c.code}
                              </span>
                              <span className="mega-item-title text-navy-900 text-sm group-hover/ch:text-navy-950">
                                {c.n}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li className="has-mega-menu relative group">
              <button type="button" className={navLinkClass}>
                More <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
              </button>
              <div className="mega-menu absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl p-3 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100">
                {menuItems.slice(7).map((item) => (
                  <a
                    key={item.href ?? item.label}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-navy-900/80 hover:bg-gray-50 hover:text-navy-950 text-sm transition"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <button
              id="search-btn"
              type="button"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-navy-950 text-xs transition"
              aria-label="Search"
            >
              <i className="fas fa-search text-xs"></i>
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] bg-white border border-gray-200 rounded text-gray-500">
                ⌘K
              </kbd>
            </button>

            <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs">
              <i className="fas fa-globe text-gold text-[10px]"></i>
              <select className="bg-transparent text-navy-900/80 text-xs outline-none cursor-pointer">
                <option className="bg-white text-navy-950">EN</option>
                <option className="bg-white text-navy-950">हिं</option>
                <option className="bg-white text-navy-950">عربي</option>
                <option className="bg-white text-navy-950">中文</option>
              </select>
            </div>

            <button
              id="ai-toggle"
              type="button"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold-700 hover:bg-gold hover:text-white text-xs font-semibold transition"
            >
              <i className="fas fa-robot text-xs"></i>
              <span className="hidden lg:inline">AI Assistant</span>
            </button>

            <a
              href="#membership"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-950 text-white text-xs font-bold tracking-wide shadow-md hover:bg-navy-900 transition"
            >
              JOIN IICCI
              <i className="fas fa-arrow-right text-[10px]"></i>
            </a>

            {/* Mobile burger */}
            <button
              id="burger"
              type="button"
              className="xl:hidden w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-100 transition"
              aria-label="Menu"
            >
              <span className="block w-5 h-[1.5px] bg-navy-950 transition-all"></span>
              <span className="block w-5 h-[1.5px] bg-navy-950 transition-all"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="mobile-menu fixed top-0 right-0 h-screen w-full sm:w-96 bg-white border-l border-gray-200 z-50 xl:hidden overflow-y-auto shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-serif font-bold text-navy-950 text-lg">Menu</span>
            <button
              id="close-mobile"
              type="button"
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-navy-950 hover:bg-gray-50 hover:text-gold transition"
            >
              <i className="fas fa-xmark"></i>
            </button>
          </div>
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={item.href ?? item.label}>
                <a
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-xl text-navy-900/80 hover:text-navy-950 hover:bg-gray-50 transition group"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-gold text-xs font-mono">0{i + 1}</span>
                    <span className="text-base">{item.label}</span>
                  </span>
                  <i className="fas fa-arrow-right text-xs text-gold opacity-0 group-hover:opacity-100 transition"></i>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href="#membership"
              className="block w-full py-3 rounded-full bg-navy-950 text-white text-sm font-bold text-center shadow-md hover:bg-navy-900 transition"
            >
              JOIN IICCI
            </a>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
              <a href="tel:+911145678900" className="flex items-center gap-2 hover:text-navy-950">
                <i className="fas fa-phone text-gold"></i> Call us
              </a>
              <a href="mailto:info@iicci.global" className="flex items-center gap-2 hover:text-navy-950">
                <i className="fas fa-envelope text-gold"></i> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
