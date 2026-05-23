import Image from "next/image";

export const Loader = () => {
  return (
    <div id="loader" className="loader-screen">
      <div className="text-center">
        <div className="loader-logo" style={{ width: 220, height: 140 }}>
          <div
            className="loader-ring"
            style={{ borderRadius: "1.25rem", inset: "-12px" }}
          ></div>
          <div className="relative rounded-2xl bg-white/95 px-5 py-3 shadow-[0_10px_40px_rgba(212,175,55,0.18)] ring-1 ring-gold/30">
            <Image
              src="/images/logoiicifinal.jpg"
              alt="IICCI — Indian Importers Chambers of Commerce and Industry"
              width={245}
              height={122}
              priority
              sizes="180px"
              className="h-14 w-auto object-contain select-none"
            />
          </div>
        </div>
        <div className="mt-8 text-[11px] uppercase tracking-[0.4em] text-white/60">
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
