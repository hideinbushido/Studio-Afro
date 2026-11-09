"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MAIL, PAGES, RESEAUX } from "@/data/nav";
import { credits } from "@/data/collabs";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { Marquee } from "@/components/fx/Marquee";
import { TransitionLink } from "@/components/fx/Transition";
import s from "./Footer.module.css";

/**
 * Pied de page (base : jjettas.com, G6).
 * Panneau de verre (logo, pages, réseaux, mentions), grande phrase + bouton,
 * autoportrait détouré à droite, bandeau des collabs en bas.
 */
export function Footer() {
  return (
    <footer className={s.root} data-nav="dark">
      <DeepBackground />

      <div className={s.scene}>
        <motion.div
          className={s.centre}
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        >
          <span className={s.etoile} aria-hidden="true">
            ✪
          </span>
          <p className={s.phrase}>
            On ne s&apos;arrête pas
            <br />
            au générique
          </p>
          <TransitionLink href="/booking" className={s.cta}>
            Travailler avec Afro
          </TransitionLink>
        </motion.div>

        <motion.div
          className={s.portrait}
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
          aria-hidden="true"
        >
          <Image src="/afro/portrait-detoure.webp" alt="" width={940} height={1080} sizes="34vw" />
        </motion.div>

        <nav className={s.panneau} aria-label="Pied de page">
          <span className={s.logo}>
            <Image src="/afro/logo-sm.webp" alt="Studio AFRO" width={474} height={277} />
          </span>
          <ul className={s.liens}>
            {PAGES.map((p) => (
              <li key={p.href}>
                <TransitionLink href={p.href}>{p.label}</TransitionLink>
              </li>
            ))}
          </ul>
          <a className={s.mail} href={`mailto:${MAIL}`}>
            {MAIL}
          </a>
          <div className={s.reseaux}>
            {RESEAUX.map((r) => (
              <a key={r.label} href={r.href} target="_blank" rel="noreferrer" aria-label={r.label}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d={r.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
          <div className={s.mentions}>
            <span>© 2026 Studio AFRO</span>
            <TransitionLink href="/mentions">Mentions</TransitionLink>
            <span>Site par Rico</span>
          </div>
        </nav>
      </div>

      <div className={s.bandeau}>
        <Marquee items={credits} sens="droite" />
      </div>
    </footer>
  );
}
