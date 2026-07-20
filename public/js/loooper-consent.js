(function () {
  'use strict';

  const GTM_ID = 'GTM-T4Q4NXNW';
  const CONSENT_KEY = 'loooper_cookie_consent';
  const CONSENT_EXPIRY_DAYS = 180;


  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() > data.expires) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data.value;
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    const expires = Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, expires }));
  }


  function loadGTM() {
    if (window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  function loadHomeTracker() {
    if (window.looooperTrack && typeof window.looooperTrack.onConsentAccepted === 'function') {
      window.looooperTrack.onConsentAccepted();
    }
  }


  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'loooper-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML = [
      '<div class="lcb-inner">',
      '  <div class="lcb-text">',
      '    <strong class="lcb-title">🍪 Cookies & confidentialité</strong>',
      '    <p>',
      '      Nous utilisons Google Tag Manager et un outil de mesure d\'audience interne pour analyser la fréquentation de notre site.',
      '      Ces cookies/identifiants sont déposés <strong>uniquement avec votre accord</strong>.',
      '      </p> ',
      '   <a href="/mentions-legales#cookies" class="lcb-link">En savoir plus</a>',
      '  </div>',
      '  <div class="lcb-actions">',
      '    <button id="lcb-refuse" class="lcb-btn lcb-btn--secondary">Refuser</button>',
      '    <button id="lcb-accept" class="lcb-btn lcb-btn--primary">Accepter</button>',
      '  </div>',
      '</div>',
    ].join('');
    return banner;
  }


  function removeBanner() {
    var b = document.getElementById('loooper-consent-banner');
    if (b) {
      b.classList.add('lcb-closing');
      setTimeout(function () {
        if (b.parentNode) b.parentNode.removeChild(b);
      }, 250);
    }
  }

  function showBanner() {
    var banner = createBanner();
    function appendBanner() {
      document.body.appendChild(banner);
      document.getElementById('lcb-accept').addEventListener('click', function () {
        setConsent('accepted');
        loadGTM();
        loadHomeTracker();
        removeBanner();
      });
      document.getElementById('lcb-refuse').addEventListener('click', function () {
        setConsent('refused');
        removeBanner();
      });
    }
    if (document.body) {
      appendBanner();
    } else {
      document.addEventListener('DOMContentLoaded', appendBanner);
    }
  }


  window.LoooperConsent = {
    revoke: function () {
      localStorage.removeItem(CONSENT_KEY);
      document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "_ga_T4Q4NXNW=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      location.reload();
    },
    getStatus: function () {
      return getConsent();
    },
  };

  var consent = getConsent();

  if (consent === 'accepted') {
    loadGTM();
  } else if (consent === null) {
    showBanner();
  }

})();