"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ABOUT_NAV } from "@/config/about-navigation";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function AboutSubnav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="About section navigation"
      className="sticky top-[var(--nav-offset,72px)] z-40 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto no-scrollbar py-3">
          {ABOUT_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/about" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.16em] font-bold transition duration-300",
                  isActive
                    ? "bg-gold text-navy-950 shadow-gold"
                    : "text-white/65 hover:text-gold hover:bg-white/5 border border-transparent hover:border-white/10",
                )}
                aria-current={isActive ? "page" : undefined}
                scroll
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className={cx("fas", item.icon, "text-[10px]")} />
                <span className="whitespace-nowrap">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
