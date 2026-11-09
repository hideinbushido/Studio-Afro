"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { moments } from "@/data/moments";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { HoloCard } from "./HoloCard";
import s from "./Moments.module.css";

const reperes = ["00:10", "00:20", "00:30", "00:40", "00:50", "01:00", "01:10", "01:20"];

/**
 * Moments clés — base : « Signature Moments » de jjettas.com.
 * La section est épinglée, le défilement vertical fait glisser les cartes
 * à l'horizontale. Mécanique de défilement inspirée de « Horizontal Scroll »
 * (21st.dev, ui layout), refaite avec motion.
 */
export function Moments() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const rulerX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);

  return (
    <section
      ref={section}
      className={s.section}
      data-nav="dark"
      style={{ height: reduce ? "auto" : `calc(100svh + ${distance}px)` }}
      aria-labelledby="moments-title"
    >
      <div className={s.sticky}>
        <DeepBackground />
        <motion.h2
          id="moments-title"
          className={s.giant}
          style={reduce ? undefined : { x: titleX }}
          aria-label="Moments clés"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
        >
          {"Moments clés".split("").map((c, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className={s.letter}
              variants={{
                hidden: { y: "110%", rotate: 8 },
                show: { y: "0%", rotate: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
              }}
            >
              {c === " " ? "\u00a0" : c}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          ref={track}
          className={s.track}
          style={reduce ? undefined : { x }}
        >
          {moments.map((m, i) => (
            <HoloCard key={m.id} m={m} index={i} />
          ))}
        </motion.div>

        <motion.div className={s.ruler} style={reduce ? undefined : { x: rulerX }} aria-hidden="true">
          {reperes.map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
