"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { TransitionLink } from "@/components/fx/Transition";
import { Menu } from "./Menu";

/**
 * Nav calquée sur la référence : monogramme à gauche, nom au centre, menu à droite.
 * Elle passe en clair quand une section sombre (data-nav="dark") est sous elle.
 */
export function Nav() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const fermer = useCallback(() => setMenu(false), []);

  useEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>('[data-nav="dark"]');
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
        );
        setDark(visible.size > 0);
      },
      { rootMargin: "0px 0px -92% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        data-theme={dark ? "dark" : "light"}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-[18px] md:px-10 md:py-6"
      >
        <TransitionLink
          href="/"
          className="pointer-events-auto block w-max transition-transform duration-150 ease-[var(--ease-spring)] hover:-rotate-3"
          aria-label="Studio AFRO, accueil"
        >
          <span className="block -rotate-2 border-[3px] border-ink bg-ink px-1.5 py-1 shadow-[4px_4px_0_var(--color-star)]">
            <Image
              src="/afro/logo-sm.webp"
              alt="Studio AFRO"
              width={474}
              height={277}
              priority
              className="h-9 w-auto md:h-12"
            />
          </span>
        </TransitionLink>
        <p
          className={`rounded-full border px-4 py-2 font-display text-[20px] uppercase leading-none tracking-[0.04em] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 md:px-6 md:text-[26px] ${
            dark
              ? "border-white/20 bg-black/40 text-paper shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_10px_30px_-10px_rgb(255_31_117/0.5)]"
              : "border-ink/15 bg-paper/50 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.8)]"
          }`}
        >
          Studio <span className="text-star">Afro</span>
        </p>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
          className="btn-press pointer-events-auto grid size-11 place-content-center gap-1.5 justify-self-end bg-paper"
        >
          <i className="block h-[3px] w-5 bg-ink" />
          <i className="ml-[7px] block h-[3px] w-[13px] bg-ink" />
        </button>
      </header>
      <Menu ouvert={menu} fermer={fermer} />
    </>
  );
}
