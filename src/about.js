// About Page Mobile Drawer Navigation Toggle & Dismiss
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a, .drawer-link');

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
});