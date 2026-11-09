"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import s from "./Loader.module.css";

/**
 * Écran de chargement (base : jjettas.com, G1).
 * Le logo STUDIO ΔFR★ se remplit d'encre rose de bas en haut pendant que le
 * pourcentage monte ; à 100 %, un volet en diagonale découvre le site.
 * Une seule fois par visite (sessionStorage).
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let dejaVu = false;
    try {
      dejaVu = sessionStorage.getItem("afro-loader") === "1";
    } catch {}
    if (dejaVu || reduce) {
      setVisible(false);
      return;
    }

    const debut = performance.now();
    const minimum = 1500;
    let pret = false;
    const marquerPret = () => (pret = true);
    // Prêt quand les polices et la page sont chargées, ou au plus tard après 3 s
    // (les couvertures TikTok, chargées plus bas, ne doivent jamais bloquer l'entrée).
    Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((r) => (document.readyState === "complete" ? r(null) : window.addEventListener("load", r, { once: true }))),
      ]),
      new Promise((r) => setTimeout(r, 3000)),
    ]).then(marquerPret);

    let raf = 0;
    const tick = (t: number) => {
      const temps = Math.min(1, (t - debut) / minimum);
      // avance jusqu'à 90 % tant que la page charge, puis termine
      const cible = pret ? temps : Math.min(temps, 0.9);
      setPct((p) => Math.max(p, Math.round(cible * 100)));
      if (cible >= 1) {
        try {
          sessionStorage.setItem("afro-loader", "1");
        } catch {}
        setTimeout(() => setVisible(false), 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={s.root}
          role="status"
          aria-live="polite"
          aria-label={`Chargement ${pct} %`}
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 22%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={s.glow} aria-hidden="true" />
          <div className={s.logo} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/afro/logo-sm.webp" alt="" className={s.base} />
            <div className={s.fill} style={{ clipPath: `inset(${100 - pct}% 0 0 0)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/afro/logo-sm.webp" alt="" />
            </div>
          </div>
          <p className={s.pct}>{String(pct).padStart(2, "0")} %</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
