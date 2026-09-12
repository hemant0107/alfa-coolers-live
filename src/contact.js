import gsap from 'gsap';

// Mobile Drawer Navigation Toggle & Dismiss
const toggleBtn = document.querySelector('.mobile-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-btn');

if (toggleBtn && mobileDrawer) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle('open');
    toggleBtn.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileDrawer.classList.remove('open');
      toggleBtn.classList.remove('active');
    }
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      toggleBtn.classList.remove('active');
    });
  });
}

// Form Interactive Pill Selectors
function setupPillSelector(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const pills = container.querySelectorAll('.select-pill');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

setupPillSelector('segmentSelector');
setupPillSelector('volumeSelector');

// WhatsApp Dispatch Sync Form Submission - Direct to (+91 98290 27224)
const dealerForm = document.getElementById('dealerForm');

if (dealerForm) {
  dealerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const firm = document.getElementById('firmName').value.trim();
    const phone = document.getElementById('phoneNum').value.trim();
    const city = document.getElementById('cityState').value.trim();
    const notes = document.getElementById('inquiryNotes').value.trim();

    const activeSegment = document.querySelector('#segmentSelector .select-pill.active')?.getAttribute('data-value') || 'Fiber Series (21 Models)';
    const activeVolume = document.querySelector('#volumeSelector .select-pill.active')?.getAttribute('data-value') || 'Wholesale Lot';

    const message = `*NEW DEALER INQUIRY // ALFA COOLERS*%0A%0A` +
      `*Contact Person:* ${encodeURIComponent(name)}%0A` +
      `*Firm Name:* ${encodeURIComponent(firm)}%0A` +
      `*Phone Number:* ${encodeURIComponent(phone)}%0A` +
      `*Destination City/State:* ${encodeURIComponent(city)}%0A` +
      `*Required Segment:* ${encodeURIComponent(activeSegment)}%0A` +
      `*Order Volume Tier:* ${encodeURIComponent(activeVolume)}%0A` +
      (notes ? `*Operational Notes:* ${encodeURIComponent(notes)}%0A` : '') +
      `%0A_Dispatched via Alfa Coolers Commercial Terminal_`;

    const targetPhone = '919829027224';
    window.open(`https://wa.me/${targetPhone}?text=${message}`, '_blank');
  });
}

// Adaptive Intersection Observer
const isMobile = window.innerWidth <= 1080;
const snapTrack = document.getElementById('snapTrack');
const snapPlates = document.querySelectorAll('.snap-plate');

const plateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const plate = entry.target;
    const texts = plate.querySelectorAll('.snap-text');
    const mask = plate.querySelector('.snap-mask');

    if (entry.isIntersecting) {
      if (texts.length > 0) {
        gsap.fromTo(texts,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
        );
      }

      if (mask) {
        gsap.fromTo(mask,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }
    }
  });
}, {
  root: isMobile ? null : snapTrack,
  threshold: isMobile ? 0.2 : 0.45
});

snapPlates.forEach((plate) => plateObserver.observe(plate));