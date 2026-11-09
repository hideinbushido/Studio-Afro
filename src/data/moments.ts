// Moments clés : toutes les lignes de TIMELINE.md (analyse du TikTok @afrothecreator, 9 nov. 2026).
// Image de la carte : couverture TikTok de la vidéo (servie par /api/cover/[id]).
// art : illustration d'Afro utilisée en secours si TikTok ne répond pas.
// ratio : format de la vidéo pour le lecteur (4/3 par défaut, relevé sur TikTok).

export type Moment = {
  id: string;
  date: string;
  titre: string;
  stat: string;
  grand: string; // gros texte sur la carte
  art: string;
  videoId: string;
  ratio?: string;
};

const ART = [
  "/afro/cartes/01-debut.webp",
  "/afro/cartes/02-million.webp",
  "/afro/cartes/03-joestar.webp",
  "/afro/cartes/04-record.webp",
  "/afro/cartes/05-stand.webp",
  "/afro/cartes/06-etoile.webp",
  "/afro/cartes/07-studio.webp",
  "/afro/cartes/08-anime.webp",
  "/afro/cartes/09-retro.webp",
];

const liste: Omit<Moment, "art">[] = [
  { id: "debut", date: "06.11.2023", titre: "Le premier Bading", stat: "Sous le nom Afro Valentine · 48,2K vues", grand: "EP. 01", videoId: "7298387549867773217" },
  { id: "million", date: "11.11.2023", titre: "Premier million", stat: "1,1M vues · 162K j'aime · 5 jours après", grand: "1M", videoId: "7300135846320033056" },
  { id: "bading", date: "29.11.2023", titre: "Le premier #bading", stat: "36,6K vues · le mot devient une série", grand: "#BADING", videoId: "7306806757555309857" },
  { id: "joestar", date: "10.12.2023", titre: "Afro Joestar", stat: "Le nom qui reste", grand: "JOESTAR", videoId: "7310915030076099873" },
  { id: "can", date: "05.02.2024", titre: "La CAN 2024", stat: "Edits de la Côte d'Ivoire championne · 89,1K vues", grand: "CAN", videoId: "7332170125665144097" },
  { id: "record", date: "14.04.2024", titre: "Record absolu", stat: "1,2M vues · 139K j'aime · Naruto", grand: "1,2M", videoId: "7357730794359557409" },
  { id: "20k", date: "02.05.2024", titre: "20K abonnés", stat: "113,9K vues · merci la team", grand: "20K", videoId: "7364408002549533984" },
  { id: "marineford", date: "25.05.2024", titre: "Marineford, la fin", stat: "788K vues · 115K j'aime · One Piece", grand: "788K", videoId: "7372948887486696737" },
  { id: "kuroko", date: "09.06.2024", titre: "Kuroko The Last Game", stat: "Part 1 · 232,2K vues", grand: "KUROKO", videoId: "7378546389556448544" },
  { id: "troisieme", date: "20.06.2024", titre: "Troisième million", stat: "1M vues · 150,9K j'aime", grand: "1M", videoId: "7382645397161807136" },
  { id: "youtube", date: "16.11.2024", titre: "Arrivée sur YouTube", stat: "Le trailer · 16,1K vues", grand: "YT", videoId: "7437830434014121248" },
  { id: "retour", date: "21.01.2026", titre: "Le retour", stat: "Désormais Afro The Creator · 131,9K vues", grand: "RETOUR", videoId: "7597816345782275350" },
  { id: "jaime", date: "09.02.2026", titre: "Record de j'aime", stat: "182,8K j'aime · 946,8K vues · DBZ", grand: "183K", videoId: "7604873121606274326" },
  { id: "opening", date: "11.05.2026", titre: "Premier Opening Concept", stat: "DJ Arafat × Yu-Gi-Oh 5D's · 21,8K vues", grand: "OP. 01", videoId: "7638669779271765270" },
  { id: "studio", date: "24.05.2026", titre: "Studio ΔFR✪ ouvre", stat: "166,6K vues", grand: "", videoId: "7643546545555541281" },
  { id: "lock", date: "25.06.2026", titre: "Bading Lock S1", stat: "Blue Lock version Bading · 29,6K vues", grand: "LOCK", videoId: "7655385016221830432" },
  { id: "ippo", date: "12.07.2026", titre: "Opening Hajime no Ippo", stat: "348,1K vues · 74,4K j'aime", grand: "348K", videoId: "7661645131434577184" },
  { id: "anime", date: "19.07.2026", titre: "Premier Bading animé", stat: "Bading Ball Z · Saga Saiyen", grand: "BBZ", videoId: "7664310323771477280", ratio: "16 / 9" },
  { id: "cell", date: "13.09.2026", titre: "Fin de la Saga Cyborg", stat: "Bading Ball Z · Cell Game", grand: "CELL", videoId: "7685128865366248736" },
  { id: "retro", date: "31.10.2026", titre: "Invité des Retro Awards", stat: "Il présente l'année 2007", grand: "2007", videoId: "7689788285916368160" },
];

// Illustrations de secours : le logo pour l'ouverture du Studio, sinon en rotation.
export const moments: Moment[] = liste.map((m, i) => ({
  ...m,
  art: m.id === "studio" ? ART[6] : ART[i % ART.length],
}));
