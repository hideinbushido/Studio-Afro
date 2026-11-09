import s from "./Marquee.module.css";

/** Bandeau qui défile en continu (logos / noms), comme le bandeau de marques de la référence. */
export function Marquee({ items, sens = "gauche", taille = "normal" }: { items: string[]; sens?: "gauche" | "droite"; taille?: "normal" | "grand" }) {
  const ligne = (cache: boolean) => (
    <ul className={s.ligne} aria-hidden={cache || undefined}>
      {items.map((t, i) => (
        <li key={i}>
          <span>{t}</span>
          <span className={s.sep} aria-hidden="true">
            ✪
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`${s.root} ${taille === "grand" ? s.grand : ""}`} data-sens={sens}>
      <div className={s.piste}>
        {ligne(false)}
        {ligne(true)}
      </div>
    </div>
  );
}
