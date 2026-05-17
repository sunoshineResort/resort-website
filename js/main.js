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

// Horizontal scroll arrows
document.querySelectorAll('.hscroll-arrow').forEach(btn => {
  btn.addEventListener('click', () => {
    const strip = btn.closest('.hscroll-wrapper').querySelector('.hscroll');
    const dir = btn.classList.contains('right') ? 1 : -1;
    strip.scrollBy({ left: dir * 320, behavior: 'smooth' });
  });
});

// Lightbox
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbImgWrap = document.getElementById('lbImgWrap');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let allImgs = [], currentIdx = 0, zoomLevel = 1;

function openLightbox(imgs, idx) {
  allImgs = imgs;
  currentIdx = idx;
  zoomLevel = 1;
  lbImg.style.transform = 'scale(1)';
  lbImgWrap.classList.remove('zoomed');
  lbImg.src = allImgs[currentIdx];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showNext() {
  currentIdx = (currentIdx + 1) % allImgs.length;
  zoomLevel = 1;
  lbImg.style.transform = 'scale(1)';
  lbImgWrap.classList.remove('zoomed');
  lbImg.src = allImgs[currentIdx];
}

function showPrev() {
  currentIdx = (currentIdx - 1 + allImgs.length) % allImgs.length;
  zoomLevel = 1;
  lbImg.style.transform = 'scale(1)';
  lbImgWrap.classList.remove('zoomed');
  lbImg.src = allImgs[currentIdx];
}

// Make all gallery images clickable
document.querySelectorAll('.gallery-grid .gallery-item img, .hscroll .hscroll-item img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const section = img.closest('.gallery-grid, .hscroll');
    const imgs = Array.from(section.querySelectorAll('img')).map(i => i.src);
    const idx  = imgs.indexOf(img.src);
    openLightbox(imgs, idx);
  });
});

// Zoom with scroll wheel
lbImgWrap.addEventListener('wheel', e => {
  e.preventDefault();
  zoomLevel = Math.min(4, Math.max(1, zoomLevel - e.deltaY * 0.005));
  lbImg.style.transform = `scale(${zoomLevel})`;
  lbImgWrap.classList.toggle('zoomed', zoomLevel > 1);
}, { passive: false });

// Click image to toggle zoom
lbImgWrap.addEventListener('click', e => {
  if (e.target === lbImgWrap) { closeLightbox(); return; }
  zoomLevel = zoomLevel > 1 ? 1 : 2;
  lbImg.style.transform = `scale(${zoomLevel})`;
  lbImgWrap.classList.toggle('zoomed', zoomLevel > 1);
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

// Close on background click
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard controls
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  showNext();
  if (e.key === 'ArrowLeft')   showPrev();
});

// Drag to scroll on horizontal strips
document.querySelectorAll('.hscroll').forEach(el => {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup', () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
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
