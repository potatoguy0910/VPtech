/* ============================================================
   VPTECH — Premium Agency JavaScript
   ============================================================ */

// === Navbar scroll effect ===
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// === Mobile menu ===
(function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// === Scroll reveal ===
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();

// === Active nav link ===
(function initActiveLinks() {
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// === Animated counter ===
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const isDecimal = String(target).includes('.');
  const duration = 1800;
  const start = performance.now();

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(el => observer.observe(el));
})();

// === Project filter ===
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const category = card.dataset.category || 'all';
        const show = filter === 'all' || category === filter;
        card.style.opacity = show ? '1' : '0.2';
        card.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        card.style.pointerEvents = show ? 'all' : 'none';
      });
    });
  });
})();

// === Particles canvas (contact page) ===
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;
  let particles = [];

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,161,74,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
})();

// === Form submit feedback ===
(function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2d7a4f';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Floating elements subtle parallax ===
(function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb, .contact-orb');
  if (!orbs.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i % 2 === 0) ? 12 : 8;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  });
})();
