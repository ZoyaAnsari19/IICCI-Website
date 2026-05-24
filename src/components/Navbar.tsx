"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ABOUT_NAV } from "@/config/about-navigation";
import { MORE_NAV } from "@/config/more-navigation";

type MenuItem = {
  label: string;
  href?: string;
  mega?: "about" | "services" | "global";
  triggerOnly?: boolean;
};

const menuItems: MenuItem[] = [
  { label: "About", mega: "about", triggerOnly: true },
  { label: "Membership", href: "#membership" },
  { label: "Services", href: "#services", mega: "services" },
  { label: "Trade Verticals", href: "#industry-verticals" },
  { label: "Global Presence", href: "#global", mega: "global" },
  { label: "Events", href: "#events" },
  { label: "Media", href: "#media" },
];

const navLinkClass =
  "text-navy-900/85 hover:text-navy-950 transition-colors flex items-center gap-1.5 py-2 px-2.5 rounded-lg hover:bg-gray-100 nav-link link-underline";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const prevPathRef = useRef(pathname);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMegaMenu = useCallback(() => setOpenMega(null), []);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setOpenMega(null);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    window.__closeMobileMenu = closeMobile;
    return () => {
      delete window.__closeMobileMenu;
    };
  }, [closeMobile]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMobile]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) closeMobile();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMobile]);

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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group shrink-0 min-w-0"
            aria-label="IICCI — Indian Importers Chambers of Commerce and Industry"
          >
            <Image
              src="/images/logoiicifinal.jpg"
              alt="IICCI — Indian Importers Chambers of Commerce and Industry — Together We Progress"
              width={245}
              height={122}
              priority
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
              className="h-10 sm:h-11 lg:h-12 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Menu - desktop */}
          <ul className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {menuItems.slice(0, 7).map((item) => (
              <li
                key={item.href ?? item.label}
                className={`has-mega-menu relative ${item.mega ? "group" : ""}`}
                onMouseEnter={item.mega ? () => setOpenMega(item.mega!) : undefined}
                onMouseLeave={item.mega ? closeMegaMenu : undefined}
              >
                {item.triggerOnly ? (
                  <button
                    type="button"
                    className={navLinkClass}
                    aria-haspopup="true"
                  >
                    {item.label}
                    {item.mega && (
                      <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
                    )}
                  </button>
                ) : item.href?.startsWith("/") ? (
                  <Link href={item.href} className={navLinkClass}>
                    {item.label}
                    {item.mega && (
                      <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
                    )}
                  </Link>
                ) : (
                  <a href={item.href} className={navLinkClass}>
                    {item.label}
                    {item.mega && (
                      <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
                    )}
                  </a>
                )}
                {item.mega === "about" && (
                  <div
                    className={cx(
                      "mega-menu absolute top-full left-0 mt-2 w-[640px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100",
                      openMega === "about" && "is-open",
                    )}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {ABOUT_NAV.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition group/item"
                          onClick={closeMegaMenu}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-gold-700 group-hover/item:bg-gold group-hover/item:text-white transition">
                            <i className={`fas ${c.icon} text-sm`}></i>
                          </div>
                          <div>
                            <div className="mega-item-title text-navy-950 text-sm font-semibold">
                              {c.title}
                            </div>
                            <div className="mega-item-desc text-gray-500 text-xs mt-0.5">
                              {c.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {item.mega === "services" && (
                  <div
                    className={cx(
                      "mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100",
                      openMega === "services" && "is-open",
                    )}
                  >
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: "fa-globe", t: "Trade Facilitation" },
                        { icon: "fa-ship", t: "Import Export" },
                        { icon: "fa-certificate", t: "Global Certification" },
                        { icon: "fa-briefcase", t: "Placement Program" },
                        { icon: "fa-microchip", t: "AI & ML Services" },
                        { icon: "fa-people-arrows", t: "Business Matchmaking" },
                        { icon: "fa-handshake-angle", t: "Bilateral Trade" },
                        { icon: "fa-chart-line", t: "Market Research" },
                        { icon: "fa-link", t: "Joint Ventures" },
                      ].map((c) => (
                        <a
                          key={c.t}
                          href="#services"
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition group/item"
                          onClick={closeMegaMenu}
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
                        onClick={closeMegaMenu}
                      >
                        View all services <i className="fas fa-arrow-right text-[10px]"></i>
                      </a>
                    </div>
                  </div>
                )}
                {item.mega === "global" && (
                  <div
                    className={cx(
                      "mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl p-6 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100",
                      openMega === "global" && "is-open",
                    )}
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-3">
                          Continents
                        </div>
                        <div className="space-y-2">
                          {["Asia Pacific", "Europe & UK", "Middle East", "Africa", "Americas"].map(
                            (c) => (
                              <a
                                key={c}
                                href="#global"
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition group/i"
                                onClick={closeMegaMenu}
                              >
                                <span className="text-navy-900/80 text-sm group-hover/i:text-navy-950">
                                  {c}
                                </span>
                                <i className="fas fa-arrow-right text-[10px] text-gold opacity-0 group-hover/i:opacity-100 transition"></i>
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-3">
                          Featured Chapters
                        </div>
                        <div className="space-y-2">
                          {[
                            { code: "IN", n: "New Delhi HQ" },
                            { code: "AE", n: "Dubai Chapter" },
                            { code: "SG", n: "Singapore Chapter" },
                            { code: "US", n: "New York Chapter" },
                            { code: "GB", n: "London Chapter" },
                          ].map((c) => (
                            <a
                              key={c.n}
                              href="#global"
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group/ch"
                              onClick={closeMegaMenu}
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
            <li
              className="has-mega-menu relative group"
              onMouseEnter={() => setOpenMega("more")}
              onMouseLeave={closeMegaMenu}
            >
              <button type="button" className={navLinkClass} aria-haspopup="true">
                More <i className="fas fa-chevron-down text-[9px] text-navy-900/50"></i>
              </button>
              <div
                className={cx(
                  "mega-menu absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl p-3 shadow-[0_12px_48px_rgba(8,17,32,0.12)] border border-gray-100",
                  openMega === "more" && "is-open",
                )}
              >
                {MORE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 rounded-lg text-navy-900/80 hover:bg-gray-50 hover:text-navy-950 text-sm transition"
                    onClick={() => {
                      closeMegaMenu();
                      closeMobile();
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
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
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-navy-950 text-white text-[10px] sm:text-xs font-bold tracking-wide shadow-md hover:bg-navy-900 transition"
            >
              JOIN
              <span className="hidden md:inline">IICCI</span>
              <i className="fas fa-arrow-right text-[10px]"></i>
            </a>

            {/* Mobile burger */}
            <button
              id="burger"
              type="button"
              className="xl:hidden w-10 h-10 rounded-lg border border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-100 transition"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => (mobileOpen ? closeMobile() : openMobile())}
            >
              <span
                className={cx(
                  "block w-5 h-[1.5px] bg-navy-950 transition-all origin-center",
                  mobileOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cx(
                  "block w-5 h-[1.5px] bg-navy-950 transition-all",
                  mobileOpen && "opacity-0 scale-0",
                )}
              />
              <span
                className={cx(
                  "block w-5 h-[1.5px] bg-navy-950 transition-all origin-center",
                  mobileOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <button
        type="button"
        className={cx(
          "fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-label="Close menu"
        onClick={closeMobile}
        tabIndex={mobileOpen ? 0 : -1}
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cx(
          "mobile-menu fixed top-0 right-0 h-[100dvh] w-[min(100%,20rem)] sm:w-96 bg-white border-l border-gray-200 z-[70] xl:hidden overflow-y-auto shadow-2xl",
          mobileOpen && "open",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="p-5 sm:p-6 pb-8">
          <div className="flex items-center justify-between mb-6 gap-3">
            <a
              href="#home"
              className="flex items-center min-w-0 shrink"
              onClick={closeMobile}
              aria-label="IICCI home"
            >
              <Image
                src="/images/logoiicifinal.jpg"
                alt="IICCI — Indian Importers Chambers of Commerce and Industry"
                width={245}
                height={122}
                sizes="180px"
                className="h-10 w-auto object-contain select-none"
              />
            </a>
            <button
              id="close-mobile"
              type="button"
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-navy-950 hover:bg-gray-50 hover:text-gold transition shrink-0"
              aria-label="Close menu"
              onClick={closeMobile}
            >
              <i className="fas fa-xmark"></i>
            </button>
          </div>

          <ul className="space-y-0.5">
            {menuItems.map((item, i) => {
              const itemClass =
                "flex items-center justify-between p-3 rounded-xl text-navy-900/80 hover:text-navy-950 hover:bg-gray-50 active:bg-gray-100 transition";
              const itemInner = (
                <>
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-gold text-xs font-mono shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base truncate">{item.label}</span>
                  </span>
                  <i className="fas fa-arrow-right text-xs text-gold shrink-0"></i>
                </>
              );
              const mobileTriggerInner = (
                <>
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-gold text-xs font-mono shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base truncate">{item.label}</span>
                  </span>
                  <i className="fas fa-chevron-down text-xs text-gold shrink-0"></i>
                </>
              );
              return (
              <li key={item.href ?? item.label}>
                {item.triggerOnly ? (
                  <button
                    type="button"
                    className={`${itemClass} w-full text-left`}
                    aria-haspopup="true"
                  >
                    {mobileTriggerInner}
                  </button>
                ) : item.href?.startsWith("/") ? (
                  <Link href={item.href} className={itemClass} onClick={closeMobile}>
                    {itemInner}
                  </Link>
                ) : (
                  <a href={item.href} className={itemClass} onClick={closeMobile}>
                    {itemInner}
                  </a>
                )}
                {item.mega === "about" && (
                  <ul className="mt-1 mb-2 ml-4 pl-4 border-l border-gray-200 space-y-0.5">
                    {ABOUT_NAV.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block py-2 px-3 rounded-lg text-sm text-navy-900/70 hover:text-gold hover:bg-gray-50 transition"
                          onClick={closeMobile}
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              );
            })}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-navy-900/50 font-bold">
              More
            </div>
            <ul className="space-y-0.5">
              {MORE_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between p-3 rounded-xl text-navy-900/80 hover:text-navy-950 hover:bg-gray-50 transition"
                    onClick={closeMobile}
                  >
                    <span className="flex items-center gap-3">
                      <i className={cx("fas", item.icon, "text-gold text-xs w-4 text-center")} />
                      <span className="text-sm font-medium">{item.title}</span>
                    </span>
                    <i className="fas fa-arrow-right text-xs text-gold shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
            <a
              href="#membership"
              className="block w-full py-3.5 rounded-full bg-navy-950 text-white text-sm font-bold text-center shadow-md hover:bg-navy-900 active:scale-[0.98] transition"
              onClick={closeMobile}
            >
              JOIN IICCI
            </a>

            <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
              <a
                href="tel:+911145678900"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:text-navy-950 transition"
              >
                <i className="fas fa-phone text-gold w-4 text-center"></i>
                +91 11 4567 8900
              </a>
              <a
                href="mailto:info@iicci.global"
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 hover:text-navy-950 transition"
              >
                <i className="fas fa-envelope text-gold w-4 text-center"></i>
                info@iicci.global
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 text-navy-900/70">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
