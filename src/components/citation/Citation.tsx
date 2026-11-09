"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { DeepBackground } from "@/components/fx/DeepBackground";
import s from "./Citation.module.css";

/**
 * Citation (base : jjettas.com, A5).
 * La phrase d'Afro, en points de trame, se remplit mot par mot au scroll ;
 * puis ses dessins tombent dessus comme des cases de manga.
 */
const PHRASE = "I cannot die because this my universe";
const LIGNES = [["I", "cannot", "die"], ["because", "this"], ["my", "universe"]];

// Positions finales : les cases tombent autour de la phrase et ne la cachent qu'en partie.
const CASES = [
  { src: "/afro/cartes/06-etoile.webp", x: "-36vw", y: "-14vh", r: -9 },
  { src: "/afro/cartes/03-joestar.webp", x: "35vw", y: "-16vh", r: 7 },
  { src: "/afro/cartes/01-debut.webp", x: "-30vw", y: "22vh", r: -4 },
  { src: "/afro/cartes/08-anime.webp", x: "31vw", y: "21vh", r: 11 },
  { src: "/afro/cartes/04-record.webp", x: "0vw", y: "34vh", r: -3 },
];

function Mot({ mot, i, n, p }: { mot: string; i: number; n: number; p: MotionValue<number> }) {
  const debut = 0.05 + (i / n) * 0.45;
  const fin = debut + 0.45 / n + 0.04;
  const fill = useTransform(p, [debut, fin], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const y = useTransform(p, [debut, fin], [14, 0]);
  return (
    <span className={s.mot}>
      <span className={s.dots} aria-hidden="true">
        {mot}
      </span>
      <motion.span className={s.plein} style={{ clipPath: fill, y }} aria-hidden="true">
        {mot}
      </motion.span>
    </span>
  );
}

function Case({ c, i, p }: { c: (typeof CASES)[number]; i: number; p: MotionValue<number> }) {
  const debut = 0.58 + i * 0.07;
  const y = useTransform(p, [debut, debut + 0.1], ["-130vh", c.y]);
  const rotate = useTransform(p, [debut, debut + 0.1], [c.r * 3, c.r]);
  return (
    <motion.figure className={s.case} style={{ x: c.x, y, rotate, zIndex: 3 + i }}>
      <Image src={c.src} alt="" width={500} height={700} sizes="(max-width: 760px) 44vw, 220px" />
    </motion.figure>
  );
}

export function Citation() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mots = LIGNES.flat();
  let k = 0;

  return (
    <section ref={ref} className={s.section} data-nav="dark" aria-label="Citation d'Afro" style={{ height: reduce ? "auto" : "320vh" }}>
      <div className={s.sticky}>
        <DeepBackground wave={false} />
        <span className={s.guillemets} aria-hidden="true">
          “ ”
        </span>
        <blockquote className={s.quote}>
          <p className="sr-only">{PHRASE}</p>
          {LIGNES.map((ligne, li) => (
            <span key={li} className={s.ligne}>
              {ligne.map((mot) => {
                const i = k++;
                return <Mot key={i} mot={mot} i={i} n={mots.length} p={scrollYProgress} />;
              })}
            </span>
          ))}
          <footer className={s.auteur}>— Afro · @afrothecreator</footer>
        </blockquote>
        {!reduce && (
          <div className={s.pile} aria-hidden="true">
            {CASES.map((c, i) => (
              <Case key={c.src} c={c} i={i} p={scrollYProgress} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
