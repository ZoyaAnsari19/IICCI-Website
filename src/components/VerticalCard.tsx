"use client";

import { motion, type Variants } from "framer-motion";
import type { MouseEvent } from "react";
import type { TradeVertical } from "@/config/trade-verticals";

export const verticalCardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function cx(...parts: Array<string | false | null | undefined | string[]>) {
  return parts.flat().filter(Boolean).join(" ");
}

type VerticalCardProps = {
  vertical: TradeVertical;
  index?: number;
  variant?: "dark" | "light";
  onSpotlight?: (e: MouseEvent<HTMLElement>) => void;
};

export function VerticalCard({
  vertical,
  index,
  variant = "dark",
  onSpotlight,
}: VerticalCardProps) {
  const isDark = variant === "dark";

  return (
    <motion.article
      variants={verticalCardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      className="group relative h-full"
      onMouseMove={onSpotlight}
    >
      <motion.div
        className={cx(
          "absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          isDark
            ? "bg-gradient-to-br from-gold/40 via-royal-light/20 to-gold/30"
            : "bg-gradient-to-br from-gold/50 via-navy-400/20 to-gold/40",
        )}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className={cx(
          "relative flex h-full flex-col rounded-2xl border p-5 sm:p-6 overflow-hidden",
          "transition-all duration-500",
          "before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
          isDark
            ? [
                "bg-navy-950/55 backdrop-blur-xl border-white/10 shadow-premium",
                "hover:border-gold/45 hover:shadow-gold",
                "before:bg-[radial-gradient(ellipse_at_var(--mx,50%)_var(--my,0%),rgba(212,175,55,0.16),transparent_60%)]",
              ]
            : [
                "glass-light border-navy-950/10",
                "hover:border-gold/40 hover:shadow-gold",
                "before:bg-[radial-gradient(ellipse_at_var(--mx,50%)_var(--my,0%),rgba(212,175,55,0.12),transparent_60%)]",
              ],
          "group-hover:before:opacity-100",
        )}
      >
        <motion.div
          className={cx(
            "absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            isDark ? "bg-gold/10" : "bg-gold/15",
          )}
          aria-hidden
        />

        <motion.div
          className="relative flex items-start justify-between gap-3 mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.div
            className={cx(
              "w-12 h-12 rounded-xl flex items-center justify-center transition duration-500 shrink-0",
              isDark
                ? "bg-gold/10 border border-gold/25 text-gold group-hover:bg-gold group-hover:text-navy-950"
                : "bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 text-gold group-hover:bg-gold group-hover:text-navy-950 group-hover:border-gold",
            )}
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <i className={cx("fas", vertical.icon, "text-lg")} aria-hidden />
          </motion.div>
          {index !== undefined && (
            <span
              className={cx(
                "text-[10px] font-mono font-bold tabular-nums transition",
                isDark
                  ? "text-white/25 group-hover:text-gold/50"
                  : "text-navy-950/30 group-hover:text-gold/70",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </motion.div>

        <h3
          className={cx(
            "relative font-display text-sm sm:text-base font-bold leading-snug mb-2 transition-colors duration-300",
            isDark
              ? "text-white group-hover:text-gold"
              : "text-navy-950 group-hover:text-gold",
          )}
        >
          {vertical.title}
        </h3>
        <p
          className={cx(
            "relative text-xs sm:text-sm leading-relaxed flex-1",
            isDark ? "text-white/55" : "text-navy-950/70",
          )}
        >
          {vertical.description}
        </p>

        <motion.div
          className={cx(
            "relative mt-4 pt-3 border-t flex items-center justify-between gap-2",
            isDark ? "border-white/8" : "border-navy-950/10",
          )}
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
        >
          <span
            className={cx(
              "inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] font-semibold",
              isDark ? "text-gold/70" : "text-gold",
            )}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {vertical.stat}
          </span>
          <span
            className={cx(
              "text-[9px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              isDark ? "text-gold/60" : "text-navy-950/50 group-hover:text-gold",
            )}
          >
            IICCI vertical
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
