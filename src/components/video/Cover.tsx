/* eslint-disable @next/next/no-img-element */
import { ART } from "@/data/art";

/**
 * Couverture TikTok d'une vidéo (via /api/cover), chargée seulement à l'approche.
 * Si TikTok ne répond pas, une illustration d'Afro prend la place.
 */
export function Cover({ id, className, secours = 0, eager = false }: { id: string; className?: string; secours?: number; eager?: boolean }) {
  const fb = ART[Math.abs(secours) % ART.length];
  return (
    <img
      src={`/api/cover/${id}?fallback=${encodeURIComponent(fb)}`}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
