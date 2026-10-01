# NULL//WAVE — Astro build

A 2002-Flash-style portfolio built as a real, fast, static site.

Note: My name isn't Kai Morrow, this is just a fake name for demo purposes

## Run

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Where things live

- `src/data/projects.ts` — the six projects (add/edit here; detail pages generate automatically)
- `src/pages/` — home, work index, work/[slug], about, contact
- `src/layouts/Base.astro` — the "stage": top bar, side rail, status bar, page wipe transition
- `src/styles/global.css` — all styling; desktop stage + mobile layout (≤760px)
- `src/scripts/site.ts` — preloader (first visit only), UI blips, sound toggle (remembered), clock, cursor readout, contact form

## Before launch

- Replace striped placeholders (`<Placeholder>`) with real images in `public/`
- Set your Formspree form ID in `src/pages/contact.astro`
- Update `site` in `astro.config.mjs`

Motion is disabled automatically for visitors with "reduce motion" turned on.
