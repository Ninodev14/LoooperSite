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
  const bar = document.getElementById("numhunt-bar");
  const hud = document.querySelector(".numhunt-hud");
  if (!container || !startBtn || !items.length) return;

  const DURATION = 20;
  const isEnabled = () =>
    body.classList.contains("ludique-active") === GAME_WHEN_LUDIQUE_CLASS;

  // Un son par chiffre : grave à gauche, médium au centre, aigu à droite
  const FREQS = [262, 392, 587];
  const PANS = [-1, 0, 1];
  const NOMS = items.map((it) => {
    const v = it.querySelector(".number-value");
    return v ? v.textContent.trim() : "";
  });

  let score = 0;
  let timeLeft = DURATION;
  let running = false;
  let target = null;
  let leaving = null;
  let leavingTimer = null;
  let targetTimer = null;
  let clockTimer = null;
  let audioOn = false;
  let ctx = null;

  // ---------- Stockage ----------
  const getBest = () => {
    try { return parseInt(localStorage.getItem("numHuntBest"), 10) || 0; }
    catch { return 0; }
  };
  const setBest = (v) => {
    try { localStorage.setItem("numHuntBest", String(v)); } catch {}
  };
  const getAudioPref = () => {
    try { return localStorage.getItem("numHuntAudio") === "1"; }
    catch { return false; }
  };
  const setAudioPref = (v) => {
    try { localStorage.setItem("numHuntAudio", v ? "1" : "0"); } catch {}
  };

  bestEl.textContent = getBest();

  // ---------- Accessibilité : zones sr-only ----------
  // Le HUD change chaque seconde : on le coupe pour les lecteurs d'écran
  if (hud) {
    hud.setAttribute("aria-live", "off");
    hud.setAttribute("aria-hidden", "true");
  }
  msgEl.setAttribute("aria-live", "off"); // tout passe par annoncer()

  const aide = document.createElement("p");
  aide.id = "numhunt-aide";
  aide.className = "sr-only";
  aide.textContent =
    "Jeu de réflexes de 20 secondes. Un des trois chiffres s'allume au hasard. " +
    "Active le mode audio : chaque chiffre a un son et une position. " +
    "Chiffre 1 : son grave à gauche. Chiffre 2 : son moyen au centre. Chiffre 3 : son aigu à droite. " +
    "Quand tu entends un son, appuie sur la touche 1, 2 ou 3 correspondante, " +
    "ou sur les flèches gauche, bas, droite. Pas de pénalité si tu te trompes.";

  const live = document.createElement("div");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  live.setAttribute("aria-atomic", "true");

  bar.append(aide, live);
  startBtn.setAttribute("aria-describedby", "numhunt-aide");

  function annoncer(msg) {
    live.textContent = "";
    setTimeout(() => (live.textContent = msg), 50);
  }

  // Bouton mode audio
  const audioBtn = document.createElement("button");
  audioBtn.type = "button";
  audioBtn.className = "text-typo btn-project btn-white-background";
  audioBtn.innerHTML = "<span></span>";
  startBtn.after(audioBtn);

  // ---------- Aide clavier VISIBLE pour tout le monde ----------
  const aideClavier = document.createElement("details");
  aideClavier.className = "numhunt-keys";
  aideClavier.innerHTML = `
    <summary>Jouer au clavier ou avec un lecteur d’écran</summary>
    <div class="numhunt-keys-content">
      <p><b>Pour commencer :</b> appuie sur <kbd>Tab</kbd> jusqu’au bouton « Tape-chiffre ! », puis sur <kbd>Entrée</kbd> ou <kbd>Espace</kbd>.</p>
      <p><b>Pendant la partie</b>, un chiffre s’allume (ou émet un son). Appuie sur la touche qui correspond :</p>
      <ul>
        <li><kbd>1</kbd> ou <kbd>←</kbd> : le premier chiffre (150), à gauche, son grave</li>
        <li><kbd>2</kbd> ou <kbd>↓</kbd> : le deuxième chiffre (96), au centre, son moyen</li>
        <li><kbd>3</kbd> ou <kbd>→</kbd> : le troisième chiffre (300), à droite, son aigu</li>
      </ul>
      <p><b>Mode audio :</b> active-le avec le bouton « Mode audio » pour jouer uniquement avec les sons (idéal avec un casque). Le rythme est alors un peu plus lent.</p>
      <p>Pas de pénalité si tu te trompes. La partie dure 20 secondes.</p>
    </div>`;
  audioBtn.after(aideClavier);

  // S'ouvre tout seul quand on arrive au bouton avec le clavier
  startBtn.addEventListener("focus", () => {
    if (startBtn.matches(":focus-visible")) aideClavier.open = true;
  });

  function majAudioBtn() {
    audioBtn.setAttribute("aria-pressed", String(audioOn));
    audioBtn.querySelector("span").textContent = audioOn
      ? "Mode audio : activé"
      : "Mode audio : désactivé";
  }

  audioBtn.addEventListener("click", () => {
    audioOn = !audioOn;
    setAudioPref(audioOn);
    majAudioBtn();
    if (audioOn) {
      initAudio();
      beep(FREQS[0], PANS[0], 0.15, 0);
      beep(FREQS[1], PANS[1], 0.15, 0.2);
      beep(FREQS[2], PANS[2], 0.15, 0.4);
    }
  });

  audioOn = getAudioPref();
  majAudioBtn();

  // ---------- Audio ----------
  function initAudio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  function beep(freq, pan = 0, dur = 0.15, when = 0, type = "sine", vol = 0.3) {
    if (!audioOn || !ctx) return;
    const t = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    if (ctx.createStereoPanner) {
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      gain.connect(p);
      p.connect(ctx.destination);
    } else {
      gain.connect(ctx.destination);
    }
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  const cueTarget = (idx, when = 0) =>
    beep(FREQS[idx], PANS[idx], 0.35, when, "triangle", 0.35);
  const soundHit = () => {
    beep(880, 0, 0.1, 0);
    beep(1175, 0, 0.14, 0.09);
  };
  const soundEmpty = () => beep(130, 0, 0.15, 0, "square", 0.12);
  const soundEnd = () => {
    beep(523, 0, 0.18, 0);
    beep(392, 0, 0.18, 0.2);
    beep(262, 0, 0.35, 0.4);
  };

  // ---------- Jeu ----------
  const retractMs = () => (audioOn ? 700 : 300);

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
        leaving = null;
      } else {
        leaving = prev;
        leavingTimer = setTimeout(() => { leaving = null; }, retractMs());
      }
    }

    const others = items.filter((i) => i !== prev);
    target = others[Math.floor(Math.random() * others.length)];
    target.classList.add("is-target");
    cueTarget(items.indexOf(target), wasHit ? 0.25 : 0);

    // en mode audio, rythme plus lent pour laisser le temps d'écouter
    const base = audioOn ? 1800 : 1100;
    const delay = base - ((DURATION - timeLeft) / DURATION) * 500;
    targetTimer = setTimeout(nextTarget, delay);
  }

  function onPick(item) {
    if (!running) return;

    if (item === target) {
      score++;
      scoreEl.textContent = score;
      flashHit(item);
      soundHit();
      nextTarget(true);
    } else if (item === leaving) {
      score++;
      scoreEl.textContent = score;
      flashHit(item);
      soundHit();
      leaving = null;
    } else {
      soundEmpty();
    }
  }

  function setInteractive(on) {
    items.forEach((item, i) => {
      if (on) {
        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");
        item.setAttribute("aria-label", `Chiffre ${i + 1} sur 3 : ${NOMS[i]}. Touche ${i + 1}.`);
      } else {
        item.removeAttribute("role");
        item.removeAttribute("tabindex");
        item.removeAttribute("aria-label");
        item.classList.remove("is-target", "hit");
      }
    });

    // role="application" : le lecteur d'écran laisse passer les touches 1, 2, 3
    if (on) {
      container.setAttribute("role", "application");
      container.setAttribute("aria-label", "Tape-chiffre en cours. Touches 1, 2, 3.");
      container.setAttribute("tabindex", "-1");
      container.focus();
    } else {
      container.removeAttribute("role");
      container.removeAttribute("aria-label");
      container.removeAttribute("tabindex");
    }
  }

  items.forEach((item) => {
    item.addEventListener("click", (e) => onPick(e.currentTarget));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPick(e.currentTarget);
      }
    });
  });

  // Raccourcis clavier globaux pendant la partie
  const KEYS = { "1": 0, "2": 1, "3": 2, ArrowLeft: 0, ArrowDown: 1, ArrowRight: 2 };
  document.addEventListener("keydown", (e) => {
    if (!running || !(e.key in KEYS)) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    e.preventDefault();
    onPick(items[KEYS[e.key]]);
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
    startBtn.focus();

    if (silent) {
      msgEl.textContent = "Partie interrompue.";
      annoncer("Partie interrompue.");
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
    const fin = isRecord
      ? `Nouveau record : ${score} points !`
      : `Terminé : ${score} points. Record : ${best}.`;
    msgEl.textContent = isRecord ? `${fin} 🎉` : fin;
    soundEnd();
    annoncer(`Temps écoulé. ${fin}`);
  }

  function startGame() {
    if (running || !isEnabled()) return;
    if (audioOn) initAudio();
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

    annoncer(
      audioOn
        ? "C'est parti ! Écoute le son et appuie sur 1, 2 ou 3. Grave à gauche, moyen au centre, aigu à droite."
        : "C'est parti ! Un chiffre s'allume, appuie sur la touche 1, 2 ou 3."
    );

    // petit délai pour laisser finir l'annonce avant le premier son
    setTimeout(() => running && nextTarget(), audioOn ? 2500 : 0);

    clockTimer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft === 10 || timeLeft === 5) {
        annoncer(`${timeLeft} secondes, ${score} point${score > 1 ? "s" : ""}.`);
      }
      if (timeLeft <= 0) stopGame();
    }, 1000);
  }

  startBtn.addEventListener("click", startGame);

  new MutationObserver(() => {
    if (running && !isEnabled()) stopGame(true);
  }).observe(body, { attributes: true, attributeFilter: ["class"] });
})();