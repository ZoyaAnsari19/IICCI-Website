"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  fetchResources,
  FILE_TYPE_META,
  RESOURCE_CATEGORIES,
  type FetchResourcesResult,
  type ResourceCategory,
  type ResourceFileType,
  type ResourceItem,
} from "@/config/resources";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function FloatingParticles() {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/50"
          style={{ left: `${8 + i * 17}%`, top: `${12 + (i % 3) * 28}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.12, 0.5, 0.12] }}
          transition={{ duration: 5.5 + i * 0.35, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </motion.div>
  );
}

function ResourceBackdrop({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={`res-glow-${uid}`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#d4af37" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#081120" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#res-glow-${uid})`} />
      <g fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.6">
        <path d="M0 450 Q400 350 800 450 T1600 450" />
        <path d="M0 520 Q400 420 800 520 T1600 520" />
      </g>
    </svg>
  );
}

function FileTypeIcon({ type, large }: { type: ResourceFileType; large?: boolean }) {
  const meta = FILE_TYPE_META[type];
  return (
    <div
      className={cx(
        "rounded-xl flex items-center justify-center shrink-0 border border-navy-950/10 bg-navy-950/[0.04]",
        large ? "w-16 h-16 lg:w-20 lg:h-20" : "w-12 h-12",
      )}
    >
      <i
        className={cx("fas", meta.icon, meta.color, large ? "text-2xl lg:text-3xl" : "text-lg")}
        aria-hidden
      />
    </div>
  );
}

function ResourceCard({
  resource,
  onPreview,
  compact,
}: {
  resource: ResourceItem;
  onPreview: (r: ResourceItem) => void;
  compact?: boolean;
}) {
  const meta = FILE_TYPE_META[resource.fileType];

  return (
    <motion.article
      layout
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className={cx(
        "group relative glass-light rounded-2xl border border-navy-950/10 overflow-hidden",
        "hover:border-gold/35 transition duration-400 flex flex-col h-full card-lift",
        compact && "sm:flex-row sm:items-stretch",
      )}
    >
      <div
        className={cx(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          "bg-[radial-gradient(70%_50%_at_20%_0%,rgba(212,175,55,0.08),transparent_60%)]",
        )}
      />
      <div className={cx("p-5 flex gap-4", compact && "sm:flex-1 sm:items-start")}>
        <FileTypeIcon type={resource.fileType} />
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-gold/15 border border-gold/25 text-[9px] uppercase tracking-[0.14em] text-gold font-semibold">
              {meta.label}
            </span>
            <span className="text-[10px] text-navy-950/45">{resource.fileSize}</span>
            {resource.popular && (
              <span className="px-2 py-0.5 rounded-md bg-navy-950/5 text-[9px] uppercase tracking-wider text-navy-950/50">
                Popular
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-navy-950 text-base leading-snug mb-1.5 group-hover:text-gold transition line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-navy-950/60 text-xs leading-relaxed line-clamp-2 flex-1 mb-3">
            {resource.description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-navy-950/45">
            <span>Updated {resource.updatedAt}</span>
            {resource.downloadCount != null && (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-download text-gold/70 text-[9px]" aria-hidden />
                {resource.downloadCount.toLocaleString()} downloads
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={cx(
          "px-5 pb-5 flex gap-2",
          compact && "sm:flex-col sm:justify-center sm:pb-0 sm:pr-5 sm:pl-0 sm:pt-5",
        )}
      >
        <button
          type="button"
          onClick={() => onPreview(resource)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-navy-950/12 text-navy-950/75 text-xs font-semibold hover:border-gold/40 hover:text-gold transition"
        >
          <i className="fas fa-eye text-[10px]" aria-hidden />
          Preview
        </button>
        <a
          href={resource.fileUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-gold text-navy-950 text-xs font-bold shadow-gold hover:scale-[1.02] transition"
        >
          <i className="fas fa-download text-[10px]" aria-hidden />
          Download
        </a>
      </div>
    </motion.article>
  );
}

function FeaturedResourceSpotlight({
  resource,
  onPreview,
}: {
  resource: ResourceItem;
  onPreview: (r: ResourceItem) => void;
}) {
  const meta = FILE_TYPE_META[resource.fileType];

  return (
    <motion.article
      variants={itemVariants}
      className="group relative rounded-3xl border border-gold/25 overflow-hidden hover:border-gold/45 transition duration-400"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-royal-dark via-navy-900 to-navy-950" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="relative grid lg:grid-cols-12 gap-6 p-6 lg:p-8 items-center">
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <FileTypeIcon type={resource.fileType} large />
          </motion.div>
        </div>
        <div className="lg:col-span-6 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-[0.18em] font-bold mb-3">
            <i className="fas fa-star text-[9px]" aria-hidden />
            Featured Resource
          </span>
          <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-gold transition">
            {resource.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{resource.description}</p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-[10px] uppercase tracking-[0.14em] text-white/45">
            <span>{meta.label} · {resource.fileSize}</span>
            <span>·</span>
            <span>{resource.categoryLabel}</span>
            <span>·</span>
            <span>Updated {resource.updatedAt}</span>
          </div>
        </div>
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-2 justify-center">
          <button
            type="button"
            onClick={() => onPreview(resource)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
          >
            Quick Preview
            <i className="fas fa-expand text-[10px]" aria-hidden />
          </button>
          <a
            href={resource.fileUrl}
            download
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold btn-premium hover:scale-[1.02] transition"
          >
            Download Resources
            <i className="fas fa-download text-[10px]" aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ResourcePreviewModal({
  resource,
  onClose,
}: {
  resource: ResourceItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!resource) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resource, onClose]);

  useEffect(() => {
    if (!resource) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [resource]);

  return (
    <AnimatePresence>
      {resource ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-md"
            aria-label="Close preview"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg glass-dark rounded-3xl border border-white/12 shadow-premium overflow-hidden"
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="p-6 border-b border-white/10 flex items-start gap-4">
              <FileTypeIcon type={resource.fileType} large />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-[0.16em] text-gold font-bold">
                  {FILE_TYPE_META[resource.fileType].label} Preview
                </span>
                <h3 className="font-display font-bold text-white text-lg mt-1 leading-snug">
                  {resource.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/12 text-white/70 hover:text-white grid place-items-center shrink-0"
                aria-label="Close"
              >
                <i className="fas fa-xmark" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-white/65 text-sm leading-relaxed mb-4">{resource.description}</p>
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8 text-center mb-5">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <i
                    className={cx(
                      "fas text-4xl mb-3",
                      FILE_TYPE_META[resource.fileType].icon,
                      FILE_TYPE_META[resource.fileType].color,
                    )}
                    aria-hidden
                  />
                </motion.div>
                <p className="text-xs text-white/45 uppercase tracking-[0.14em]">
                  Document preview — connect CMS asset URL for inline viewer
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={resource.fileUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold"
                >
                  Download
                  <i className="fas fa-download text-[10px]" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-gold/40 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function RecentResources({ items }: { items: ResourceItem[] }) {
  return (
    <motion.aside
      variants={itemVariants}
      className="glass-light rounded-3xl border border-navy-950/10 p-5 lg:p-6"
    >
      <h3 className="font-display font-bold text-navy-950 text-sm uppercase tracking-[0.14em] mb-4 flex items-center gap-2">
        <i className="fas fa-clock-rotate-left text-gold text-sm" aria-hidden />
        Recently Added
      </h3>
      <ul className="space-y-3">
        {items.map((r) => (
          <li key={r.id}>
            <a
              href={r.fileUrl}
              download
              className="group flex items-center gap-3 rounded-xl p-2 -mx-2 hover:bg-navy-950/[0.04] transition"
            >
              <FileTypeIcon type={r.fileType} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-navy-950/90 group-hover:text-gold transition line-clamp-1">
                  {r.title}
                </p>
                <p className="text-[10px] text-navy-950/45 mt-0.5">{r.updatedAt}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

function PopularDownloads({ items }: { items: ResourceItem[] }) {
  return (
    <motion.aside
      variants={itemVariants}
      className="glass-light rounded-3xl border border-navy-950/10 p-5 lg:p-6"
    >
      <h3 className="font-display font-bold text-navy-950 text-sm uppercase tracking-[0.14em] mb-4 flex items-center gap-2">
        <i className="fas fa-chart-line text-gold text-sm" aria-hidden />
        Popular Downloads
      </h3>
      <ul className="space-y-3">
        {items.map((r, i) => (
          <li key={r.id}>
            <a
              href={r.fileUrl}
              download
              className="group flex items-center gap-3"
            >
              <span className="text-gold/80 font-mono text-xs w-5">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-navy-950/90 group-hover:text-gold transition line-clamp-1">
                  {r.title}
                </p>
                <p className="text-[10px] text-navy-950/45">
                  {(r.downloadCount ?? 0).toLocaleString()} downloads
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}

export function DownloadsResourcesSection({
  preview = false,
  standalone = false,
}: {
  preview?: boolean;
  standalone?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<"newest" | "popular">("newest");
  const [visibleCount, setVisibleCount] = useState(preview ? 4 : 6);
  const [data, setData] = useState<FetchResourcesResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState<ResourceItem | null>(null);

  const pageSize = preview ? 4 : visibleCount;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 280);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setVisibleCount(preview ? 4 : 6);
  }, [category, debouncedSearch, sort, preview]);

  const load = useCallback(async () => {
    setLoading(true);
    const result = await fetchResources({
      category,
      search: debouncedSearch,
      page: 1,
      pageSize,
      sort,
    });
    setData(result);
    setLoading(false);
  }, [category, debouncedSearch, pageSize, sort]);

  useEffect(() => {
    load();
  }, [load]);

  const canLoadMore = !preview && data ? data.resources.length < data.total : false;

  const recommended = useMemo(
    () =>
      data?.popular.filter((p) => !data.resources.some((r) => r.id === p.id)).slice(0, 3) ?? [],
    [data],
  );

  return (
    <section
      id="downloads-resources"
      aria-labelledby="downloads-resources-heading"
      className={cx(
        "relative overflow-hidden bg-white",
        preview ? "py-16 lg:py-20" : standalone ? "page-nav-offset" : "section-padding",
        !preview && "border-t border-navy-950/10",
      )}
    >
      <ResourceBackdrop uid={uid} />
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-gold/8 blur-3xl pointer-events-none" />
      <FloatingParticles />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 lg:mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          <div className="max-w-2xl">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-5"
            >
              <i className="fas fa-folder-open text-gold text-xs" aria-hidden />
              <span className="text-[10px] uppercase tracking-[0.3em] text-navy-950/70 font-semibold">
                Resource Library
              </span>
            </motion.div>
            <motion.h2
              id="downloads-resources-heading"
              variants={itemVariants}
              className="display-title font-display font-bold leading-[1.04]"
            >
              <span className="text-navy-950">Downloads &</span>{" "}
              <span className="text-gradient-gold italic font-serif font-normal">
                Resources.
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-navy-950/65 text-sm md:text-base mt-3">
              Essential Documents at Your Fingertips
            </motion.p>
            {!preview && (
              <motion.p variants={itemVariants} className="text-navy-950/50 text-sm mt-2 max-w-xl">
                Official documents, trade guides, membership forms, and enterprise resources —
                organized for global business readiness.
              </motion.p>
            )}
          </div>
          {!preview && (
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {[
                "Institutional credibility",
                "Business support",
                "Knowledge sharing",
              ].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-full border border-navy-950/10 bg-navy-950/[0.03] text-[10px] uppercase tracking-[0.12em] text-navy-950/50"
                >
                  {p}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-3 mb-6"
        >
          <label className="relative flex-1">
            <span className="sr-only">Search resources</span>
            <i
              className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-navy-950/40 text-sm"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search forms, guides, reports, brochures…"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-navy-950/5 border border-navy-950/10 text-navy-950 text-sm placeholder:text-navy-950/40 focus:border-gold/40 focus:outline-none transition"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "popular")}
            className="px-4 py-3 rounded-2xl bg-white border border-navy-950/10 text-navy-950 text-sm focus:border-gold/40 focus:outline-none min-w-[160px]"
            aria-label="Sort resources"
          >
            <option value="newest">Newest first</option>
            <option value="popular">Most popular</option>
          </select>
        </motion.div>

        <div className={cx("grid gap-6 lg:gap-8", !preview && "lg:grid-cols-12")}>
          {!preview && (
            <motion.aside
              className="lg:col-span-3 space-y-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={cx(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition",
                  category === "all"
                    ? "bg-gold text-navy-950"
                    : "border border-navy-950/10 bg-navy-950/5 text-navy-950/70 hover:border-gold/30 hover:text-navy-950",
                )}
              >
                All Resources
              </button>
              {RESOURCE_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={cx(
                    "w-full text-left px-4 py-3 rounded-xl text-sm transition flex items-center gap-3",
                    category === c.id
                      ? "bg-gold/15 border border-gold/35 text-gold-700"
                      : "border border-navy-950/10 bg-navy-950/5 text-navy-950/65 hover:border-gold/25 hover:text-navy-950",
                  )}
                >
                  <i className={cx("fas", c.icon, "text-xs w-4 text-center shrink-0")} aria-hidden />
                  <span className="line-clamp-2">{c.label}</span>
                </button>
              ))}
            </motion.aside>
          )}

          <div className={cx(!preview ? "lg:col-span-9 space-y-6" : "space-y-6")}>
            {preview && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex gap-2 overflow-x-auto no-scrollbar pb-1"
              >
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  className={cx(
                    "shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition",
                    category === "all"
                      ? "bg-gold text-navy-950"
                      : "border border-navy-950/10 bg-navy-950/5 text-navy-950/60 hover:border-gold/30",
                  )}
                >
                  All
                </button>
                {RESOURCE_CATEGORIES.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cx(
                      "shrink-0 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.14em] font-semibold transition whitespace-nowrap",
                      category === c.id
                        ? "bg-gold text-navy-950"
                        : "border border-navy-950/10 bg-navy-950/5 text-navy-950/60 hover:border-gold/30",
                    )}
                  >
                    {c.label.split(" ")[0]}
                  </button>
                ))}
              </motion.div>
            )}

            {loading ? (
              <div className="py-20 text-center text-navy-950/50 text-sm">Loading resource library…</div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={containerVariants}
                className="space-y-6"
              >
                {data?.featured && (
                  <FeaturedResourceSpotlight
                    resource={data.featured}
                    onPreview={setPreviewItem}
                  />
                )}

                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={`${category}-${debouncedSearch}-${pageSize}-${sort}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid sm:grid-cols-2 gap-4 lg:gap-5"
                  >
                    {data?.resources.map((r) => (
                      <ResourceCard
                        key={r.id}
                        resource={r}
                        onPreview={setPreviewItem}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {data && data.resources.length === 0 && (
                  <div className="py-16 text-center glass-light rounded-3xl border border-navy-950/10">
                    <p className="text-navy-950/60">No resources match your search.</p>
                  </div>
                )}

                {canLoadMore && (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((c) => c + 4)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
                    >
                      Load more resources
                      <i className="fas fa-plus text-[10px] text-gold" aria-hidden />
                    </button>
                  </div>
                )}

                {!preview && recommended.length > 0 && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-navy-950/45 font-bold mb-4">
                      Recommended for you
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {recommended.map((r) => (
                        <ResourceCard
                          key={`rec-${r.id}`}
                          resource={r}
                          onPreview={setPreviewItem}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {!preview && data && (
            <div className="lg:col-span-12 grid md:grid-cols-2 gap-6 mt-2">
              <RecentResources items={data.recent} />
              <PopularDownloads items={data.popular} />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href={preview ? "/resources" : "#downloads-resources"}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold shadow-gold hover:scale-[1.02] transition"
          >
            {preview ? "Explore Documents" : "Access Trade Guides"}
            <i className="fas fa-arrow-right text-xs" aria-hidden />
          </Link>
          {preview ? (
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
            >
              Download Resources
              <i className="fas fa-download text-xs text-gold" aria-hidden />
            </Link>
          ) : (
            <a
              href="#downloads-resources"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-navy-950/15 text-navy-950 text-sm font-semibold hover:border-gold/40 transition"
            >
              Browse categories
              <i className="fas fa-layer-group text-xs text-gold" aria-hidden />
            </a>
          )}
        </motion.div>
      </div>

      <ResourcePreviewModal resource={previewItem} onClose={() => setPreviewItem(null)} />
    </section>
  );
}
