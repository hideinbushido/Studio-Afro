"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { collabs } from "@/data/collabs";
import { formatNombre, parSerie, total, videos, type Video } from "@/data/videos";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { Equipe } from "@/components/equipe/Equipe";
import { TransitionLink } from "@/components/fx/Transition";
import { Cover } from "@/components/video/Cover";
import { useVideo } from "@/components/video/VideoProvider";
import s from "./Studio.module.css";

/**
 * Studio (base : « Off-Field » de jjettas.com).
 * Quatre chapitres avec une pastille qui suit le scroll :
 * DOUBLAGE (téléphones + chiffres qui flottent), SÉRIES (liste + vidéo + texte),
 * ÉQUIPE, COLLABS.
 */
const CHAPITRES = [
  { id: "doublage", label: "Doublage" },
  { id: "series", label: "Séries" },
  { id: "equipe", label: "Équipe" },
  { id: "collabs-studio", label: "Collabs" },
];

function Mot({ children }: { children: string }) {
  return (
    <h2 className={s.mot} aria-label={children}>
      <span aria-hidden="true">{children}</span>
    </h2>
  );
}

function useLire() {
  const ouvrir = useVideo();
  return (v: Video, titre?: string) =>
    ouvrir({
      videoId: v.id,
      titre: titre ?? (v.legende || "Bading"),
      stat: `${formatNombre(v.vues)} vues`,
      date: v.date.toLocaleDateString("fr-FR"),
      ratio: v.paysage ? "16 / 9" : undefined,
    });
}

function Pastille() {
  const [actif, setActif] = useState(CHAPITRES[0].id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActif(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    CHAPITRES.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className={s.pastille} aria-label="Chapitres">
      {CHAPITRES.map((c) => (
        <TransitionLink key={c.id} href={`/studio#${c.id}`} className={actif === c.id ? s.chapOn : s.chap} aria-current={actif === c.id ? "true" : undefined}>
          {c.label}
          {actif === c.id && <motion.span layoutId="chap" className={s.chapFond} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
        </TransitionLink>
      ))}
    </nav>
  );
}

function Doublage() {
  const ref = useRef<HTMLElement>(null);
  const lire = useLire();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [260, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -240]);
  const top = [...videos].sort((a, b) => b.vues - a.vues).slice(0, 6);
  const cols = [
    [{ v: top[0] }, { stat: [formatNombre(total.abonnes), "Abonnés", "sur TikTok"] }, { v: top[3] }],
    [{ stat: [formatNombre(total.jaimeProfil), "J'aime", "sur le profil"] }, { v: top[1] }, { stat: ["3", "Vidéos à 1M", "et 42 à +100K"] }],
    [{ v: top[2] }, { stat: ["18,2M", "Vues", "sur 169 vidéos"] }, { v: top[4] }],
  ];
  return (
    <section ref={ref} id="doublage" className={s.chapitre}>
      <Mot>Doublage</Mot>
      <p className={s.intro}>
        Les voix, les répliques, le montage : Afro prend des scènes d&apos;animés et les rejoue à l&apos;ivoirienne.
        C&apos;est le Bading, et c&apos;est là que tout a commencé.
      </p>
      <div className={s.colonnes}>
        {cols.map((col, ci) => (
          <motion.div key={ci} className={s.colonne} style={{ y: [y1, y2, y3][ci] }}>
            {col.map((x, i) =>
              "v" in x && x.v ? (
                <button key={i} type="button" className={s.telephone} onClick={() => lire(x.v!)} aria-label={`Lire : ${x.v.legende}`}>
                  <span className={s.encoche} aria-hidden="true" />
                  <Cover id={x.v.id} secours={ci * 3 + i} className={s.ecran} />
                  <span className={s.telLegende}>{x.v.legende}</span>
                  <span className={s.telVues}>▶ {formatNombre(x.v.vues)}</span>
                </button>
              ) : (
                <div key={i} className={s.stat}>
                  <p className={s.statNombre}>{"stat" in x && x.stat?.[0]}</p>
                  <p className={s.statLabel}>{"stat" in x && x.stat?.[1]}</p>
                  <p className={s.statSous}>{"stat" in x && x.stat?.[2]}</p>
                </div>
              ),
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Series() {
  const series = parSerie().sort((a, b) => b.vues - a.vues);
  const [i, setI] = useState(0);
  const lire = useLire();
  const x = series[i];
  return (
    <section id="series" className={s.chapitre}>
      <Mot>Séries</Mot>
      <div className={s.series}>
        <ul className={s.liste}>
          {series.map((sr, k) => (
            <li key={sr.id}>
              <button type="button" className={k === i ? s.itemOn : s.item} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
                {sr.nom}
              </button>
            </li>
          ))}
        </ul>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.button
            key={x.id}
            type="button"
            className={s.lecteur}
            onClick={() => lire(x.top, x.nom)}
            aria-label={`Lire la meilleure vidéo de ${x.nom}`}
            initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.96, rotate: -3 }}
            transition={{ type: "spring", stiffness: 170, damping: 20 }}
          >
            <Cover id={x.top.id} secours={i} className={s.lecteurImg} eager />
            <span className={s.lecteurPlay} aria-hidden="true">
              ▶
            </span>
            <span className={s.lecteurNom}>{x.court}</span>
          </motion.button>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={x.id} className={s.texte} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <p className={s.desc}>{x.description}</p>
            <dl className={s.chiffres}>
              <div>
                <dt>Vidéos</dt>
                <dd>{x.videos}</dd>
              </div>
              <div>
                <dt>Vues</dt>
                <dd>{formatNombre(x.vues)}</dd>
              </div>
              <div>
                <dt>Meilleure</dt>
                <dd>{formatNombre(x.top.vues)}</dd>
              </div>
            </dl>
            <TransitionLink href="/videos" className={s.lien}>
              Toutes les vidéos →
            </TransitionLink>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CollabsGrille() {
  const ouvrir = useVideo();
  return (
    <section id="collabs-studio" className={s.chapitre}>
      <Mot>Collabs</Mot>
      <ul className={s.collabs}>
        {collabs.map((c, i) => (
          <motion.li
            key={c.nom}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: (i % 3) * 0.08 }}
          >
            <button type="button" className={s.collab} onClick={() => ouvrir({ videoId: c.videoId, titre: c.nom, stat: c.role })}>
              <span className={s.collabVisuel}>
                <Cover id={c.videoId} secours={i} className={s.collabImg} />
              </span>
              <span className={s.collabTexte}>
                <span className={s.collabRole}>{c.role}</span>
                <span className={s.collabNom}>{c.nom}</span>
                <span className={s.collabDesc}>{c.texte}</span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function Studio() {
  return (
    <div className={s.root} data-nav="dark">
      <div className={s.fond} aria-hidden="true">
        <DeepBackground />
      </div>
      <Pastille />
      <Doublage />
      <Series />
      <div id="equipe" className={s.equipe}>
        <Equipe lienStudio={false} />
      </div>
      <CollabsGrille />
    </div>
  );
}
