import Image from "next/image";
import s from "./Hero.module.css";

const timecodes = ["00:00", "00:10", "00:20", "00:30", "00:40"];

/**
 * Hero calqué sur l'accueil de jjettas.com : visuel géant au centre,
 * monogramme en filigrane, carte à gauche, signature à droite,
 * coupe diagonale vers la section sombre. Le nom est dans la nav.
 */
export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Studio AFRO — Afro, doublage, parodies Bading et animation
      </h1>

      <div className={s.speed} aria-hidden="true" />
      <div className={s.watermark} aria-hidden="true">
        ΔFR<span>✪</span>
      </div>

      {/* Visuel central : l'avatar d'Afro, le poing et l'étoile */}
      <figure className={s.perso}>
        <Image
          src="/afro/poing-1080.webp"
          alt="Dessin d'Afro en noir et blanc : un poing serré, une étoile rose sur l'épaule"
          width={1080}
          height={1080}
          priority
          sizes="(max-width: 760px) 96vw, 82vh"
          className={s.persoImg}
        />
      </figure>

      {/* Carte à gauche, comme la carte rookie de la référence */}
      <aside className={s.card}>
        <div className={s.cardFrame}>
          <div className={s.cardThumb}>
            <Image
              src="/afro/carte-dos.webp"
              alt=""
              fill
              sizes="160px"
              className={s.cardImg}
            />
            <span className={s.cardEp}>EP. 01</span>
            <span className={s.cardBig}>
              1,1M
              <br />
              en 5 jours
            </span>
          </div>
        </div>
        <p className={s.cardText}>
          Le premier Bading, novembre 2023. Cinq jours plus tard, la première
          vidéo à un million de vues.
        </p>
      </aside>

      {/* Signature à droite : le tampon du studio */}
      <div className={s.right}>
        <div className={s.stamp} aria-hidden="true">
          <span className={s.stampMark}>ΔFR✪</span>
          <span className={s.stampSub}>STUDIO · 2026</span>
        </div>
        <p className={s.rightText}>
          D&apos;Abidjan aux openings d&apos;animés. Doublage, parodies,
          animation : chaque Bading est écrit, joué et monté à la main.
        </p>
      </div>

      <div className={s.cut} aria-hidden="true" />
      <div className={s.ruler} aria-hidden="true">
        {timecodes.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <button type="button" className={s.sound} aria-label="Activer le son">
        <i />
        <i />
        <i />
        <i />
      </button>
    </section>
  );
}
