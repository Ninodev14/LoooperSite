/**
 * secteurs.ts
 *
 * 1. FORMATS : catalogue de tous les formats Loooper! (une seule fois)
 * 2. PROJETS : catalogue de tous les projets du carrousel (une seule fois)
 * 3. secteurs : les pages « secteur », qui piochent dans les catalogues par id
 *
 * Pour ajouter un format ou un projet : ajoute-le dans son catalogue, puis
 * ajoute son id dans `formats` / `projets` du secteur voulu.
 * Pour ajouter un secteur : ajoute un objet dans `secteurs`, la page,
 * le footer et le JSON-LD se mettent à jour tout seuls.
 */

export type Couleur = 'orange' | 'purple' | 'blue';
export type Etoiles = 'Purple' | 'Blue' | 'Yellow';
export type Bandeau = 'Blue' | 'Orange' | 'Purple';

export type FormatId =
  | 'escape'
  | 'quiz'
  | 'geocaching'
  | 'jeu-societe'
  | 'jeu-video'
  | 'mini-jeu'
  | 'histoire-interactive';

export interface Format {
  titre: string;
  img: string;
  alt: string;
  modal: string;
  aria: string;
  texte: string;
}

export const FORMATS: Record<FormatId, Format> = {
  escape: {
    titre: 'Escape game',
    img: '/img/long-card/escape.jpg',
    alt: "Écran d'un escape game numérique présentant une scène de crime",
    modal: 'modal-escape-game',
    aria: 'En savoir plus sur les escape games',
    texte:
      'Développez <b>la coopération, la communication et l’entraide</b>. Unissez <b>vos forces</b> pour atteindre un objectif commun.',
  },
  quiz: {
    titre: 'Quiz',
    img: '/img/long-card/cart-cartel.jpg',
    alt: 'Écran du quiz Cartes & Cartels',
    modal: 'modal-quiz',
    aria: 'En savoir plus sur le quiz',
    texte:
      'Testez vos <b>connaissances</b>, enrichissez-les avec de <b>nouveaux savoirs</b> et stimulez la <b>compétition bienveillante</b> entre participants.',
  },
  geocaching: {
    titre: 'Géocaching',
    img: '/img/long-card/geocaching.jpg',
    alt: "Écran d'une carte de Bordeaux avec plusieurs points de repère, illustrant un géocaching",
    modal: 'modal-geocaching',
    aria: 'En savoir plus sur le géocaching',
    texte:
      'Partez <b>à plusieurs</b> à la découverte d’un lieu, résolvez <b>des énigmes</b> sur le terrain et vivez l’aventure ensemble.',
  },
  'jeu-societe': {
    titre: 'Jeu de société',
    img: '/img/long-card/biker.jpg',
    alt: 'Personnes jouant au jeu de société Bikers au Grand Cœur',
    modal: 'modal-jeu-societe',
    aria: 'En savoir plus sur le jeu de société',
    texte:
      'Utilisez <b>des mécaniques ludiques</b>, favorisez <b>les échanges</b> et engagez <b>la discussion</b> sur diverses thématiques.',
  },
  'jeu-video': {
    titre: 'Jeu vidéo',
    img: '/img/long-card/game.jpg',
    alt: 'Écran du jeu vidéo Zemblanité',
    modal: 'modal-jeu-video',
    aria: 'En savoir plus sur les jeux vidéo',
    texte:
      'Plongez dans un univers où chaque action entraîne des <b>conséquences</b>. Expérimentez et comprenez <b>les enjeux</b> d’un sujet en jouant.',
  },
  'mini-jeu': {
    titre: 'Mini-jeu',
    img: '/img/long-card/mini-jeu.jpg',
    alt: "Écran d'un mini-jeu web posant une question vrai ou faux",
    modal: 'modal-mini-jeu',
    aria: 'En savoir plus sur les mini-jeux',
    texte:
      'Captez <b>l’attention</b>, divertissez et <b>dynamisez</b> un site internet, une application ou un support de communication.',
  },
  'histoire-interactive': {
    titre: 'Histoire interactive',
    img: '/img/long-card/story.jpg',
    alt: "Écran d'un choix dans une histoire interactive",
    modal: 'modal-histoire-interactive',
    aria: 'En savoir plus sur l’histoire interactive',
    texte:
      'Entrez dans la peau d’un personnage, faites <b>des choix décisifs</b>, ressentez <b>ses dilemmes</b> et développez <b>une connexion</b> avec un message.',
  },
};

export type ProjetId =
  | 'zizanie'
  | 'cartes-cartels'
  | 'bikers'
  | 'coop-cook'
  | 'save-seamulator'
  | 'zemblanite'
  | 'koti-fight'
  | 'scratch';

export interface Projet {
  titre: string;
  type: string;
  description: string;
  img: string;
  alt: string;
  modal: string;
}

export const PROJETS: Record<ProjetId, Projet> = {
  zizanie: {
    titre: 'La Zizanie',
    type: 'Expérience interactive | MUSBA',
    description: 'Un quiz interactif conçu pour le MUSBA, le musée des Beaux-Arts de Bordeaux.',
    img: '/img/card/zizanie.jpg',
    alt: 'Image représentant le quizz interactif La Zizanie',
    modal: 'modal-zizanie',
  },
  'cartes-cartels': {
    titre: 'Cartes & Cartels',
    type: 'Expérience interactive | MUSBA',
    description: 'Une expérience interactive pour découvrir les œuvres du MUSBA, à Bordeaux, en jouant.',
    img: '/img/card/cartesCartels.jpg',
    alt: 'Image représentant le quizz interactif Cartes & Cartels',
    modal: 'modal-cartes-cartels',
  },
  bikers: {
    titre: 'Bikers au grand cœur',
    type: 'Jeu de société | Association',
    description: 'Un jeu de société créé sur mesure pour une association.',
    img: '/img/card/biker.jpg',
    alt: 'Image représentant le jeu de société Bikers au grand cœur',
    modal: 'modal-bikers',
  },
  'coop-cook': {
    titre: 'Coop’ Cook',
    type: 'Jeu vidéo multijoueur',
    description: 'Un jeu vidéo multijoueur à jouer en équipe.',
    img: '/img/card/coopCook.jpg',
    alt: 'Image représentant le jeu vidéo Coop’ Cook',
    modal: 'modal-coop-cook',
  },
  'save-seamulator': {
    titre: 'Save Seamulator',
    type: 'Jeu vidéo | Association',
    description: 'Un jeu vidéo réalisé pour une association.',
    img: '/img/card/saveSeamulator.jpg',
    alt: 'Image représentant le projet Save Seamulator',
    modal: 'modal-save-seamulator',
  },
  zemblanite: {
    titre: 'Zemblanité',
    type: 'Jeu vidéo',
    description: 'Un jeu vidéo conçu par l’équipe de Loooper!',
    img: '/img/card/zemblanite.jpg',
    alt: 'Image représentant le jeu vidéo Zemblanité',
    modal: 'modal-zemblanite',
  },
  'koti-fight': {
    titre: 'Koti’Fight',
    type: 'Média ludique | Application',
    description:
      'Une application pour démêler le vrai du faux : chaque jour, on défend son équipe.',
    img: '/img/card/kotiFight.jpg',
    alt: 'Image représentant le média ludique Koti’Fight',
    modal: 'modal-koti-fight',
  },
  scratch: {
    titre: 'Atelier Scratch',
    type: 'Atelier | Collège',
    description:
      'Accompagnement de collégiens dans la création d’un serious game pour apprendre et sensibiliser à la protection de la biodiversité marine.',
    img: '/img/card/scratch.jpg',
    alt: 'Image représentant les ateliers sur Scratch',
    modal: 'modal-scratch',
  },
};

export interface Besoin {
  titre: string;
  texte: string;
  couleur: Couleur;
  lien: { href: string; label: string };
}

export interface Avis {
  texte: string;
  auteur: string;
}

export interface Secteur {
  /** URL : https://loooper.fr/secteur/<slug>/ */
  slug: string;
  nav: string;
  title: string;
  description: string;
  h1: { avant: string; mots: string[]; apres: string };
  introTitre: string;
  intro: string;
  cta: string;
  illustration: { img: string; etoiles: Etoiles };
  bandeau: Bandeau;
  besoins: Besoin[];
  formats: { id: FormatId; texte?: string }[];
  projets: ProjetId[];
  chiffre?: { valeur: string; texte: string };
  avis?: Avis[];
  faq: { q: string; a: string }[];
}

export const secteurs: Secteur[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'serious-game-musee',
    nav: 'Musées et patrimoine',
    title: 'Jeux interactifs pour musées, Bordeaux',
    description:
      'Vos collections méritent d’être jouées, pas seulement regardées. À Bordeaux, nous créons des quiz, enquêtes et jeux de médiation sur mesure pour les musées.',
    h1: {
      avant: 'Loooper! c’est des ',
      mots: ['jeux', 'interactifs'],
      apres: ' pour les musées',
    },
    introTitre: 'Et si vos collections devenaient un terrain de jeu ?',
    intro:
      'Une collection est riche, mais pas toujours facile d’accès. Chez <b>Loooper!</b>, nous transformons <b>vos œuvres, vos récits et vos savoirs</b> en <b>jeux interactifs de médiation</b> qui donnent envie d’observer, de chercher et de comprendre. Le visiteur devient <b>acteur de sa visite</b>. Chaque expérience est pensée <b>accessible, inclusive et éco-conçue</b>.',
    cta: 'Parler de mon musée',
    illustration: { img: '/svg/besoin/idea.svg', etoiles: 'Purple' },
    bandeau: 'Blue',
    besoins: [
      {
        titre: 'Valoriser vos collections',
        texte:
          'Quiz, enquêtes, jeux de cartes ou jeux de piste : le visiteur regarde les œuvres plus longtemps et retient davantage.',
        couleur: 'orange',
        lien: { href: '/apprendre-ludique/', label: 'Apprendre avec le ludique' },
      },
      {
        titre: 'Accueillir tous les publics',
        texte:
          'Familles, groupes scolaires, adultes : nous adaptons les niveaux, les formats et l’accessibilité (contrastes, lecture, sons) pour que chacun trouve sa place dans la visite.',
        couleur: 'purple',
        lien: { href: '/creer-interaction-sociale/', label: 'Créer de l’interaction' },
      },
      {
        titre: 'Prolonger la visite',
        texte:
          'Sur borne, sur smartphone ou en version papier : le jeu peut vivre dans les salles, pendant un atelier ou chez le visiteur, une fois la visite terminée.',
        couleur: 'blue',
        lien: { href: '/communiquer-autrement/', label: 'Communiquer autrement' },
      },
    ],
    formats: [
      {
        id: 'quiz',
        texte:
          'Transformez <b>vos collections</b> en défi : le visiteur observe, compare et <b>retient</b>, sans que la médiation devienne scolaire.',
      },
      {
        id: 'geocaching',
        texte:
          'Faites explorer <b>les salles ou le quartier</b> grâce à des énigmes : un parcours qui prolonge <b>la visite</b> au-delà des murs.',
      },
      {
        id: 'jeu-societe',
        texte:
          'Rassemblez les visiteurs autour d’un plateau inspiré <b>de vos collections</b> : on joue, on échange et on <b>apprend sans s’en rendre compte</b>.',
      },
    ],
    projets: ['zizanie', 'cartes-cartels'],
    chiffre: {
      valeur: '300',
      texte: 'groupes et familles ont découvert des œuvres par le jeu',
    },
    faq: [
      {
        q: 'Combien de temps faut-il pour créer un jeu pour un musée ?',
        a: 'Cela dépend du format : un quiz interactif ne demande pas le même temps qu’un jeu de société ou qu’une application complète. Nos projets ont été réalisés en 2 à 11 semaines selon le format et le périmètre. Après un premier échange sur vos objectifs, votre public et votre calendrier, nous vous proposons un planning réaliste.',
      },
      {
        q: 'Peut-on jouer dans un musée sans écran ?',
        a: 'Oui. Nous concevons aussi des jeux de société, des carnets d’enquête et des dispositifs phygitaux. Le numérique n’est jamais une obligation : nous choisissons le support le plus adapté à votre lieu et à votre public.',
      },
      {
        q: 'Travaillez-vous avec les petites structures culturelles ?',
        a: 'Oui. Nous avons travaillé avec le MusBA et des associations. Chaque proposition est adaptée à vos moyens : présentez-nous votre projet et nous construisons une réponse sur mesure.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'serious-game-ecole',
    nav: 'Écoles et éducation',
    title: 'Atelier serious game pour collèges, Bordeaux',
    description:
      'Et si vos élèves créaient leur propre jeu, avec nous à leurs côtés ? Ateliers de serious game et jeux pédagogiques sur mesure pour collèges, à Bordeaux.',
    h1: {
      avant: 'Loooper! c’est des ',
      mots: ['ateliers', 'serious', 'game'],
      apres: ' pour vos élèves',
    },
    introTitre: 'Faire jouer vos élèves, ou mieux, leur faire créer leur jeu ?',
    intro:
      'Les élèves retiennent mieux quand ils jouent, et encore mieux quand ils créent. Nous animons <b>des ateliers serious game</b> où ils conçoivent leur propre jeu, et nous fabriquons <b>des outils pédagogiques ludiques</b> à partir de vos contenus pour <b>accompagner vos séquences</b>. Chaque expérience est pensée <b>accessible, inclusive et éco-conçue</b>.',
    cta: 'Parler de ma classe',
    illustration: { img: '/svg/besoin/teach.svg', etoiles: 'Purple' },
    bandeau: 'Purple',
    besoins: [
      {
        titre: 'Faire créer plutôt que subir',
        texte:
          'Atelier de création de jeu vidéo ou de jeu de société : les élèves travaillent en équipe, imaginent un scénario, testent et présentent leur projet.',
        couleur: 'orange',
        lien: { href: '/apprendre-ludique/', label: 'Apprendre avec le ludique' },
      },
      {
        titre: 'Aborder les sujets qui comptent',
        texte:
          'Environnement, santé, citoyenneté, numérique… le jeu ouvre la discussion plus facilement qu’un cours magistral et laisse chaque élève prendre la parole.',
        couleur: 'purple',
        lien: { href: '/sensibiliser-reflechir/', label: 'Sensibiliser et faire réfléchir' },
      },
      {
        titre: 'Des outils prêts à l’emploi',
        texte:
          'Jeux pédagogiques construits à partir de vos contenus et de vos programmes, utilisables en classe, en atelier ou en autonomie.',
        couleur: 'blue',
        lien: { href: '/former-efficacement/', label: 'Former efficacement' },
      },
    ],
    formats: [
      {
        id: 'quiz',
        texte:
          'Révisez, découvrez ou évaluez autrement : <b>un quiz interactif</b> relance l’attention et favorise <b>l’entraide</b> en classe.',
      },
      {
        id: 'escape',
        texte:
          'Lancez <b>une enquête collective</b> autour d’une notion du programme : les élèves <b>coopèrent</b> pour résoudre les énigmes.',
      },
      {
        id: 'jeu-video',
        texte:
          'Faites <b>jouer ou créer</b> un jeu vidéo à vos élèves : ils expérimentent, testent et comprennent <b>les enjeux d’un sujet</b>.',
      },
    ],
    projets: ['scratch', 'save-seamulator', 'bikers'],
    chiffre: {
      valeur: '150',
      texte: 'élèves accompagnés dans la création de serious games',
    },
    avis: [
      {
        texte:
          'Le trio de Loooper! forme une équipe parfaite pour accompagner dans la création de serious game et ludifier le travail en atelier auprès du public. Sérieux et aidants, ils proposent une expérience sur mesure par rapport à la demande client […]',
        auteur:
          'Thomas Brunel de Montméjan, professeur à l’IUT Bordeaux Montaigne et chercheur associé au laboratoire MICA',
      },
      {
        texte:
          '[…] Leur projet est très bien structuré, tout comme leurs séances. Ils sont à l’aise devant les élèves et se rendent disponibles à tout moment. Leurs ateliers jeux vidéo ont été une vraie chance pour les élèves qui ont adoré ce projet.',
        auteur: 'Léa Roger, enseignante de SVT au collège Pablo Néruda',
      },
    ],
    faq: [
      {
        q: 'À quels niveaux s’adressent vos ateliers ?',
        a: 'Nous avons accompagné des élèves de collège et des étudiants de l’enseignement supérieur. Le contenu, la durée et la difficulté s’adaptent au niveau et au programme de votre classe.',
      },
      {
        q: 'Faut-il du matériel ou des compétences techniques ?',
        a: 'Aucune compétence en création de jeu n’est nécessaire côté équipe pédagogique. Nous définissons ensemble le matériel utile (salle, ordinateurs…) avant l’atelier.',
      },
      {
        q: 'Peut-on relier l’atelier à un projet de classe ou de matière ?',
        a: 'Oui. Nous partons de vos objectifs pédagogiques (matière, compétences, projet d’établissement) pour construire un atelier qui s’intègre dans votre progression.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'jeu-entreprise-rse',
    nav: 'Entreprises et RSE',
    title: 'Jeu de sensibilisation RSE pour entreprises',
    description:
      'Un livret RSE se lit une fois, un jeu se rejoue. Nous créons à Bordeaux des jeux sur mesure pour que vos équipes s’approprient vos enjeux RSE.',
    h1: {
      avant: 'Loooper! c’est des ',
      mots: ['jeux', 'de', 'sensibilisation'],
      apres: ' RSE pour vos équipes',
    },
    introTitre: 'Une démarche RSE que vos équipes vont vraiment s’approprier ?',
    intro:
      'Un livret RSE se lit une fois. Un jeu se rejoue et se discute. Chez <b>Loooper!</b>, nous transformons <b>vos enjeux RSE</b> en <b>expériences collectives</b> qui font passer les messages et <b>créent du lien entre collaborateurs</b>. Chaque expérience est pensée <b>accessible, inclusive et éco-conçue</b>.',
    cta: 'Parler de mon entreprise',
    illustration: { img: '/svg/besoin/annonce.svg', etoiles: 'Blue' },
    bandeau: 'Orange',
    besoins: [
      {
        titre: 'Sensibiliser aux enjeux RSE',
        texte:
          'Écologie, diversité, éthique, sécurité… un jeu de société ou un serious game rend ces sujets concrets et facilite l’échange entre collaborateurs.',
        couleur: 'orange',
        lien: { href: '/sensibiliser-reflechir/', label: 'Sensibiliser et faire réfléchir' },
      },
      {
        titre: 'Renforcer la cohésion d’équipe',
        texte:
          'Séminaires, journées d’intégration, temps forts internes : des formats coopératifs pour créer du lien entre les services.',
        couleur: 'purple',
        lien: { href: '/renforcer-cohesion/', label: 'Renforcer la cohésion' },
      },
      {
        titre: 'Former et engager',
        texte:
          'Onboarding, formation interne, communication : nous transformons vos contenus en parcours ludiques qui donnent envie d’aller jusqu’au bout.',
        couleur: 'blue',
        lien: { href: '/former-efficacement/', label: 'Former efficacement' },
      },
    ],
    formats: [
      {
        id: 'escape',
        texte:
          'Faites coopérer vos équipes autour d’<b>un objectif commun</b> et travaillez <b>la communication</b> et <b>l’entraide</b> le temps d’un séminaire.',
      },
      {
        id: 'quiz',
        texte:
          'Abordez les <b>enjeux RSE</b> sur le ton de <b>la compétition bienveillante</b> : on apprend, on débat, on retient.',
      },
      {
        id: 'jeu-societe',
        texte:
          'Un plateau pour se positionner, débattre et repartir avec <b>des idées concrètes</b> : <b>un jeu de société</b> qui lance la discussion en équipe.',
      },
    ],
    projets: ['bikers', 'zemblanite', 'coop-cook'],
    faq: [
      {
        q: 'Avez-vous déjà réalisé un jeu de sensibilisation ?',
        a: 'Oui. Bikers au grand cœur, un jeu de société sur le harcèlement, a été repris par l’association Bikers Contre le Harcèlement 33 pour ses événements et ses interventions. Save Seamulator sensibilise à la biodiversité marine. Nous appliquons la même démarche à vos enjeux RSE.',
      },
      {
        q: 'Un jeu sur mesure, est-ce adapté à une petite entreprise ?',
        a: 'Oui. Nous adaptons le format (jeu de société, jeu numérique, atelier animé) à la taille de votre équipe et à votre budget.',
      },
      {
        q: 'Peut-on utiliser le jeu en autonomie ?',
        a: 'Nous pouvons concevoir un jeu utilisable en autonomie par vos équipes, avec des règles claires et un livret d’animation, ou prévoir une animation de notre côté selon le projet.',
      },
      {
        q: 'Quels sujets RSE peut-on traiter ?',
        a: 'Environnement, égalité et inclusion, qualité de vie au travail, éthique, sécurité : nous partons de vos objectifs et de votre contexte pour choisir le bon angle.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'jeu-interactif-tourisme',
    nav: 'Tourisme et territoires',
    title: 'Jeu de piste et parcours ludique touristique',
    description:
      'Vos visiteurs veulent participer, pas seulement regarder. Nous créons des jeux de piste et des parcours ludiques pour faire vivre vos sites et vos territoires.',
    h1: {
      avant: 'Loooper! c’est des ',
      mots: ['parcours', 'ludiques'],
      apres: ' pour le tourisme',
    },
    introTitre: 'Et si la visite d’un lieu devenait une aventure ?',
    intro:
      'Les visiteurs ne veulent plus seulement regarder : ils veulent participer. Pour un site de visite, un office de tourisme ou tout un territoire, nous créons des <b>jeux de piste, quiz et parcours interactifs</b> qui font découvrir <b>votre patrimoine, vos histoires et vos paysages</b> en jouant, <b>à leur rythme</b>. Chaque expérience est pensée <b>accessible, inclusive et éco-conçue</b>.',
    cta: 'Parler de mon site',
    illustration: { img: '/svg/besoin/connection.svg', etoiles: 'Yellow' },
    bandeau: 'Blue',
    besoins: [
      {
        titre: 'Faire découvrir autrement',
        texte:
          'Jeu de piste, quiz ou escape game numérique : le visiteur explore à son rythme, en solo, en famille ou entre amis.',
        couleur: 'orange',
        lien: { href: '/apprendre-ludique/', label: 'Apprendre avec le ludique' },
      },
      {
        titre: 'Séduire les familles',
        texte:
          'Des supports pensés pour que petits et grands jouent ensemble et gardent un souvenir marquant de leur visite.',
        couleur: 'purple',
        lien: { href: '/creer-interaction-sociale/', label: 'Créer de l’interaction' },
      },
      {
        titre: 'Valoriser un territoire',
        texte:
          'Histoire locale, savoir-faire, patrimoine naturel : nous transformons vos contenus en récits jouables, sur place ou à distance.',
        couleur: 'blue',
        lien: { href: '/communiquer-autrement/', label: 'Communiquer autrement' },
      },
    ],
    formats: [
      {
        id: 'geocaching',
        texte:
          'Partez <b>à la découverte d’un lieu</b> : énigmes sur le terrain, points de repère et <b>chasse au trésor</b> pour petits et grands.',
      },
      {
        id: 'escape',
        texte:
          'Plongez les visiteurs dans <b>un scénario</b> lié à votre site, à jouer <b>sur écran</b>, sur place ou à distance.',
      },
      {
        id: 'histoire-interactive',
        texte:
          'Faites vivre <b>l’histoire d’un lieu</b> à travers un personnage : le visiteur fait des choix et découvre <b>le patrimoine</b> de l’intérieur.',
      },
    ],
    projets: ['cartes-cartels', 'zizanie'],
    chiffre: {
      valeur: '96',
      texte: 'enfants et parents sont venus jouer et apprendre en famille avec Loooper!',
    },
    faq: [
      {
        q: 'Quel support choisir pour un site touristique ?',
        a: 'Jeu papier, web ou application : nous choisissons en fonction du lieu. Les contraintes du site (réseau, accessibilité, affluence, saisonnalité) sont étudiées dès le départ.',
      },
      {
        q: 'Travaillez-vous avec des offices de tourisme et des collectivités ?',
        a: 'Nous accompagnons des structures culturelles, associatives et éducatives en Nouvelle-Aquitaine et sommes ouverts aux projets touristiques. Contactez-nous avec votre contexte et vos objectifs.',
      },
      {
        q: 'Les jeux sont-ils accessibles à tous ?',
        a: 'L’accessibilité fait partie de notre démarche : lisibilité, contrastes, alternatives au son, rythme de jeu libre. Nous en parlons dès la conception.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'jeu-interactif-zoo',
    nav: 'Zoos et parcs animaliers',
    title: 'Jeu interactif pour zoo et parc animalier',
    description:
      'Faites comprendre la biodiversité aux familles et aux scolaires en les faisant jouer. Jeux de piste et quiz sur mesure pour zoos et parcs animaliers.',
    h1: {
      avant: 'Loooper! c’est des ',
      mots: ['jeux', 'interactifs'],
      apres: ' pour les zoos et parcs animaliers',
    },
    introTitre: 'Et si la visite de votre parc devenait une expédition ?',
    intro:
      'Observer les animaux, c’est déjà beaucoup. Les comprendre, c’est encore mieux. Chez <b>Loooper!</b>, nous créons des <b>jeux de piste, quiz et histoires interactives</b> qui font découvrir <b>vos espèces, vos missions de conservation et leurs enjeux</b> à chaque visiteur, <b>en famille, en groupe scolaire ou entre amis</b>. Chaque expérience est pensée <b>accessible, inclusive et éco-conçue</b>.',
    cta: 'Parler de mon parc',
    illustration: { img: '/svg/besoin/connection.svg', etoiles: 'Purple' },
    bandeau: 'Orange',
    besoins: [
      {
        titre: 'Sensibiliser à la biodiversité',
        texte:
          'Protection des espèces, équilibre des écosystèmes, impact de nos gestes : le jeu rend ces sujets concrets et donne envie d’agir une fois la visite terminée.',
        couleur: 'orange',
        lien: { href: '/sensibiliser-reflechir/', label: 'Sensibiliser et faire réfléchir' },
      },
      {
        titre: 'Séduire les familles et les scolaires',
        texte:
          'Des parcours et des niveaux adaptés aux enfants comme aux adultes. Pour la sortie scolaire, un jeu à utiliser avant, pendant et après la visite.',
        couleur: 'purple',
        lien: { href: '/creer-interaction-sociale/', label: 'Créer de l’interaction' },
      },
      {
        titre: 'Prolonger la visite',
        texte:
          'Sur smartphone, en version papier ou en classe après la sortie : le jeu continue au-delà des allées du parc et fait revenir les visiteurs.',
        couleur: 'blue',
        lien: { href: '/communiquer-autrement/', label: 'Communiquer autrement' },
      },
    ],
    formats: [
      {
        id: 'geocaching',
        texte:
          'Faites explorer <b>votre parc</b> grâce à des énigmes et des points de repère : une <b>chasse au trésor</b> qui mène les visiteurs d’un enclos à l’autre.',
      },
      {
        id: 'quiz',
        texte:
          'Lancez un défi autour <b>de vos espèces</b> : on observe, on se trompe, on découvre et on <b>retient</b>, seul ou en équipe.',
      },
      {
        id: 'histoire-interactive',
        texte:
          'Faites vivre <b>le quotidien d’un animal</b> ou d’un soigneur : le visiteur fait des choix et comprend <b>les enjeux de la conservation</b>.',
      },
    ],
    projets: ['save-seamulator', 'zemblanite', 'scratch'],
    chiffre: {
      valeur: '3',
      texte: 'conférences données sur la biodiversité marine',
    },
    faq: [
      {
        q: 'Avez-vous déjà travaillé sur la biodiversité et la protection de la nature ?',
        a: 'Oui. Save Seamulator, créé avec l’association ADE Méditerranée, sensibilise les enfants à la biodiversité marine, et nous avons accompagné des collégiens dans la création d’un serious game sur ce même sujet. Nous adaptons cette approche à vos espèces et à vos messages.',
      },
      {
        q: 'Le jeu doit-il se jouer sur smartphone dans le parc ?',
        a: 'Pas nécessairement. Nous proposons des jeux sur smartphone ou tablette, mais aussi des carnets d’enquête papier et des dispositifs phygitaux. Nous tenons compte du réseau, de l’affluence et de la météo pour choisir le support adapté à votre parc.',
      },
      {
        q: 'Peut-on créer un jeu pour les groupes scolaires en sortie ?',
        a: 'Oui. Nous concevons des parcours et des outils pédagogiques adaptés aux niveaux et aux programmes, utilisables avant, pendant et après la sortie. Nous animons aussi des ateliers en classe pour prolonger la visite.',
      },
    ],
  },
];