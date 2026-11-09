"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { TransitionLink } from "@/components/fx/Transition";
import { MAIL, PAGES, RESEAUX } from "@/data/nav";
import s from "./Menu.module.css";

/**
 * Menu plein écran (base : jjettas.com, G4).
 * Liens géants en Anton ; celui qu'on survole s'allume en rose, les autres s'éteignent.
 */
export function Menu({ ouvert, fermer }: { ouvert: boolean; fermer: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && fermer();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [ouvert, lenis, fermer]);

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className={s.root}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "circle(0% at calc(100% - 62px) 50px)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 62px) 50px)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 62px) 50px)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <DeepBackground />
          <button ref={closeRef} type="button" className={s.close} onClick={fermer} aria-label="Fermer le menu">
            ✕
          </button>

          <nav className={s.nav} aria-label="Navigation principale">
            <motion.ul
              className={s.list}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
            >
              {PAGES.map((l) => (
                <li key={l.label} className={s.item}>
                  <motion.span
                    className={s.inner}
                    variants={{
                      hidden: { y: "110%", rotate: 6 },
                      show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 150, damping: 17 } },
                    }}
                  >
                    <TransitionLink className={s.link} href={l.href} onClick={fermer}>
                      {l.label}
                    </TransitionLink>
                  </motion.span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              className={s.socials}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              {RESEAUX.map((r) => (
                <a key={r.label} href={r.href} target="_blank" rel="noreferrer" aria-label={r.label} className={s.social}>
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d={r.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </motion.div>
          </nav>

          <footer className={s.foot}>
            <span>© 2026 Studio AFRO</span>
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
            <span>Site par Rico</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
