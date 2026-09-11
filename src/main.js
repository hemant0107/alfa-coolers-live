import gsap from 'gsap';

// DOM Selectors
const snapSlides = document.querySelectorAll('.snap-slide');
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

// Mobile Drawer Toggle & Outside Click Dismiss
if (toggleBtn && mobileDrawer) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileDrawer.classList.remove('open');
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });
}

// Stagger Animation Observer for Sections
const isMobile = window.innerWidth <= 992;
const observerOptions = {
  root: isMobile ? null : document.querySelector('.snap-track'),
  threshold: isMobile ? 0.15 : 0.4
};

const snapObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const slide = entry.target;
    const texts = slide.querySelectorAll('.snap-text');
    const mask = slide.querySelector('.snap-mask');
    const entriesElements = slide.querySelectorAll('.snap-entry');

    if (entry.isIntersecting) {
      if (mask) {
        gsap.fromTo(mask,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }

      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' }
        );
      }

      if (entriesElements.length > 0) {
        gsap.fromTo(entriesElements,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
      }
    }
  });
}, observerOptions);

snapSlides.forEach((slide) => snapObserver.observe(slide));