"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import type { Moment } from "@/data/moments";
import s from "./VideoModal.module.css";

/** Fenêtre de verre avec le lecteur officiel TikTok. */
export function VideoModal({ moment, onClose }: { moment: Moment | null; onClose: () => void }) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!moment) return;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [moment, lenis, onClose]);

  return (
    <AnimatePresence>
      {moment?.videoId && (
        <motion.div
          className={s.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`Vidéo : ${moment.titre}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={s.panel}
            initial={{ scale: 0.86, y: 40, rotateX: 12 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={s.head}>
              <div>
                <p className={s.kicker}>
                  {moment.date} · {moment.stat}
                </p>
                <h3 className={s.title}>{moment.titre}</h3>
              </div>
              <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label="Fermer la vidéo">
                ✕
              </button>
            </header>
            <div className={s.player} style={{ aspectRatio: moment.ratio ?? "4 / 3" }}>
              <iframe
                src={`https://www.tiktok.com/player/v1/${moment.videoId}?autoplay=1&music_info=1&description=1&rel=0`}
                title={moment.titre}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <a
              className={s.link}
              href={`https://www.tiktok.com/@afrothecreator/video/${moment.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              Voir sur TikTok ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
