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
    <p class="subscription-kicker">${window.location.pathname.startsWith('/fr') ? 'Newsletter' : 'Newsletter'}</p>
    <h2>${window.location.pathname.startsWith('/fr') ? 'Abonnez-vous à notre newsletter' : 'Subscribe to our Newsletter & Events'}</h2>
    <p>${window.location.pathname.startsWith('/fr') ? 'Inscrivez-vous maintenant pour recevoir nos actualités et événements.' : 'Subscribe now to receive our latest news and events.'}</p>
    <form class="subscription-form" action="https://formspree.io/f/mqpklwoa" method="POST" novalidate>
      <label class="sr-only" for="subscriptionEmail">Email address</label>
      <input id="subscriptionEmail" name="email" type="email" placeholder="Email" autocomplete="email" required />
      <input type="hidden" name="_subject" value="New SpamEDGE newsletter subscription" />
      <button class="button" type="submit" aria-label="Submit email">→</button>
      <p class="subscription-message" role="status" aria-live="polite"></p>
    </form>
  `;
  document.body.appendChild(subscriptionPopup);

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

  const isFrench = window.location.pathname.startsWith('/fr');
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
