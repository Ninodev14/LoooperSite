/**
 * loooper-consent.js
 * Bandeau de consentement cookies RGPD — Loooper!
 * - Bloque GTM jusqu'au consentement explicite
 * - Mémorise le choix 6 mois (recommandation CNIL)
 * - Permet retrait du consentement depuis les Mentions Légales
 */

(function () {
  'use strict';

  const GTM_ID = 'GTM-T4Q4NXNW';
  const CONSENT_KEY = 'loooper_cookie_consent';
  const CONSENT_EXPIRY_DAYS = 180;

  /* ── Helpers ───────────────────────────────────────────── */

  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() > data.expires) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data.value; // 'accepted' | 'refused'
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    const expires = Date.now() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, expires }));
  }

  /* ── GTM loader ─────────────────────────────────────────── */

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

  /* ── Bandeau HTML ───────────────────────────────────────── */

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
      '      Nous utilisons Google Tag Manager pour mesurer l\'audience de notre site.',
      '      Ces cookies sont déposés <strong>uniquement avec votre accord</strong>.',
      '      </p> ',
      '   <a href="/mentions-legales.html#cookies" class="lcb-link">En savoir plus</a>',
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
      b.style.animation = 'lcb-slide-in .25s ease reverse';
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 260);
    }
  }

  function showBanner() {
    var banner = createBanner();
    function appendBanner() {
      document.body.appendChild(banner);
      document.getElementById('lcb-accept').addEventListener('click', function () {
        setConsent('accepted');
        loadGTM();
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

  /* ── Exposition publique (retrait consentement) ─────────── */

  window.LoooperConsent = {
    revoke: function () {
      localStorage.removeItem(CONSENT_KEY);
      location.reload();
    },
    getStatus: function () {
      return getConsent();
    },
  };

  /* ── Init ───────────────────────────────────────────────── */

  var consent = getConsent();

  if (consent === 'accepted') {
    loadGTM();
  } else if (consent === null) {
    showBanner();
  }
  // consent === 'refused' → ne rien faire

})();