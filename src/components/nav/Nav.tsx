import Image from "next/image";
import Link from "next/link";

/** Nav calquée sur la référence : monogramme à gauche, nom au centre, menu à droite. */
export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-[18px] md:px-10 md:py-6">
      <Link
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
      </Link>
      <p className="font-display text-[22px] uppercase leading-none tracking-[0.04em] md:text-[30px]">
        Studio <span className="text-star">Afro</span>
      </p>
      <button
        type="button"
        aria-label="Ouvrir le menu"
        className="btn-press pointer-events-auto grid size-11 place-content-center gap-1.5 justify-self-end bg-paper"
      >
        <i className="block h-[3px] w-5 bg-ink" />
        <i className="ml-[7px] block h-[3px] w-[13px] bg-ink" />
      </button>
    </header>
  );
}
