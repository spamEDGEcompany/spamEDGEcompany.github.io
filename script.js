document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const searchBox = document.getElementById('siteSearch');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');
  const searchToggle = document.getElementById('searchToggle');

  const subscriptionPopup = document.createElement('aside');
  subscriptionPopup.className = 'subscription-popup';
  subscriptionPopup.setAttribute('aria-label', 'Latest news subscription');
  subscriptionPopup.innerHTML = `
    <button class="subscription-close" type="button" aria-label="Close subscription popup">&times;</button>
    <p class="subscription-kicker">Stay informed</p>
    <h2>Hear our latest news</h2>
    <p>Subscribe for company updates, project news, and new opportunities from SpamEDGE Company.</p>
    <form class="subscription-form" novalidate>
      <label class="sr-only" for="subscriptionEmail">Email address</label>
      <input id="subscriptionEmail" name="email" type="email" placeholder="Your email address" autocomplete="email" required />
      <button class="button" type="submit">Subscribe</button>
      <p class="subscription-message" role="status" aria-live="polite"></p>
    </form>
  `;
  document.body.appendChild(subscriptionPopup);

  const subscriptionKey = 'spamedge-newsletter-subscribed';
  const popupDismissedKey = 'spamedge-newsletter-dismissed';
  const closeSubscription = () => {
    subscriptionPopup.classList.remove('open');
    window.localStorage.setItem(popupDismissedKey, 'true');
  };

  subscriptionPopup.querySelector('.subscription-close').addEventListener('click', closeSubscription);
  subscriptionPopup.querySelector('.subscription-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const message = form.querySelector('.subscription-message');

    if (!emailInput.checkValidity()) {
      message.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    window.localStorage.setItem(subscriptionKey, emailInput.value.trim());
    message.textContent = 'Thank you. You are subscribed for the latest news.';
    form.reset();
    window.setTimeout(() => subscriptionPopup.classList.remove('open'), 2200);
  });

  if (!window.localStorage.getItem(subscriptionKey) && !window.localStorage.getItem(popupDismissedKey)) {
    window.setTimeout(() => subscriptionPopup.classList.add('open'), 1800);
  }

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
