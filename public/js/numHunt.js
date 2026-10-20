(() => {
  // Bouton ludique inversé : le jeu est actif quand body N'A PAS la classe ludique-active.
  // Si tu veux l'inverse, passe cette constante à true (et change le :not() en CSS).
  const GAME_WHEN_LUDIQUE_CLASS = false;

  const body = document.body;
  const container = document.querySelector("#foot-inx1 .number-container");
  const items = container ? [...container.querySelectorAll(".number-item")] : [];
  const startBtn = document.getElementById("numhunt-start");
  const scoreEl = document.getElementById("numhunt-score");
  const timeEl = document.getElementById("numhunt-time");
  const bestEl = document.getElementById("numhunt-best");
  const msgEl = document.getElementById("numhunt-msg");
  if (!container || !startBtn || !items.length) return;

  const DURATION = 20;
  const isEnabled = () =>
    body.classList.contains("ludique-active") === GAME_WHEN_LUDIQUE_CLASS;

  let score = 0;
  let timeLeft = DURATION;
  let running = false;
  let target = null;
  let targetTimer = null;
  let clockTimer = null;

  const getBest = () => {
    try { return parseInt(localStorage.getItem("numHuntBest"), 10) || 0; }
    catch { return 0; }
  };
  const setBest = (v) => {
    try { localStorage.setItem("numHuntBest", String(v)); } catch {}
  };

  bestEl.textContent = getBest();

  function flash(item, cls) {
    item.classList.remove("hit", "miss");
    void item.offsetWidth; // relance l'animation
    item.classList.add(cls);
    setTimeout(() => item.classList.remove(cls), 300);
  }

  function nextTarget() {
    clearTimeout(targetTimer);
    if (!running) return;

    if (target) target.classList.remove("is-target");
    const others = items.filter((i) => i !== target);
    target = others[Math.floor(Math.random() * others.length)];
    target.classList.add("is-target");

    // Plus la partie avance, plus ça va vite (1100ms → 600ms)
    const delay = 1100 - ((DURATION - timeLeft) / DURATION) * 500;
    targetTimer = setTimeout(nextTarget, delay);
  }

  function onPick(item) {
    if (!running) return;
    if (item === target) {
      score++;
      flash(item, "hit");
      scoreEl.textContent = score;
      nextTarget();
    } else {
      score = Math.max(0, score - 1);
      flash(item, "miss");
      scoreEl.textContent = score;
    }
  }

  function setInteractive(on) {
    items.forEach((item) => {
      if (on) {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
      } else {
        item.removeAttribute("role");
        item.removeAttribute("tabindex");
        item.classList.remove("is-target", "hit", "miss");
      }
    });
  }

  function onItemClick(e) {
    onPick(e.currentTarget);
  }

  function onItemKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPick(e.currentTarget);
    }
  }

  items.forEach((item) => {
    item.addEventListener("click", onItemClick);
    item.addEventListener("keydown", onItemKey);
  });

  function stopGame(silent = false) {
    running = false;
    clearTimeout(targetTimer);
    clearInterval(clockTimer);
    target = null;
    container.classList.remove("playing");
    setInteractive(false);
    startBtn.disabled = false;
    startBtn.querySelector("span").textContent = "Rejouer !";

    if (silent) {
      msgEl.textContent = "Partie interrompue.";
      return;
    }

    const best = getBest();
    const isRecord = score > best;
    if (isRecord) {
      setBest(score);
      bestEl.textContent = score;
      if (typeof window.confetti === "function") {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 } });
      }
    }
    msgEl.textContent = isRecord
      ? `Nouveau record : ${score} points ! 🎉`
      : `Terminé : ${score} points. Record : ${best}.`;
  }

  function startGame() {
    if (running || !isEnabled()) return;
    running = true;
    score = 0;
    timeLeft = DURATION;
    target = null;
    scoreEl.textContent = 0;
    timeEl.textContent = DURATION;
    msgEl.textContent = "Go !";
    startBtn.disabled = true;
    startBtn.querySelector("span").textContent = "C’est parti !";
    container.classList.add("playing");
    setInteractive(true);

    nextTarget();
    clockTimer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) stopGame();
    }, 1000);
  }

  startBtn.addEventListener("click", startGame);

  // Si le mode change pendant une partie → on coupe tout
  new MutationObserver(() => {
    if (running && !isEnabled()) stopGame(true);
  }).observe(body, { attributes: true, attributeFilter: ["class"] });
})();