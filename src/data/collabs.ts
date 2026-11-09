// Collabs : créateurs et événements crédités dans les légendes d'Afro (🎙️ / 🎤 / mentions),
// relevé du 9 nov. 2026. videoId = une vidéo où la collab est créditée.

export type Collab = {
  nom: string;
  handle: string;
  role: string;
  texte: string;
  videoId: string;
};

export const collabs: Collab[] = [
  {
    nom: "Yannick Bonano",
    handle: "",
    role: "Voix · DBZ",
    texte: "Son audio, doublé par Afro sur Dragon Ball Z : le record de j'aime de la chaîne, 182,8K j'aime pour 946,8K vues.",
    videoId: "7604873121606274326",
  },
  {
    nom: "Kommander Samo Samo",
    handle: "@kommandersamosamo",
    role: "Son · Opening Concept",
    texte: "Son « Gbachi » sur l'Opening Concept Hajime no Ippo (348,1K vues), et un Bading avec Baki.",
    videoId: "7661645131434577184",
  },
  {
    nom: "Espezumaki",
    handle: "@espezumaki1x",
    role: "Voix de Goku · Bading Ball Z",
    texte: "La voix de Goku dans Bading Ball Z, le premier Bading animé du studio. Le créateur qu'Afro mentionne le plus.",
    videoId: "7664310323771477280",
  },
  {
    nom: "Jeune Lion",
    handle: "@jeunelion13",
    role: "Son · Opening Concept",
    texte: "Peter Tosh × Boondocks en Opening Concept, et plusieurs Bading One Piece et JoJo sur ses sons.",
    videoId: "7643796358876499232",
  },
  {
    nom: "Cala Mytho",
    handle: "@cala0mytho",
    role: "Voix · JoJo, Blue Lock",
    texte: "« Que des mécréants » : 200,6K vues sur JoJo, puis Bading Lock.",
    videoId: "7371896772802645281",
  },
  {
    nom: "Bébé Nica",
    handle: "",
    role: "Voix · Jujutsu Kaisen",
    texte: "227,8K vues sur Jujutsu Kaisen, doublé à l'ivoirienne.",
    videoId: "7371111455313235233",
  },
  {
    nom: "Retro Awards",
    handle: "retro-awards.vercel.app",
    role: "Événement · 31 octobre 2026",
    texte: "La cérémonie des meilleurs openings d'animés de 2005 à 2019. Afro y présente l'année 2007.",
    videoId: "7689788285916368160",
  },
];

// Tous les noms crédités, pour le bandeau qui défile.
export const credits = [
  "Espezumaki", "Jeune Lion", "Kola Kelly", "Koffi Nestor", "Cala Mytho", "Kommander Samo Samo", "Yannick Bonano",
  "Bébé Nica", "Lyvan Ouraga", "Duguembé", "Jeune Morty", "LaMano", "RJK", "Le Djassaman", "Paul Yves Ettien",
  "Rusty", "Levydjou", "ZiiMONDO", "SmOokii Gamer", "Retro Awards", "Zenkai",
];

export type Membre = { nom: string; handle: string; role: string; texte: string; image?: string; lien?: string };

export const equipe: Membre[] = [
  {
    nom: "Afro",
    handle: "@afrothecreator",
    role: "Fondateur · doublage, montage, animation",
    texte: "Il écrit, double, monte et anime chaque Bading. 83,4K abonnés, 18,2M de vues.",
    image: "/afro/portrait-detoure.webp",
    lien: "https://www.tiktok.com/@afrothecreator",
  },
  {
    nom: "Le Zumaki",
    handle: "@le_zumaki",
    role: "Créateur · voix",
    texte: "76,2K abonnés sur TikTok. Une des voix de la team.",
    lien: "https://www.tiktok.com/@le_zumaki",
  },
  {
    nom: "Tidiane",
    handle: "",
    role: "Dessin",
    texte: "Il dessine les personnages et les décors du studio.",
  },
];
