export const Floats = () => {
  return (
    <>
      {/* Viewport-anchored chat dock — stays visible while the page scrolls */}
      <aside
        id="chat-float-dock"
        className="chat-float-dock fixed z-50 flex flex-col items-end pointer-events-none right-[max(1.25rem,env(safe-area-inset-right,0px))] bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
        aria-label="Chat and support shortcuts"
      >
        <div className="relative flex flex-col items-end gap-4">
          <div
            id="ai-panel"
            className="ai-assistant-panel pointer-events-none absolute bottom-full right-0 mb-4 w-[360px] max-w-[calc(100vw-3rem)] glass-dark border border-white/10 rounded-3xl shadow-premium overflow-hidden"
          >
            <div className="relative p-5 bg-gradient-to-br from-royal-dark to-navy-900 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-600 flex items-center justify-center text-navy-950">
                    <i className="fas fa-robot text-sm"></i>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy-900"></span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">IICCI AI Concierge</div>
                  <div className="text-[11px] text-white/60">Online • Avg response 30s</div>
                </div>
                <button id="ai-close" className="ml-auto w-8 h-8 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition">
                  <i className="fas fa-xmark"></i>
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-80 overflow-y-auto" id="ai-messages">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs shrink-0">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="glass rounded-2xl rounded-tl-sm p-3 max-w-[260px]">
                  <p className="text-sm text-white/90">Hello! I'm IICCI's AI Concierge. I can help with membership, services, trade queries, and more. How can I assist you today?</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {['Membership info', 'Find a partner', 'India entry', 'Events'].map((q) => (
                  <button key={q} className="quick-question px-3 py-1.5 rounded-full bg-white/5 hover:bg-gold/15 hover:text-gold border border-white/10 text-xs text-white/70 transition">{q}</button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input id="ai-input" type="text" placeholder="Ask anything..." className="flex-1 bg-white/5 border border-white/10 focus:border-gold/40 rounded-full px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40" />
                <button id="ai-send" className="w-10 h-10 rounded-full bg-gradient-gold text-navy-950 flex items-center justify-center btn-premium" aria-label="Send">
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </div>
              <div className="text-center text-[10px] text-white/30 mt-2">Powered by IICCI AI · For complex queries please call us</div>
            </div>
          </div>

          <a
            href="https://wa.me/911145678900"
            target="_blank"
            rel="noopener noreferrer"
            className="chat-float-btn group pointer-events-auto w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-lg flex items-center justify-center text-white magnetic"
            aria-label="Chat on WhatsApp"
          >
            <i className="fab fa-whatsapp text-2xl"></i>
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-navy-900 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition">Chat on WhatsApp</span>
          </a>

          <button
            id="ai-floating-btn"
            className="chat-float-btn group pointer-events-auto relative w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-600 shadow-gold flex items-center justify-center text-navy-950 magnetic"
            aria-label="Open AI Assistant"
          >
            <i className="fas fa-robot text-xl"></i>
            <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30 pointer-events-none" />
            <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-navy-950 translate-x-1/4 -translate-y-1/4">
              1
            </span>
          </button>
        </div>
      </aside>

      <div id="scroll-progress" className="scroll-progress"></div>

      <button id="back-to-top" className="fixed bottom-28 left-6 z-30 w-12 h-12 rounded-full glass-dark border border-white/10 text-white/70 hover:text-gold flex items-center justify-center opacity-0 invisible transition-all duration-300 magnetic" aria-label="Back to top">
        <i className="fas fa-arrow-up text-sm"></i>
      </button>

      <div className="cursor-ring"></div>
      <div className="cursor-dot"></div>
    </>
  )
}
