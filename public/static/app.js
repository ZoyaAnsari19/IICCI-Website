/* ===== IICCI Premium Interactive Experience ===== */
(() => {
  'use strict';

  document.documentElement.classList.add('iicci-animate');

  // ===== Lenis Smooth Scroll =====
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.length > 1) {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -80, duration: 1.4 });
            // Close mobile menu if open
            if (typeof window.__closeMobileMenu === 'function') {
              window.__closeMobileMenu();
            }
          }
        }
      });
    });
  } catch (err) {
    console.warn('Lenis init failed', err);
  }

  // ===== GSAP setup =====
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Refresh ScrollTrigger when Lenis scrolls
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ===== Scroll Progress =====
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  function updateScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const sc = window.scrollY;
    const percent = (sc / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = percent + '%';

    if (backToTop) {
      if (sc > 600) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100');
      }
    }

    // Navbar transform
    const nav = document.getElementById('navbar');
    if (nav) {
      if (sc > 80) nav.classList.add('nav-blur');
      else nav.classList.remove('nav-blur');
    }
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  backToTop?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== Reveal Animations =====
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Slight stagger
          setTimeout(() => entry.target.classList.add('in-view'), (i % 6) * 70);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  revealEls.forEach((el) => {
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add('in-view');
    }
  });

  setTimeout(() => {
    document
      .querySelectorAll('.reveal-up:not(.in-view), .reveal-fade:not(.in-view), .reveal-scale:not(.in-view)')
      .forEach((el) => el.classList.add('in-view'));
  }, 2500);

  // ===== Counter Animation =====
  const counters = document.querySelectorAll('.counter');
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const duration = 2000;
          const startTime = performance.now();
          const startVal = 0;
          const formatter = new Intl.NumberFormat('en-US');

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(startVal + (target - startVal) * eased);
            el.textContent = formatter.format(value);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = formatter.format(target);
          }
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterIO.observe(c));

  // ===== Particles =====
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['#d4af37', '#3b82f6', '#ffffff'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      p.style.animationDuration = (Math.random() * 15 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particlesContainer.appendChild(p);
    }
  }

  // Mobile menu toggle is handled in Navbar.tsx (React)

  // ===== AI Assistant =====
  const aiPanel = document.getElementById('ai-panel');
  const aiFloatingBtn = document.getElementById('ai-floating-btn');
  const aiToggle = document.getElementById('ai-toggle');
  const aiClose = document.getElementById('ai-close');
  const aiInput = document.getElementById('ai-input');
  const aiSend = document.getElementById('ai-send');
  const aiMessages = document.getElementById('ai-messages');

  function toggleAI() { aiPanel?.classList.toggle('open'); }
  aiFloatingBtn?.addEventListener('click', toggleAI);
  aiToggle?.addEventListener('click', toggleAI);
  aiClose?.addEventListener('click', () => aiPanel?.classList.remove('open'));

  const aiResponses = {
    membership: "Our flagship Associate Membership is currently available at ₹21,000/year (limited-time offer). It includes network access, intelligence reports, certifications, and member directory listing. Would you like me to share the full benefits?",
    partner: "We have 10,000+ verified businesses across 50+ countries. Tell me your sector or country of interest, and I'll connect you with our matchmaking team.",
    india: "Excellent! Our Foreign Company Desk specializes in India entry. We help with market research, JV partnerships, legal compliance, and distributor identification. Shall I schedule a consultation?",
    event: "Our flagship India-GCC Trade Summit 2025 is happening Dec 12-14 in Dubai. We also have monthly delegations and webinars. Would you like the full event calendar?",
    default: "That's a great question! Our team would love to assist you in detail. Please share your contact info or call us at +91 11 4567 8900. You can also email info@iicci.global.",
    greeting: "Hello! Welcome to IICCI. How can I help you with global trade today?",
  };

  function addMessage(text, isUser = false) {
    if (!aiMessages) return;
    const wrap = document.createElement('div');
    wrap.className = 'flex items-start gap-2 ' + (isUser ? 'flex-row-reverse' : '');
    const avatar = document.createElement('div');
    avatar.className = 'w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ' + (isUser ? 'bg-royal/30 text-royal-light' : 'bg-gold/15 text-gold');
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    const bubble = document.createElement('div');
    bubble.className = 'glass rounded-2xl p-3 max-w-[260px] ' + (isUser ? 'rounded-tr-sm bg-royal/10' : 'rounded-tl-sm');
    bubble.innerHTML = `<p class="text-sm text-white/90">${text}</p>`;
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    aiMessages.appendChild(wrap);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function aiReply(query) {
    const q = query.toLowerCase();
    let resp = aiResponses.default;
    if (q.includes('member') || q.includes('join') || q.includes('price')) resp = aiResponses.membership;
    else if (q.includes('partner') || q.includes('match') || q.includes('connect')) resp = aiResponses.partner;
    else if (q.includes('india') || q.includes('entry') || q.includes('foreign')) resp = aiResponses.india;
    else if (q.includes('event') || q.includes('summit') || q.includes('webinar')) resp = aiResponses.event;
    else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) resp = aiResponses.greeting;

    setTimeout(() => addMessage(resp), 600);
  }

  function sendAI() {
    const val = aiInput?.value.trim();
    if (!val) return;
    addMessage(val, true);
    aiInput.value = '';
    aiReply(val);
  }

  aiSend?.addEventListener('click', sendAI);
  aiInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAI();
  });

  document.querySelectorAll('.quick-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      addMessage(text, true);
      aiReply(text);
    });
  });

  // ===== Custom Cursor =====
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(min-width: 1024px)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const navbar = document.getElementById('navbar');
    const setNavCursorHidden = (hidden) => {
      document.body.classList.toggle('nav-cursor-hidden', hidden);
    };
    navbar?.addEventListener('mouseenter', () => setNavCursorHidden(true));
    navbar?.addEventListener('mouseleave', () => setNavCursorHidden(false));

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover targets (skip navbar — light mega menus + blend mode hide labels)
    document
      .querySelectorAll('a, button, [role="button"], .service-card, .country-pin, input, select')
      .forEach((el) => {
        if (el.closest('#navbar')) return;
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover-active'));
      });
  }

  // ===== Service card spotlight =====
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  // ===== Magnetic buttons =====
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ===== Countdown timer =====
  const countdown = document.getElementById('countdown');
  if (countdown) {
    const eventDate = new Date(countdown.dataset.eventDate || '2025-12-12T09:00:00');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

    function updateCountdown() {
      const now = new Date();
      const diff = eventDate - now;
      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      if (daysEl) daysEl.textContent = pad(d);
      if (hoursEl) hoursEl.textContent = pad(h);
      if (minsEl) minsEl.textContent = pad(m);
      if (secsEl) secsEl.textContent = pad(s);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ===== GSAP hero text reveal =====
  // Only animate when the hero is actually present on this route (e.g. `/`).
  // Otherwise GSAP logs "target not found" warnings on subpages.
  if (window.gsap) {
    const heroSpans = document.querySelectorAll('.hero-title span');
    if (heroSpans.length) {
      gsap.fromTo(heroSpans,
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 1.6,
        }
      );
    }
  }

  // ===== Parallax floats =====
  // Skip elements that are detached/empty (can happen after Next.js
  // client-side navigation removes them) — avoids ScrollTrigger warnings.
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.float-chip, .float-chip-slow, .float-chip-fast').forEach((el) => {
      if (!(el instanceof Element) || !el.isConnected) return;
      gsap.to(el, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  // ===== Keyboard search shortcut =====
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('search-btn')?.click();
      alert('Search functionality — connect to your search backend.');
    }
    if (e.key === 'Escape') {
      aiPanel?.classList.remove('open');
      closeMobileMenu();
    }
  });

  // ===== Auto-show AI panel after 30s once =====
  let aiShown = false;
  setTimeout(() => {
    if (!aiShown && !aiPanel?.classList.contains('open')) {
      // subtle pulse on button
      aiFloatingBtn?.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
        { duration: 600, iterations: 3 }
      );
    }
  }, 15000);

  // ===== Console signature =====
  console.log(
    '%c IICCI %c Connecting India to Global Trade %c',
    'background: #d4af37; color: #081120; padding: 6px 12px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #081120; color: #d4af37; padding: 6px 12px; border-radius: 0 4px 4px 0; border: 1px solid #d4af37;',
    ''
  );
})();
