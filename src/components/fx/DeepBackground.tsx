"use client";

import { Dithering, MeshGradient } from "@paper-design/shaders-react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import s from "./DeepBackground.module.css";

/**
 * Fond profond des sections sombres.
 * 1. Dégradé maillé lent : noir violet → lie-de-vin → magenta profond.
 * 2. Vague tramée rose : mécanique du shader « Wave » (21st.dev, @designali-in),
 *    via @paper-design/shaders — la trame manga, mais animée.
 * 3. Vignette + grain pour creuser les bords.
 */
export function DeepBackground({ wave = true }: { wave?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Le fond ne s'anime que lorsqu'il est à l'écran (économise la batterie et le processeur).
  const visible = useInView(ref, { margin: "200px" });
  const speed = reduce || !visible ? 0 : 1;

  return (
    <div ref={ref} className={s.root} aria-hidden="true">
      <MeshGradient
        className={s.layer}
        colors={["#05020a", "#2b0519", "#6d0838", "#120527", "#05020a"]}
        distortion={0.85}
        swirl={0.35}
        grainOverlay={0.18}
        speed={0.22 * speed}
      />
      {wave && (
        <Dithering
          className={`${s.layer} ${s.wave}`}
          colorBack="#000000"
          colorFront="#ff1f75"
          shape="wave"
          type="4x4"
          size={3}
          speed={0.45 * speed}
          scale={1.3}
          offsetY={0.35}
        />
      )}
      <div className={s.glow} />
      <div className={s.vignette} />
    </div>
  );
}
