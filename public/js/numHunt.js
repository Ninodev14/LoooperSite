(() => {

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
  const RETRACT_MS = 300;
  const isEnabled = () =>
    body.classList.contains("ludique-active") === GAME_WHEN_LUDIQUE_CLASS;

  let score = 0;
  let timeLeft = DURATION;
  let running = false;
  let target = null;
  let leaving = null;
  let leavingTimer = null;
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

  function flashHit(item) {
    item.classList.add("hit");
    setTimeout(() => item.classList.remove("hit"), 300);
  }

  function nextTarget(wasHit = false) {
    clearTimeout(targetTimer);
    if (!running) return;

    const prev = target;
    if (prev) {
      prev.classList.remove("is-target");
      clearTimeout(leavingTimer);
      if (wasHit) {
        // déjà cliqué : plus de point possible dessus
        leaving = null;
      } else {
        leaving = prev;
        leavingTimer = setTimeout(() => { leaving = null; }, RETRACT_MS);
      }
    }

    const others = items.filter((i) => i !== prev);
    target = others[Math.floor(Math.random() * others.length)];
    target.classList.add("is-target");

    const delay = 1100 - ((DURATION - timeLeft) / DURATION) * 500;
    targetTimer = setTimeout(nextTarget, delay);
  }

  function onPick(item) {
    if (!running) return;

    if (item === target) {
      score++;
      scoreEl.textContent = score;
      flashHit(item);
      nextTarget(true);
    } else if (item === leaving) {
      // petite tolérance si le chiffre vient juste de partir (1 seul clic)
      score++;
      scoreEl.textContent = score;
      flashHit(item);
      leaving = null;
    }
    // sinon : trou vide, il ne se passe rien (pas de malus)
  }

  function setInteractive(on) {
    items.forEach((item) => {
      if (on) {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
      } else {
        item.removeAttribute("role");
        item.removeAttribute("tabindex");
        item.classList.remove("is-target", "hit");
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
    clearTimeout(leavingTimer);
    clearInterval(clockTimer);
    target = null;
    leaving = null;
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
    leaving = null;
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

  new MutationObserver(() => {
    if (running && !isEnabled()) stopGame(true);
  }).observe(body, { attributes: true, attributeFilter: ["class"] });
})();