import Link from "next/link";

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-[18px] md:px-10 md:py-7">
      <Link
        href="/"
        className="pointer-events-auto font-display text-[34px] leading-none tracking-[0.02em] text-ink"
        aria-label="Studio AFRO, accueil"
      >
        ΔFR<span className="text-star">✪</span>
      </Link>
      <p className="hidden text-[11px] font-bold uppercase tracking-[0.32em] md:block">
        Studio AFRO — Abidjan
      </p>
      <button
        type="button"
        aria-label="Ouvrir le menu"
        className="btn-press pointer-events-auto grid size-11 place-content-center gap-1.5 bg-paper"
      >
        <i className="block h-[3px] w-5 bg-ink" />
        <i className="ml-[7px] block h-[3px] w-[13px] bg-ink" />
      </button>
    </header>
  );
}
