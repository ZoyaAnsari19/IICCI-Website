# Changelog

## [21-05-2026 11:25] — Media section local MoU images

**What changed:** Replaced the featured media card and first two grid cards with local MoU signing photos (`/images/img1.png`, `img2.png`, `img3.png`) and updated titles, dates, and categories to match the signing ceremony content.
**Files touched:** `src/components/Media.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 11:15] — Services 6 cards on desktop

**What changed:** Services section shows 6 cards before “View all” on desktop (lg+, 1024px); mobile and tablet still show 4. Responsive count updates on viewport resize.
**Files touched:** `src/components/Services.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 11:08] — About mission card text clip fix

**What changed:** Fixed “Our Mission” bento card body text being cut off on mobile by replacing fixed `auto-rows-[140px]` with `minmax(140px, auto)` so grid rows grow with content, and removing `row-span-2` on small screens so the card height is not capped at 280px.
**Files touched:** `src/components/About.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 11:00] — Directory search filters row align

**What changed:** Member Directory search bar layout: search input on its own row on mobile; “All Sectors”, “All Countries”, and “Search” button aligned on one row with the button to the right of the filters (no longer wrapping below).
**Files touched:** `src/components/Directory.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 10:50] — Services show 4 + View all

**What changed:** Services section now displays only the first 4 service cards by default; a centered “View all” button below reveals the remaining 11 cards on click. Converted `Services.tsx` to a client component with expand state.
**Files touched:** `src/components/Services.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 10:42] — Stats mobile 2-column grid

**What changed:** Stats cards now show two per row on all mobile widths (default 2-column grid instead of 1). Added compact mobile card padding, icon, and typography so each card fits the narrower column like the reference layout.
**Files touched:** `public/static/style.css`, `src/components/Stats.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 10:35] — Fix 5th stats card hover

**What changed:** Fixed the 5th “Business Matchmakings” stat card not showing hover (lift, gold border, icon fill) because the stats section’s `z-10` trapped cards below fixed float buttons (`z-40`) on the right. Removed section `z-10`, raised hovered grid items to `z-index: 45`, and strengthened hover transform rules against `reveal-up` overrides.
**Files touched:** `src/components/Stats.tsx`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 10:27] — Swap leadership card order

**What changed:** Swapped the position of the two leadership cards in the Core Team section so Mr. T.K. Pandey (Director) now appears first and Mrs. Geeta Kumar (Trustee) second, by reordering them in the `TEAM` array in `CoreTeam.tsx`.
**Files touched:** `src/components/CoreTeam.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [19-05-2026 19:35] — Stats section white theme + 5th card hover fix

**What changed:** Switched the "By the Numbers" stats section to a white background with navy text and light glass cards. Fixed the 5th stat card hover not working: raised `.stats-card:hover` z-index above fixed float buttons (z-40) and overrode `reveal-up` transform so lift/border/shadow effects apply on hover for all cards including the rightmost one.
**Files touched:** `src/components/Stats.tsx`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [19-05-2026 19:20] — Smaller hero headline

**What changed:** Reduced the hero `.hero-title` font-size from `clamp(2.5rem, 7vw, 6.5rem)` to `clamp(2rem, 5.5vw, 5rem)` so the main headline ("Connecting India to Global Trade Opportunities.") feels lighter and better balanced against the surrounding content. Line-height and tracking unchanged.
**Files touched:** `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [19-05-2026 16:56] — Orbital satellites around hero globe

**What changed:** Replaced the three static floating chips ("Delegation", "Live Trades", "Bilateral") in the hero with a smooth, infinite orbital satellite system. Each card now travels around the central globe on its own circular path at a unique radius, speed, and direction, with a counter-rotation keeping the card upright, a soft eased bob for life, and a layered drop-shadow glow tinted in the existing dark blue + gold palette. Subtle dashed orbit guide rings and a `prefers-reduced-motion` fallback are included. The "10K+ Members" card is preserved as a static anchor.
**Files touched:** `src/app/globals.css`, `src/components/Hero.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---
