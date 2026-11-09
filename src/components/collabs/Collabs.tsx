"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { collabs, credits } from "@/data/collabs";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { Cover } from "@/components/video/Cover";
import { useVideo } from "@/components/video/VideoProvider";
import { Marquee } from "@/components/fx/Marquee";
import s from "./Collabs.module.css";

/**
 * Collabs (base : « Partnerships » de jjettas.com, A6).
 * Section épinglée : à chaque palier de scroll, la collab suivante prend la place,
 * avec sa vidéo en grand, une carte de verre et des points de progression.
 */
export function Collabs() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const ouvrir = useVideo();
  const [actif, setActif] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActif(Math.min(collabs.length - 1, Math.max(0, Math.floor(v * collabs.length))));
  });
  const c = collabs[actif];

  return (
    <section
      ref={ref}
      id="collabs"
      className={s.section}
      data-nav="dark"
      aria-labelledby="collabs-title"
      style={{ height: reduce ? "auto" : `${collabs.length * 70 + 100}vh` }}
    >
      <div className={s.sticky}>
        <DeepBackground />
        <h2 id="collabs-title" className={s.giant}>
          Collabs
        </h2>

        <div className={s.stage}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.button
              key={c.videoId}
              type="button"
              className={s.visuel}
              onClick={() => ouvrir({ videoId: c.videoId, titre: c.nom, stat: c.role })}
              aria-label={`Lire la vidéo avec ${c.nom}`}
              initial={{ y: 80, rotate: 6, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, rotate: -2, scale: 1, opacity: 1 }}
              exit={{ y: -60, rotate: -10, scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <Cover id={c.videoId} secours={actif} className={s.cover} eager />
              <span className={s.play} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
            </motion.button>
          </AnimatePresence>
        </div>

        <div className={s.dots} aria-hidden="true">
          {collabs.map((x, i) => (
            <span key={x.nom} className={i === actif ? s.dotOn : s.dot} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={c.nom}
            className={s.card}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className={s.role}>{c.role}</p>
            <h3 className={s.nom}>{c.nom}</h3>
            {c.handle && <p className={s.handle}>{c.handle}</p>}
            <p className={s.texte}>{c.texte}</p>
          </motion.article>
        </AnimatePresence>

        <button
          type="button"
          className={s.cta}
          onClick={() => ouvrir({ videoId: c.videoId, titre: c.nom, stat: c.role })}
        >
          Voir la vidéo
        </button>

        <div className={s.bandeau}>
          <Marquee items={credits} />
        </div>
      </div>
    </section>
  );
}
