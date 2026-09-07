import gsap from 'gsap';

// Mobile Drawer Navigation
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

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

// Background Videos Continuous Autoplay Boot for Safari/Android
const allVideos = document.querySelectorAll('.plate-media');

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
          allVideos.forEach((v) => v.play().catch(() => {}));
          window.removeEventListener('touchstart', unlock);
          window.removeEventListener('click', unlock);
        };
        window.addEventListener('touchstart', unlock, { once: true, passive: true });
        window.addEventListener('click', unlock, { once: true });
      });
    }
  });
}

bootContinuousStream();

// 1-by-1 Stage Observer with Screen-Adaptive Threshold
const isMobile = window.innerWidth <= 1024;
const snapPlates = document.querySelectorAll('.snap-plate');
const snapTrack = document.getElementById('snapTrack');

const plateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const plate = entry.target;
    const texts = plate.querySelectorAll('.snap-text');
    const mask = plate.querySelector('.snap-mask');
    const media = plate.querySelector('.plate-media');

    if (entry.isIntersecting) {
      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
        );
      }

      if (mask) {
        gsap.fromTo(mask,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }

      if (media && media.tagName.toLowerCase() === 'video') {
        media.play().catch(() => {});
      }
    } else {
      if (!isMobile && media && media.tagName.toLowerCase() === 'video') {
        media.pause();
      }
    }
  });
}, {
  root: isMobile ? null : snapTrack,
  threshold: isMobile ? 0.2 : 0.45
});

snapPlates.forEach((plate) => plateObserver.observe(plate));