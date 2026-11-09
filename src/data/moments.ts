// Moments clés tirés de TIMELINE.md (analyse du TikTok @afrothecreator, 9 nov. 2026).
// art : recadrage d'une illustration d'Afro (public/afro/cartes).

export type Moment = {
  id: string;
  date: string;
  titre: string;
  stat: string;
  grand: string; // gros texte sur la carte
  art: string;
  videoId?: string;
};

export const moments: Moment[] = [
  {
    id: "debut",
    date: "06.11.2023",
    titre: "Le premier Bading",
    stat: "Sous le nom Afro Valentine",
    grand: "EP. 01",
    art: "/afro/cartes/01-debut.webp",
    videoId: "7298387549867773217",
  },
  {
    id: "million",
    date: "11.11.2023",
    titre: "Premier million",
    stat: "1,1M vues · 162K j'aime · 5 jours après",
    grand: "1M",
    art: "/afro/cartes/02-million.webp",
    videoId: "7300135846320033056",
  },
  {
    id: "joestar",
    date: "10.12.2023",
    titre: "Afro Joestar",
    stat: "Le nom qui reste",
    grand: "JOESTAR",
    art: "/afro/cartes/03-joestar.webp",
    videoId: "7310915030076099873",
  },
  {
    id: "record",
    date: "14.04.2024",
    titre: "Record absolu",
    stat: "1,2M vues · Naruto",
    grand: "1,2M",
    art: "/afro/cartes/04-record.webp",
    videoId: "7357730794359557409",
  },
  {
    id: "marineford",
    date: "25.05.2024",
    titre: "Marineford, la fin",
    stat: "788K vues · 115K j'aime",
    grand: "788K",
    art: "/afro/cartes/05-stand.webp",
    videoId: "7372948887486696737",
  },
  {
    id: "jaime",
    date: "09.02.2026",
    titre: "Record de j'aime",
    stat: "182,8K j'aime · DBZ",
    grand: "183K",
    art: "/afro/cartes/06-etoile.webp",
    videoId: "7604873121606274326",
  },
  {
    id: "studio",
    date: "24.05.2026",
    titre: "Studio ΔFR✪ ouvre",
    stat: "166,6K vues",
    grand: "",
    art: "/afro/cartes/07-studio.webp",
    videoId: "7643546545555541281",
  },
  {
    id: "anime",
    date: "19.07.2026",
    titre: "Premier Bading animé",
    stat: "Bading Ball Z · Saga Saiyen",
    grand: "BBZ",
    art: "/afro/cartes/08-anime.webp",
    videoId: "7664310323771477280",
  },
  {
    id: "retro",
    date: "31.10.2026",
    titre: "Invité des Retro Awards",
    stat: "Il présente l'année 2007",
    grand: "2007",
    art: "/afro/cartes/09-retro.webp",
  },
];
