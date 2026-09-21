/* ─── Scroll-reveal (Intersection Observer) ─────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        // Progress bars (resume page)
        if (e.target.classList.contains('prog__fill')) return;
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .prog__fill').forEach(el => observer.observe(el));

/* ─── Active nav link ────────────────────────────────────────── */
(() => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href').replace('../', '');
    if (
      href === page ||
      (href.includes('portfolio') && page.includes('portfolio')) ||
      (href.includes('resume') && page.includes('resume')) ||
      (href.includes('index') && page === '')
    ) {
      a.classList.add('active');
    }
  });

  // Mark project pages as portfolio active
  if (location.pathname.includes('/projects/')) {
    document.querySelectorAll('.nav__links a').forEach(a => {
      if (a.href.includes('portfolio')) a.classList.add('active');
    });
  }
})();

/* ─── Smooth anchor scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Portfolio card tilt (subtle 3D) ────────────────────────── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - .5) * 10;
    const y = ((e.clientY - top)  / height - .5) * -10;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform .05s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1)';
  });
});

/* ─── Nav scroll shadow ─────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  const updateNav = () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 20px rgba(0,44,56,.10)'
      : 'none';
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ─── Hero entrance animation ────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero__headline, .hero__greeting, .hero__bio, .hero__cta').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity .7s ease ${i * .12}s, transform .7s ease ${i * .12}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

  // Collage photos
  document.querySelectorAll('.hero__photo').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = i === 0 ? 'translateX(30px)' : 'translateX(-30px)';
    el.style.transition = `opacity .8s ease ${.3 + i * .15}s, transform .8s ease ${.3 + i * .15}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      });
    });
  });
});
