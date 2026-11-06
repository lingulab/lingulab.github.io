# LinguLab site

Static marketing site for LinguLab, built with Astro 7.4.7. Hand written CSS, no UI framework, no Tailwind. Turkish is live. Dutch and English are planned.

Status as of 2026-11-06: first full build of the Turkish page. Not deployed, not committed. Phone screen for the capture grid is still a placeholder.

## Run

Needs Node 22 or newer (built with Node 24).

    npm install
    npm run dev        local dev server
    npm run build      static output in dist/
    npm run preview    serve dist/ locally
    npm run check:i18n verify every key used in components exists in tr.json

## Where things live

- `src/i18n/tr.json`: all page text, including alt text and the SVG diagram labels.
- `src/i18n/index.ts`: locale loader. It discovers every `*.json` file in `src/i18n/`.
- `src/site.config.ts`: brand name, contact email, site URL, base path, default locale.
- `src/data/roadmap.json`: roadmap entries.
- `src/components/`: one component per page section. They read strings with `t('some.key')`.
- `src/scripts/`: the only client JavaScript. `flow.ts` is the scroll effect (it respects reduced motion) and `notice.ts` is the small app notice dialog.
- `src/styles/global.css`: tokens on `:root` and all styles.
- `prototypes/b.html`: the approved design the page was ported from.
- `docs/copy-tr-draft-2.md`: the Turkish copy draft.

## Add a locale

1. Copy `src/i18n/tr.json` to `src/i18n/nl.json` (or `en.json`) and translate the values.
2. Optionally add that locale's key to each title in `src/data/roadmap.json`. A missing key falls back to the default locale.
3. Run `npm run build`.

No component changes are needed. The route `/nl/` appears as soon as the file exists, and hreflang links are generated from the files present. A missing key falls back to Turkish with a build warning. Until a second file exists there is no language switcher and no other locale route. A switcher has not been built yet, so add one when the second locale ships.

## Change base path, site URL or email

Edit `src/site.config.ts` only. `astro.config.mjs` reads it.

- `base`: `'/'` for a custom domain, `'/repo-name'` for a GitHub Pages project site.
- `siteUrl`: absolute origin such as `https://example.github.io`. While empty, canonical and hreflang tags are not emitted.
- `contactEmail`: while empty, the contact section shows the text without a mail link.

## Roadmap file

`src/data/roadmap.json` is a list of objects with `id`, `title` (an object keyed by locale code), `status` (`now`, `next` or `later`) and `order` (a number). Entries are grouped by status and sorted by `order`. There are no dates. The column headings come from `roadmap.status` in the locale file.

## Screens

The images in `public/screens/` are the current approved screenshots. More will be added as the apps are finished.

## Deploy

`.github/workflows/deploy.yml` deploys to GitHub Pages. It is inert: it only runs when started by hand, and the push trigger is commented out. Set `base` and `siteUrl` first.

## Language menu

The menu is built from `localeNames` in `src/site.config.ts`. A language appears once `src/i18n/<code>.json` exists, so adding a language needs no change to the header.
