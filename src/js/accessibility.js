const body = document.body;
const menu = document.getElementById("accessibility-menu");
const btn = document.getElementById("accessibility-btn");
const zoomDisplay = document.getElementById("zoom-level");

let zoomLevel = parseFloat(localStorage.getItem("zoom")) || 1;

applyZoom();

btn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

window.onload = () => {
    if (localStorage.getItem("font") === "opendyslexic") body.classList.add("opendyslexic");
    if (localStorage.getItem("font") === "reading") body.classList.add("reading");
    if (localStorage.getItem("contrast") === "high") body.classList.add("high-contrast");

    if (!("ontouchstart" in window) && localStorage.getItem("focusBar") === "on") {
        body.classList.add("focus-bar-active");
    }
    if (localStorage.getItem("cursor") === "big") body.classList.add("big-cursor");
};

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

function applyZoom() {
    document.documentElement.style.fontSize = zoomLevel * 100 + "%";
    localStorage.setItem("zoom", zoomLevel);
    zoomDisplay.textContent = Math.round(zoomLevel * 100) + "%";
}
function zoomIn() {
    zoomLevel = Math.min(2, zoomLevel + 0.1);
    applyZoom();
}
function zoomOut() {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);
    applyZoom();
}
function resetZoom() {
    zoomLevel = 1;
    applyZoom();
}

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
        if (body.classList.contains("focus-bar-active")) {
            const topHeight = Math.max(0, mouseY - focusHeight / 2);
            const bottomHeight = window.innerHeight - (mouseY + focusHeight / 2);

            focusTop.style.height = topHeight + "px";
            focusBottom.style.height = bottomHeight + "px";
        }
        ticking = false;
    }

    function toggleFocusBar() {
        body.classList.toggle("focus-bar-active");
        if (body.classList.contains("focus-bar-active")) localStorage.setItem("focusBar", "on");
        else localStorage.removeItem("focusBar");
    }

    window.toggleFocusBar = toggleFocusBar;
} else {

    function toggleFocusBar() {
        alert("La barre de lecture est disponible uniquement sur ordinateur.");
    }
    window.toggleFocusBar = toggleFocusBar;
}

function toggleBigCursor() {
    body.classList.toggle("big-cursor");
    if (body.classList.contains("big-cursor")) {
        localStorage.setItem("cursor", "big");
    } else {
        localStorage.removeItem("cursor");
    }
}

function toggleLinkOutline() {
    document.body.classList.toggle('link-outline');
    if (document.body.classList.contains('link-outline')) {
        localStorage.setItem('linkOutline', 'on');
    } else {
        localStorage.removeItem('linkOutline');
    }
}
window.toggleLinkOutline = toggleLinkOutline;

if (localStorage.getItem('linkOutline') === 'on') {
    document.body.classList.add('link-outline');
}
function toggleLinkOutlineHover() {
    document.body.classList.toggle('link-outline-hover');
    if (document.body.classList.contains('link-outline-hover')) {
        localStorage.setItem('linkOutlineHover', 'on');
    } else {
        localStorage.removeItem('linkOutlineHover');
    }
}
window.toggleLinkOutlineHover = toggleLinkOutlineHover;


if (localStorage.getItem('linkOutlineHover') === 'on') {
    document.body.classList.add('link-outline-hover');
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
    resetZoom();
}



