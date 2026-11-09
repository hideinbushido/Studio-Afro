"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { formatNombre, videos } from "@/data/videos";
import { Cover } from "@/components/video/Cover";
import { useVideo } from "@/components/video/VideoProvider";
import { DeepBackground } from "@/components/fx/DeepBackground";
import s from "./Galerie.module.css";

/**
 * Grande phrase + bande de vidéos (base : jjettas.com, A8).
 * Deux rangées de couvertures qui glissent en sens inverse au scroll ;
 * clic = la vidéo s'ouvre.
 */
const top = [...videos].sort((a, b) => b.vues - a.vues).slice(0, 20);
const rangees = [top.slice(0, 10), top.slice(10, 20)];

export function Galerie() {
  const ref = useRef<HTMLElement>(null);
  const ouvrir = useVideo();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "5%"]);

  return (
    <section ref={ref} className={s.section} data-nav="dark" aria-labelledby="galerie-title">
      <DeepBackground wave={false} />
      <h2 id="galerie-title" className={s.phrase}>
        <span>Chaque Bading</span>
        <span className={s.accent}>est fait main</span>
      </h2>
      {rangees.map((r, ri) => (
        <motion.ul key={ri} className={s.rangee} style={{ x: ri ? x2 : x1 }}>
          {r.map((v, i) => (
            <li key={v.id} className={s.item} style={{ rotate: `${((i * 7 + ri * 3) % 9) - 4}deg` }}>
              <button
                type="button"
                className={s.polaroid}
                onClick={() =>
                  ouvrir({
                    videoId: v.id,
                    titre: v.legende || "Bading",
                    stat: `${formatNombre(v.vues)} vues`,
                    date: v.date.toLocaleDateString("fr-FR"),
                  })
                }
                aria-label={`Lire : ${v.legende || "vidéo"} (${formatNombre(v.vues)} vues)`}
              >
                <Cover id={v.id} secours={i + ri} className={s.img} />
                <span className={s.legende}>
                  <strong>{formatNombre(v.vues)}</strong> vues
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      ))}
    </section>
  );
}
