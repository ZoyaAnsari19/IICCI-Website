# Changelog

## [23-05-2026 18:00] — About mega-menu dedicated pages & folder structure

**What changed:** Implemented proper Next.js App Router structure under `src/app/about/` so each About mega-menu tab opens its own page with the matching section(s). Routes: `/about` (About IICCI + `About` section), `/about/mission-vision` (`MissionVisionSection`), `/about/leadership` (President, Mentor's Foreword, Org Structure, Honorary Directors, Our Team), `/about/recognition` (new `RecognitionSection`), `/about/partnerships` (new `PartnershipsSection`), `/about/manifesto` (`Manifesto`). Shared `src/app/about/layout.tsx` wraps all pages with `SitePageShell` (Loader, Navbar, Footer, Floats) + sticky `AboutSubnav` tab bar. Added `src/config/about-navigation.ts` as single source of truth for mega-menu links. Added `SubpageHero` (breadcrumb + title), `RecognitionSection`, `PartnershipsSection`. Legacy `/leadership` redirects to `/about/leadership`. Navbar mega-menu and mobile About sub-links now use `Link` + `ABOUT_NAV`; main About nav → `/about`; logo → `/`. Footer chamber links updated to `/about/*` paths. Added `id="manifesto"` on Manifesto component.
**Files touched:** `src/app/about/**`, `src/app/leadership/page.tsx`, `src/config/about-navigation.ts`, `src/components/layouts/*`, `src/components/RecognitionSection.tsx`, `src/components/PartnershipsSection.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/Manifesto.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 17:35] — Our Team section & dedicated Leadership page

**What changed:** Added premium `OurTeamSection` (`id="our-team"`) showcasing IICCI's operational staff across six departments (Trade Facilitation, Membership, Operations, Research, Administration, International Coordination) in a responsive 1→2→3→4 column photo-grid with glassmorphism cards, portrait zoom, department badge, designation, bio, LinkedIn/contact icons, mouse-tracking spotlight hover, expandable profile modal, animated team stats (members, departments, support, chapters), and department filter tabs with layout transitions. Includes 8 team members (4 from existing Core Team assets + 4 department representatives). Created dedicated `/leadership` page (`src/app/leadership/page.tsx`) with `LeadershipHero`, President, Mentor's Foreword, Mission & Vision, Organizational Structure, Honorary Directors, and Our Team (Our Team placed immediately after Honorary Directors). Added `LeadershipHero` intro component. Updated Navbar mega-menu Leadership link to `/leadership` and Footer chamber links (Leadership → `/leadership`, Mission & Vision → `/#mission-vision`, About → `/#about`).
**Files touched:** `src/components/OurTeamSection.tsx`, `src/components/LeadershipHero.tsx`, `src/app/leadership/page.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 17:20] — Honorary Directors executive leadership showcase

**What changed:** Added a premium `HonoraryDirectorsSection` (`id="honorary-directors"`) placed immediately after Organizational Structure and before Manifesto. Header includes "Executive Council / Honorary Board" glass badge, `display-title` heading "Honorary" + gradient-gold italic serif "Directors", and tagline "Distinguished Leaders Guiding IICCI's Global Vision." Six distinguished leaders in a responsive 1→2→3 column equal-height card grid (`DirectorCard` reusable component): professional portrait (`aspect-[4/5]`, image zoom on hover, gradient overlay, "Honorary" badge, initials fallback), full name, designation, expertise sector line, 2–3 line bio (`line-clamp-3`), LinkedIn icon, and "Read full profile" CTA. Cards use glassmorphism (`bg-navy-950/45 backdrop-blur-xl`), `shadow-premium` → `shadow-gold` on hover, lift (`-translate-y-1`), mouse-tracking spotlight radial glow via `--mx`/`--my`, and shimmer sweep on portrait. `DirectorBioModal` opens on profile click with full bio, expertise, and LinkedIn link. Backdrop: world-map/trade-route SVG, `bg-grid` fade, drifting gold + royal blur blobs, floating particles. Framer Motion staggered fade-up card reveal, modal enter/exit. Closes with assurance pills (6 honorary directors / institutional credibility). Wired into `src/app/page.tsx` after `<OrganizationalStructureSection />`.
**Files touched:** `src/components/HonoraryDirectorsSection.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 17:05] — Organizational Structure interactive governance section

**What changed:** Added a premium interactive `OrganizationalStructureSection` (`id="organizational-structure"`) immediately after Core Team / Leadership. The section visualizes IICCI’s full 10-tier governance hierarchy as an animated connected node-tree — not a static list — with glassmorphism cards, world-map/trade-route SVG backdrop, `bg-grid` fade, drifting gold + royal blur blobs, floating particles, and animated network flow lines (vertical dashed spine + triple-branch connector). Hierarchy tiers: Board of Advisors & Mentors → President (pulsing gold featured card) → Vice Presidents → Secretary General / Director General → Governing Council / Executive Committee → Honorary Directors → Sector Cell Heads / State Chapter Chairpersons / International Chapter Heads (3-column branch with horizontal connector) → Membership, Operations & Support Teams. Each `OrgNodeCard` includes role title, description, Font Awesome icon, hover radial glow, click-to-expand inline detail panel, and keyboard-accessible toggle; desktop also shows a sticky “Selected Role” summary panel. Desktop: vertical org-chart with animated `ConnectorStem` lines (traveling gold dot), center spine, tier labels, and staggered Framer Motion reveal. Mobile: vertically stacked cards with gold dot/line dividers. Animations use `[0.16, 1, 0.3, 1]` ease, `viewport={{ once: true }}`, node scale-in, pathLength line draw, and subtle pulse on the President node. Closes with two glass assurance pills (10-tier hierarchy / global chapter network). Wired into `src/app/page.tsx` after `<CoreTeam />` and before `<Manifesto />`.
**Files touched:** `src/components/OrganizationalStructureSection.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 16:44] — Mission & Vision brand-defining section

**What changed:** Added a dedicated, premium `MissionVisionSection` (`id="mission-vision"`) placed between the About + Objectives section and the President's Foreword. Header carries an "IICCI Compass / Purpose & Promise" glass badge, the `display-title` heading "Mission &" + gradient-gold italic serif "Vision", and the tagline pull-quote "Our Purpose and Our Promise." Layout is a two-column lg split (`flex-col lg:flex-row`) with a dedicated 24px `CenterDivider` column: vertical gradient gold rail with a continuously falling gold light beam, a glassmorphism compass medallion in the middle (`glass-dark`, gold/royal radial inner, animated `boxShadow` gold pulse), plus two gold dots at the rail end-points; on mobile it becomes a horizontal `MobileDivider` with the same medallion. Left `MissionCard` uses the existing IICCI Mission-card language (gold gradient icon tile + bullseye, `border-gold/15`, navy gradient bg, `shadow-premium`, top-right gold blur blob, faint `bg-grid`, radial hover halo) with the official mission copy and a 4-up pillar chip grid (Policy Advocacy / Market Intelligence / Trade Facilitation / Global Collaboration). Right `VisionCard` mirrors the About vision-card language (royal→royal-dark→navy gradient bg, glass icon tile with `fa-eye` gold accent, `border-white/10` → gold on hover, bottom-left gold blur blob, brighter `bg-grid`) with both Vision paragraphs from the spec and a 3-tile metric grid (Global Recognition / Bilateral Trade / Economic Cooperation). Backdrop reuses the section's signature world-map/meridian/trade-route SVG, `bg-grid` with radial fade, drifting gold + royal blur blobs, an animated horizontal gold light-sweep, and softly floating gold particles. Animations use the existing `[0.16, 1, 0.3, 1]` ease and `viewport={{ once: true }}` — staggered fade-up for header items, scale-in card reveals, infinite floats on decorative layers, soft glow on card hover, and the glowing divider beam. Closes with two glass "India to the world" / "Trust, intelligence & integrity" assurance pills. Fully responsive (cards stack vertically on mobile with the horizontal medallion divider between), built entirely from IICCI tokens (`section-padding`, `display-title`, `glass`, `glass-dark`, `shadow-premium`, `shadow-gold`, `text-gradient-gold`, `bg-grid`, `bg-grid-fade`). Wired into `src/app/page.tsx` immediately after `<About />` and before `<President />`.
**Files touched:** `src/components/MissionVisionSection.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 16:35] — Mentor's Foreword leadership section

**What changed:** Added a new premium, cinematic `MentorsForewordSection` (`id="mentors-foreword"`) between the President's Foreword and Core Team sections on the homepage. The section uses a luxurious split layout that visually continues the leadership area: left column carries a framed mentor portrait (glassmorphism `border-gradient` card on `bg-navy-950`, concentric gold ring frames, animated outer gold glow halo, "Mentor" gold badge, gradient bottom signature overlay, and two floating glass chips — a quote chip and a "Global Trade Council" chip — both with Framer Motion bobbing); right column carries a "Leadership Voice / Mentor" pulsing badge, the heading "Mentor's Foreword" with the second word styled in `text-gradient-gold` italic serif, the tagline "Guiding IICCI Towards a Stronger Global Trade Future", a gold-rail quoted three-paragraph foreword, and a closing block with a script-style gold signature, the mentor name/designation/organization, and three glass social icons (LinkedIn, X, Email). Backdrop layers include the same world-map/trade-route SVG language used by `About`/`CoreTeam` (meridians, orbital ellipses, trade nodes, curved corridors), `bg-grid` with radial fade, animated drifting gold + royal blur blobs, an animated horizontal gold light-sweep, and softly floating gold particles. Animations use the existing `[0.16, 1, 0.3, 1]` ease with `viewport={{ once: true }}` — staggered fade-up for text, image scale-in for the portrait, soft-glow hover on the framed card, and lightweight infinite motion on the decorative layers. Fully responsive (image first on mobile, then heading/tagline → foreword → name block), dark-theme compatible with the existing IICCI palette/typography (`section-padding`, `display-title`, `glass`, `glass-dark`, `shadow-premium`, `shadow-gold`, `border-gradient`), uses the placeholder mentor "Dr. R.K. Sinha — Chief Mentor & Strategic Advisor" with graceful initials fallback (no image asset required to ship). Section wired into `src/app/page.tsx` immediately after `<President />` and before `<CoreTeam />`.
**Files touched:** `src/components/MentorsForewordSection.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 14:00] — Prem Kishore profile photo path fix

**What changed:** Fixed Mr. Prem Kishore’s Core Team card image path from `/images/prem-kishore.png` (missing file) to `/images/prem-kishor.png` so the official headshot displays correctly.
**Files touched:** `src/components/CoreTeam.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [23-05-2026 13:50] — Real IICCI logo wired across navbar, mobile menu, footer and loader

**What changed:** Replaced the placeholder "II/CCI" gold-on-navy tile and the manual "IICCI / Global Trade Chamber" text-mark with the real official logo (`/images/logoiicifinal.jpg`, 245×122 — full "IICCI" letter mark + "Indian Importers Chambers Of Commerce And Industry" wordmark + tricolor underline + "Together We Progress" tagline) using `next/image`. Navbar uses the logo at responsive heights (`h-10 sm:h-11 lg:h-12 w-auto object-contain`) with `priority` and a `group-hover` micro-scale, plus a proper `aria-label`/`alt`. The mobile menu header now shows the same logo (h-10) linking back to `#home`. The Footer brand block renders the logo on a white rounded card with a gold ring + soft shadow so it reads cleanly on the dark navy background. The Loader was upgraded to a 220×140 card with the real logo on white inside a rounded gold "ring" halo, preserving the spin and load-bar animations.
**Files touched:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/Loader.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 17:10] — Stats registered businesses count

**What changed:** Increased the registered businesses statistic in the By the Numbers section from 10,000+ to 50,000+ and updated the label to "Registered Businesses".
**Files touched:** `src/components/Stats.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 16:55] — About IICCI section official content rebuild

**What changed:** Rebuilt the About section using the official client-provided IICCI copy. New layout features: cinematic gradient + grid + dual-blur background, a custom world-map SVG backdrop with meridians/trade routes/nodes, animated header badge with pulse dot, hero philosophy pull-quote ("Global trade today is no longer limited by borders…"), redesigned premium Mission & Vision cards (gold-glow Mission card + royal-gradient Vision card with key stat tiles), 3 pillar cards (Global Network / Bilateral Trade / Rapid Facilitation), and a closing "Looking Forward" panel with 4 outcome tiles (International Trade, Investment Growth, Industrial Development, Business Collaboration). Added Framer Motion staggered reveal animations, glassmorphism, premium shadows, and tag chips for credentials (Govt. of India Recognized, ISO 9001, WTO Affiliated, UN Compact).
**Files touched:** `src/components/About.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 11:45] — CSR & SDG section overhaul

**What changed:** Rebuilt the CSR section with official IICCI CSR & SDG copy, updated heading, eight enhanced SDG pillar cards with descriptions, Framer Motion animations, animated globe, sustainability particles, glassmorphism hover glows, and realistic impact counters (10,000+ members, 50+ nations, 200+ programs, 47+ years).
**Files touched:** `src/components/CSR.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [21-05-2026 11:32] — President card photo

**What changed:** Replaced the SVG avatar placeholder on the President profile card with the official photo `/images/RK sir.png` (Rajesh Kaithwas), keeping the President badge, signature overlay, and quote chip.
**Files touched:** `src/components/President.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

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
