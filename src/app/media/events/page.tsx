export const Events = () => {
  const events = [
    { day: '12', month: 'Dec', year: '2025', title: 'India-GCC Trade Summit 2025', loc: 'Dubai, UAE', type: 'Summit', spots: '342 / 500' },
    { day: '24', month: 'Jan', year: '2026', title: 'Global Importers Conference', loc: 'New Delhi, India', type: 'Conference', spots: '1,200 / 2,000' },
    { day: '08', month: 'Feb', year: '2026', title: 'India-Africa Business Delegation', loc: 'Nairobi, Kenya', type: 'Delegation', spots: '45 / 80' },
    { day: '17', month: 'Mar', year: '2026', title: 'AI & Trade Innovation Webinar', loc: 'Online', type: 'Webinar', spots: 'Free' },
  ]

  return (
    <section id="events" className="relative page-nav-offset overflow-hidden bg-white">

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/5 border border-navy-950/10 mb-4">
              <i className="fas fa-calendar-days text-gold text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-navy-950/70">Upcoming Events</span>
            </div>
            <h2 className="display-title font-display font-bold">
              <span className="text-navy-950">Where global</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">trade happens.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 reveal-up">
            <button className="px-4 py-2 rounded-full bg-navy-950/5 border border-navy-950/10 text-navy-950/70 hover:text-navy-950 text-xs font-medium transition">
              <i className="fas fa-calendar mr-2 text-gold"></i> View Calendar
            </button>
          </div>
        </div>

        {/* Featured event with countdown */}
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-gold/20 reveal-up">
          <div className="absolute inset-0 bg-gradient-to-br from-royal-dark via-navy-900 to-navy-950"></div>
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/15 blur-3xl"></div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-widest font-bold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-950 animate-pulse"></span>
                Flagship Event
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                India-GCC Trade Summit <span className="text-gold">2025</span>
              </h3>
              <p className="text-white/70 mb-6 max-w-lg">
                The biggest gathering of importers, exporters, government officials, and global investors. Join 500+ delegates in Dubai for three days of dealmaking.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
                <span className="flex items-center gap-2 text-white/80">
                  <i className="fas fa-location-dot text-gold"></i> Dubai, UAE
                </span>
                <span className="flex items-center gap-2 text-white/80">
                  <i className="fas fa-calendar text-gold"></i> Dec 12-14, 2025
                </span>
                <span className="flex items-center gap-2 text-white/80">
                  <i className="fas fa-users text-gold"></i> 500+ Delegates
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium btn-shine">
                  Register Now <i className="fas fa-arrow-right text-xs"></i>
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-white text-sm font-medium hover:border-gold/30 transition">
                  Event Agenda
                </a>
              </div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3" id="countdown" data-event-date="2025-12-12T09:00:00">
              {[
                { label: 'Days', id: 'days' },
                { label: 'Hours', id: 'hours' },
                { label: 'Mins', id: 'mins' },
                { label: 'Secs', id: 'secs' },
              ].map((c) => (
                <div key={c.id} className="rounded-2xl glass-dark border border-white/10 p-4 lg:p-6 text-center">
                  <div id={c.id} className="text-3xl md:text-5xl font-display font-bold text-gold tabular-nums">00</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event list */}
        <div className="grid lg:grid-cols-2 gap-4">
          {events.map((e) => (
            <div key={`${e.day}-${e.month}-${e.year}`} className="group glass-light rounded-2xl p-5 border border-navy-950/10 card-lift flex items-center gap-5 reveal-up cursor-pointer">
              <div className="shrink-0 w-20 h-24 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] uppercase tracking-wider text-gold">{e.month}</div>
                <div className="text-3xl font-display font-bold text-navy-950">{e.day}</div>
                <div className="text-[10px] text-navy-950/50">{e.year}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-royal/10 text-royal-dark text-[10px] uppercase tracking-wider font-bold">{e.type}</span>
                </div>
                <h3 className="text-base lg:text-lg font-display font-bold text-navy-950 mb-1 group-hover:text-gold transition">{e.title}</h3>
                <div className="flex items-center gap-4 text-xs text-navy-950/60">
                  <span className="flex items-center gap-1.5"><i className="fas fa-location-dot text-gold text-[10px]"></i> {e.loc}</span>
                  <span className="flex items-center gap-1.5"><i className="fas fa-users text-gold text-[10px]"></i> {e.spots}</span>
                </div>
              </div>
              <i className="fas fa-arrow-right text-navy-950/30 group-hover:text-gold group-hover:translate-x-1 transition"></i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function EventsPage() {
  return (
    <main>
      <Events />
    </main>
  );
}
