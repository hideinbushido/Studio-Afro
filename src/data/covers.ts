// Couvertures des vidéos, stockées dans public/covers (liste générée par scripts/covers-manifest.mjs).
import liste from "./covers.json";
import { ART } from "./art";

const covers = liste as Record<string, string>;

/** Couverture de la vidéo si on l'a, sinon une illustration d'Afro. */
export function coverDe(id: string, secours = 0): string {
  return covers[id] ?? ART[Math.abs(secours) % ART.length];
}
