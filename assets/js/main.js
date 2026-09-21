// Active nav link highlighting
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Portfolio card hover — subtle shadow
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 16px 40px rgba(0,44,56,.12)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});
