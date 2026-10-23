(() => {
  const root = document.getElementById('quiz-trio');
  const startBtn = document.getElementById('quiz-start');
  if (!root || !startBtn) return;

  const body = document.body;
  const stepIntro = document.getElementById('quiz-intro');
  const stepPlay = document.getElementById('quiz-play');
  const stepEnd = document.getElementById('quiz-end');
  const progressEl = document.getElementById('quiz-progress');
  const questionEl = document.getElementById('quiz-question');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('quiz-next');
  const resultEl = document.getElementById('quiz-result');
  const messageEl = document.getElementById('quiz-message');
  const replayBtn = document.getElementById('quiz-replay');
  const answers = [...root.querySelectorAll('.quiz-answer')];

  const NB_QUESTIONS = 8;
  const NOMS = { elodie: 'Elodie', nino: 'Nino', julie: 'Julie' };
  const KEYS = { 1: 0, 2: 1, 3: 2 };

  const QUESTIONS = [
    {
      q: 'Qui peut passer 3h sur un choix de typographie ?',
      who: 'elodie',
      info: 'Sa force : remarquer tous les petits détails.',
    },
    {
      q: 'Qui s’énerve très fort quand le Trello n’est pas à jour ?',
      who: 'julie',
      info: 'Elle organise et orchestre Loooper! avec méthodologie et énergie.',
    },
    {
      q: 'Qui a un sac qui est un vrai inventaire de jeu vidéo : câbles, pansements et même un niveau ?',
      who: 'nino',
      info: 'Son sac est son objet fétiche.',
    },
    {
      q: 'Qui a toujours un carnet rempli de croquis ?',
      who: 'elodie',
      info: 'C’est son objet fétiche.',
    },
    {
      q: 'Qui rêve de thématiser entièrement un parc d’attractions ?',
      who: 'julie',
      info: 'Son rêve : une véritable bulle hors du temps.',
    },
    {
      q: 'Qui aimerait concevoir un grand jeu vidéo pour transmettre des messages forts ?',
      who: 'elodie',
      info: 'Elle veut casser les codes classiques grâce à l’interactivité.',
    },
    {
      q: 'Qui rêve de mettre la ludification au service de l’éducation ?',
      who: 'nino',
      info: 'Il imagine une solution où chaque élève apprend à son rythme.',
    },
    {
      q: 'Qui est officiellement la présidente de Loooper! ?',
      who: 'elodie',
      info: 'Officieusement, Julie pilote tout, et oniriquement, Nino se voit à la tête de Loooper!.',
    },
    {
      q: 'Qui se voit, oniriquement, à la tête de Loooper! ?',
      who: 'nino',
      info: 'Elodie est officiellement la présidente, et Julie pilote officieusement.',
    },
    {
      q: 'Qui a pour objet fétiche un tableau, pour faire encore plus de tableaux ?',
      who: 'julie',
      info: 'Un tableau… pour faire encore plus de tableaux.',
    },
    {
      q: 'Qui est toujours actif et incapable de s’arrêter ?',
      who: 'nino',
      info: 'C’est sa faiblesse.',
    },
    {
      q: 'Qui écrit des histoires captivantes et donne vie à des récits interactifs ?',
      who: 'julie',
      info: 'C’est la narratrice du trio.',
    },
    {
      q: 'Qui code des mécaniques innovantes et des interactions fluides ?',
      who: 'nino',
      info: 'C’est le développeur du trio.',
    },
  ];

  let order = [];
  let index = 0;
  let score = 0;
  let running = false;
  let answered = false;
  let ctx = null;

  const live = document.createElement('div');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  root.appendChild(live);

  function annoncer(msg) {
    live.textContent = '';
    setTimeout(() => (live.textContent = msg), 50);
  }

  function initAudio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
  }

  function beep(freq, dur = 0.15, when = 0, type = 'sine', vol = 0.3) {
    if (!ctx) return;
    const t = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  function soundStart() {
    beep(523, 0.1, 0, 'sine', 0.25);
    beep(784, 0.14, 0.1, 'sine', 0.25);
  }

  function soundNext() {
    beep(520, 0.08, 0, 'sine', 0.25);
    beep(780, 0.06, 0.04, 'sine', 0.15);
  }

  function soundOk() {
    beep(880, 0.1, 0);
    beep(1175, 0.14, 0.09);
  }

  function soundKo() {
    beep(330, 0.12, 0, 'sawtooth', 0.15);
    beep(220, 0.2, 0.11, 'sawtooth', 0.15);
  }

  function soundVictoire() {
    beep(523, 0.18, 0);
    beep(659, 0.18, 0.18);
    beep(784, 0.18, 0.36);
    beep(1047, 0.5, 0.54);
  }

  function soundEnd() {
    beep(523, 0.18, 0);
    beep(392, 0.18, 0.2);
    beep(262, 0.35, 0.4);
  }

  function lancerConfettis() {
    if (typeof window.confetti !== 'function') return;
    window.confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#3C61F5', '#BB6EF6', '#F6B254'],
    });
  }

  function melanger(tab) {
    const a = [...tab];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function afficherEtape(step) {
    [stepIntro, stepPlay, stepEnd].forEach((s) => {
      s.hidden = s !== step;
    });
  }

  function majProgress() {
    progressEl.textContent = `Question ${index + 1} sur ${NB_QUESTIONS} · Score ${score}`;
  }

  function afficherQuestion() {
    const item = order[index];
    answered = false;
    majProgress();
    questionEl.textContent = item.q;
    feedbackEl.textContent = '';
    nextBtn.hidden = true;
    nextBtn.querySelector('span').textContent = 'Question suivante';
    answers.forEach((b) => {
      b.removeAttribute('aria-disabled');
      delete b.dataset.state;
    });
    answers[0].focus();
  }

  function repondre(who) {
    if (!running || answered) return;
    answered = true;

    const item = order[index];
    const ok = who === item.who;

    answers.forEach((b) => {
      b.setAttribute('aria-disabled', 'true');
      if (b.dataset.who === item.who) b.dataset.state = 'ok';
      else if (b.dataset.who === who) b.dataset.state = 'ko';
    });

    if (ok) {
      score++;
      soundOk();
    } else {
      soundKo();
    }

    majProgress();

    const texte = ok ? `Bien joué ! ${item.info}` : `Raté, c’est ${NOMS[item.who]}. ${item.info}`;
    feedbackEl.textContent = texte;

    nextBtn.querySelector('span').textContent =
      index === NB_QUESTIONS - 1 ? 'Voir mon score' : 'Question suivante';
    nextBtn.hidden = false;
    nextBtn.focus();
    annoncer(texte);
  }

  function suivant() {
    index++;
    if (index >= NB_QUESTIONS) {
      fin();
      return;
    }
    soundNext();
    afficherQuestion();
  }

  function fin() {
    running = false;

    let message;
    if (score >= 7) message = 'Tu connais le trio sur le bout des doigts !';
    else if (score >= 4) message = 'Pas mal, tu connais bien l’équipe !';
    else message = 'Relis nos cartes juste au-dessus et retente ta chance !';

    resultEl.textContent = `${score} sur ${NB_QUESTIONS}`;
    messageEl.textContent = message;
    afficherEtape(stepEnd);

    if (score >= 6) {
      soundVictoire();
      lancerConfettis();
    } else {
      soundEnd();
    }

    replayBtn.focus();
    annoncer(`Quiz terminé. ${score} sur ${NB_QUESTIONS}. ${message}`);
  }

  function demarrer() {
    initAudio();
    soundStart();
    order = melanger(QUESTIONS).slice(0, NB_QUESTIONS);
    index = 0;
    score = 0;
    running = true;
    afficherEtape(stepPlay);
    afficherQuestion();
  }

  function reinit() {
    running = false;
    answered = false;
    afficherEtape(stepIntro);
  }

  answers.forEach((b) => {
    b.addEventListener('click', () => repondre(b.dataset.who));
  });

  nextBtn.addEventListener('click', suivant);
  startBtn.addEventListener('click', demarrer);
  replayBtn.addEventListener('click', demarrer);

  root.addEventListener('keydown', (e) => {
    if (!running || answered || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!(e.key in KEYS)) return;
    e.preventDefault();
    repondre(answers[KEYS[e.key]].dataset.who);
  });

  new MutationObserver(() => {
    if (body.classList.contains('ludique-active') && (running || !stepEnd.hidden)) reinit();
  }).observe(body, { attributes: true, attributeFilter: ['class'] });
})();
