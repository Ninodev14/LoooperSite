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

  const cursorSetting = localStorage.getItem("cursor");
  if (cursorSetting === "normal") {
    body.classList.add("normal-cursor");
    const el = document.getElementById("chkNormalCursor");
    if (el) el.checked = true;
  }
  if ("ontouchstart" in window) {
    const disabledOptions = [
      { id: "chkFocusBar", img: "src/img/Monitor.png" },
      { id: "chkNormalCursor", img: "src/img/Monitor.png" },
      { id: "chkLinkOutlineHover", img: "src/img/Monitor.png" }
    ];

    disabledOptions.forEach(opt => {
      const label = document.querySelector(`label[for="${opt.id}"]`) || document.getElementById(opt.id)?.closest("label");
      const checkbox = document.getElementById(opt.id);

      if (label && checkbox) {
        const img = document.createElement("img");
        img.src = opt.img;
        img.alt = "Option désactivée sur mobile";
        img.style.width = "18px";
        img.style.height = "18px";
        img.style.opacity = "0.8";
        img.style.filter = "grayscale(100%)";

        checkbox.replaceWith(img);

        label.style.opacity = "0.4";
      }
    });
  }
});

function toggleOpendyslexic() {
  const chkOpen = document.getElementById("chkOpendyslexic");
  const chkRead = document.getElementById("chkReading");

  if (chkOpen.checked) {
    body.classList.remove("reading");
    if (chkRead) chkRead.checked = false;
    localStorage.removeItem("font");

    body.classList.add("opendyslexic");
    localStorage.setItem("font", "opendyslexic");
  } else {
    body.classList.remove("opendyslexic");
    localStorage.removeItem("font");
  }
}

function toggleReading() {
  const chkRead = document.getElementById("chkReading");
  const chkOpen = document.getElementById("chkOpendyslexic");

  if (chkRead.checked) {
    body.classList.remove("opendyslexic");
    if (chkOpen) chkOpen.checked = false;
    localStorage.removeItem("font");

    body.classList.add("reading");
    localStorage.setItem("font", "reading");
  } else {

    body.classList.remove("reading");
    localStorage.removeItem("font");
  }
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

// --- Curseur normal uniquement
function toggleNormalCursor() {
  const chkNormal = document.getElementById("chkNormalCursor");

  if (chkNormal.checked) {
    body.classList.add("normal-cursor");
    localStorage.setItem("cursor", "normal");
  } else {
    body.classList.remove("normal-cursor");
    localStorage.removeItem("cursor");
  }
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
    "normal-cursor",
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
