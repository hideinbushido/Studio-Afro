"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import s from "./Transition.module.css";

/**
 * Transition entre pages (base : jjettas.com, G2).
 * Un volet en diagonale (la même diagonale que le bas du hero) couvre l'écran,
 * la page change dessous, puis le volet repart vers le haut.
 * Pour une ancre de la page courante : pas de volet, défilement fluide.
 */
type Ctx = { aller: (href: string) => void };
const TransitionContext = createContext<Ctx>({ aller: () => {} });

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [couvert, setCouvert] = useState(false);
  const [cible, setCible] = useState<string | null>(null);

  const aller = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === pathname) {
        // force : le menu met le défilement en pause, on défile quand même
        const opts = { duration: 1.4, force: true };
        setTimeout(() => {
          lenis?.start();
          if (url.hash) lenis?.scrollTo(url.hash, opts);
          else lenis?.scrollTo(0, opts);
        }, 120);
        return;
      }
      if (reduce) {
        router.push(href);
        return;
      }
      setCible(href);
      setCouvert(true);
    },
    [pathname, lenis, reduce, router],
  );

  // Une fois la nouvelle page affichée, on découvre l'écran.
  useEffect(() => {
    if (couvert && cible && new URL(cible, window.location.href).pathname === pathname) {
      window.scrollTo(0, 0);
      const t = setTimeout(() => {
        setCouvert(false);
        setCible(null);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [pathname, couvert, cible]);

  return (
    <TransitionContext.Provider value={{ aller }}>
      {children}
      <AnimatePresence>
        {couvert && (
          <motion.div
            key="volet"
            className={s.volet}
            aria-hidden="true"
            initial={{ clipPath: "polygon(0 100%, 100% 78%, 100% 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 22%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (cible) router.push(cible);
            }}
          >
            <span className={s.mark}>ΔFR✪</span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}

/** Lien qui passe par la transition. */
export function TransitionLink({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof Link> & { href: string }) {
  const { aller } = useTransition();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        aller(href);
      }}
    />
  );
}
