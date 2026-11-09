// Toutes les vidéos publiques de @afrothecreator (relevé du 9 nov. 2026, 169 vidéos).
// Format brut : [id, date unix, vues, j'aime, commentaires, série, légende, paysage(1/0)]
import brut from "./videos.json";

export type SerieId = "bbz" | "dbz" | "onepiece" | "naruto" | "jjk" | "jojo" | "lock" | "kuroko" | "opening" | "autre";

export type Video = {
  id: string;
  date: Date;
  annee: number;
  vues: number;
  jaime: number;
  commentaires: number;
  serie: SerieId;
  legende: string;
  paysage: boolean;
};

export const SERIES: Record<SerieId, { nom: string; court: string; description: string }> = {
  bbz: { nom: "Bading Ball Z", court: "BBZ", description: "Le premier Bading animé : Saga Saiyen, Nameck, Cyborg, Cell Game." },
  opening: { nom: "Opening Concepts", court: "Openings", description: "Des génériques d'animés refaits sur des sons ivoiriens." },
  onepiece: { nom: "One Bading", court: "One Piece", description: "Marineford et toute la piraterie, doublées à l'ivoirienne." },
  naruto: { nom: "Bading Shippuden", court: "Naruto", description: "Konoha, l'Akatsuki et les mercons." },
  dbz: { nom: "Bading Ball", court: "DBZ", description: "Goku, Vegeta et les kaioken de quartier." },
  jjk: { nom: "Bading Kaisen", court: "JJK", description: "Gojo, Sukuna et la ruelle de Babi." },
  jojo: { nom: "JoJo Bading", court: "JoJo", description: "Là où Afro Joestar est né." },
  lock: { nom: "Bading Lock", court: "Blue Lock", description: "Le foot version Bading, saison 1." },
  kuroko: { nom: "Kuroko no Bading", court: "Kuroko", description: "Le basket, The Last Game." },
  autre: { nom: "Bading Autre", court: "Autres", description: "La vie, Abidjan, la CAN et tout le reste." },
};

type Ligne = [string, number, number, number, number, string, string, number];

export const videos: Video[] = (brut as Ligne[]).map(([id, t, v, l, c, s, d, p]) => {
  const date = new Date(t * 1000);
  return {
    id,
    date,
    annee: date.getUTCFullYear(),
    vues: v,
    jaime: l,
    commentaires: c,
    serie: s as SerieId,
    legende: d,
    paysage: p === 1,
  };
});

export const total = {
  videos: videos.length,
  vues: videos.reduce((a, v) => a + v.vues, 0),
  jaime: videos.reduce((a, v) => a + v.jaime, 0),
  commentaires: videos.reduce((a, v) => a + v.commentaires, 0),
  abonnes: 83400,
  jaimeProfil: 2_900_000,
};

export function parAnnee(annee: number | "tout") {
  const liste = annee === "tout" ? videos : videos.filter((v) => v.annee === annee);
  return {
    videos: liste.length,
    vues: liste.reduce((a, v) => a + v.vues, 0),
    jaime: liste.reduce((a, v) => a + v.jaime, 0),
    commentaires: liste.reduce((a, v) => a + v.commentaires, 0),
    millions: liste.filter((v) => v.vues >= 1_000_000).length,
    cent: liste.filter((v) => v.vues >= 100_000).length,
  };
}

export function parSerie() {
  return (Object.keys(SERIES) as SerieId[])
    .map((s) => {
      const l = videos.filter((v) => v.serie === s);
      const top = [...l].sort((a, b) => b.vues - a.vues)[0];
      return { id: s, ...SERIES[s], videos: l.length, vues: l.reduce((a, v) => a + v.vues, 0), top };
    })
    .filter((s) => s.videos > 0);
}

export const ANNEES = [2023, 2024, 2026] as const;

export function formatNombre(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 1).replace(".", ",").replace(",0", "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace(".", ",").replace(",0", "")}K`;
  return String(n);
}

export function lienTikTok(id: string) {
  return `https://www.tiktok.com/@afrothecreator/video/${id}`;
}
