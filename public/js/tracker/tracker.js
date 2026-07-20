(function () {
  "use strict";

  var API_URL = window.LOOOPER_ANALYTICS_URL || "https://sitestatloooper.onrender.com/api/collect";
  var SITE = window.LOOOPER_ANALYTICS_SITE || "loooper.fr";
  var CONSENT_KEY = "loooper_cookie_consent";

  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (Date.now() > data.expires) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data.value; // 'accepted' | 'refused'
    } catch (e) {
      return null;
    }
  }

  var memoryFallback = {};
  function safeGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return memoryFallback[key] || null;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      memoryFallback[key] = value;
    }
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getSessionId() {
    var key = "_looop_sid";
    var id = safeGet(key);
    if (!id) {
      id = uuid();
      safeSet(key, id);
    }
    return id;
  }

  function send(payload, useBeacon) {
    if (getConsent() !== "accepted") return;

    var body = JSON.stringify(
      Object.assign(
        {
          site: SITE,
          sessionId: getSessionId(),
          path: location.pathname,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        },
        payload
      )
    );

    if (useBeacon && navigator.sendBeacon) {
      var blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(API_URL, blob);
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        keepalive: true,
      }).catch(function () {});
    }
  }

  var loadTime = Date.now();
  var started = false;

  function sendDuration() {
    if (!started) return;
    var duration = Date.now() - loadTime;
    if (duration > 500) {
      send({ type: "duration", value: duration }, true);
    }
  }

  var onVisibilityChange = function () {
    if (document.visibilityState === "hidden") sendDuration();
  };
  var onClick = function (e) {
    var el = e.target.closest("[data-track]");
    if (el) {
      send({ type: "click", label: el.getAttribute("data-track") });
    }
  };

  function start() {
    if (started) return; 
    started = true;
    loadTime = Date.now();

    send({ type: "pageview" });

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", sendDuration);
    document.addEventListener("click", onClick);
  }

  window.looooperTrack = {
    search: function (query) {
      if (query && query.trim()) {
        send({ type: "search", label: query.trim() });
      }
    },
    click: function (label) {
      send({ type: "click", label: label });
    },
    onConsentAccepted: function () {
      start();
    },
  };

  if (getConsent() === "accepted") {
    start();
  }
})();