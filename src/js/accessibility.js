const body = document.body;
const menuHandicap = document.getElementById("accessibility-menu");
const menuLudique = document.getElementById("ludique-menue");
const btnHandicap = document.getElementById("accessibility-btn");
const btnLudique = document.getElementById("ludique-btn");
const toggleGame = document.getElementById("toggleGame");
const zoomDisplay = document.getElementById("zoom-level");

let zoomLevel = parseFloat(localStorage.getItem("zoom")) || 1;

// --- Boutons d’ouverture de menus
if (btnHandicap) {
  btnHandicap.addEventListener("click", () => {
    const isVisible = menuHandicap.style.display === "flex";
    menuHandicap.style.display = isVisible ? "none" : "flex";

    if (!isVisible && menuLudique) menuLudique.style.display = "none";

    if (!isVisible) {
      btnHandicap.querySelector("img").style.filter = "invert(1)";
      if (btnLudique) btnLudique.querySelector("img").style.filter = "invert(0)";
    } else {
      btnHandicap.querySelector("img").style.filter = "invert(0)";
    }
  });
}

if (btnLudique) {
  btnLudique.addEventListener("click", () => {
    const isVisible = menuLudique.style.display === "flex";
    menuLudique.style.display = isVisible ? "none" : "flex";

    if (!isVisible && menuHandicap) menuHandicap.style.display = "none";

    if (!isVisible) {
      btnLudique.querySelector("img").style.filter = "invert(1)";
      if (btnHandicap) btnHandicap.querySelector("img").style.filter = "invert(0)";
    } else {
      btnLudique.querySelector("img").style.filter = "invert(0)";
    }
  });
}

document.addEventListener("click", (e) => {
  const isClickInsideHandicap =
    menuHandicap && menuHandicap.contains(e.target);
  const isClickInsideLudique =
    menuLudique && menuLudique.contains(e.target);
  const isBtnHandicap = btnHandicap && btnHandicap.contains(e.target);
  const isBtnLudique = btnLudique && btnLudique.contains(e.target);

  if (!isClickInsideHandicap && !isClickInsideLudique && !isBtnHandicap && !isBtnLudique) {
    if (menuHandicap) menuHandicap.style.display = "none";
    if (menuLudique) menuLudique.style.display = "none";

    if (btnHandicap) btnHandicap.querySelector("img").style.filter = "invert(0)";
    if (btnLudique) btnLudique.querySelector("img").style.filter = "invert(0)";
  }
});


window.addEventListener("load", () => {

  if (localStorage.getItem("font") === "opendyslexic") {
    body.classList.add("opendyslexic");
    const el = document.getElementById("chkOpendyslexic");
    if (el) el.checked = true;
  }

  if (localStorage.getItem("font") === "reading") {
    body.classList.add("reading");
    const el = document.getElementById("chkReading");
    if (el) el.checked = true;
  }

  if (localStorage.getItem("contrast") === "high") {
    body.classList.add("high-contrast");
    const el = document.getElementById("chkContrast");
    if (el) el.checked = true;
  }

  if (!("ontouchstart" in window) && localStorage.getItem("focusBar") === "on") {
    body.classList.add("focus-bar-active");
    const el = document.getElementById("chkFocusBar");
    if (el) el.checked = true;
  }

  if (localStorage.getItem("linkOutline") === "on") {
    body.classList.add("link-outline");
    const el = document.getElementById("chkLinkOutline");
    if (el) el.checked = true;
  }

  if (localStorage.getItem("linkOutlineHover") === "on") {
    body.classList.add("link-outline-hover");
    const el = document.getElementById("chkLinkOutlineHover");
    if (el) el.checked = true;
  }
});

// --- Fonctions d’accessibilité
function toggleOpendyslexic() {
  body.classList.toggle("opendyslexic");
  if (body.classList.contains("opendyslexic")) localStorage.setItem("font", "opendyslexic");
  else localStorage.removeItem("font");
}

function toggleReading() {
  body.classList.toggle("reading");
  if (body.classList.contains("reading")) localStorage.setItem("font", "reading");
  else localStorage.removeItem("font");
}

function toggleContrast() {
  body.classList.toggle("high-contrast");
  if (body.classList.contains("high-contrast")) localStorage.setItem("contrast", "high");
  else localStorage.removeItem("contrast");
}

// --- Focus bar (PC uniquement)
if (!("ontouchstart" in window)) {
  const focusTop = document.getElementById("focus-top");
  const focusBottom = document.getElementById("focus-bottom");
  const focusHeight = 80;

  let mouseY = 0;
  let ticking = false;

  document.addEventListener("mousemove", (e) => {
    mouseY = e.clientY;
    if (!ticking) {
      requestAnimationFrame(updateFocusBar);
      ticking = true;
    }
  });

  function updateFocusBar() {
    if (body.classList.contains("focus-bar-active") && focusTop && focusBottom) {
      const topHeight = Math.max(0, mouseY - focusHeight / 2);
      const bottomHeight = window.innerHeight - (mouseY + focusHeight / 2);
      focusTop.style.height = topHeight + "px";
      focusBottom.style.height = bottomHeight + "px";
    }
    ticking = false;
  }

  window.toggleFocusBar = function () {
    body.classList.toggle("focus-bar-active");
    if (body.classList.contains("focus-bar-active")) localStorage.setItem("focusBar", "on");
    else localStorage.removeItem("focusBar");
  };
} else {
  window.toggleFocusBar = function () {
    alert("La barre de lecture est disponible uniquement sur ordinateur.");
  };
}

// --- Autres fonctions
function toggleBigCursor() {
  body.classList.toggle("big-cursor");
  if (body.classList.contains("big-cursor")) localStorage.setItem("cursor", "big");
  else localStorage.removeItem("cursor");
}

function toggleLinkOutline() {
  const el = document.getElementById("chkLinkOutline");
  const checked = el ? el.checked : false;
  body.classList.toggle("link-outline", checked);
  checked ? localStorage.setItem("linkOutline", "on") : localStorage.removeItem("linkOutline");
}

function toggleLinkOutlineHover() {
  const el = document.getElementById("chkLinkOutlineHover");
  const checked = el ? el.checked : false;
  body.classList.toggle("link-outline-hover", checked);
  checked ? localStorage.setItem("linkOutlineHover", "on") : localStorage.removeItem("linkOutlineHover");
}

function resetSettings() {
  body.classList.remove(
    "opendyslexic",
    "high-contrast",
    "reading",
    "focus-bar-active",
    "big-cursor",
    "link-outline",
    "link-outline-hover"
  );
  localStorage.clear();
  document.querySelectorAll("#accessibility-menu input[type='checkbox']").forEach((chk) => (chk.checked = false));
}

window.addEventListener("load", () => {
  if (toggleGame) {

    let ludiqueMode = sessionStorage.getItem("ludiqueMode");

    if (!ludiqueMode) {
      sessionStorage.setItem("ludiqueMode", "on");
      ludiqueMode = "on";
    }

    if (ludiqueMode === "on") {
      toggleGame.checked = true;
      body.classList.add("ludique-active");
    } else {
      toggleGame.checked = false;
      body.classList.remove("ludique-active");
    }

    toggleGame.addEventListener("change", () => {
      if (toggleGame.checked) {
        body.classList.add("ludique-active");
        sessionStorage.setItem("ludiqueMode", "on");
      } else {
        body.classList.remove("ludique-active");
        sessionStorage.setItem("ludiqueMode", "off");
      }
    });
  }
});
