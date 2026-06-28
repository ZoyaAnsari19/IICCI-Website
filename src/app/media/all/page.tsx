"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  MEDIA_ITEMS,
  MediaCard,
  MediaLightbox,
  FILTERS,
  cx,
  type MediaItem,
} from "../page";

export default function AllMediaPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [openItem, setOpenItem] = useState<MediaItem | null>(null);

  const list = useMemo(() => {
    if (active === "All") return MEDIA_ITEMS;
    return MEDIA_ITEMS.filter((i) => i.category === active);
  }, [active]);

  return (
    <section className="relative page-nav-offset overflow-hidden">
      <div className="absolute inset-0 bg-radial-navy" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="reveal-up">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-gold transition"
          >
            <i className="fas fa-arrow-left text-[10px]" />
            Back to Media Center
          </Link>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
              <i className="fas fa-photo-film text-gold text-xs" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                Full Archive
              </span>
            </div>
            <h1 className="display-title font-display font-bold">
              <span className="text-white">All</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Media & Stories.
              </span>
            </h1>
            <p className="mt-3 text-white/65 max-w-2xl leading-relaxed">
              Browse the complete collection of IICCI bilateral meetings,
              delegation highlights, gallery moments, videos, and newsroom
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

        {list.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            <AnimatePresence initial={false}>
              {list.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onOpen={setOpenItem}
                  variant="grid"
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center text-white/55">
            No items found in this category yet.
          </div>
        )}

        <div className="text-center mt-12 reveal-up">
          <Link
            href="/media"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full glass border border-white/10 text-white text-sm font-semibold hover:border-gold/40 transition"
          >
            <i className="fas fa-arrow-left text-[10px] text-gold" />
            Back to Media Center
          </Link>
        </div>
      </div>

      <MediaLightbox
        open={Boolean(openItem)}
        item={openItem}
        onClose={() => setOpenItem(null)}
      />
    </section>
  );
}
