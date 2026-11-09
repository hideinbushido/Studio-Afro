"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { formatNombre, parSerie, SERIES, videos, type SerieId } from "@/data/videos";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { Cover } from "@/components/video/Cover";
import { useVideo } from "@/components/video/VideoProvider";
import s from "./Videotheque.module.css";

/**
 * Vidéos (base : « Journal » de jjettas.com).
 * Toutes les vidéos d'Afro en grille, filtres par série, tri, et lecteur au clic.
 * On en affiche 24 à la fois pour ne charger que les couvertures utiles.
 */
const PAR_PAGE = 24;

export function Videotheque() {
  const [serie, setSerie] = useState<SerieId | "tout">("tout");
  const [tri, setTri] = useState<"recent" | "populaire">("recent");
  const [n, setN] = useState(PAR_PAGE);
  const ouvrir = useVideo();
  const series = parSerie().sort((a, b) => b.videos - a.videos);

  const liste = useMemo(() => {
    const l = serie === "tout" ? videos : videos.filter((v) => v.serie === serie);
    return [...l].sort((a, b) => (tri === "recent" ? b.date.getTime() - a.date.getTime() : b.vues - a.vues));
  }, [serie, tri]);

  return (
    <section className={s.root} data-nav="dark" aria-label="Toutes les vidéos">
      <DeepBackground wave={false} />

      <div className={s.barre}>
        <div className={s.filtres} role="group" aria-label="Filtrer par série">
          <button type="button" className={serie === "tout" ? s.chipOn : s.chip} onClick={() => { setSerie("tout"); setN(PAR_PAGE); }}>
            Tout <em>{videos.length}</em>
          </button>
          {series.map((x) => (
            <button key={x.id} type="button" className={serie === x.id ? s.chipOn : s.chip} onClick={() => { setSerie(x.id); setN(PAR_PAGE); }}>
              {x.court} <em>{x.videos}</em>
            </button>
          ))}
        </div>
        <div className={s.tri} role="group" aria-label="Trier">
          <button type="button" className={tri === "recent" ? s.chipOn : s.chip} onClick={() => setTri("recent")}>
            Récentes
          </button>
          <button type="button" className={tri === "populaire" ? s.chipOn : s.chip} onClick={() => setTri("populaire")}>
            Populaires
          </button>
        </div>
      </div>

      {serie !== "tout" && (
        <p className={s.desc}>
          <strong>{SERIES[serie].nom}</strong> — {SERIES[serie].description}
        </p>
      )}

      <motion.ul layout className={s.grille}>
        <AnimatePresence mode="popLayout">
          {liste.slice(0, n).map((v, i) => (
            <motion.li
              key={v.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 160, damping: 20, delay: Math.min(i % PAR_PAGE, 12) * 0.025 }}
            >
              <button
                type="button"
                className={s.carte}
                onClick={() =>
                  ouvrir({
                    videoId: v.id,
                    titre: v.legende || SERIES[v.serie].nom,
                    stat: `${formatNombre(v.vues)} vues · ${formatNombre(v.jaime)} j'aime`,
                    date: v.date.toLocaleDateString("fr-FR"),
                    ratio: v.paysage ? "16 / 9" : undefined,
                  })
                }
              >
                <span className={s.visuel}>
                  <Cover id={v.id} secours={i} className={s.img} />
                  <span className={s.badge}>{SERIES[v.serie].court}</span>
                  <span className={s.vues}>▶ {formatNombre(v.vues)}</span>
                </span>
                <span className={s.legende}>{v.legende || SERIES[v.serie].nom}</span>
                <span className={s.date}>{v.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}</span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {n < liste.length && (
        <div className={s.plus}>
          <button type="button" className={s.plusBouton} onClick={() => setN((x) => x + PAR_PAGE)}>
            Voir plus <em>({liste.length - n})</em>
          </button>
        </div>
      )}
    </section>
  );
}
