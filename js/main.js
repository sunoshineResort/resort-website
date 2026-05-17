// Navbar: switch to solid bg on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(212, 165, 32, 0.97)';
    navbar.style.backdropFilter = 'none';
    document.querySelectorAll('.nav-links a, .logo-text, .logo-sub').forEach(el => {
      el.style.color = '#1a1a1a';
    });
  } else {
    navbar.style.background = 'rgba(255,255,255,0.12)';
    navbar.style.backdropFilter = 'blur(8px)';
    document.querySelectorAll('.nav-links a, .logo-text, .logo-sub').forEach(el => {
      el.style.color = '#ffffff';
    });
  }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.about, .gallery, .social, .contact').forEach(el => {
  el.classList.add('fade-section');
  observer.observe(el);
});
