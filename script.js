document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const searchBox = document.getElementById('siteSearch');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');
  const searchToggle = document.getElementById('searchToggle');

  if (menuButton && mobileMenu && overlay) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
    });
  }

  if (closeButton && mobileMenu && overlay) {
    closeButton.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      if (searchBox) searchBox.classList.remove('open');
    });
  }

  if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', () => {
      searchBox.classList.toggle('open');
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (overlay) overlay.classList.toggle('open', searchBox.classList.contains('open'));
    });
  }
});
