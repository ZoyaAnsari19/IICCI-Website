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
    const messages = document.getElementById("ai-messages");

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

    const containMessageWheel = (e: WheelEvent) => {
      if (!messages) return;
      const { scrollTop, scrollHeight, clientHeight } = messages;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom =
        scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (atTop || atBottom) e.preventDefault();
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", blockBackgroundTouch, {
      passive: false,
    });
    document.addEventListener("wheel", blockBackgroundWheel, { passive: false });
    messages?.addEventListener("wheel", containMessageWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", blockBackgroundTouch);
      document.removeEventListener("wheel", blockBackgroundWheel);
      messages?.removeEventListener("wheel", containMessageWheel);
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
        aria-label="Close AI assistant"
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
              "ai-assistant-panel glass-dark border border-white/10 rounded-3xl shadow-premium overflow-hidden flex flex-col",
              isOpen && "open",
            )}
          >
            <div className="relative shrink-0 p-5 bg-gradient-to-br from-royal-dark to-navy-900 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950">
                    <i className="fas fa-robot text-sm" aria-hidden />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy-900" />
                </div>
                <div>
                  <div
                    id="ai-panel-title"
                    className="text-white font-semibold text-sm"
                  >
                    IICCI AI Concierge
                  </div>
                  <div className="text-[11px] text-white/60">
                    Online • Avg response 30s
                  </div>
                </div>
                <button
                  id="ai-close"
                  type="button"
                  onClick={close}
                  className="ml-auto w-8 h-8 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition pointer-events-auto"
                  aria-label="Close"
                >
                  <i className="fas fa-xmark" aria-hidden />
                </button>
              </div>
            </div>

            <div
              data-lenis-prevent
              className="p-4 space-y-3 flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y"
              id="ai-messages"
            >
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs shrink-0">
                  <i className="fas fa-robot" aria-hidden />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[260px]">
                  <p className="text-sm text-white/90">
                    Hello! I&apos;m IICCI&apos;s AI Concierge. I can help with
                    membership, services, trade queries, and more. How can I
                    assist you today?
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 p-3 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  "Membership info",
                  "Find a partner",
                  "India entry",
                  "Events",
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="quick-question px-3 py-1.5 rounded-full bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 text-xs text-white/70 transition pointer-events-auto"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="ai-input"
                  type="text"
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/5 border border-white/10 focus:border-gold/40 rounded-full px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 pointer-events-auto"
                />
                <button
                  id="ai-send"
                  type="button"
                  className="w-10 h-10 rounded-full bg-gradient-gold text-navy-950 flex items-center justify-center btn-premium pointer-events-auto"
                  aria-label="Send"
                >
                  <i className="fas fa-paper-plane text-xs" aria-hidden />
                </button>
              </div>
              <div className="text-center text-[10px] text-white/30 mt-2">
                Powered by IICCI AI · For complex queries please call us
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/911145678900"
            target="_blank"
            rel="noopener noreferrer"
            className="chat-float-btn group pointer-events-auto w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-lg flex items-center justify-center text-white magnetic"
            aria-label="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp text-2xl" aria-hidden />
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-navy-900 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition">
              Chat on WhatsApp
            </span>
          </a>

          <button
            id="ai-floating-btn"
            type="button"
            onClick={toggle}
            className="chat-float-btn group pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-600 shadow-gold flex items-center justify-center text-navy-950 magnetic"
            aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
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
