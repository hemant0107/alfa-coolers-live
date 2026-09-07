import gsap from 'gsap';

// Mobile Drawer Navigation Toggle & Dismiss
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

// 4-Option Dynamic Filter Engine
const filterTabs = document.querySelectorAll('.filter-tab');
const allCards = document.querySelectorAll('.cooler-card');

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    filterTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const filterVal = tab.getAttribute('data-filter');

    allCards.forEach((card) => {
      const categories = card.getAttribute('data-category').split(' ');

      if (filterVal === 'all' || categories.includes(filterVal)) {
        card.style.display = 'flex';
        gsap.fromTo(card,
          { opacity: 0, scale: 0.96, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Cursor Ambient Glow Tracker (Active only on mouse devices)
if (window.matchMedia('(pointer: fine)').matches) {
  allCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const stage = card.querySelector('.cooler-stage');
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glow = card.querySelector('.ambient-glow');
      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.transform = 'translate(-50%, -50%) scale(1.35)';
      }
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.ambient-glow');
      if (glow) {
        glow.style.left = '50%';
        glow.style.top = '50%';
        glow.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
  });
}

// Safe Fallback SVG Generator (Guarantees zero broken icons if PNG is missing)
const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='4'/%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cline x1='12' y1='3' x2='12' y2='7'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3Cline x1='3' y1='12' x2='7' y2='12'/%3E%3Cline x1='17' y1='12' x2='21' y2='12'/%3E%3C/svg%3E";

document.querySelectorAll('.cooler-render').forEach((img) => {
  img.addEventListener('error', function () {
    this.onerror = null;
    this.src = fallbackSvg;
    this.style.opacity = '0.5';
    this.style.padding = '30px';
  });
});

// Staggered Entrance on Initial Load
window.addEventListener('DOMContentLoaded', () => {
  gsap.fromTo('.cooler-card',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power3.out', delay: 0.1 }
  );
});