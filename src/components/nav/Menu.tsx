"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { TransitionLink } from "@/components/fx/Transition";
import s from "./Menu.module.css";

/**
 * Menu plein écran (base : jjettas.com, G4).
 * Liens géants en Anton ; celui qu'on survole s'allume en rose, les autres s'éteignent.
 * Les pages pas encore construites sont marquées « bientôt ».
 */
const liens: { label: string; href?: string; externe?: boolean }[] = [
  { label: "Accueil", href: "/" },
  { label: "Moments", href: "/#moments" },
  { label: "Studio" },
  { label: "Chiffres" },
  { label: "Vidéos", href: "https://www.tiktok.com/@afrothecreator", externe: true },
  { label: "Booking", href: "mailto:afrothecreatorstudio@gmail.com", externe: true },
];

const reseaux = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@afrothecreator",
    path: "M16.6 5.8a4.3 4.3 0 0 1-1-2.8h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.7 5.7 0 1 0 4.9 5.6V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/afrothecreator/",
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.3.1-5 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.3 1.9 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.1 5-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-3.3-1.9-5-5.2-5.2C14.7 3 14.4 3 12 3Zm0 1.6c2.4 0 2.6 0 3.6.1 2.4.1 3.5 1.2 3.6 3.6.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.2 3.5-3.6 3.6-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.5-1.2-3.6-3.6-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.4 1.2-3.5 3.6-3.6.9-.1 1.2-.1 3.6-.1Z",
  },
];

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
              {liens.map((l) => (
                <li key={l.label} className={s.item}>
                  <motion.span
                    className={s.inner}
                    variants={{
                      hidden: { y: "110%", rotate: 6 },
                      show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 150, damping: 17 } },
                    }}
                  >
                    {!l.href ? (
                      <span className={`${s.link} ${s.soon}`} aria-disabled="true">
                        {l.label}
                        <em>bientôt</em>
                      </span>
                    ) : l.externe ? (
                      <a className={s.link} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {l.label}
                      </a>
                    ) : (
                      <TransitionLink className={s.link} href={l.href} onClick={fermer}>
                        {l.label}
                      </TransitionLink>
                    )}
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
              {reseaux.map((r) => (
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
            <span>Abidjan · Doublage · Animation</span>
            <span>Site par Rico</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
