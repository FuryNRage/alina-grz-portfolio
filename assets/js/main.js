/* ─── Scroll reveal ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Progress bars on resume page */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.5 });
document.querySelectorAll('.prog__fill').forEach(el => barObserver.observe(el));

/* ─── Heading animation (cycles every 2.5s) ─────────────── */
const headingImgs = document.querySelectorAll('.hero__heading-img');
if (headingImgs.length > 1) {
  let cur = 0;
  setInterval(() => {
    headingImgs[cur].classList.remove('active');
    cur = (cur + 1) % headingImgs.length;
    headingImgs[cur].classList.add('active');
  }, 2500);
}

/* ─── Nav scroll shadow ──────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ─── Active nav link ────────────────────────────────────── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const h = a.getAttribute('href').replace('../', '');
  if (h === page ||
      (page === '' && h.includes('index')) ||
      (location.pathname.includes('/projects/') && h.includes('portfolio'))) {
    a.classList.add('active');
  }
});

/* ─── Smooth anchor scroll ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Portfolio card hover 3D tilt ──────────────────────── */
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
