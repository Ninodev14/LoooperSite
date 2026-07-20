(function () {
  var API_URL = window.LOOOPER_ANALYTICS_URL || "https://sitestatloooper.onrender.com/api/collect";
  var SITE = window.LOOOPER_ANALYTICS_SITE || "loooper.fr";

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getSessionId() {
    var key = "_looop_sid";
    var id = localStorage.getItem(key);
    if (!id) {
      id = uuid();
      localStorage.setItem(key, id);
    }
    return id;
  }

  function send(payload, useBeacon) {
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

  // Pageview au chargement
  var loadTime = Date.now();
  send({ type: "pageview" });

  // Durée passée sur la page, envoyée quand l'utilisateur quitte/change d'onglet
  function sendDuration() {
    var duration = Date.now() - loadTime;
    if (duration > 500) {
      send({ type: "duration", value: duration }, true);
    }
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") sendDuration();
  });
  window.addEventListener("pagehide", sendDuration);

  // Clics automatiques sur tout élément portant data-track="nom_du_bouton"
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (el) {
      send({ type: "click", label: el.getAttribute("data-track") });
    }
  });

  // Recherche : à appeler manuellement depuis ta barre de recherche
  // ex: window.looooperTrack.search("jeux serious game bordeaux")
  window.looooperTrack = {
    search: function (query) {
      if (query && query.trim()) {
        send({ type: "search", label: query.trim() });
      }
    },
    click: function (label) {
      send({ type: "click", label: label });
    },
  };
})();
