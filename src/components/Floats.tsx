"use client";

import { useCallback, useEffect, useState } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const Floats = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    window.__iicciOpenAI = () => setIsOpen(true);
    window.__iicciCloseAI = () => setIsOpen(false);
    window.__iicciToggleAI = () => setIsOpen((v) => !v);

    const onOpen = () => setIsOpen(true);
    const onToggle = () => setIsOpen((v) => !v);
    window.addEventListener("iicci:open-ai", onOpen);
    window.addEventListener("iicci:toggle-ai", onToggle);

    return () => {
      delete window.__iicciOpenAI;
      delete window.__iicciCloseAI;
      delete window.__iicciToggleAI;
      window.removeEventListener("iicci:open-ai", onOpen);
      window.removeEventListener("iicci:toggle-ai", onToggle);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const lenis = window.__iicciLenis;
    const panel = document.getElementById("ai-panel");

    lenis?.stop();

    body.classList.add("ai-assistant-open");
    root.classList.add("ai-assistant-open");

    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyOverflow = body.style.overflow;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const blockBackgroundTouch = (e: TouchEvent) => {
      const target = e.target;
      if (panel && target instanceof Node && panel.contains(target)) return;
      e.preventDefault();
    };

    const blockBackgroundWheel = (e: WheelEvent) => {
      const target = e.target;
      if (panel && target instanceof Node && panel.contains(target)) return;
      e.preventDefault();
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", blockBackgroundTouch, {
      passive: false,
    });
    document.addEventListener("wheel", blockBackgroundWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", blockBackgroundTouch);
      document.removeEventListener("wheel", blockBackgroundWheel);
      window.removeEventListener("keydown", onKey);

      body.classList.remove("ai-assistant-open");
      root.classList.remove("ai-assistant-open");

      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.overflow = prevBodyOverflow;

      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [isOpen, close]);

  useEffect(() => {
    const panel = document.getElementById("ai-panel");
    if (!panel) return;
    panel.classList.toggle("open", isOpen);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={cx(
          "fixed inset-0 z-[90] bg-navy-950/55 backdrop-blur-[2px] transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none invisible",
        )}
        onClick={close}
        aria-label="Close popup"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        id="chat-float-dock"
        className="chat-float-dock fixed z-[100] flex flex-col items-end pointer-events-none right-[max(1.25rem,env(safe-area-inset-right,0px))] bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
        aria-label="Chat and support shortcuts"
      >
        <div className="relative flex flex-col items-end gap-4">
          <div
            id="ai-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-panel-title"
            aria-hidden={!isOpen}
            data-lenis-prevent
            className={cx(
              "ai-assistant-panel glass-dark border border-white/10 rounded-3xl shadow-premium overflow-hidden",
              isOpen && "open",
            )}
          >
            <div className="relative p-6 sm:p-8 text-center">
              <button
                id="ai-close"
                type="button"
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition pointer-events-auto"
                aria-label="Close"
              >
                <i className="fas fa-xmark" aria-hidden />
              </button>

              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950 shadow-gold mb-5">
                <i className="fas fa-robot text-2xl" aria-hidden />
              </div>

              <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">
                IICCI AI Concierge
              </span>
              <h2
                id="ai-panel-title"
                className="font-display font-bold text-white text-2xl mb-3"
              >
                Coming Soon
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-[280px] mx-auto">
                Our intelligent trade assistant is under development. Stay tuned
                for membership help, partner matching, and more.
              </p>

              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium pointer-events-auto"
              >
                Got it
                <i className="fas fa-check text-[10px]" aria-hidden />
              </button>
            </div>
          </div>

          <button
            id="ai-floating-btn"
            type="button"
            onClick={toggle}
            className="chat-float-btn group pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-600 shadow-gold flex items-center justify-center text-navy-950 magnetic"
            aria-label={isOpen ? "Close popup" : "Open AI Assistant"}
            aria-expanded={isOpen}
            aria-controls="ai-panel"
          >
            <i
              className={cx(
                "text-xl transition-transform duration-300",
                isOpen ? "fas fa-xmark" : "fas fa-robot",
              )}
              aria-hidden
            />
            {!isOpen && (
              <>
                <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30 pointer-events-none" />
                <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-navy-950 translate-x-1/4 -translate-y-1/4">
                  1
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      <div id="scroll-progress" className="scroll-progress" />

      <button
        id="back-to-top"
        type="button"
        className="fixed bottom-28 left-6 z-30 w-12 h-12 rounded-full glass-dark border border-white/10 text-white/70 hover:text-gold flex items-center justify-center opacity-0 invisible transition-all duration-300 magnetic"
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up text-sm" aria-hidden />
      </button>

      <div className="cursor-ring" aria-hidden />
      <div className="cursor-dot" aria-hidden />
    </>
  );
};
