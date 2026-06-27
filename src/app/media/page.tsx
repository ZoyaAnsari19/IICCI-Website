"use client";

import Image from "next/image";
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
  images?: Array<{
    src: string;
    alt: string;
  }>;
  body?: string[];
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

  const galleryImages = useMemo(() => {
    if (!item) return [];
    if (item.images && item.images.length > 0) return item.images;
    return [item.image];
  }, [item]);

  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [item]);

  const hasMultiple = galleryImages.length > 1;

  useEffect(() => {
    if (!open || !hasMultiple || paused || reduced) return;
    const id = window.setTimeout(() => {
      setActiveImage((i) => (i + 1) % galleryImages.length);
    }, 3500);
    return () => window.clearTimeout(id);
  }, [open, hasMultiple, paused, reduced, galleryImages.length, activeImage]);

  const goPrev = () =>
    setActiveImage((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const goNext = () =>
    setActiveImage((i) => (i + 1) % galleryImages.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose, hasMultiple, galleryImages.length]);

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
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          />

          <div
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div
              className="flex min-h-full items-center justify-center px-4 py-8"
              onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
              }}
            >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl border border-white/12 bg-navy-950/70 shadow-premium"
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

              <div className="relative shrink-0 flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
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

              <div className="relative flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="relative bg-black/40">
                {item.kind === "video" && item.video ? (
                  <video
                    src={item.video.src}
                    poster={item.image.src || undefined}
                    controls
                    autoPlay={!reduced}
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div
                    className="relative w-full aspect-[16/9]"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImage}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.25 }}
                      >
                        <Image
                          src={galleryImages[activeImage]?.src ?? item.image.src}
                          alt={galleryImages[activeImage]?.alt ?? item.image.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          priority={Boolean(item.featured)}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent pointer-events-none" />

                    {hasMultiple ? (
                      <>
                        <button
                          type="button"
                          onClick={goPrev}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass border border-white/15 text-white/85 hover:text-white hover:border-gold/40 transition grid place-items-center"
                        >
                          <i className="fas fa-chevron-left" />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass border border-white/15 text-white/85 hover:text-white hover:border-gold/40 transition grid place-items-center"
                        >
                          <i className="fas fa-chevron-right" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/45 backdrop-blur border border-white/10 text-[11px] text-white/80">
                          {activeImage + 1} / {galleryImages.length}
                        </div>
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              {hasMultiple ? (
                <div className="flex gap-2 overflow-x-auto px-5 sm:px-6 pt-4">
                  {galleryImages.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={cx(
                        "relative shrink-0 w-20 h-14 rounded-xl overflow-hidden border transition",
                        i === activeImage
                          ? "border-gold"
                          : "border-white/12 hover:border-white/30 opacity-70 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="p-5 sm:p-6">
                <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed">
                  {item.excerpt}
                </p>

                {item.body && item.body.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {item.body.map((para, i) => (
                      <p
                        key={i}
                        className="text-sm text-white/65 leading-relaxed"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : null}
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
              </div>
            </motion.div>
            </div>
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
                  preload={item.image.src ? "none" : "metadata"}
                  poster={item.image.src || undefined}
                  className="h-full w-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/5" />
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
              ) : item.images && item.images.length > 1 ? (
                <span className="px-2.5 py-1 rounded-full bg-black/35 backdrop-blur border border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/80">
                  <i className="fas fa-images mr-1.5 text-[9px]" />
                  {item.images.length} Photos
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
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
            <div className="glass-dark rounded-2xl border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors duration-300 group-hover:border-gold/25">
              <h3
                className={cx(
                  "font-display font-bold text-white leading-snug group-hover:text-gold transition line-clamp-2",
                  variant === "featured" || item.featured
                    ? "text-lg sm:text-2xl"
                    : "text-base",
                )}
              >
                {item.title}
              </h3>

              {/* Excerpt reveals on hover so the photo stays visible by default */}
              <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2">
                <div className="overflow-hidden">
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {item.category}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80 group-hover:text-gold transition">
                  {item.kind === "video" ? "Watch" : "Open"}{" "}
                  <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5" />
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
        id: "vietnam-embassy-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Featured • Bilateral Trade",
        date: "Jun 28, 2026",
        title:
          "IICCI team meets Trade Director of Vietnam Embassy to explore bilateral trade opportunities",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey met Mr. Bui Trung Thuong, Trade Director at the Embassy of Vietnam in New Delhi, to strengthen India–Vietnam trade and economic cooperation.",
        body: [
          "The Indian Importers Chambers of Commerce & Industry (IICCI) delegation, led by the President Mr Rajesh Kaithwas & Vice President Mr T K Pandey, had the privilege of meeting Mr. Bui Trung Thuong, Trade Director at the Embassy of Vietnam in New Delhi, who also serves as Trade Counsellor and Head of the Trade Office.",
          "The meeting focused on strengthening bilateral trade and economic cooperation between India and Vietnam, with discussions centered on identifying new avenues for trade growth, investment promotion, and business collaboration that would benefit both economies.",
          "Key areas of mutual interest included the organization of Reverse Buyer-Seller Meets to facilitate direct business engagement between enterprises from both countries, development of agricultural value chains to enhance market access and increase export opportunities, and exploration of fertilizer import and supply partnerships to support agricultural productivity and food security.",
          "Both sides acknowledged the significant potential for expanding trade volumes and fostering long-term partnerships across sectors such as agriculture, agribusiness, manufacturing, trade facilitation, and investment. These initiatives are expected to contribute to increased foreign exchange earnings, stronger commercial ties, and sustainable economic growth for both nations.",
          "IICCI remains committed to working closely with the Embassy of Vietnam and relevant stakeholders to promote meaningful business engagement and unlock new opportunities for India–Vietnam trade and investment cooperation.",
        ],
        image: {
          src: "/images/gallery/embassy-of-vietnam/embassy-vietnam-1.jpeg",
          alt: "IICCI delegation meeting the Trade Director of the Embassy of Vietnam in New Delhi",
        },
        images: [
          {
            src: "/images/gallery/embassy-of-vietnam/embassy-vietnam-1.jpeg",
            alt: "IICCI delegation meeting the Trade Director of the Embassy of Vietnam in New Delhi",
          },
          {
            src: "/images/gallery/embassy-of-vietnam/embassy-vietnam-2.jpeg",
            alt: "IICCI leadership in discussion with Mr. Bui Trung Thuong, Trade Director, Embassy of Vietnam",
          },
          {
            src: "/images/gallery/embassy-of-vietnam/embassy-vietnam-3.jpeg",
            alt: "Bilateral trade cooperation discussion between IICCI and the Embassy of Vietnam",
          },
          {
            src: "/images/gallery/embassy-of-vietnam/embassy-vietnam-4.jpeg",
            alt: "IICCI delegation with the Trade Office of the Embassy of Vietnam in New Delhi",
          },
        ],
        featured: true,
      },
      {
        id: "rwanda-embassy-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Bilateral Trade • Rwanda",
        date: "Jun 28, 2026",
        title:
          "IICCI delegation meets High Commissioner of Rwanda to strengthen India–Rwanda trade and investment cooperation",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey met H.E. Ms. Jacqueline Mukangira, High Commissioner of the Republic of Rwanda, to explore bilateral trade and investment opportunities.",
        body: [
          "The Indian Importers Chambers & Industry (IICCI), represented by Mr. Rajesh Kaithwas, President, and Mr. T.K. Pandey, Vice President, had the honor of meeting H.E. Ms. Jacqueline Mukangira, High Commissioner of the Republic of Rwanda, at the Embassy of Rwanda in New Delhi.",
          "The meeting focused on exploring and strengthening bilateral trade and investment opportunities between India and Rwanda, with the objective of creating sustainable economic partnerships that would benefit both nations. Discussions highlighted the growing importance of India as Rwanda's second-largest trading partner and the significant untapped potential for further economic collaboration.",
          "Several strategic initiatives were discussed, including the organization of Reverse Buyer-Seller Meets, Entrepreneurship Development Programs, and the development of agricultural value chains aimed at enhancing trade volumes and increasing foreign exchange earnings for both countries. The discussions also explored opportunities in gold mining and imports, rare earth metals, and the potential utilization of Rwanda's abundant methane gas resources.",
          "Both sides identified strong prospects for collaboration in sectors such as Real Estate, Hospitality, Art & Culture, Tourism, Food Processing, Agribusiness, and Investment Promotion. As part of its commitment to fostering deeper business engagement, IICCI also expressed its intention to sign a Memorandum of Understanding (MoU) with leading chambers and business associations in Rwanda to facilitate knowledge sharing, promote best business practices, and strengthen institutional cooperation.",
          "A business delegation visit to Rwanda is also being planned to explore investment opportunities, establish strategic partnerships, and further enhance India–Rwanda economic relations.",
          "The meeting concluded on a positive note, reaffirming the shared commitment of both countries to expanding trade, investment, and people-to-people connections for mutual growth and prosperity.",
        ],
        image: {
          src: "/images/gallery/embassy-of-rwanda/embassy-rwanda-1.jpeg",
          alt: "IICCI delegation meeting the High Commissioner of Rwanda at the Embassy of Rwanda in New Delhi",
        },
        images: Array.from({ length: 14 }, (_, i) => ({
          src: `/images/gallery/embassy-of-rwanda/embassy-rwanda-${i + 1}.jpeg`,
          alt: `IICCI delegation meeting with H.E. Ms. Jacqueline Mukangira, High Commissioner of Rwanda — photo ${i + 1}`,
        })),
      },
      {
        id: "mali-embassy-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Bilateral Trade • Mali",
        date: "Jun 28, 2026",
        title:
          "IICCI delegation meets Ambassador of Mali to strengthen India–Mali trade and investment relations",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey met H.E. Brig. Gen. Felix Diallo, Ambassador of the Republic of Mali to India, to explore bilateral trade and investment opportunities.",
        body: [
          "The Indian Importers Chambers & Industry (IICCI), represented by Mr. Rajesh Kaithwas, President, and Mr. T.K. Pandey, Vice President, had the privilege of meeting H.E. Brig. Gen. Felix Diallo, Ambassador of the Republic of Mali to India, at the Embassy of Mali in New Delhi.",
          "The meeting focused on exploring bilateral trade and investment opportunities between India and Mali, with the objective of strengthening economic cooperation and creating mutually beneficial business partnerships. Discussions emphasized the vast untapped potential between the two countries and the importance of enhancing private-sector engagement to increase trade volumes and investment flows.",
          "A key area of discussion was the organization of business delegations from India to Mali to facilitate direct engagement with government authorities, industry stakeholders, and local businesses. The Ambassador and the IICCI delegation also discussed investment facilitation measures, including mechanisms that can provide greater confidence and ease of doing business for Indian companies seeking to invest and operate in Mali.",
          "Several strategic initiatives were explored, including Reverse Buyer-Seller Meets, Entrepreneurship Development Programs, and the development of agricultural value chains aimed at increasing bilateral trade and foreign exchange earnings for both nations. IICCI also presented a comprehensive India–Mali Trade and Investment Roadmap (2026–2036), outlining priority sectors, trade targets, and long-term opportunities for economic cooperation.",
          "Both sides identified significant opportunities in sectors such as Cotton, Shea Butter, Pharmaceuticals, Chemicals, Electrical Equipment, Agriculture, and Value-Added Processing Industries. Discussions also covered the possibility of institutional collaboration through partnerships with local chambers and business organizations to promote best business practices and facilitate trade and investment.",
          "The meeting concluded on a highly positive note, with H.E. Brig. Gen. Felix Diallo extending an invitation to IICCI to visit Bamako, Mali, to gain deeper insights into the country's economic landscape and explore investment and trade opportunities firsthand.",
          "IICCI remains committed to fostering stronger India–Mali relations and creating meaningful platforms for business collaboration, trade expansion, and sustainable economic growth.",
        ],
        image: {
          src: "/images/gallery/embassy-of-mali/embassy-mali-1.jpeg",
          alt: "IICCI delegation meeting the Ambassador of Mali at the Embassy of Mali in New Delhi",
        },
        images: Array.from({ length: 5 }, (_, i) => ({
          src: `/images/gallery/embassy-of-mali/embassy-mali-${i + 1}.jpeg`,
          alt: `IICCI delegation meeting with H.E. Brig. Gen. Felix Diallo, Ambassador of Mali — photo ${i + 1}`,
        })),
      },
      {
        id: "uzbekistan-embassy-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Bilateral Trade • Uzbekistan",
        date: "Jun 28, 2026",
        title:
          "IICCI delegation meets Ambassador of Uzbekistan to strengthen bilateral trade and economic cooperation",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey met H.E. Mr. Sardor Mirzayusupovich Rustambaev, Ambassador of Uzbekistan to India, to expand bilateral trade and investment opportunities.",
        body: [
          "The Indian Importers Chambers & Industry (IICCI), represented by Mr. Rajesh Kaithwas, President, and Mr. T.K. Pandey, Vice President, had the honor of meeting H.E. Mr. Sardor Mirzayusupovich Rustambaev, Ambassador of Uzbekistan to India, at the Embassy of Uzbekistan in New Delhi.",
          "The meeting focused on expanding bilateral trade and investment opportunities between India and Uzbekistan, with both sides expressing a strong commitment to strengthening economic ties and enhancing business collaboration. During the discussions, His Excellency emphasized the need to significantly increase trade volumes between the two countries and reiterated Uzbekistan's positive outlook towards India as a strategic economic partner. Uzbekistan has set an ambitious vision of achieving bilateral trade volumes in the range of USD 10–15 billion in the coming years.",
          "Key areas of cooperation discussed included the organization of Reverse Buyer-Seller Meets, development of agricultural value chains, trade facilitation initiatives, and measures to enhance foreign exchange earnings for both nations. IICCI also presented a comprehensive India–Uzbekistan Trade and Investment Roadmap (2026–2036), outlining strategic sectors and opportunities for long-term economic cooperation.",
          "The Ambassador highlighted the need for IICCI's support and guidance in facilitating smoother export access for Uzbek products into the Indian market, including assistance on trade procedures, market connectivity, and business facilitation. Both sides also discussed plans for signing a Memorandum of Understanding (MoU) with leading chambers and business organizations to promote best business practices and strengthen institutional cooperation.",
          "Significant opportunities were jointly identified in sectors such as Copper Cathodes, Fertilizers, Spices, Dry Fruits, Fresh Fruits, Chemicals, Textiles, Electronics, and other high-potential products. His Excellency also expressed a keen interest in connecting with Indian buyers for Uzbek dry fruits ahead of the upcoming Diwali season.",
          "The meeting concluded with discussions on organizing business delegations and a proposed India–Uzbekistan Business Forum in the near future, aimed at creating new trade partnerships, investment opportunities, and stronger commercial linkages between the two countries.",
          "IICCI remains committed to supporting initiatives that promote bilateral trade, investment, and sustainable economic growth between India and Uzbekistan.",
        ],
        image: {
          src: "/images/gallery/embassy-of-uzbeskistan/embassy-uzbekistan-1.jpeg",
          alt: "IICCI delegation meeting the Ambassador of Uzbekistan at the Embassy of Uzbekistan in New Delhi",
        },
        images: Array.from({ length: 6 }, (_, i) => ({
          src: `/images/gallery/embassy-of-uzbeskistan/embassy-uzbekistan-${i + 1}.jpeg`,
          alt: `IICCI delegation meeting with H.E. Mr. Sardor Mirzayusupovich Rustambaev, Ambassador of Uzbekistan — photo ${i + 1}`,
        })),
      },
      {
        id: "syrian-chamber-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Bilateral Trade • Syria",
        date: "Jun 28, 2026",
        title:
          "IICCI holds discussions with Syrian Chamber representatives to explore trade and investment opportunities",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey held a productive meeting with representatives of Syrian Chambers in New Delhi to strengthen bilateral trade and economic cooperation.",
        body: [
          "The Indian Importers Chambers & Industry (IICCI), represented by Mr. Rajesh Kaithwas, President, and Mr. T.K. Pandey, Vice President, recently held a productive meeting with representatives of Syrian Chambers in New Delhi to explore avenues for strengthening bilateral trade and economic cooperation between India and Syria.",
          "The discussions focused on identifying mutually beneficial trade and investment opportunities that can contribute to economic growth and commercial engagement between the two countries. During the meeting, IICCI team was appraised of Syria's significant reserves of Calcium Phosphate, presenting potential opportunities for collaboration in the fertilizer and mineral sectors.",
          "A detailed discussion was also held on the possibility of establishing a Nano Fertilizer manufacturing plant in Syria, leveraging Indian expertise and technology to support agricultural productivity and value-added industrial development. In addition, both sides explored opportunities in the Oil & Gas sector, including the rehabilitation of war-affected energy fields, development of new offshore infrastructure, and participation in international energy and transit corridor projects.",
          "The meeting highlighted the strong potential for future cooperation across sectors such as agriculture, fertilizers, minerals, energy, infrastructure, and industrial development. Both sides expressed their commitment to continuing the dialogue and agreed to meet again to take the discussions forward and develop concrete business and investment initiatives.",
          "IICCI remains dedicated to fostering international partnerships and creating new opportunities for trade, investment, and economic collaboration between India and emerging global markets.",
        ],
        image: {
          src: "/images/gallery/syrian-chamber/syrian-chamber-1.jpeg",
          alt: "IICCI delegation meeting with Syrian Chamber representatives in New Delhi",
        },
        images: Array.from({ length: 3 }, (_, i) => ({
          src: `/images/gallery/syrian-chamber/syrian-chamber-${i + 1}.jpeg`,
          alt: `IICCI delegation meeting with Syrian Chamber representatives — photo ${i + 1}`,
        })),
      },
      {
        id: "cameroon-chamber-trade-meeting",
        kind: "gallery",
        category: "Gallery",
        tag: "Bilateral Trade • Cameroon",
        date: "Jun 28, 2026",
        title:
          "IICCI holds productive discussions with Cameroon Chamber representatives to strengthen bilateral trade relations",
        excerpt:
          "An IICCI delegation led by President Mr. Rajesh Kaithwas and Vice President Mr. T. K. Pandey held a fruitful meeting with representatives of the Chambers from Cameroon in New Delhi to explore bilateral trade and investment opportunities.",
        body: [
          "The Indian Importers Chambers & Industry (IICCI), represented by Mr. Rajesh Kaithwas, President, and Mr. T.K. Pandey, Vice President, recently held a fruitful meeting with representatives of the Chambers from Cameroon in New Delhi to explore bilateral trade and investment opportunities between India and Cameroon.",
          "The discussions focused on identifying areas of mutual cooperation that can strengthen economic relations and create sustainable business opportunities for both nations. The Cameroon delegation sought IICCI's support and guidance in sectors including automobiles and spare parts, seeds, fertilizers, pharmaceuticals, and skilled manpower for healthcare, tourism, agriculture, and hospitality industries.",
          "Significant opportunities were also identified for imports from Cameroon into India, including cocoa, cashew nuts, agricultural seeds, cassava, palm oil, maize, bauxite, gold, diamonds, and other mineral resources. Both sides discussed the potential for enhancing trade flows and creating reliable market linkages for these products.",
          "A noteworthy discussion was held on the possibility of establishing dialysis centers in Cameroon, leveraging Indian expertise in healthcare infrastructure, medical technology, and healthcare services. The delegation also highlighted the strong support extended by the Government of Cameroon towards agricultural development, creating favorable conditions for investment and technology partnerships in the sector.",
          "The meeting concluded on a positive note, with IICCI reaffirming its commitment to supporting the Cameroon Chambers in promoting trade, investment, business partnerships, and knowledge exchange. Both sides expressed confidence that closer collaboration would create a win-win relationship and contribute to the economic growth and prosperity of both India and Cameroon.",
        ],
        image: {
          src: "/images/gallery/cameroon-chamber/cameroon-chamber-1.jpeg",
          alt: "IICCI delegation meeting with Cameroon Chamber representatives in New Delhi",
        },
        images: Array.from({ length: 2 }, (_, i) => ({
          src: `/images/gallery/cameroon-chamber/cameroon-chamber-${i + 1}.jpeg`,
          alt: `IICCI delegation meeting with Cameroon Chamber representatives — photo ${i + 1}`,
        })),
      },
      {
        id: "new-opportunities-member-meet",
        kind: "gallery",
        category: "Gallery",
        tag: "Member Engagement",
        date: "Jun 28, 2026",
        title:
          "Building stronger connections, creating new opportunities",
        excerpt:
          "During his recent visit to New Delhi, IICCI President Mr. Rajesh Kaithwas met several IICCI members in an interactive one-to-one session to understand their businesses, aspirations, and future growth plans.",
        body: [
          "Meaningful business growth begins with meaningful conversations.",
          "During his recent visit to New Delhi, the newly appointed President of the Indian Importers Chambers of Commerce & Industry (IICCI), Mr. Rajesh Kaithwas, met with several IICCI members in an interactive one-to-one session aimed at understanding their businesses, aspirations, and future growth plans.",
          "The members shared their company profiles, discussed their areas of expertise, and expressed their interest in exploring new domestic and international business opportunities with the support of IICCI.",
          "Mr. Kaithwas patiently listened to each member, gaining valuable insights into their business objectives and challenges. He assured them that IICCI is committed to identifying sector-specific opportunities, facilitating strategic connections, and creating platforms that enable members to expand their business horizons.",
          "The interaction concluded on a highly positive note, with a shared commitment to continue these discussions through regular engagements and collaborative initiatives that translate ideas into meaningful business outcomes.",
          "At IICCI, we believe that every conversation has the potential to become a successful partnership, and every member's growth contributes to the collective success of our business community.",
          "Together, we look forward to creating new opportunities, stronger networks, and lasting business relationships.",
        ],
        image: {
          src: "/images/gallery/new-opportunities/new-opportunities-1.jpeg",
          alt: "IICCI President Mr. Rajesh Kaithwas meeting IICCI members in an interactive session in New Delhi",
        },
        images: Array.from({ length: 6 }, (_, i) => ({
          src: `/images/gallery/new-opportunities/new-opportunities-${i + 1}.jpeg`,
          alt: `IICCI President Mr. Rajesh Kaithwas in a one-to-one session with IICCI members — photo ${i + 1}`,
        })),
      },
      {
        id: "iicci-video-1",
        kind: "video",
        category: "Videos",
        tag: "IICCI Highlights",
        date: "Jun 27, 2026",
        title: "IICCI highlights: engagements, meetings and member moments",
        excerpt:
          "A short video capturing IICCI's recent engagements, leadership meetings, and member interactions.",
        image: {
          src: "",
          alt: "IICCI highlights video",
        },
        video: {
          src: "/images/videos/iicci-video-1.mp4",
          durationLabel: "Video",
        },
      },
      {
        id: "iicci-video-2",
        kind: "video",
        category: "Videos",
        tag: "IICCI Highlights",
        date: "Jun 27, 2026",
        title: "IICCI in action: building partnerships and new opportunities",
        excerpt:
          "Glimpses of IICCI's bilateral meetings and business engagements driving trade and investment cooperation.",
        image: {
          src: "",
          alt: "IICCI in action video",
        },
        video: {
          src: "/images/videos/iicci-video-2.mp4",
          durationLabel: "Video",
        },
      },
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
    <section id="media" className="relative page-nav-offset overflow-hidden">
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
    </main>
  );
}
