# Atelier — Studio AFRO

Mode : nouveau site
Direction : Manga sur mesure (crème tramé → encre tramée, rose ✪) — voir DESIGN.md
Polices : Anton (titres) + JetBrains Mono (textes, labels) — OFL, via @fontsource
Stack : Next.js 15 (App Router) + Tailwind 4, déploiement Vercel

## Pages et sections
| Page | Section | Source(s) | État |
|---|---|---|---|
| Accueil | Nav + chargement | jjettas.com (pastille, % de chargement) | à faire |
| Accueil | Hero | jjettas.com — https://jjettas.com (structure : portrait détouré, filigrane géant, carte à gauche, signature à droite) | validée (2026-11-09) |
| Accueil | Moments clés | jjettas.com — Signature Moments (structure) · 21st.dev Holographic Foil Card @daiwiikharihar (inclinaison + reflet) · 21st.dev Horizontal Scroll ui layout (section épinglée) · 21st.dev Wave @designali-in (fond tramé animé, via @paper-design/shaders) | v2 envoyée, en attente |
| Accueil | Citation | jjettas.com — citation en lettres pointillées | à faire |
| Accueil | Cases qui tombent | jjettas.com — pile de polaroïds | à faire |
| Accueil | Collabs | jjettas.com — Partnerships | à faire |
| Accueil | Galerie | jjettas.com — défilement continu | à faire |
| Studio | Chapitres DOUBLAGE / SÉRIES / ÉQUIPE / COLLABS | https://jjettas.com/off-field | à faire |
| Contact | Booking | — | à faire |

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

## Prochaine étape
Fiche « Moments clés » avec les candidats 21st.dev.
