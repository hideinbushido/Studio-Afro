"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { DeepBackground } from "@/components/fx/DeepBackground";
import s from "./PageHero.module.css";

/** En-tête des pages internes : mot géant tramé qui monte lettre par lettre, phrase, intro. */
export function PageHero({ titre, kicker, phrase, children }: { titre: string; kicker: string; phrase?: string; children?: ReactNode }) {
  return (
    <header className={s.root} data-nav="dark">
      <DeepBackground />
      <p className={s.kicker}>✪ {kicker}</p>
      <motion.h1
        className={s.titre}
        aria-label={titre}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
      >
        {titre.split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className={s.lettre}
            variants={{
              hidden: { y: "110%", rotate: 10 },
              show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 130, damping: 15 } },
            }}
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </motion.h1>
      {phrase && (
        <motion.p
          className={s.phrase}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 90, damping: 16 }}
        >
          {phrase}
        </motion.p>
      )}
      {children && (
        <motion.div className={s.intro} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {children}
        </motion.div>
      )}
      <div className={s.cut} aria-hidden="true" />
    </header>
  );
}
