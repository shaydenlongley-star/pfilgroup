/* ============================================
   PFIL GROUP — Premium Interactions
   ============================================ */
(function () {
  'use strict';

  /* PRELOADER */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => setTimeout(() => preloader.classList.add('done'), 1400));
  }


  /* NAVBAR */
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navbar) {
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  }
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('click', e => {
      if (navbar && !navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open'); document.body.style.overflow = '';
      }
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navMenu.classList.remove('open'); document.body.style.overflow = ''; }));
  }

  /* ACTIVE NAV */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });

  /* HERO PARALLAX */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity = String(Math.max(0, 1 - y / 550));
    }, { passive: true });
  }

  /* SCROLL REVEAL */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* COUNTER ANIMATION */
  function animCounter(el, end, suffix, dur) {
    const t0 = performance.now();
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const statNums = document.querySelectorAll('.stat-number');
  if (statNums.length) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target; const raw = el.textContent.trim(); const m = raw.match(/^(\d+(\.\d+)?)(.*)$/);
          if (m) animCounter(el, parseFloat(m[1]), m[3], 1600);
          co.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => co.observe(el));
  }

  /* MAGNETIC BUTTONS */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.14}px, ${(e.clientY - r.top - r.height/2) * 0.14}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' }); }
    });
  });

  /* PAGE TRANSITIONS */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault(); document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 340);
    });
  });

  /* BACK TO TOP */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* NEWS FILTER */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
  });

  /* CONTACT FORM */
  const form = document.getElementById('contactForm');
  const succ = document.getElementById('formSuccess');
  if (form && succ) {
    form.addEventListener('submit', e => { e.preventDefault(); form.style.display = 'none'; succ.style.display = 'block'; });
  }

})();
