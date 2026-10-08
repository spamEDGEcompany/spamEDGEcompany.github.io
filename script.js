document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const searchBox = document.getElementById('siteSearch');
  const menuButton = document.getElementById('menuButton') || document.getElementById('mobileMenuToggle');
  const closeButton = document.getElementById('closeMenu') || document.getElementById('closeMobileMenu');
  const searchToggle = document.getElementById('searchToggle');

  const marketDate = document.getElementById('market-date');
  const usdRateEl = document.getElementById('usd-ngn-rate');
  const eurRateEl = document.getElementById('eur-ngn-rate');
  const cryptoTickers = [
    { id: 'bitcoin', symbol: 'btc' },
    { id: 'ethereum', symbol: 'eth' },
    { id: 'solana', symbol: 'sol' }
  ];

  const formatCurrency = (value) => `₦${Number(value).toLocaleString('en-NG', { maximumFractionDigits: 2 })}`;

  const fallbackRates = {
    USDNGN: 1540.12,
    EURNGN: 1686.45
  };

  const updateMarketTicker = (rates) => {
    if (!rates) return;

    const usdRate = Number(rates.USDNGN || fallbackRates.USDNGN);
    const eurRate = Number(rates.EURNGN || fallbackRates.EURNGN);

    if (usdRateEl) usdRateEl.textContent = formatCurrency(usdRate);
    if (eurRateEl) eurRateEl.textContent = formatCurrency(eurRate);

    const today = new Date();
    if (marketDate) {
      marketDate.textContent = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
      if (!response.ok) throw new Error('Exchange rate request failed');
      const payload = await response.json();
      const rates = payload?.rates ?? {};
      const usdNgn = Number(rates.NGN || fallbackRates.USDNGN);
      const eurNgn = Number((rates.NGN / (rates.EUR || 1)).toFixed(2));
      const liveRates = {
        USDNGN: usdNgn,
        EURNGN: eurNgn
      };
      updateMarketTicker(liveRates);
    } catch (error) {
      updateMarketTicker(fallbackRates);
    }
  };

  updateMarketTicker(fallbackRates);
  fetchExchangeRates();
  window.setInterval(fetchExchangeRates, 300000);

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Csolana&vs_currencies=usd&include_24hr_change=true',
        { cache: 'no-store' }
      );
      if (!response.ok) throw new Error('Cryptocurrency price request failed');
      const payload = await response.json();

      cryptoTickers.forEach(({ id, symbol }) => {
        const price = Number(payload?.[id]?.usd);
        const change = Number(payload?.[id]?.usd_24h_change);
        const priceEl = document.getElementById(`${symbol}-price`);
        const changeEl = document.getElementById(`${symbol}-change`);

        if (!Number.isFinite(price) || !Number.isFinite(change)) {
          if (priceEl) priceEl.textContent = 'Unavailable';
          if (changeEl) changeEl.textContent = '--';
          return;
        }

        if (priceEl) {
          priceEl.textContent = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: price < 1 ? 4 : price < 100 ? 2 : 0
          }).format(price);
        }
        if (changeEl) {
          changeEl.textContent = `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
          changeEl.classList.toggle('is-positive', change >= 0);
          changeEl.classList.toggle('is-negative', change < 0);
        }
      });
    } catch (error) {
      cryptoTickers.forEach(({ symbol }) => {
        const priceEl = document.getElementById(`${symbol}-price`);
        const changeEl = document.getElementById(`${symbol}-change`);
        if (priceEl) priceEl.textContent = 'Unavailable';
        if (changeEl) changeEl.textContent = '--';
      });
      console.error('Unable to load cryptocurrency prices:', error);
    }
  };

  if (document.getElementById('btc-price')) {
    fetchCryptoPrices();
    window.setInterval(fetchCryptoPrices, 60000);
  }

  const SITE_URL = 'https://spamedgecompany.github.io';

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      return;
    }

    link.href = new URL(href, SITE_URL).href;
  });

  document.querySelectorAll('.lang-switch a').forEach((languageLink) => {
    languageLink.href = new URL(languageLink.getAttribute('href'), SITE_URL).href;
  });

  if (mobileMenu) {
    const leadershipLink = mobileMenu.querySelector('a[href*="leadership.html"]');
    if (leadershipLink) {
      const french = leadershipLink.getAttribute('href').startsWith('/fr/');
      const basePath = french ? '/fr/leadership.html' : '/leadership.html';
      const mainMenu = document.createElement('div');
      mainMenu.className = 'mobile-menu-main';
      const submenu = document.createElement('div');
      submenu.className = 'leadership-menu-view';
      submenu.hidden = true;

      Array.from(mobileMenu.children).forEach((child) => {
        if (child !== closeButton) mainMenu.appendChild(child);
      });
      mobileMenu.appendChild(mainMenu);

      const submenuHeader = document.createElement('div');
      submenuHeader.className = 'leadership-menu-header';

      const backButton = document.createElement('button');
      backButton.className = 'leadership-menu-back';
      backButton.type = 'button';
      backButton.setAttribute('aria-label', french ? 'Retour au menu principal' : 'Back to main menu');
      backButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';

      const submenuTitle = document.createElement('h2');
      submenuTitle.textContent = french ? 'Direction' : 'Leadership';

      submenuHeader.append(backButton, submenuTitle);
      submenu.appendChild(submenuHeader);

      const submenuLinks = document.createElement('div');
      submenuLinks.className = 'leadership-menu-links';
      const links = french
        ? [
            ['Directeur général', '/fr/board-of-directors.html#managing-director'],
            ['Conseil d’administration', '/fr/board-of-directors.html'],
            ['Direction générale', '/fr/corporate-management.html']
          ]
        : [
            ['Managing Director', '/board-of-directors.html#managing-director'],
            ['Board of Directors', '/board-of-directors.html'],
            ['Corporate Management', '/corporate-management.html']
          ];

      links.forEach(([label, href]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        submenuLinks.appendChild(link);
      });

      submenu.appendChild(submenuLinks);
      mobileMenu.appendChild(submenu);

      leadershipLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainMenu.hidden = true;
        submenu.hidden = false;
        submenuHeader.appendChild(closeButton);
      });

      backButton.addEventListener('click', () => {
        submenu.hidden = true;
        mainMenu.hidden = false;
        mobileMenu.insertBefore(closeButton, mainMenu);
      });
    }
  }

  const subscriptionPopup = document.createElement('aside');
  subscriptionPopup.className = 'subscription-popup';
  subscriptionPopup.setAttribute('aria-label', 'Latest news subscription');
  subscriptionPopup.innerHTML = `
    <button class="subscription-close" type="button" aria-label="Close subscription popup">&times;</button>
    <p class="subscription-kicker">Stay informed</p>
    <h2>Hear our latest news</h2>
    <p>Subscribe for company updates, project news, and new opportunities from SpamEDGE Company.</p>
    <form class="subscription-form" action="https://formspree.io/f/mqpklwoa" method="POST" novalidate>
      <label class="sr-only" for="subscriptionEmail">Email address</label>
      <input id="subscriptionEmail" name="email" type="email" placeholder="Your email address" autocomplete="email" required />
      <input type="hidden" name="_subject" value="New SpamEDGE newsletter subscription" />
      <button class="button" type="submit">Subscribe</button>
      <p class="subscription-message" role="status" aria-live="polite"></p>
    </form>
  `;
  document.body.appendChild(subscriptionPopup);

  const popupDismissedKey = 'spamedge-newsletter-dismissed';
  const closeSubscription = () => {
    subscriptionPopup.classList.remove('open');
    window.localStorage.setItem(popupDismissedKey, 'true');
  };

  subscriptionPopup.querySelector('.subscription-close').addEventListener('click', closeSubscription);
  subscriptionPopup.querySelector('.subscription-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.querySelector('input[type="email"]');
    const message = form.querySelector('.subscription-message');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!emailInput.checkValidity()) {
      message.textContent = 'Please enter a valid email address.';
      emailInput.focus();
      return;
    }

    submitButton.disabled = true;
    message.textContent = 'Submitting...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Subscription request failed');

      message.textContent = 'Thank you. You are subscribed for the latest news.';
      form.reset();
      window.setTimeout(() => subscriptionPopup.classList.remove('open'), 2200);
    } catch (error) {
      message.textContent = 'Something went wrong. Please try again.';
      submitButton.disabled = false;
    }
  });

  if (!window.localStorage.getItem(popupDismissedKey)) {
    window.setTimeout(() => subscriptionPopup.classList.add('open'), 1800);
  }

  const isFrench = window.location.pathname.startsWith('/fr');
  const contactForm = document.getElementById('contactForm');
  const inquiryType = document.getElementById('inquiryType');
  const contactSubject = document.getElementById('contact-subject');
  const contactFormStatus = document.getElementById('contactFormStatus');

  if (contactForm && inquiryType && contactSubject && contactFormStatus) {
    inquiryType.addEventListener('change', () => {
      contactSubject.textContent = inquiryType.value;
    });

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const websiteField = contactForm.querySelector('[name="website"]');
      if (websiteField.value) return;

      const challenge = contactForm.querySelector('[name="spamProtection"]');
      if (Number(challenge.value) !== 7) {
        challenge.setCustomValidity(isFrench ? 'Veuillez répondre correctement à la question anti-spam.' : 'Please answer the spam protection question correctly.');
        challenge.reportValidity();
        challenge.setCustomValidity('');
        return;
      }

      const formData = new FormData(contactForm);
      const name = String(formData.get('name')).trim();
      const email = String(formData.get('email')).trim();
      const submitButton = contactForm.querySelector('button[type="submit"]');
      formData.set('_subject', `SpamEDGE ${inquiryType.value}: ${name}`);
      formData.set('_replyto', email);
      formData.set('inquiryType', inquiryType.value);
      submitButton.disabled = true;
      contactFormStatus.textContent = isFrench ? 'Envoi de votre demande…' : 'Sending your inquiry…';

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Contact form submission failed with status ${response.status}`);
        }

        contactFormStatus.textContent = isFrench
          ? 'Merci. Votre demande a bien été envoyée.'
          : 'Thank you. Your inquiry has been sent.';
        contactForm.reset();
        contactSubject.textContent = inquiryType.options[0].textContent;
      } catch (error) {
        console.error(error);
        contactFormStatus.textContent = isFrench
          ? 'Votre demande n’a pas pu être envoyée. Veuillez réessayer ou nous écrire directement à info.spamedgdecompany@gmail.com.'
          : 'Your inquiry could not be sent. Please try again or email us directly at info.spamedgdecompany@gmail.com.';
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  const chat = document.createElement('section');
  chat.className = 'customer-chat';
  chat.setAttribute('aria-label', isFrench ? 'Assistance client' : 'Customer care chat');
  chat.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="customerChatPanel">
      <span class="chat-launcher-icon" aria-hidden="true">✦</span>
      <span>${isFrench ? 'Besoin d’aide ?' : 'Need help?'}</span>
    </button>
    <div class="chat-panel" id="customerChatPanel" hidden>
      <div class="chat-header">
        <div>
          <p class="chat-kicker">SpamEDGE</p>
          <h2>${isFrench ? 'Assistance client' : 'Customer care'}</h2>
        </div>
        <button class="chat-close" type="button" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-messages" aria-live="polite">
        <p class="chat-message chat-message-agent">${isFrench ? 'Bonjour ! Comment pouvons-nous vous aider ?' : 'Hello! How can we help you today?'}</p>
      </div>
      <form class="chat-form">
        <label class="sr-only" for="chatQuestion">${isFrench ? 'Votre question' : 'Your question'}</label>
        <input id="chatQuestion" type="text" placeholder="${isFrench ? 'Écrivez votre question...' : 'Type your question...'}" autocomplete="off" required />
        <button class="chat-send" type="submit" aria-label="${isFrench ? 'Envoyer' : 'Send'}">→</button>
      </form>
      <a class="chat-agent-link" href="https://wa.me/message/O6U65JGWCJNQP1">${isFrench ? 'Parler à un agent sur WhatsApp' : 'Talk to an agent on WhatsApp'} <span aria-hidden="true">→</span></a>
    </div>
  `;
  document.body.appendChild(chat);

  const chatPanel = chat.querySelector('.chat-panel');
  const chatLauncher = chat.querySelector('.chat-launcher');
  const chatClose = chat.querySelector('.chat-close');
  const chatMessages = chat.querySelector('.chat-messages');
  const chatForm = chat.querySelector('.chat-form');
  const chatQuestion = chat.querySelector('#chatQuestion');
  const agentReply = isFrench
    ? 'Nous pouvons vous aider avec les services géospatiaux, l’ingénierie, la construction, la technologie ou un projet. Contactez un agent pour une réponse personnalisée.'
    : 'We can help with geospatial services, engineering, construction, technology, or a project enquiry. Talk to an agent for a personalised response.';

  const setChatOpen = (open) => {
    chatPanel.hidden = !open;
    chatLauncher.setAttribute('aria-expanded', String(open));
    if (open) chatQuestion.focus();
  };

  chatLauncher.addEventListener('click', () => setChatOpen(chatPanel.hidden));
  chatClose.addEventListener('click', () => setChatOpen(false));
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = chatQuestion.value.trim();
    if (!question) return;

    const visitorMessage = document.createElement('p');
    visitorMessage.className = 'chat-message chat-message-visitor';
    visitorMessage.textContent = question;
    chatMessages.appendChild(visitorMessage);

    const response = document.createElement('p');
    response.className = 'chat-message chat-message-agent';
    response.textContent = agentReply;
    chatMessages.appendChild(response);
    chatQuestion.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

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
