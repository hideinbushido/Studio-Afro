"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Nombre qui monte de 0 à sa valeur quand il entre à l'écran (et à chaque changement de valeur). */
export function CountUp({ value, format = (n: number) => Math.round(n).toLocaleString("fr-FR"), duree = 1.6 }: { value: number; format?: (n: number) => string; duree?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const vu = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const depuis = useRef(0);

  useEffect(() => {
    if (!vu) return;
    if (reduce) {
      setN(value);
      return;
    }
    const ctrl = animate(depuis.current, value, {
      duration: duree,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        depuis.current = v;
        setN(v);
      },
    });
    return () => ctrl.stop();
  }, [vu, value, reduce, duree]);

  return <span ref={ref}>{format(n)}</span>;
}
