"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { equipe } from "@/data/collabs";
import { TransitionLink } from "@/components/fx/Transition";
import s from "./Equipe.module.css";

/**
 * L'équipe (base : la section claire « Foundation » de jjettas.com, A7).
 * Sur papier tramé : une case de manga par membre, inclinée, qui tombe en place.
 */
export function Equipe({ lienStudio = true }: { lienStudio?: boolean }) {
  return (
    <section className={s.section} aria-labelledby="equipe-title">
      <div className={s.head}>
        <p className={s.kicker}>✪ La team</p>
        <h2 id="equipe-title" className={s.titre}>
          Derrière
          <br />
          <span>chaque Bading</span>
        </h2>
      </div>

      <div className={s.grille}>
        {equipe.map((m, i) => (
          <motion.article
            key={m.nom}
            className={s.membre}
            data-i={i}
            initial={{ y: 120, rotate: i % 2 ? 8 : -8, opacity: 0 }}
            whileInView={{ y: 0, rotate: [-3, 2, -1][i % 3], opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.12 }}
          >
            <div className={s.case}>
              {m.image ? (
                <Image src={m.image} alt={`Dessin de ${m.nom}`} fill sizes="(max-width: 760px) 80vw, 30vw" className={s.img} />
              ) : (
                <div className={s.vide} aria-hidden="true">
                  <span>{m.nom.replace(/^Le /, "").charAt(0)}</span>
                  <em>Dessin à venir</em>
                </div>
              )}
            </div>
            <div className={s.texte}>
              <p className={s.role}>{m.role}</p>
              <h3 className={s.nom}>{m.nom}</h3>
              {m.handle &&
                (m.lien ? (
                  <a href={m.lien} target="_blank" rel="noreferrer" className={s.handle}>
                    {m.handle} ↗
                  </a>
                ) : (
                  <p className={s.handle}>{m.handle}</p>
                ))}
              <p className={s.desc}>{m.texte}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {lienStudio && (
        <div className={s.pied}>
          <p>Doublage, montage, dessin, animation : tout est fait main, à Abidjan.</p>
          <TransitionLink href="/studio" className={s.bouton}>
            Voir le studio
          </TransitionLink>
        </div>
      )}
    </section>
  );
}
