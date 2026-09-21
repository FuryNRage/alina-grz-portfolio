/* ─── Scroll reveal ──────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Immediately show elements already in viewport on load
  const show = el => el.classList.add('visible');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { show(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    // If already visible on load, show immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      show(el);
    } else {
      obs.observe(el);
    }
  });
}

/* ─── Progress bars ──────────────────────────────────────── */
function initBars() {
  const bars = document.querySelectorAll('.prog__fill');
  if (!bars.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}

/* ─── Heading image cycle ────────────────────────────────── */
function initHeading() {
  const imgs = document.querySelectorAll('.hero__heading-img');
  if (imgs.length < 2) return;
  let cur = 0;
  setInterval(() => {
    imgs[cur].classList.remove('active');
    cur = (cur + 1) % imgs.length;
    imgs[cur].classList.add('active');
  }, 2800);
}

/* ─── Nav scroll shadow ──────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();

  // Active link
  const page = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(a => {
    const h = a.getAttribute('href').replace('../', '');
    if (h === page ||
        (page === '' && h.includes('index')) ||
        (location.pathname.includes('/projects/') && h.includes('portfolio'))) {
      a.classList.add('active');
    }
  });
}

/* ─── Smooth anchor scroll ───────────────────────────────── */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ─── Portfolio card 3D tilt ─────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 8;
      const y = ((e.clientY - r.top)  / r.height - .5) * -8;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform .05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1)';
    });
  });
}

/* ─── Boot ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initBars();
  initHeading();
  initNav();
  initScroll();
  initTilt();
});
