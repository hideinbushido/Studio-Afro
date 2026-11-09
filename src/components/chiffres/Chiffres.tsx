"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ANNEES, formatNombre, parAnnee, parSerie, total, videos, type Video } from "@/data/videos";
import { CountUp } from "@/components/fx/CountUp";
import { DeepBackground } from "@/components/fx/DeepBackground";
import { Cover } from "@/components/video/Cover";
import { useVideo } from "@/components/video/VideoProvider";
import s from "./Chiffres.module.css";

/**
 * Chiffres (base : « On-Field » de jjettas.com).
 * Compteurs qui montent, onglets par année, chiffre géant, tableau par série,
 * records avec onglets.
 */
type Periode = "tout" | (typeof ANNEES)[number];

const parVues = [...videos].sort((a, b) => b.vues - a.vues);
const RECORDS: { onglet: string; titre: string; detail: string; v: Video }[] = [
  { onglet: "Le plus vu", titre: "1,2M vues", detail: "Naruto, avril 2024. Le record de la chaîne.", v: parVues[0] },
  {
    onglet: "Le plus aimé",
    titre: "182,8K j'aime",
    detail: "DBZ, février 2026, sur un son de Yannick Bonano.",
    v: [...videos].sort((a, b) => b.jaime - a.jaime)[0],
  },
  {
    onglet: "Le plus rapide",
    titre: "1M en 5 jours",
    detail: "Novembre 2023 : cinq jours après sa toute première vidéo.",
    v: videos.find((v) => v.id === "7300135846320033056")!,
  },
  {
    onglet: "Le plus commenté",
    titre: `${formatNombre([...videos].sort((a, b) => b.commentaires - a.commentaires)[0].commentaires)} commentaires`,
    detail: "La vidéo qui a fait le plus parler.",
    v: [...videos].sort((a, b) => b.commentaires - a.commentaires)[0],
  },
  {
    onglet: "Le premier",
    titre: "1er Bading animé",
    detail: "Bading Ball Z, Saga Saiyen, juillet 2026 : le passage du doublage à l'animation.",
    v: videos.find((v) => v.id === "7664310323771477280")!,
  },
];

export function Chiffres() {
  const [periode, setPeriode] = useState<Periode>("tout");
  const [record, setRecord] = useState(0);
  const ouvrir = useVideo();
  const st = parAnnee(periode);
  const series = parSerie().sort((a, b) => b.vues - a.vues);
  const r = RECORDS[record];
  const lire = (v: Video, titre?: string) =>
    ouvrir({ videoId: v.id, titre: titre ?? (v.legende || "Bading"), stat: `${formatNombre(v.vues)} vues`, date: v.date.toLocaleDateString("fr-FR") });

  return (
    <div className={s.root} data-nav="dark">
      <DeepBackground wave={false} />

      {/* Compteurs + onglets par année */}
      <section className={s.bloc} aria-labelledby="compteurs">
        <h2 id="compteurs" className="sr-only">
          Les chiffres par année
        </h2>
        <div className={s.onglets} role="tablist" aria-label="Période">
          {(["tout", ...ANNEES] as Periode[]).map((p) => (
            <button key={p} role="tab" aria-selected={periode === p} className={periode === p ? s.ongletOn : s.onglet} onClick={() => setPeriode(p)}>
              {p === "tout" ? "Depuis 2023" : p}
              {periode === p && <motion.span layoutId="onglet" className={s.ongletFond} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            </button>
          ))}
        </div>

        <div className={s.compteurs}>
          {[
            { l: "Vidéos", v: st.videos },
            { l: "J'aime", v: st.jaime, f: formatNombre },
            { l: "Commentaires", v: st.commentaires, f: formatNombre },
            { l: "Vidéos à +100K", v: st.cent },
          ].map((c) => (
            <div key={c.l} className={s.compteur}>
              <p className={s.label}>{c.l}</p>
              <p className={s.valeur}>
                <CountUp value={c.v} format={c.f} />
              </p>
            </div>
          ))}
        </div>

        <div className={s.geant}>
          <p className={s.geantNombre}>
            <CountUp value={st.vues} duree={2.2} />
          </p>
          <p className={s.geantLabel}>
            vues {periode === "tout" ? "au total" : `en ${periode}`} · {st.millions} vidéo{st.millions > 1 ? "s" : ""} à plus d&apos;un million
          </p>
        </div>

        <div className={s.profil}>
          <span>
            <strong>{formatNombre(total.abonnes)}</strong> abonnés
          </span>
          <span>
            <strong>{formatNombre(total.jaimeProfil)}</strong> j&apos;aime sur le profil
          </span>
          <span>
            Depuis le <strong>06.11.2023</strong>
          </span>
        </div>
      </section>

      {/* Tableau par série */}
      <section className={s.bloc} aria-labelledby="series-titre">
        <h2 id="series-titre" className={s.titreBloc}>
          Série par série
        </h2>
        <div className={s.tableau} role="table" aria-label="Statistiques par série">
          <div className={s.ligneTete} role="row">
            <span role="columnheader">Série</span>
            <span role="columnheader">Vidéos</span>
            <span role="columnheader">Vues</span>
            <span role="columnheader">Meilleure vidéo</span>
          </div>
          {series.map((x) => (
            <div key={x.id} className={s.ligne} role="row">
              <span role="cell" className={s.serie}>
                {x.nom}
              </span>
              <span role="cell">{x.videos}</span>
              <span role="cell" className={s.vues}>
                {formatNombre(x.vues)}
              </span>
              <span role="cell">
                <button type="button" className={s.lire} onClick={() => lire(x.top)}>
                  ▶ {formatNombre(x.top.vues)} vues
                </button>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Records */}
      <section className={s.bloc} aria-labelledby="records-titre">
        <h2 id="records-titre" className={s.titreBloc}>
          Les records
        </h2>
        <div className={s.onglets} role="tablist" aria-label="Records">
          {RECORDS.map((x, i) => (
            <button key={x.onglet} role="tab" aria-selected={record === i} className={record === i ? s.ongletOn : s.onglet} onClick={() => setRecord(i)}>
              {x.onglet}
              {record === i && <motion.span layoutId="onglet-record" className={s.ongletFond} transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            key={r.onglet}
            className={s.record}
            initial={{ y: 30, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <button type="button" className={s.recordVisuel} onClick={() => lire(r.v, r.onglet)} aria-label={`Lire la vidéo : ${r.onglet}`}>
              <Cover id={r.v.id} secours={record} className={s.recordImg} />
              <span className={s.play} aria-hidden="true">
                ▶
              </span>
            </button>
            <div>
              <p className={s.label}>{r.onglet}</p>
              <p className={s.recordTitre}>{r.titre}</p>
              <p className={s.recordDetail}>{r.detail}</p>
              <p className={s.recordStats}>
                {formatNombre(r.v.vues)} vues · {formatNombre(r.v.jaime)} j&apos;aime · {r.v.date.toLocaleDateString("fr-FR")}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>
    </div>
  );
}
