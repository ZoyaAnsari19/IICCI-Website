export const Loader = () => {
  return (
    <div id="loader" className="loader-screen">
      <div className="text-center">
        <div className="loader-logo">
          <div className="loader-ring"></div>
          <div className="font-display font-black text-gold text-3xl">II</div>
        </div>
        <div className="mt-6 text-[11px] uppercase tracking-[0.4em] text-white/60">
          Indian Importers Chamber
        </div>
        <div className="mt-2 text-[10px] tracking-[0.3em] text-gold/70">
          Connecting global trade...
        </div>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill"></div>
      </div>
    </div>
  )
}
