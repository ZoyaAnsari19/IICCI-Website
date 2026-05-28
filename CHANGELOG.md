# Changelog

## [28-05-2026 21:35] — Team card photos without face-shadow overlay

**What changed:** Removed heavy bottom gradients and duplicate name overlays on management team photos so faces stay fully visible. Designation now appears as a small top-right pill on a clean photo; name, role, and bio remain in the card footer below the image.
**Files touched:** `src/components/CoreTeam.tsx`, `src/app/about/leadership/OurTeamSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 21:20] — Team cards show role & designation clearly

**What changed:** Core Team compact cards now display each member's designation on the photo badge, photo overlay, and card footer (replacing generic "Management" labels). Split Management and Operations & Support rows. Leadership cards label "Role & designation". Our Team section updated to match.
**Files touched:** `src/components/CoreTeam.tsx`, `src/app/about/leadership/OurTeamSection.tsx`, `src/config/operational-team.ts`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 21:05] — Full operational team roster (6 members)

**What changed:** Added Mrs. Geeta Kumar (Trustee) and Mr. Anand (Peon) to the shared operational team config; consolidated all six members with correct designations for homepage Core Team and leadership Our Team sections. Added governance note that members may also be designated VP, Director, or other council roles. Introduced Governance department filter on leadership team page.
**Files touched:** `src/config/operational-team.ts`, `src/components/CoreTeam.tsx`, `src/app/about/leadership/OurTeamSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 20:50] — ECGC, Certificate of Origin, Trade Events on landing page

**What changed:** Added `ChamberCapabilitiesSection` on the homepage highlighting IICCI empanelment with ECGC, authority to issue Certificates of Origin, and Trade Events (linked to `/media/events`). Updated footer services/resources labels. Extended membership benefit bullets for COO guidance, ECGC support, and trade events access.
**Files touched:** `src/config/chamber-capabilities.ts`, `src/components/ChamberCapabilitiesSection.tsx`, `src/app/page.tsx`, `src/components/Footer.tsx`, `src/config/membership.ts`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 20:35] — Org facts, exporters copy, membership benefits (no fees)

**What changed:** Updated established year to 2000 and experience to 25+ years across hero, stats, footer, objectives, CSR, and metadata. Added exporters alongside importers in key landing copy. Added `MembershipSection` on homepage and refactored `/membership` to show Associate, Corporate, and Enterprise categories with benefits only; fees removed with contact email `info@iicci.global` for enquiries.
**Files touched:** `src/config/org.ts`, `src/config/membership.ts`, `src/components/MembershipSection.tsx`, `src/components/Hero.tsx`, `src/components/Stats.tsx`, `src/components/Footer.tsx`, `src/components/ObjectivesSection.tsx`, `src/components/LeadershipHero.tsx`, `src/components/About.tsx`, `src/components/CSR.tsx`, `src/app/page.tsx`, `src/app/membership/page.tsx`, `src/app/layout.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 20:15] — Updated Delhi office contact on landing page

**What changed:** Replaced placeholder Connaught Place address and phone with official Delhi office details (F-5 Hauz Khas Enclave, 110016), two telephone numbers, and two email addresses in footer, navbar top bar, mobile menu, and AI chatbot fallback message. Centralized values in `src/config/contact.ts`.
**Files touched:** `src/config/contact.ts`, `src/components/Footer.tsx`, `src/components/Navbar.tsx`, `public/static/app.js`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [28-05-2026 20:01] — Started Next.js dev server locally

**What changed:** Launched local development server via `npm run dev` (Next.js 16.2.6 with Turbopack). Server ready in 9.2s on http://localhost:3000 (Network: http://172.16.0.63:3000). No code changes — runtime-only action.
**Files touched:** None (CHANGELOG entry only)
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 14:15] — Enlarged Leadership Vision portraits

**What changed:** Increased President & Ex President photo size in `LeadershipVisionSection` — portrait container max-width bumped from `280px` to responsive `340px / 380px / 420px` (mobile / tablet / desktop), `Image` `sizes` updated to match, and floating quote card widened from `210px` to `240px` for proportionate balance. Aspect ratio `4/5` retained so both height and width scale together.
**Files touched:** `src/components/LeadershipVisionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 14:00] — Premium dual Leadership Vision showcase

**What changed:** Replaced the single President's Foreword with a cinematic dual-leadership `LeadershipVisionSection` — Current President (Rajesh Kaithwas) and Ex President (Shri Atul Saxena) in equal glassmorphism cards with Framer Motion, timeline connector, trade-route backdrop, and CTAs. Homepage order: Objectives → Mission & Vision (embedded) → Leadership Vision → Mentor's Foreword → Leadership hero. Ex President uses `/images/shri-atul-saxena.jpeg`.
**Files touched:** `src/components/LeadershipVisionSection.tsx`, `src/app/page.tsx`, `src/components/MissionVisionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 13:30] — President's Foreword on homepage

**What changed:** Added the President's Foreword section directly below Our Objectives on the homepage — portrait, quote, foreword copy, and link to full leadership. Extracted shared `PresidentSection` component (reused on `/about/leadership`) with mobile-friendly layout.
**Files touched:** `src/components/PresidentSection.tsx`, `src/app/page.tsx`, `src/app/about/leadership/President.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 13:15] — Responsive Downloads & Resources section

**What changed:** Made the Downloads & Resources page mobile-friendly: horizontal category pills on small screens, full-width stacked search/sort and card action buttons, featured spotlight with full-width CTAs, only 2 resource cards visible on mobile with View More/View Less, and improved padding and text wrapping across homepage preview and `/resources` standalone page.
**Files touched:** `src/components/DownloadsResourcesSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 13:00] — Responsive notification cards (Trade Circulars)

**What changed:** Fixed Trade Circulars notification cards on mobile so View/Download buttons no longer clip off-screen — buttons stack full-width on small screens, card content uses `min-w-0` / `break-words`, and padding scales down for narrow viewports.
**Files touched:** `src/components/TradeCircularsSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:45] — Responsive Trade Circulars section

**What changed:** Made Trade Circulars & Notifications mobile-friendly: horizontal category pills on small screens (replacing the tall sidebar), full-width search/sort stack, featured alert buttons that span the width, only 2 list cards visible on mobile with a “View More” toggle, and urgent alerts moved below the main feed on phones.
**Files touched:** `src/components/TradeCircularsSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:30] — Mobile “View More” on Our Objectives cards

**What changed:** On screens below `md`, the Our Objectives section now shows only the first 2 detail cards, with a gold “View More” / “View Less” toggle to reveal the remaining seven. Tablet and desktop layouts still show all cards in the grid.
**Files touched:** `src/components/ObjectivesSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:15] — Fix Lenis scroll bleed through mobile menu

**What changed:** Stopped the home page from scrolling when the mobile toggle menu is scrolled — pauses Lenis (`__iicciLenis.stop()` / `start()`), locks the body with `position: fixed` and saved scroll position (works on iOS), blocks `touchmove` outside the drawer, and marks `#mobile-menu` with `data-lenis-prevent` plus `overscroll-behavior: contain` so only the white panel scrolls.
**Files touched:** `src/components/Navbar.tsx`, `src/app/globals.css`, `src/global.d.ts`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:06] — Lock background scroll under mobile menu

**What changed:** Tightened the mobile drawer scroll-behaviour so only the white toggle menu panel scrolls and the home page behind it stays fixed — now we also lock the `<html>` element (`overflow: hidden`, `overscroll-behavior: contain`) and mirror the `mobile-menu-open` class there. This prevents the underlying page from moving even when you flick past the end of the menu content on mobile devices.
**Files touched:** `src/components/Navbar.tsx`, `src/app/globals.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:57] — Properly responsive mobile menu with toggle sections

**What changed:** Rebuilt the mobile drawer so About / Services / Media now collapse by default and toggle open with a click — added `mobileSubs` state, animated chevron rotation (`rotate-180`), and smooth `grid-template-rows` expand/collapse for each submenu. Sub-items now match the desktop mega-menu look (gold icon tile + title) and reset whenever the drawer closes or a child link is tapped. Also added `body.mobile-menu-open` class plus CSS so the floating WhatsApp/AI chat dock and back-to-top button stay hidden while the drawer is open, preventing them from overlapping menu items on small screens.
**Files touched:** `src/components/Navbar.tsx`, `src/app/globals.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:35] — Proper top spacing on More & Resources pages

**What changed:** Added a `standalone` mode to the first section components (Training, ContactSection, CSR, Women, DownloadsResourcesSection) so they use `page-nav-offset` directly (About-style spacing) without creating a blank strip above the page.
**Files touched:** `src/components/Training.tsx`, `src/components/ContactSection.tsx`, `src/components/CSR.tsx`, `src/components/Women.tsx`, `src/components/DownloadsResourcesSection.tsx`, `src/app/more/ai-innovation/page.tsx`, `src/app/more/contact/page.tsx`, `src/app/more/csr-sdg/page.tsx`, `src/app/more/women-wing/page.tsx`, `src/app/resources/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:30] — Revert top spacing on More & Resources pages

**What changed:** Removed the `page-top-offset` wrapper from `/more/ai-innovation`, `/more/contact`, `/more/csr-sdg`, `/more/women-wing`, and `/resources` to get rid of the blank band above content while keeping the utility available for future use.
**Files touched:** `src/app/more/ai-innovation/page.tsx`, `src/app/more/contact/page.tsx`, `src/app/more/csr-sdg/page.tsx`, `src/app/more/women-wing/page.tsx`, `src/app/resources/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:25] — Remove SubpageHero from “More” pages

**What changed:** Removed the top SubpageHero blocks from `/more/ai-innovation`, `/more/contact`, `/more/csr-sdg`, and `/more/women-wing` so each route now uses only its main content section.
**Files touched:** `src/app/more/ai-innovation/page.tsx`, `src/app/more/contact/page.tsx`, `src/app/more/csr-sdg/page.tsx`, `src/app/more/women-wing/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:15] — White background for Current Affairs live ticker

**What changed:** Updated the live Trade News ticker just below the navbar on the Current Affairs page to use a white background and navy text so it visually matches the rest of the light Media header.
**Files touched:** `src/app/media/currentAffairs/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:10] — Top spacing on Media pages

**What changed:** Applied `page-nav-offset` to Media sections (`currentAffairs`, `events`, `iicci-story`, and the main `media` landing) so content clears the fixed navbar consistently after navigation.
**Files touched:** `src/app/media/currentAffairs/page.tsx`, `src/app/media/events/page.tsx`, `src/app/media/iicci-story/page.tsx`, `src/app/media/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:05] — Top spacing on Services index & Global Program

**What changed:** Applied `page-nav-offset` to `/services` and `/services/globalProgram` main sections so content clears the fixed navbar like other About and Services pages.
**Files touched:** `src/app/services/page.tsx`, `src/app/services/globalProgram/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 12:00] — Services pages top spacing (page-nav-offset)

**What changed:** Defined `.page-nav-offset` in `globals.css` (navbar height + 3.5rem/4.5rem top, matching About pages) so Bilateral Trade, Farmer Support, Global Placement, Industry Verticals, Machine Learning, Monthly Services, and Upcoming Projects clear the fixed header.
**Files touched:** `src/app/globals.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:50] — Fix mega menu staying open after navigation

**What changed:** Removed CSS `:hover` visibility for mega menus so panels only show when `is-open` is set by JS; menus now stay closed after clicking a link and on route change (fixes hover re-opening the panel after client navigation).
**Files touched:** `src/components/Navbar.tsx`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:45] — Auto-close mega menu on link click

**What changed:** About, Services, Media, and More mega-menu panels now close on link click, including mobile sub-links.
**Files touched:** `src/components/Navbar.tsx`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:40] — Top spacing on About subpages

**What changed:** Applied the same navbar-aware top padding as the About page to Manifesto, Mission & Vision, Partnerships, and Recognition sections.
**Files touched:** `src/components/Manifesto.tsx`, `src/components/MissionVisionSection.tsx`, `src/components/PartnershipsSection.tsx`, `src/components/RecognitionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:35] — About page top spacing

**What changed:** Added navbar-aware top padding to the About section so content clears the fixed header after the sub-nav was removed.
**Files touched:** `src/components/About.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:30] — Remove About section sub-navigation bar

**What changed:** Removed the sticky `AboutSubnav` tab bar from the About layout so About subpages no longer show the secondary horizontal nav (About IICCI, Mission & Vision, Leadership, etc.).
**Files touched:** `src/app/about/layout.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:25] — Enhance Recognition award cards

**What changed:** Redesigned the four recognition award cards for the white page theme — light elevated cards, gold top accent on hover, larger icons, numbered badges, and verified credential footer.
**Files touched:** `src/components/RecognitionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:20] — Recognition page white background

**What changed:** Switched `/about/recognition` section background to white with navy header text; award and milestone cards remain dark for contrast.
**Files touched:** `src/components/RecognitionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:15] — Mission & Vision page white background

**What changed:** Switched `/about/mission-vision` section background to white with navy header/footer text; mission and vision cards remain dark for contrast.
**Files touched:** `src/components/MissionVisionSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:10] — Remove sub-heroes from About subpages

**What changed:** Removed redundant `SubpageHero` from `/about/mission-vision`, `/about/partnerships`, and `/about/recognition` so each page shows only its main section content.
**Files touched:** `src/app/about/mission-vision/page.tsx`, `src/app/about/partnerships/page.tsx`, `src/app/about/recognition/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:05] — Remove duplicate About IICCI subpage hero

**What changed:** Removed the redundant `SubpageHero` from `/about` so only the main `About` section header is shown.
**Files touched:** `src/app/about/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 11:00] — Remove duplicate Manifesto subpage hero

**What changed:** Removed the redundant `SubpageHero` (breadcrumbs, badge, title, tagline) from `/about/manifesto` so only the main `Manifesto` section header is shown.
**Files touched:** `src/app/about/manifesto/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 10:45] — Fix blank content after client-side navigation

**What changed:** Reveal animations (`reveal-up` / `in-view`) now re-initialize on every Next.js route change via `window.__iicciOnRouteChange`, so subpages like Leadership no longer stay hidden until a full refresh. `SiteClientInit` listens to `usePathname()` and triggers the hook after paint; scroll resets to top on navigation.
**Files touched:** `public/static/app.js`, `src/components/SiteClientInit.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 10:30] — Floating WhatsApp & AI chat dock

**What changed:** Fixed chat widgets sticking near the footer by removing the conflicting `relative` class on the fixed container, anchoring WhatsApp and AI buttons to the viewport (`fixed` right/bottom with safe-area insets), adding smooth hover transitions, and rendering `Floats` once from the root layout instead of after each page footer.
**Files touched:** `src/components/Floats.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/layouts/SitePageShell.tsx`, `src/app/trade-tools/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 10:15] — Fix missing Training card image (Import Export)

**What changed:** Swapped all four Training course card images from Unsplash to Pexels URLs after the Import Export Masterclass image timed out in Next.js image optimization (`upstream image response timed out`).
**Files touched:** `src/components/Training.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [27-05-2026 10:07] — Add images to Training course cards

**What changed:** Replaced the flat gradient banners on the four "Build skills that power global careers" course cards with topic-relevant photos (cargo port, drone, trade docs, corporate workspace), kept the existing badges, and moved each course icon into a small glass medallion in the bottom-right of the image.
**Files touched:** `src/components/Training.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:45] — Fix broken Current Affairs images (404)

**What changed:** Replaced eight dead Unsplash URLs in Current Affairs seed data with working Pexels images so Next.js image optimization no longer returns upstream 404 errors.
**Files touched:** `src/app/media/currentAffairs/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:30] — Current Affairs load more after 2 cards

**What changed:** Current Affairs grid now shows 2 cards initially; "Load more updates" appears directly below them and loads 2 more articles per click.
**Files touched:** `src/app/media/currentAffairs/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:23] — Remove media subnav tabination

**What changed:** Removed the sticky Media Center / IICCI Story / Current Affairs tab bar (`MediaSubnav`) from the `/media` layout so media pages no longer render the section sub-navigation.
**Files touched:** `src/app/media/layout.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 16:25] — Remove media sections from homepage

**What changed:** Removed IICCI Story and Current Affairs preview embeds from the main homepage; both remain on Media Center and dedicated routes.
**Files touched:** `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 16:15] — Current Affairs trade intelligence hub

**What changed:** Premium CMS-ready Current Affairs section with featured spotlight, category filters, search, sort, load-more, trade ticker, trending sidebar, and Framer Motion animations. Embedded on Media Center (`/media`) and homepage preview (featured + 3 updates). Media nav + subnav include Current Affairs route.
**Files touched:** `src/app/media/currentAffairs/page.tsx`, `src/app/media/page.tsx`, `src/app/page.tsx`, `src/config/media-navigation.ts`, `CHANGELOG.md`
**API endpoints used:** None (stub `fetchCurrentAffairs` for future CMS)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 15:00] — IICCI Story white background

**What changed:** Narrative film section background switched to white with light-theme typography, glass-light milestone cards, and light grid overlay; homepage wrapper updated to match.
**Files touched:** `src/app/media/iicci-story/page.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:50] — Fix top navbar / scroll overlap

**What changed:** Resolved gold clip/overlap at page top — scroll progress bar moved below navbar (no glow at 0%), navbar height CSS variable + ResizeObserver, opaque header background, hero ping contained, stronger hero-to-story separation.
**Files touched:** `Navbar.tsx`, `Hero.tsx`, `Floats.tsx`, `page.tsx`, `iicci-story/page.tsx`, `globals.css`, `public/static/style.css`, `public/static/app.js`, `MediaSubnav.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:42] — Fix IICCI Story top overlap after Hero

**What changed:** Fixed homepage overlap where Hero orbital/glow visuals bled into The IICCI Story section — hero bottom fade, globe overflow clip, story `z-10` + extra top padding (`stackAfterHero`), and reduced orbit z-index.
**Files touched:** `src/components/Hero.tsx`, `src/app/media/iicci-story/page.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:35] — Navbar Media hover dropdown

**What changed:** Media nav item now opens a hover mega-menu (like About/Services) with Media Center and IICCI Story links; IICCI Story navigates to `/media/iicci-story`. Mobile menu includes Media sub-links.
**Files touched:** `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:28] — Media IICCI Story tab

**What changed:** Added Media sub-navigation with **IICCI Story** tab linking to `/media/iicci-story`; sticky `MediaSubnav` on all media routes; quick link on Media Center filter row.
**Files touched:** `src/config/media-navigation.ts`, `src/components/layouts/MediaSubnav.tsx`, `src/app/media/layout.tsx`, `src/app/media/page.tsx`, `src/app/media/iicci-story/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:20] — IICCI Narrative Film section

**What changed:** Added premium cinematic `NarrativeFilmSection` (`id="iicci-story"`) with glass video showcase, glowing play button, spotlight hover, lightbox modal (YouTube/MP4-ready), milestone stats, and CTAs. Homepage: placed after Hero, before About. Full page at `/media/iicci-story`.
**Files touched:** `src/app/media/iicci-story/page.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None (`fetchNarrativeFilm` stub)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 14:05] — AI & Machine Learning section

**What changed:** Added premium `AIMachineLearningSection` (`id="ai-machine-learning"`) with neural-network viz, AI assistant typing demo, predictive chart, 6 capability cards, workflow strip, and CTAs. Homepage preview after Services + Industry Verticals; full page at `/services/machineLearning`. Services mega menu card added.
**Files touched:** `src/app/services/machineLearning/page.tsx`, `src/app/page.tsx`, `src/config/services-navigation.ts`, `CHANGELOG.md`
**API endpoints used:** None (`fetchAICapabilities` stub)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 13:42] — Compact learning mode tabs

**What changed:** Reduced Beginner/Professional toggle width (`w-fit`, tighter padding) and prevented flex stretch in header column (`items-start`).
**Files touched:** `src/app/services/bilateralTrade/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 13:35] — Bilateral Trade Tutorial section

**What changed:** Added premium interactive Bilateral Trade Tutorial (`id="bilateral-trade-tutorial"`) with 7-step stepper, beginner/professional modes, animated trade-route map, detail panel, progress navigation, and CTAs. Wired after Global Placement on `/services/globalProgram`; standalone at `/services/bilateralTrade`. Added Services mega menu card.
**Files touched:** `src/app/services/bilateralTrade/page.tsx`, `src/app/services/globalProgram/page.tsx`, `src/config/services-navigation.ts`, `CHANGELOG.md`
**API endpoints used:** None (CMS-ready `fetchBilateralTutorialData` stub)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 13:18] — Enhanced Candidate Journey flow

**What changed:** Upgraded Candidate Journey section to match Skill-to-Career enhancements — shared `JourneyFlow` component with animated SVG connector, hover glow, step badges, mobile timeline, placement progress bar, and title-case labels for longer step names.
**Files touched:** `src/app/services/globalPlacement/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 13:12] — Enhanced Skill-to-Career flow

**What changed:** Upgraded Skill-to-Career Flow in Global Placement section — animated SVG path with traveling pulse, step badges, hover glow rings, per-step descriptions, desktop chevron connectors, mobile vertical timeline layout, journey progress bar, and ambient grid/glow backdrop.
**Files touched:** `src/app/services/globalPlacement/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 13:05] — Global Placement Program section

**What changed:** Built `GlobalPlacementSection` in `src/app/services/globalPlacement/page.tsx` — career placement ecosystem with 8 focus areas, live opportunity cards, skill-to-career flow, candidate journey roadmap, hiring partner grid, auto-rotating testimonial slider, animated stats, career network map backdrop, and CTAs. Wired `GlobalPlacementSection` after `GlobalCertificationSection` on `/services/globalProgram` (Training & Certification hub). Added Services nav entry for Global Placement.
**Files touched:** `src/app/services/globalPlacement/page.tsx`, `src/app/services/globalProgram/page.tsx`, `src/config/services-navigation.ts`, `CHANGELOG.md`
**API endpoints used:** None (stub ready for CMS/API)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:50] — Global Certification Program section

**What changed:** Built `GlobalCertificationSection` in `src/app/services/globalProgram/page.tsx` — premium ed-tech learning ecosystem with 8 certification area cards (International Trade, Import–Export, Logistics, Business Development, Compliance, Global Markets, Entrepreneurship, Professional Skills), benefits grid, animated success stats, 4-step certification journey timeline, alumni spotlight, animated progress bars, certification preview modal, `fetchCertificationPrograms()` CMS stub, Framer Motion animations, and CTAs (Apply, Explore Training, Start Learning). Added "Global Certification" to Services mega menu (7 cards, 3 per row).
**Files touched:** `src/app/services/globalProgram/page.tsx`, `src/config/services-navigation.ts`, `CHANGELOG.md`
**API endpoints used:** None (stub ready for CMS/API)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:40] — Services mega menu 3 cards per row

**What changed:** Services mega menu grid limited to 3 columns per row (`lg:grid-cols-3`); five service cards now wrap into two rows (3 + 2). Menu width adjusted to `720px` for balanced card layout.
**Files touched:** `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:35] — Monthly Services & Performance Overview dashboard

**What changed:** Built `MonthlyPerformanceSection` in `src/app/services/monthlyServices/page.tsx` — CMS-ready `fetchMonthlyPerformance()` adapter, 7 animated KPI cards with sparklines and trend badges, SVG monthly bar chart, global activity map, member activity timeline, summary counters, and members-only blurred revenue card (no public revenue data). Light enterprise dashboard theme aligned with homepage Stats section. Optional `preview` prop for homepage embed. Added "Monthly Performance" to Services mega menu (5-column grid).
**Files touched:** `src/app/services/monthlyServices/page.tsx`, `src/config/services-navigation.ts`, `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None (stub ready for CMS/API)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:22] — Remove Services mega menu quick links

**What changed:** Removed the 9-item quick-link grid (Trade Facilitation, Import Export, Global Certification, Placement Program, AI & ML Services, Business Matchmaking, Bilateral Trade, Market Research, Joint Ventures) from the Services mega menu. Deleted `SERVICE_QUICK_LINKS` from config; mega menu now shows only the four primary cards plus footer.
**Files touched:** `src/config/services-navigation.ts`, `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:15] — Premium Upcoming Projects opportunity desk

**What changed:** Built full `UpcomingProjectsSection` in `src/app/services/upcomingProjects/page.tsx` — CMS-ready architecture with `UpcomingProject` types, `fetchUpcomingProjects()` adapter (swap for API/headless CMS), 15 seed opportunities, debounced search, sector/country/type filters, quick-type chips, paginated load-more, skeleton loading, featured spotlight card, animated stats, glassmorphism project cards (sector icon, country code, status badges, investment range, enquire CTA), enquiry modal, trade-route SVG backdrop, floating particles, and bottom CTAs. Exported section with optional `preview` prop for homepage embed. Added "Upcoming Projects" to `SERVICES_NAV` and expanded mega menu to 4-column primary cards.
**Files touched:** `src/app/services/upcomingProjects/page.tsx`, `src/config/services-navigation.ts`, `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None (CMS-ready `fetchUpcomingProjects` stub; wire to `/api/projects` or CMS later)
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 12:02] — Add Farmer Support card to Services mega menu

**What changed:** Added a new "Farmer Support" entry to `SERVICES_NAV` (tractor icon, tagline "Empowering farmers with global agri-trade", links to `/services/farmerSupport`). Expanded the desktop Services mega menu width from `760px` to `880px` and switched the top card grid from `grid-cols-2` to `grid-cols-3` so "Our Services", "Industry Verticals" and "Farmer Support" all render as balanced primary cards. Mobile services submenu picks up the new entry automatically since it iterates `SERVICES_NAV`.
**Files touched:** `src/config/services-navigation.ts`, `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 11:55] — Inline Farmer Support section into page route

**What changed:** Moved the entire `FarmerSupportServicesSection` component code (data, motion variants, helpers, `AnimatedCounter`, `AgriTradeBackdrop`, `FloatingParticles`, `AgriExportMap`, and the main section) directly into `src/app/services/farmerSupport/page.tsx` as a client component. Deleted the separate `src/components/FarmerSupportServicesSection.tsx` file. The page now follows the same self-contained pattern used by `industryVerticals/page.tsx`.
**Files touched:** `src/app/services/farmerSupport/page.tsx`, `src/components/FarmerSupportServicesSection.tsx` (deleted), `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [25-05-2026 11:45] — Premium Farmer Support Services section

**What changed:** Built `FarmerSupportServicesSection` (`id="farmer-support-services"`) — a cinematic agri-trade ecosystem showcase featuring a responsive accordion + side-tab layout across 5 categories (Trade & Market, Capacity Building, Finance, Export, Tech & Sustainability), animated counter stats (Farmers Empowered, Export Destinations, FPO Network, Crop Verticals), a stylized India-to-world agri-export SVG map with animated trade-arc routes and pulsing destinations, glassmorphism panels with gold/emerald/royal gradient accents, floating particles, ambient glow orbs, and dual CTAs ("Explore Agri Trade Support", "Connect With IICCI Agriculture Desk"). Built with Framer Motion stagger/fade-up/AnimatePresence transitions. Mounted on the dedicated `/services/farmerSupport` route with proper metadata.
**Files touched:** `src/components/FarmerSupportServicesSection.tsx`, `src/app/services/farmerSupport/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 15:10] — Remove Mission & Vision from homepage

**What changed:** Removed `MissionVisionSection` from the homepage (`src/app/page.tsx`). Section remains on `/about/mission-vision`.
**Files touched:** `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 15:00] — Premium Our Objectives section

**What changed:** Added `ObjectivesSection` (`id="our-objectives"`) — a cinematic icon-based grid showcasing 9 institutional objectives with glassmorphism cards, Framer Motion stagger/hover animations, trade-network SVG backdrop, floating particles, spotlight hover, and counter highlights. Placed after About on homepage and integrated on `/about` page below the About section.
**Files touched:** `src/components/ObjectivesSection.tsx`, `src/app/page.tsx`, `src/app/about/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:45] — Fix navbar mega-menu hover (About, Services, More)

**What changed:** Mega menus (About, Services, Global Presence, More) now open reliably on hover. Replaced `megaDismissed` (which blocked all dropdowns after every page load) with `openMega` state controlled by `onMouseEnter`/`onMouseLeave` on each nav item. Added `.mega-menu.is-open` CSS class; menus still close on link click and route change.
**Files touched:** `src/components/Navbar.tsx`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:35] — Remove CSR & Women from homepage

**What changed:** Removed `CSR` and `Women` sections from the homepage (`src/app/page.tsx`). These sections remain available on `/more/csr-sdg` and `/more/women-wing`.
**Files touched:** `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:30] — More menu dedicated pages (/more/*)

**What changed:** Navbar "More" dropdown items now navigate to dedicated routes instead of homepage hash links. Added `src/config/more-navigation.ts` and pages: `/more/csr-sdg`, `/more/ai-innovation`, `/more/women-wing`, `/more/contact` with `more/layout.tsx` (SitePageShell), SubpageHero, and existing CSR / Training / Women sections plus new `ContactSection`. Desktop More menu and mobile drawer use `Link` + `MORE_NAV`.
**Files touched:** `src/config/more-navigation.ts`, `src/app/more/**`, `src/components/ContactSection.tsx`, `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:20] — Leadership sections only on /about/leadership

**What changed:** Removed President, MentorsForewordSection, OrganizationalStructureSection, and HonoraryDirectorsSection from the homepage (`src/app/page.tsx`). These sections now render only on `/about/leadership` via `src/app/about/leadership/page.tsx`. CoreTeam remains on the homepage.
**Files touched:** `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:15] — Flatten leadership route (no _components folder)

**What changed:** Removed `src/app/about/leadership/_components/` subfolder; leadership section files now live directly in `src/app/about/leadership/` alongside `page.tsx`. Updated imports in `leadership/page.tsx` and `src/app/page.tsx` to reference files directly (e.g. `./President`, `@/app/about/leadership/President`).
**Files touched:** `src/app/about/leadership/*`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:10] — Colocate leadership sections under about/leadership

**What changed:** Moved `President`, `MentorsForewordSection`, `OrganizationalStructureSection`, `HonoraryDirectorsSection`, and `OurTeamSection` from `src/components/` to `src/app/about/leadership/_components/`. Added barrel `index.ts` for exports. Updated `src/app/about/leadership/page.tsx` to import from `./_components` and `src/app/page.tsx` to import from `@/app/about/leadership/_components`.
**Files touched:** `src/app/about/leadership/_components/*`, `src/app/about/leadership/page.tsx`, `src/app/page.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 14:05] — Our Team cards: taller portraits, faces visible

**What changed:** Increased team card image area from capped `aspect-[4/3] max-h-[220px]` to fixed heights `280px` / `300px` / `320px` (responsive). Image positioning changed from `object-top` to `object-[center_15%]` so headshots show faces properly instead of cropping to foreheads only. Lighter bottom gradient on portrait overlay.

---

## [24-05-2026 13:55] — Our Team: Manifesto-style bg & medium cards

**What changed:** Our Team section background now matches the Manifesto cinematic style (`from-navy-950 via-royal-dark to-navy-950`, grid overlay, gold/royal pulse glow orbs). Removed unused backdrop/particle helpers.

---

## [24-05-2026 13:50] — Our Team: blue background, 3 members only

**What changed:** Removed five placeholder team member cards; kept three core staff (Prem Kishore, Manoj Kumar Bhargava, Pradeep Kumar). Team stats auto-update to 3 members; grid capped at 3 columns on large screens.
**Files touched:** `src/components/OurTeamSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 13:35] — Honorary Directors: medium cards, 3 directors only

**What changed:** Honorary Directors section trimmed to three profile cards (Dr. Arjun Mehta, Mrs. Elena Vasquez, Mr. Hiroshi Tanaka); removed three extra placeholder directors. Reduced card height with `aspect-[4/3]` and `max-h-[220px]`/`240px` on portraits, tighter content padding, and 2-line bio clamp. Footer stat updated from 6 to 3 directors.
**Files touched:** `src/components/HonoraryDirectorsSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 13:20] — Organizational Structure white theme & enhanced chart

**What changed:** Redesigned the Organizational Structure section with a clean white background and a clearer governance hierarchy. Replaced dark navy theme with white cards, navy text, and gold accents; added a horizontal flow summary strip (Advisors → President → … → Support Teams); level badges (L1–L8) on tier labels; stronger vertical spine and horizontal branch connectors for the triple-column operations tier; light grid backdrop; and a 4-stat summary grid at the bottom. Cards remain interactive with expand/collapse detail panels.
**Files touched:** `src/components/OrganizationalStructureSection.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 13:00] — Mega-menu auto-close on About tab click

**What changed:** After clicking any item in the About (or other) mega-menu, the dropdown stayed open because CSS `:hover` persisted across client-side navigation — making it look like multiple pages overlapped. Added `megaDismissed` state in `Navbar` with `usePathname` to force-close mega menus on route change; `onClick={dismissMegaMenu}` on all mega-menu links; `onMouseLeave` on mega-menu `<li>` items to re-enable hover after the pointer leaves; and `#main-nav.mega-dismissed` CSS override so hover/focus-within cannot reopen the panel until reset. About subnav tab links now scroll to top on switch so only the selected page content is shown from the start.
**Files touched:** `src/components/Navbar.tsx`, `public/static/style.css`, `src/components/layouts/AboutSubnav.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 12:45] — Remove splash loader screen

**What changed:** Removed the full-page splash loader (IICCI logo, "Connecting global trade…", progress bar) so the site opens directly on the homepage and subpages. Removed `<Loader />` from `src/app/page.tsx` and `SitePageShell`; deleted `src/components/Loader.tsx`; removed loader hide logic from `public/static/app.js` and the 4s fallback in `SiteClientInit`; removed `.loader-*` CSS from `public/static/style.css`.
**Files touched:** `src/app/page.tsx`, `src/components/layouts/SitePageShell.tsx`, `src/components/Loader.tsx` (deleted), `src/components/SiteClientInit.tsx`, `public/static/app.js`, `public/static/style.css`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 12:35] — About navbar trigger no longer navigates on click

**What changed:** Clicking the top-level "About" item in the navbar was navigating directly to `/about`. Per request, "About" should only open the mega-menu; navigation to `/about` should happen only via the "About IICCI" entry inside the mega-menu. Introduced a `triggerOnly` flag on `menuItems` and marked About with it. On desktop, the About trigger now renders as a `<button aria-haspopup="true">` instead of `<Link href="/about">`, so the click does nothing while the existing `:hover` / `:focus-within` CSS keeps opening the mega-menu (and "About IICCI" inside it still routes to `/about`). On mobile, the parent About row is also a `<button>` (chevron-down icon, no nav) — the nested sub-list with "About IICCI", "Mission & Vision", etc. is already rendered beneath it, so each sub-item navigates normally and the menu still closes via their `onClick={closeMobile}` handlers.
**Files touched:** `src/components/Navbar.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [24-05-2026 12:09] — Fix GSAP target & scroll-behavior dev warnings

**What changed:** Silenced three repeating browser-console warnings observed during dev navigation between `/` and `/about`. (1) `GSAP target .hero-title span not found`: the global `app.js` runs once but `.hero-title` only exists on `/`; wrapped `gsap.fromTo` in an existence check using `document.querySelectorAll('.hero-title span')` so the tween only runs when the hero is mounted. (2) `GSAP target  not found` (empty): added `el instanceof Element && el.isConnected` guard to the `.float-chip*` parallax loop so detached/stale ScrollTriggers from prior client-side navigations don't fire. (3) `Detected scroll-behavior: smooth on the <html> element`: added `data-scroll-behavior="smooth"` to `<html>` in `src/app/layout.tsx` per Next.js 16's guidance, which keeps CSS smooth scrolling but disables it during App Router route transitions.
**Files touched:** `public/static/app.js`, `src/app/layout.tsx`, `CHANGELOG.md`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

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
