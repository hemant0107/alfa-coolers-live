import gsap from 'gsap';

// DOM Selectors
const snapSlides = document.querySelectorAll('.snap-slide');
const allVideos = document.querySelectorAll('video');
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

// Mobile Drawer Toggle & Outside Click Dismiss
if (toggleBtn && mobileDrawer) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle('open');
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileDrawer.classList.remove('open');
    }
  });

  // Close drawer when any nav link is tapped
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });
}

// Background Videos Continuous Autoplay Boot
function bootContinuousStream() {
  allVideos.forEach((vid) => {
    vid.muted = true;
    vid.setAttribute('muted', '');
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.loop = true;
    vid.removeAttribute('controls');

    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const unlock = () => {
          allVideos.forEach(v => v.play().catch(() => {}));
          window.removeEventListener('click', unlock);
          window.removeEventListener('touchstart', unlock);
        };
        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('touchstart', unlock, { once: true, passive: true });
      });
    }
  });
}

bootContinuousStream();

// Stagger Animation Observer
const isMobile = window.innerWidth <= 992;
const observerOptions = {
  root: isMobile ? null : document.querySelector('.snap-track'),
  threshold: isMobile ? 0.2 : 0.45
};

const snapObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const slide = entry.target;
    const texts = slide.querySelectorAll('.snap-text');
    const mask = slide.querySelector('.snap-mask');
    const entriesElements = slide.querySelectorAll('.snap-entry');
    const slideVid = slide.querySelector('video');

    if (entry.isIntersecting) {
      if (slideVid) {
        slideVid.play().catch(() => {});
      }

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