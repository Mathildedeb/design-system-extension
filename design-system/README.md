# Design System — extension

Source : [Figma — 5-design_system.extension](https://www.figma.com/design/OtfS8D18HLOL80GSZams3Z/5-design_system.extension)
(pages Foundation, Atoms, Molécules, Organism, Template).

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `design-system/tokens.json` | **Source de vérité** des tokens (format W3C DTCG), extraite des variables et styles Figma |
| `design-system/build-tokens.mjs` | Génère les fichiers ci-dessous à partir du JSON |
| `src/design-system/tokens.css` | Variables CSS (`--color-primary-purple-700`, `--usage-text-default`…) — généré |
| `src/design-system/tokens.ts` | Map TypeScript `tokens['usage.text.default']` → `var(...)` — généré |

Après toute modification de `tokens.json` :

```bash
npm run tokens
```

## Foundation

### Couleurs (collection Figma « Master »)

- **Primary / purple** : 50 → 900 (`#9900FF` = 700, couleur de marque)
- **Secondary / orange** : 50 → 800 (`#FF6200` = 700)
- **Neutral** : 0 (blanc 92 %), 100 → 900
- **Semantic** : success / error × default, hover, disabled
- **Opacity** : black 57 %, purple 50 %, white 16 %

### Couleurs d'usage (collection « Usage color »)

Alias vers Master : `usage.text.*`, `usage.button.*`, `usage.background.component.*`,
`usage.background.card.*`, `usage.icon.*`, `usage.state.*`, `usage.items.*`.
Toujours utiliser ces tokens d'usage dans les composants plutôt que les couleurs brutes.

> L'UI est pensée sur fond sombre : `usage.text.default` = neutral 0 (blanc).

### Typographie

- Titres : **Faune** (CNAP, gratuite — à auto-héberger dans `public/fonts/`, pas de CDN)
- Texte : **General Sans** (chargée depuis Fontshare dans `index.html`)
- Styles : `title-h1`, `title-h2`, `title-h3` (+ alternates), `body-main`, `body-light`, `body-medium`,
  `body-bold`, `body-other`, `body-small`, `body-small2` (+ medium / bold), `body-extra-small` (+ alternate).
  Chaque style est une variable `font` shorthand : `font: var(--typography-body-main);`

### Espacements, rayons, ombres, tailles

- `spacing.default.0-7` : 0, 8, 16, 24, 32, 40, 48, 56 px
- `spacing.compact.0-7` : 4, 6, 8, 12, 16, 20, 24, 28 px
- `radius.0-4` : 4, 8, 16, 24, 32 px
- `shadow.purple-*` / `shadow.orange-*` : halos (xsmall 10, small 20, défaut 40, large 60 px de flou, 25 %)
- `size.menu.*`, `size.card.*`, `size.template.*` : largeurs fixes des cartes et templates

## Composants (inventaire Figma)

### Atoms
| Composant | Variantes / propriétés |
| --- | --- |
| button | style: filled · outline · icon — Size: défaut · small — disable, error, Hover — icônes gauche/droite |
| button/toggle | Active: yes · no |
| check-box | select: yes · no |
| cell/menu | State: default · select · hover — style: full · icon |
| logo | size: Large · medium · small · size4 · crop |
| avatar | user type: rêveur · cauchemar |
| text/title | type: H1 · H2 · H3 |
| text/label | style: texte · date · number — Size: large → xsmall-alternate — color — Disable, Error |
| Numbers | size: Default · Large |
| Tag | Default |
| Indicator | sate: positif · negatif · none |
| notification | counter 1–10, hide |
| Thumbnail | icon (swap) |
| calendar/day-item · month-item · date-item | jours, mois, date |
| chart/legend | color 1 · 2 · 3 |
| charts/bar-unit | size: large → none — Style: dark · light · mid |
| chart/progress | 8 % → 100 % |
| charts/donut | 0 % → 100 % |
| Data Labels/status | Éveillé · Rêve · Cauchemar |
| Data Labels/location | unavailable |
| Data Labels/emotion | rêve / cauchemar × 10 émotions |

### Molécules
calendar-weekly-content, cells.data (Title, content, user profil, date, Status, location, emotion, button),
search-bar (défaut · focus · hover), World map (all · nightmare · dreamer), number + icon + indicator,
toggle/content, check-box-content, menu.content.full, menu.cell.crop, Bar + text (+ extended), Bar + month (+ extended),
Day-month, text + progress bar, conbinaison text, donut + indicator, header (search bar optionnelle),
icon.date, profil+texte, title.toggle.

### Organisms
Chaque organism existe en vue **compact** et **détaillée** :
calendrier, card.satisfaction, card-q-stock, card - % - stock, menu, map, card.donut, settings/card, calendar-weekly.

## Notes sur l'extraction

- Les noms Figma ont été normalisés (minuscules, kebab-case, fautes corrigées : `succes` → `success`,
  `extrat` → `extra`, `withe` → `white`, `Disable` → `disabled`).
- Les doublons de la collection Spacings (`default/Spacing-x` et `Spacings/default/Spacing-x`) ont été fusionnés.
- La variable orpheline `Chaîne` (alias de `Body-Font`) n'a pas été reprise.
