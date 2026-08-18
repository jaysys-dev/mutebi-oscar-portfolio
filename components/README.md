# Components

Canonical markup for the blocks that repeat across the five portfolio pages.

## ⚠️ These files are reference copies, not includes

This project is **static HTML with no build step and no templating engine**. Nothing in
`pages/` imports, includes, or reads these files at runtime. Serving the site does not
touch this folder at all.

That means:

- **Editing a file here changes nothing on the live site.**
- Any change made here **must be hand-propagated to all five pages** in `pages/`,
  or the canonical copy and the real pages will silently drift apart.
- Equally, a change made directly in a page should be mirrored back here.

They exist because the header and footer markup is currently duplicated five times, and
duplication with no single source of truth is exactly how the audit found a stale
`theme-color` on one page while the other four had been updated. This folder makes the
intended markup explicit and reviewable in one place.

## Contents

| File | Appears in | Notes |
| --- | --- | --- |
| `navigation/site-header.html` | all 5 pages | Brand, 5 nav links, CTA, mobile toggle |
| `footer/site-footer.html` | all 5 pages | Footer nav, pillar links, contact, copyright |
| `cards/` | — | Empty. Card patterns still live inline in the pages. |
| `forms/` | — | Empty. The contact form lives in `pages/community-desk/`. |
| `sections/` | — | Empty. Section patterns still live inline in the pages. |

Each partial carries a header comment listing its **verified per-page variations** — the
active-link marker, the Community Desk CTA anchor, and the Projects footer anchors. Those
differences are intentional; do not "normalise" them away.

## Why these are excluded from link validation

`scripts/validate-links.mjs` scans `pages/` and the root `index.html` only. The relative
paths inside these partials (`../../assets/css/style.css`, `../about/about.html`) are
written to resolve from a page at `pages/<route>/`. They cannot resolve from
`components/navigation/`, so validating them here would report false failures.

## Making these real

To turn these from documentation into actual includes, the project would need a build step
or an include mechanism (SSI, a static site generator, or a small Node build script). That
was recorded as decision **D4(c)** in the migration plan and is deferred — it changes how
the site is developed and served, which is out of scope for a reorganization.
