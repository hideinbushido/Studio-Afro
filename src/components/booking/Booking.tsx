"use client";

import { motion } from "motion/react";
import { MAIL } from "@/data/nav";
import { DeepBackground } from "@/components/fx/DeepBackground";
import s from "./Booking.module.css";

/** Booking (base : « Inquiries » de jjettas.com) : trois cartes de verre, chacune ouvre un e-mail prérempli. */
const CARTES = [
  {
    titre: "Doublage & voix",
    texte: "Doublage d'animés, de pubs, de séries ; voix de personnages, adaptations en ivoirien.",
    sujet: "Doublage / voix",
  },
  {
    titre: "Animation & montage",
    texte: "Animation 2D/3D façon Bading Ball Z, montage, Opening Concepts, trailers.",
    sujet: "Animation / montage",
  },
  {
    titre: "Collabs & événements",
    texte: "Collaborations avec des créateurs, marques, cérémonies et lives (Retro Awards, Zenkai…).",
    sujet: "Collab / événement",
  },
];

export function Booking() {
  return (
    <section className={s.root} data-nav="dark" aria-label="Demandes">
      <DeepBackground wave={false} />
      <ul className={s.cartes}>
        {CARTES.map((c, i) => (
          <motion.li
            key={c.titre}
            initial={{ y: 60, opacity: 0, rotate: i === 1 ? 0 : i ? 3 : -3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.1 }}
          >
            <a className={s.carte} href={`mailto:${MAIL}?subject=${encodeURIComponent(`[Studio AFRO] ${c.sujet}`)}`}>
              <span className={s.details}>Détails</span>
              <span className={s.titre}>{c.titre}</span>
              <span className={s.mail}>{MAIL}</span>
              <span className={s.texte}>{c.texte}</span>
              <span className={s.fleche} aria-hidden="true">
                Écrire →
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
      <p className={s.note}>
        Réponse sous quelques jours. Pour une collab TikTok, tu peux aussi écrire directement à{" "}
        <a href="https://www.tiktok.com/@afrothecreator" target="_blank" rel="noreferrer">
          @afrothecreator
        </a>
        .
      </p>
    </section>
  );
}
