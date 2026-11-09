# Design — Studio AFRO

## Couleurs
| Token | Valeur | Rôle |
|---|---|---|
| `paper` | #f3eee3 | Papier manga, fond du hero |
| `paper-2` | #e7e0d1 | Papier ombré, trames claires |
| `ink` | #0e0d0c | Encre, fond du reste du site |
| `ink-2` | #1b1917 | Encre relevée (cases, cartes) |
| `tone` | #8a8378 | Gris de trame, textes secondaires sur papier |
| `star` | #e8336f | Rose de l'étoile ✪ : seule couleur forte |
| `star-ink` | #b8174f | Rose foncé, survol et texte rose sur papier |

## Typo (option A, validée)
- Titres : **Anton** (OFL) — condensé, capitales, interlignage 0.86.
- Labels, chiffres, textes : **JetBrains Mono** (OFL) — 11 px, capitales, tracking 0.3em pour les labels.
- Échelle : héros 140 px / chapitres 18vw / labels 11 px. Contraste extrême voulu.

## Textures
- Trame manga : `radial-gradient(ink 1.1px, transparent 1.3px)` sur 7 px, opacité 0.16, masquée au centre.
- Lignes de vitesse : `repeating-conic-gradient` à 7 % pour le hero.
- Coupe diagonale papier → encre entre le hero et la suite.

## Formes
- Bordures : 3 px d'encre, jamais d'ombre floue.
- Ombre « pressée » : `4px 4px 0` encre ou rose, qui disparaît au clic (le bouton descend de 2 px).
- Rayons : 0. Seuls les tampons et l'avatar sont ronds.
- Cases inclinées entre -4° et 4°.

## Motion
- États instantanés ou ressorts courts, pas de fondus.
- Courbe par défaut : `cubic-bezier(.2,.9,.1,1)` sur 420 ms pour les entrées.
- `prefers-reduced-motion` : tout devient statique.
