"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Défilement fluide sur tout le site (désactivé si mouvements réduits). */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
