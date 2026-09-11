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

// Cursor Ambient Glow Tracker
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

// Staggered Entrance on Initial Load
window.addEventListener('DOMContentLoaded', () => {
  gsap.fromTo('.cooler-card',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: 'power3.out', delay: 0.1 }
  );
});