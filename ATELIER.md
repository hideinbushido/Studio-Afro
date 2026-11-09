# Atelier — Studio AFRO

Mode : nouveau site
Direction : Manga sur mesure (crème tramé → encre tramée, rose ✪) — voir DESIGN.md
Polices : Anton (titres) + JetBrains Mono (textes, labels) — OFL, via @fontsource
Stack : Next.js 15 (App Router) + Tailwind 4
Dépôt : github.com/hideinbushido/Studio-Afro (main)
Vercel : projet « studio-afro » (équipe hideinbushidos-projects), mise en ligne à chaque push sur main

## Pages et sections
| Page | Section | Source(s) | État |
|---|---|---|---|
| Accueil | Nav + chargement + menu | jjettas.com (pastille, % de chargement, menu plein écran, volet diagonal) | fait (2026-11-09), vérifié en ligne |
| Accueil | Hero | jjettas.com — https://jjettas.com (structure : portrait détouré, filigrane géant, carte à gauche, signature à droite) | validée (2026-11-09) |
| Accueil | Moments clés | jjettas.com — Signature Moments (structure) · 21st.dev Holographic Foil Card @daiwiikharihar (inclinaison + reflet) · 21st.dev Horizontal Scroll ui layout (section épinglée) · 21st.dev Wave @designali-in (fond tramé animé, via @paper-design/shaders) | validée (2026-11-09), couvertures TikTok + lecteur |
| Accueil | Citation | jjettas.com — citation pointillée + polaroïds | fait |
| Accueil | Cases qui tombent | jjettas.com — pile de polaroïds | fait (dans la citation) |
| Accueil | Collabs | jjettas.com — Partnerships | fait |
| Accueil | Équipe | jjettas.com — Foundation | fait |
| Accueil | Galerie | jjettas.com — rangée de polaroïds | fait |
| Tout | Pied de page | jjettas.com — pied de page | fait |
| Studio | Chapitres DOUBLAGE / SÉRIES / ÉQUIPE / COLLABS | https://jjettas.com/off-field | fait |
| Chiffres | Compteurs, onglets par année, tableau, records | https://jjettas.com/on-field | fait |
| Vidéos | 169 vidéos, filtres, lecteur | https://jjettas.com/journal | fait |
| Mentions | Mentions | jjettas.com/privacy | fait |
| Booking | 3 cartes de verre | https://jjettas.com/inquiries | fait |

## Assets
| Asset | Origine | Utilisé où | État |
|---|---|---|---|
| Logo STUDIO ΔFR★™ (papier découpé) | Afro, détouré par nous (public/afro/logo*.{png,webp}) | Nav | intégré |
| Avatar poing + étoile | Afro (public/afro/poing-1080.webp) | Visuel central du hero (choix de Rico) | intégré |
| Autoportrait de dos (fond violet) | Afro (public/afro/carte-dos.webp) | Carte à gauche du hero | intégré |
| Autoportrait de dos détouré | Afro, détouré par nous (public/afro/portrait-detoure.*) | en réserve (Équipe / Studio) | prêt |
| Illustration Osiris / Stand user | Afro (public/afro/osiris.webp) | Section « Stand » à proposer | en réserve |
| Fiche de Stand (radar) | Afro, photo d'écran | Section « Stand » à proposer | à refaire en code |
| Citation « I can't fail because this sh*t is my universe » | Afro (dans son illustration) | Citation | à valider |
| Originaux | assets-src/afro/ | — | les versions « AI+ » (filigrane) ne sont pas utilisées |
| Illustrations des cartes | Tidiane | Moments clés | à venir |

## Décisions
- 2026-11-09 : 100 % manga, aucune photo d'Afro.
- 2026-11-09 : structure 3 pages validée (Accueil, Studio, Contact).
- 2026-11-09 : la pause déc. 2024 – janv. 2026 n'apparaît pas pour l'instant ; à ajuster avec Afro.
- 2026-11-09 : pas encore de compte TikTok du studio.
- 2026-11-09 : police A (Anton + JetBrains Mono) choisie.
- 2026-11-09 : hero calqué au plus près de l'accueil jjettas.com (nom au centre de la nav, visuel géant central, carte à gauche, signature à droite, pas de gros titre) — demande de Rico.
- 2026-11-09 : visuel central = le poing à l'étoile (choix de Rico), en cercle imprimé sur le papier.
- 2026-11-09 : 21st.dev consulté dans le navigateur (le connecteur 21st n'est pas branché ici) ; mécanique reprise, rendu refait aux tokens.

- 2026-11-09 : retour de Rico — « trop pastel », il veut de la profondeur, des effets, des dégradés, du verre, des animations, rien qui fasse « IA ». Sections sombres refaites : fond animé (dégradé maillé + vague tramée), cartes avec vrais dessins d'Afro, verre, retournement, éclat, défilement fluide (Lenis).
- 2026-11-09 : la parole de Rico prime sur les garde-fous du CLAUDE.md (dégradés, arrondis, verre autorisés sur ce site).

- 2026-11-09 : cartes = couvertures TikTok, récupérées par le serveur sur la page d'intégration officielle (oEmbed ne donne plus la miniature), cache 12 h, illustration d'Afro en secours. Clic = lecteur TikTok officiel dans une fenêtre de verre (vérifié en ligne).

- 2026-11-09 : les 20 moments de TIMELINE sont des cartes (demande de Rico).
- 2026-11-09 : bloquer le défilement de la page (overflow / lenis.stop) pendant le chargement gelait le navigateur de test ; le chargement couvre l'écran, on ne bloque rien.

- 2026-11-09 : Rico demande de tout construire d'un coup, retouches ensuite. Citation : « I cannot die because this my universe » (phrase fournie par Rico).
- 2026-11-09 : 169 vidéos relevées dans src/data/videos.json (vues, j'aime, série) ; elles alimentent Vidéos, Chiffres, la galerie et les collabs.

## Prochaine étape
Retours de Rico sur l'ensemble ; photos de Le Zumaki et Tidiane ; vidéo dans l'étoile (A2) et son (G5).