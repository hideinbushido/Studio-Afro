"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import type { Moment } from "@/data/moments";
import s from "./Moments.module.css";

/**
 * Carte à collectionner.
 * - Retournement : la carte arrive de dos (motif du logo) et se retourne
 *   quand elle entre à l'écran, comme une carte qu'on tire.
 * - Inclinaison au pointeur sur ressort + reflet holographique : mécanique de
 *   « Holographic Foil Card » (21st.dev, @daiwiikharihar, MIT), refaite.
 * - Un éclat traverse la carte de temps en temps.
 */
export function HoloCard({ m, index, onOpen }: { m: Moment; index: number; onOpen: (m: Moment) => void }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 260, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [12, -12]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-14, 14]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const numero = String(index + 1).padStart(2, "0");
  const cover = `/api/cover/${m.videoId}?fallback=${encodeURIComponent(m.art)}`;
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(m);
    }
  }

  return (
    <article className={s.slot} data-offset={index % 2 ? "bas" : "haut"}>
      <motion.div
        className={s.flipper}
        initial={reduce ? false : { rotateY: 180, y: 40, rotateZ: index % 2 ? 6 : -6 }}
        whileInView={{ rotateY: 0, y: 0, rotateZ: index % 2 ? 2 : -2 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.9 }}
      >
        {/* Face */}
        <motion.div
          className={s.card}
          style={{ rotateX: rx, rotateY: ry, "--gx": gx, "--gy": gy } as never}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onClick={() => onOpen(m)}
          onKeyDown={onKey}
          role="button"
          tabIndex={0}
          aria-label={`Lire la vidéo : ${m.titre}`}
        >
          <div className={s.cardInner}>
            <Image src={cover} alt="" fill unoptimized className={s.art} />
            <span className={s.play} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
            </span>
            <div className={s.topBand}>
              <span>N° {numero}</span>
              <span>{m.date}</span>
            </div>
            {m.grand && <span className={s.big}>{m.grand}</span>}
            <span
              className={s.shine}
              style={{ "--delay": `${index * 0.7}s` } as CSSProperties}
              aria-hidden="true"
            />
          </div>
          <div className={s.foil} aria-hidden="true" />
        </motion.div>

        {/* Dos : motif du logo */}
        <div className={s.back} aria-hidden="true">
          <span className={s.backMark}>ΔFR✪</span>
        </div>
      </motion.div>

      <div className={s.legend}>
        <h3 className={s.title}>{m.titre}</h3>
        <p className={s.meta}>{m.stat}</p>
      </div>
    </article>
  );
}
