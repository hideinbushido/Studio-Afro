import Image from "next/image";
import s from "./Hero.module.css";

const timecodes = ["00:00", "00:10", "00:20", "00:30", "00:40"];

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={s.speed} aria-hidden="true" />
      <div className={s.watermark} aria-hidden="true">
        ΔFR<span>✪</span>
      </div>

      {/* Autoportrait d'Afro, détouré */}
      <figure className={s.perso}>
        <Image
          src="/afro/portrait-detoure.webp"
          alt="Autoportrait dessiné d'Afro, de dos, la main sur la nuque, l'étoile rose sur l'épaule"
          width={940}
          height={1080}
          priority
          sizes="(max-width: 760px) 90vw, 46vw"
          className={s.persoImg}
        />
      </figure>

      <aside className={s.card}>
        <div className={s.cardFrame}>
          <div className={s.cardThumb}>
            <Image
              src="/afro/poing.webp"
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
          06.11.2023 — le premier Bading. Cinq jours plus tard, la première
          vidéo à un million.
        </p>
      </aside>

      <div className={s.right}>
        <div className={s.stamp} aria-hidden="true">
          <span className={s.stampMark}>ΔFR✪</span>
          <span className={s.stampSub}>STUDIO · 2026</span>
        </div>
        <p className={s.rightText}>
          Doublage, parodies, animation. Chaque Bading est écrit, joué et monté
          à la main.
        </p>
      </div>

      <p className={s.kicker}>Doublage · Animation · Bading</p>
      <h1 id="hero-title" className={s.title}>
        <span className={s.titleLine}>
          <span>Studio</span>
        </span>
        <span className={`${s.titleLine} ${s.titleInk}`}>
          <span>Afro</span>
        </span>
      </h1>

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
