import Image from 'next/image'

export const Training = () => {
  const courses = [
    {
      icon: 'fa-ship',
      title: 'Import Export Masterclass',
      duration: '12 weeks',
      level: 'All Levels',
      students: '2,400+',
      price: '₹15,000',
      flag: '★ Bestseller',
      image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Cargo containers stacked at an export shipping port',
    },
    {
      icon: 'fa-helicopter',
      title: 'DGCA Drone Pilot Training',
      duration: '6 weeks',
      level: 'Beginner-Advanced',
      students: '850+',
      price: '₹65,000',
      flag: 'Govt. Certified',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Professional drone hovering against a clear sky',
    },
    {
      icon: 'fa-certificate',
      title: 'Global Trade Certification',
      duration: '8 weeks',
      level: 'Intermediate',
      students: '1,200+',
      price: '₹25,000',
      flag: 'International',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Export documentation and global trade compliance',
    },
    {
      icon: 'fa-briefcase',
      title: 'Global Placement Program',
      duration: 'Ongoing',
      level: 'Graduate',
      students: '3,500+',
      price: 'Free for members',
      flag: 'Career',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Professionals collaborating in a modern corporate workspace',
    },
  ]

  return (
    <section id="ai" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-royal-dark to-navy-950" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-royal/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 reveal-up">
              <i className="fas fa-graduation-cap text-gold text-xs"></i>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Training & Certification</span>
            </div>
            <h2 className="display-title font-display font-bold reveal-up">
              <span className="text-white">Build skills that</span>{' '}
              <span className="text-gradient-gold italic font-serif font-normal">power global careers.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-white/60 text-base reveal-up">
              Industry-recognized training programs from import-export to drone piloting. Subscribe monthly at <span className="text-gold font-bold">just ₹1000</span> for unlimited access to our learning library.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c) => (
            <div key={c.title} className="group glass-dark rounded-3xl overflow-hidden border border-white/10 card-lift reveal-up">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20"></div>
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-navy-950/70 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <i className={`fas ${c.icon} text-gold text-lg`}></i>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold text-navy-950 text-[10px] uppercase tracking-wider font-bold shadow-gold">
                  {c.flag}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-display font-bold text-white mb-3 group-hover:text-gold transition leading-tight">
                  {c.title}
                </h3>
                <div className="space-y-1.5 mb-4 text-xs text-white/60">
                  <div className="flex items-center gap-2"><i className="fas fa-clock text-gold/70 w-4"></i> {c.duration}</div>
                  <div className="flex items-center gap-2"><i className="fas fa-signal text-gold/70 w-4"></i> {c.level}</div>
                  <div className="flex items-center gap-2"><i className="fas fa-users text-gold/70 w-4"></i> {c.students} enrolled</div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="text-sm font-bold text-white">{c.price}</div>
                  <button className="text-gold text-xs font-semibold hover:gap-3 flex items-center gap-2 transition-all">
                    Enroll <i className="fas fa-arrow-right text-[10px]"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription banner */}
        <div className="mt-10 rounded-3xl p-8 lg:p-10 bg-gradient-to-r from-royal-dark to-navy-900 border border-white/10 relative overflow-hidden reveal-up">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl"></div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-3">Monthly Subscription</div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                Unlimited learning at <span className="text-gradient-gold">₹1,000/mo</span>
              </h3>
              <p className="text-white/60 mb-6">
                Access 50+ courses, live webinars, certifications, and our exclusive learning community. Cancel anytime.
              </p>
              <a href="#" className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-gold text-navy-950 text-sm font-bold btn-premium btn-shine shadow-gold">
                Start Free 7-Day Trial <i className="fas fa-arrow-right text-xs"></i>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { i: 'fa-video', t: '50+ Courses' },
                { i: 'fa-broadcast-tower', t: 'Live Webinars' },
                { i: 'fa-award', t: 'Certifications' },
                { i: 'fa-users', t: 'Community' },
              ].map((b) => (
                <div key={b.t} className="glass rounded-2xl p-4 text-center">
                  <i className={`fas ${b.i} text-gold text-xl mb-2`}></i>
                  <div className="text-xs text-white/80">{b.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
