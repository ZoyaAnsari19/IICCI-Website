"use client";

import { CurrentAffairsSection } from "./currentAffairs/page";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type MediaCategory =
  | "News"
  | "Videos"
  | "Gallery"
  | "Events"
  | "MOUs"
  | "CSR"
  | "Media Coverage"
  | "Press Releases";

type MediaKind = "article" | "video" | "gallery" | "press";

type MediaItem = {
  id: string;
  kind: MediaKind;
  category: MediaCategory;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: {
    src: string;
    alt: string;
  };
  video?: {
    src: string;
    durationLabel: string;
  };
  featured?: boolean;
};

const FILTERS: Array<"All" | MediaCategory> = [
  "All",
  "News",
  "Videos",
  "Gallery",
  "Events",
  "MOUs",
  "CSR",
  "Media Coverage",
];

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(Boolean(mq.matches));
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function PlayButton({ subtle }: { subtle?: boolean }) {
  return (
    <div
      className={cx(
        "relative grid place-items-center",
        subtle ? "w-12 h-12" : "w-16 h-16",
      )}
    >
      <motion.div
        className={cx(
          "absolute inset-0 rounded-full",
          subtle
            ? "bg-white/10 border border-white/20"
            : "bg-white/15 border border-white/25",
        )}
        initial={{ scale: 0.96, opacity: 0.9 }}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      />
      <motion.div
        className={cx(
          "absolute inset-[-12px] rounded-full border",
          subtle ? "border-gold/15" : "border-gold/25",
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className="relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center w-full h-full"
        whileHover={{ backgroundColor: "rgba(212,175,55,0.22)" }}
        transition={{ duration: 0.2 }}
      >
        <motion.i
          className={cx(
            "fas fa-play ml-1",
            subtle ? "text-sm" : "text-base",
            "text-white",
          )}
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
        />
      </motion.div>
    </div>
  );
}

function MediaLightbox({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: MediaItem | null;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            aria-label="Close media viewer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          />

          <div className="relative h-full w-full flex items-center justify-center px-4 py-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/12 bg-navy-950/70 shadow-premium"
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{
                type: reduced ? "tween" : "spring",
                stiffness: 240,
                damping: 22,
                duration: reduced ? 0 : undefined,
              }}
            >
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

              <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-white/60">{item.date}</span>
                  </div>
                  <div className="text-base sm:text-lg font-display font-bold text-white truncate">
                    {item.title}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 w-11 h-11 rounded-full glass border border-white/12 text-white/80 hover:text-white hover:border-gold/40 transition grid place-items-center"
                  aria-label="Close"
                >
                  <i className="fas fa-xmark" />
                </button>
              </div>

              <div className="relative bg-black/40">
                {item.kind === "video" && item.video ? (
                  <video
                    src={item.video.src}
                    poster={item.image.src}
                    controls
                    autoPlay={!reduced}
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={Boolean(item.featured)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-white/50">
                    Category:{" "}
                    <span className="text-white/70">{item.category}</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-gold text-navy-950 text-xs font-bold tracking-wide btn-premium btn-shine shadow-gold"
                  >
                    Back to newsroom <i className="fas fa-arrow-right text-[10px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MediaCard({
  item,
  onOpen,
  variant,
}: {
  item: MediaItem;
  onOpen: (item: MediaItem) => void;
  variant?: "featured" | "stack";
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onEnter = () => {
    if (reduced) return;
    if (item.kind !== "video") return;
    videoRef.current
      ?.play()
      .catch(() => {
        // Autoplay can be blocked; we'll fall back to poster.
      });
  };

  const onLeave = () => {
    if (item.kind !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <motion.article
      layout
      className={cx(
        "group cursor-pointer w-full",
        "reveal-up",
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
      onClick={() => onOpen(item)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-3xl border border-white/10",
          "bg-navy-950/30",
          "backdrop-blur-xl",
          "card-lift",
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div
          className={cx(
            "relative",
            variant === "featured"
              ? "h-[520px]"
              : variant === "stack"
                ? "h-[260px] sm:h-[280px]"
                : item.featured
                  ? "h-[520px]"
                  : "h-[320px]",
          )}
        >
          {/* Visual */}
          <div className="absolute inset-0">
            {item.kind === "video" && item.video ? (
              <>
                <video
                  ref={videoRef}
                  src={item.video.src}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={item.image.src}
                  className="h-full w-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />
              </>
            ) : (
              <>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  sizes={
                    item.featured
                      ? "(max-width: 1024px) 100vw, 900px"
                      : "(max-width: 1024px) 100vw, 520px"
                  }
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
              </>
            )}

            {/* Premium gradient sheen */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(60%_60%_at_30%_20%,rgba(212,175,55,0.16),transparent_60%),radial-gradient(50%_50%_at_70%_40%,rgba(59,130,246,0.18),transparent_60%)]" />
          </div>

          {/* Top badges */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-[10px] uppercase tracking-[0.22em] text-gold font-bold">
                {item.tag}
              </span>
              <span className="text-[11px] text-white/65">{item.date}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.kind === "video" ? (
                <span className="px-2.5 py-1 rounded-full bg-black/35 backdrop-blur border border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/80">
                  {item.video?.durationLabel ?? "Video"}
                </span>
              ) : null}
              <div className="w-11 h-11 rounded-full bg-white/8 backdrop-blur-md border border-white/12 flex items-center justify-center">
                <i
                  className={cx(
                    "text-white text-sm",
                    item.kind === "video"
                      ? "fas fa-video"
                      : item.kind === "gallery"
                        ? "fas fa-images"
                        : item.kind === "press"
                          ? "fas fa-file-lines"
                          : "fas fa-newspaper",
                  )}
                />
              </div>
            </div>
          </div>

          {/* Play button */}
          {item.kind === "video" ? (
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                initial={{ opacity: 0.98, scale: 1 }}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="group-hover:opacity-100"
              >
                <PlayButton />
              </motion.div>
            </div>
          ) : null}

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="glass-dark rounded-2xl border border-white/10 p-4 sm:p-5">
              <h3
                className={cx(
                  "font-display font-bold text-white leading-snug group-hover:text-gold transition",
                  variant === "featured" || item.featured
                    ? "text-xl sm:text-2xl"
                    : "text-base",
                )}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {item.category}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 group-hover:text-gold transition">
                  {item.kind === "video" ? "Watch" : "Open"}{" "}
                  <i className="fas fa-arrow-right text-[10px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const Media = () => {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [openItem, setOpenItem] = useState<MediaItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const items: MediaItem[] = useMemo(
    () => [
      {
        id: "featured-mou-signing",
        kind: "gallery",
        category: "MOUs",
        tag: "Featured • MoU Signing",
        date: "Apr 4, 2019",
        title:
          "IICCI leadership formalizes strategic MoU with international partners",
        excerpt:
          "A landmark handshake moment sealing bilateral trade facilitation, cross-border investment corridors, and long-term chamber cooperation.",
        image: {
          src: "/images/img3.png",
          alt: "IICCI MoU signing ceremony — leadership handshake with agreement folders",
        },
        featured: true,
      },
      {
        id: "mou-signing-ceremony",
        kind: "gallery",
        category: "News",
        tag: "MoU Signing",
        date: "Apr 4, 2019",
        title: "Official MoU signing ceremony at IICCI headquarters",
        excerpt:
          "Senior leadership and delegates witness the formal signing of a bilateral trade agreement in the presence of chamber officials and partners.",
        image: {
          src: "/images/img1.png",
          alt: "IICCI MoU signing ceremony with executives signing documents at conference table",
        },
      },
      {
        id: "bilateral-agreement-signing",
        kind: "gallery",
        category: "MOUs",
        tag: "Bilateral Agreement",
        date: "Apr 4, 2019",
        title: "Bilateral trade facilitation agreement signed by IICCI leadership",
        excerpt:
          "Chamber representatives and international partners complete the MoU documentation during a formal signing session.",
        image: {
          src: "/images/img2.png",
          alt: "IICCI bilateral agreement signing with leadership at conference table",
        },
      },
      {
        id: "event-recap-video",
        kind: "video",
        category: "Videos",
        tag: "Cinematic Recap",
        date: "Oct 28, 2025",
        title: "Cinematic recap: a premium look inside IICCI’s global trade week",
        excerpt:
          "A highlight reel showcasing keynote moments, MoU signings, delegation tours, and high-level meetings across the week.",
        image: {
          // Poster
          src: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80",
          alt: "Cinematic conference stage lighting and audience",
        },
        video: {
          // Short cinematic event footage (Pexels) – remote mp4
          src: "https://videos.pexels.com/video-files/3184293/3184293-hd_1920_1080_25fps.mp4",
          durationLabel: "02:14",
        },
      },
      {
        id: "conference-keynote",
        kind: "article",
        category: "News",
        tag: "Conference",
        date: "Oct 22, 2025",
        title: "Conference keynote: future-ready import ecosystems & compliance",
        excerpt:
          "A premium-stage keynote focused on resilient supply chains, digital trade, compliance readiness, and sustainable sourcing.",
        image: {
          src: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1600&q=80",
          alt: "Conference keynote on a premium stage",
        },
      },
      {
        id: "leadership-office",
        kind: "gallery",
        category: "News",
        tag: "Leadership & Office",
        date: "Oct 20, 2025",
        title: "Inside IICCI: leadership meetings and strategic planning sessions",
        excerpt:
          "A behind-the-scenes look at leadership huddles, member strategy planning, and international partnership roadmaps.",
        image: {
          src: "https://images.unsplash.com/photo-1523952578875-e6bb18b26645?auto=format&fit=crop&w=1600&q=80",
          alt: "Leadership meeting in a modern office",
        },
      },
      {
        id: "mou-signing-press",
        kind: "press",
        category: "Press Releases",
        tag: "Press Release",
        date: "Oct 18, 2025",
        title: "Strategic MoU strengthens trade facilitation and member finance",
        excerpt:
          "A formal partnership enabling streamlined financing pathways and advisory support for cross-border procurement.",
        image: {
          src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
          alt: "Business leaders signing documents at a press event",
        },
      },
      {
        id: "delegation-tour-video",
        kind: "video",
        category: "Videos",
        tag: "Delegation Tour",
        date: "Oct 12, 2025",
        title: "Delegation tour highlights: factories, ports and trade briefings",
        excerpt:
          "A cinematic recap of delegation visits, briefings, and business meetings across key trade infrastructure touchpoints.",
        image: {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
          alt: "Modern city skyline representing global trade",
        },
        video: {
          src: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
          durationLabel: "01:36",
        },
      },
      {
        id: "gallery-networking",
        kind: "gallery",
        category: "Gallery",
        tag: "Gallery",
        date: "Oct 5, 2025",
        title: "Premium networking: receptions, roundtables and B2B meetings",
        excerpt:
          "A curated set of moments from bilateral receptions and private roundtables with international delegates and partners.",
        image: {
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
          alt: "Business networking and collaboration in a premium setting",
        },
      },
    ],
    [],
  );

  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i.id !== featured.id);

  const filtered = useMemo(() => {
    if (active === "All") return { featured, list: rest };
    const f = items.filter((i) => i.category === active);
    const maybeFeatured = f.find((i) => i.featured) ?? f[0] ?? featured;
    const list = f.filter((i) => i.id !== maybeFeatured.id);
    return { featured: maybeFeatured, list };
  }, [active, featured, items, rest]);

  useEffect(() => {
    setVisibleCount(3);
  }, [active]);

  const shownList = useMemo(
    () => filtered.list.slice(0, visibleCount),
    [filtered.list, visibleCount],
  );

  const canLoadMore = shownList.length < filtered.list.length;

  return (
    <section id="media" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-navy" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <i className="fas fa-clapperboard text-gold text-xs" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Media Center
              </span>
            </div>
            <h2 className="display-title font-display font-bold">
              <span className="text-white">Latest from</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                IICCI.
              </span>
            </h2>
            <p className="mt-3 text-white/65 max-w-2xl leading-relaxed">
              A premium international newsroom experience: cinematic event recaps,
              MoU signings, delegation highlights, CSR stories, and global media
              coverage.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 reveal-up items-center">
            <Link
              href="/media/iicci-story"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/30 text-gold text-xs font-semibold hover:bg-gold/10 hover:border-gold/50 transition"
            >
              <i className="fas fa-film text-[10px]" aria-hidden />
              IICCI Story
            </Link>
            <Link
              href="/media#current-affairs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/15 text-white/80 text-xs font-semibold hover:border-gold/40 hover:text-gold transition"
            >
              <i className="fas fa-newspaper text-[10px]" aria-hidden />
              Current Affairs
            </Link>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={cx(
                  "px-4 py-2 rounded-full text-xs font-medium transition",
                  active === f
                    ? "bg-gold text-navy-950"
                    : "glass border border-white/10 text-white/70 hover:text-white hover:border-gold/30",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Featured + Masonry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
          <div className="lg:col-span-7">
            <MediaCard
              item={filtered.featured}
              onOpen={setOpenItem}
              variant="featured"
            />
          </div>

          {shownList.length > 0 ? (
            <div className="lg:col-span-5">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5 justify-items-start w-full"
              >
                <AnimatePresence initial={false}>
                  {shownList.map((item) => (
                    <MediaCard
                      key={item.id}
                      item={item}
                      onOpen={setOpenItem}
                      variant="stack"
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {canLoadMore ? (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + 4)}
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl glass border border-white/10 text-white text-sm font-semibold hover:border-gold/40 transition"
                  >
                    Load more
                    <i className="fas fa-plus text-[10px] text-gold" />
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="text-center mt-10 reveal-up">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full glass border border-white/10 text-white text-sm font-semibold hover:border-gold/40 transition"
          >
            View all media coverage
            <i className="fas fa-arrow-right text-[10px] text-gold" />
          </a>
        </div>
      </div>

      <MediaLightbox
        open={Boolean(openItem)}
        item={openItem}
        onClose={() => setOpenItem(null)}
      />
    </section>
  );
};

export default function MediaPage() {
  return (
    <main>
      <Media />
      <CurrentAffairsSection />
    </main>
  );
}
