/* eslint-disable @next/next/no-img-element */
import { coverDe } from "@/data/covers";

/**
 * Couverture d'une vidéo, stockée dans le site (public/covers).
 * Tant qu'une couverture manque, une illustration d'Afro prend la place.
 */
export function Cover({ id, className, secours = 0, eager = false }: { id: string; className?: string; secours?: number; eager?: boolean }) {
  return <img src={coverDe(id, secours)} alt="" loading={eager ? "eager" : "lazy"} decoding="async" className={className} />;
}
