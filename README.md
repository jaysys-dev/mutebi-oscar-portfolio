# OWEBYENKULAKULANA — Oscar Mutebi Francisco

A premium community-impact portfolio website for **Oscar Mutebi Francisco**, locally known as
**Owebyenkulakulana (The Development Champion)**, focused on grassroots leadership,
agricultural transformation, and socio-economic empowerment across **Bukoto Central** and the
**Greater Masaka** region of Uganda.

> This is a professional community-impact website. It is **not** a government website and
> **not** a political campaign website.

## Running the site

No build step, no dependencies. Open the root in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000/
```

The root `index.html` forwards to `pages/home/index.html`.

## Project structure

```
mutebi-oscar-portfolio/
├── index.html                  # entry point → pages/home/index.html
├── README.md · CHANGELOG.md · STANDARDS.md · PROJECT.md
│
├── docs/                       # project documentation
│   ├── project-overview.md
│   ├── information-architecture.md
│   ├── design-system.md
│   ├── build-log.md
│   └── page-copy/              # verbatim copy for each page
│
├── assets/                     # all shared assets
│   ├── css/style.css           # the entire stylesheet (37 KB, 25 sections)
│   ├── js/main.js              # the entire behaviour layer (11 systems)
│   └── images/ videos/ icons/ logos/ documents/ fonts/
│
├── pages/                      # one folder per route
│   ├── home/index.html
│   ├── about/about.html
│   ├── projects/projects.html
│   ├── media/media.html
│   └── community-desk/community-desk.html
│
├── components/                 # canonical header/footer markup (reference only)
└── data/ · scripts/ · tests/ · archive/ · build_log/ · .github/
```

## Pages

| Page | Route | Status |
| --- | --- | --- |
| Homepage | `pages/home/index.html` | ✅ Complete |
| About Oscar | `pages/about/about.html` | ✅ Complete |
| Mobilization Pillars | `pages/projects/projects.html` | ✅ Complete |
| News & Media | `pages/media/media.html` | ✅ Complete |
| Community Desk | `pages/community-desk/community-desk.html` | ✅ Complete |

Note that folder names differ from the labels visitors see: `projects/` is
**Mobilization Pillars**, `media/` is **News & Media**. Full route map in
[docs/information-architecture.md](docs/information-architecture.md).

## Tech stack

- HTML5 · CSS3 · Vanilla JavaScript — no frameworks, no build step
- Google Fonts: **Poppins** (headings) + **Inter** (body)
- Images: Unsplash direct URLs (**placeholders** — see Known gaps)

## Design system — Warm Beige + Earth Tones + Selective Green

Beige-dominant and earth-grounded, with green used only as a selective accent.
Inspiration: Airbnb editorial, Kinfolk, and high-end NGO impact reports.

| Token | Value |
| --- | --- |
| Background beige | `#F6F1E7` |
| Light surface | `#FAF7F2` |
| Primary text | `#1E1E1E` |
| Earth brown | `#4B3A2F` |
| Beige accent | `#D8C3A5` |
| Gold accent | `#B9975B` |
| Green accent (sparingly) | `#2F6B3D` |
| Max width | `1280px` |

Green appears via `var(--green)` just 15 times in the whole stylesheet — focus rings,
success states, small emphasis. Keeping that ratio is the most important rule in the system.
Full reference: [docs/design-system.md](docs/design-system.md).

## Features

Sticky nav with scroll elevation · mobile navigation · Intersection Observer reveals ·
animated counters · editorial split & alternating project rows · timeline · layered cards ·
masonry gallery with **lightbox** · video gallery with modal player · **category filters +
live search** (Media) · **FAQ accordion** · **validated contact form** with success state and
request-type prefill · map placeholder · lazy-loaded images · semantic HTML ·
keyboard-friendly navigation · reduced-motion support · responsive layouts.

## Interactive JS — `assets/js/main.js`

`initHeaderScroll` · `initMobileNav` · `initReveal` · `initCounters` · `initActiveNav` ·
`initFooterYear` · `initFaq` · `initFilters` · `initForm` · `initPrefill` · `initLightbox`
— all vanilla, no dependencies.

## Validation

```bash
node scripts/validate-links.mjs
```

Resolves every local reference in every page and exits non-zero if any is broken.
Currently: **115 / 115 pass**.

## Conventions worth preserving

- **Relative links use the up-and-back-down form** (`../about/about.html`). This is why the
  JaySys migration required only 29 reference edits instead of 113. Do not shorten them.
- **One stylesheet, one script.** No page has its own CSS or JS, and no page has inline
  `<style>` or `<script>` blocks. Keep it that way.
- **`components/` files are reference copies, not includes.** With no build step, edits there
  change nothing on the live site and must be hand-propagated. See
  [components/README.md](components/README.md).

## Known gaps

| Gap | Notes |
| --- | --- |
| Imagery is placeholder | 80 hot-linked Unsplash URLs; no owned photography yet |
| No favicon / web manifest | Every page shows a default browser-tab icon |
| No Open Graph / Twitter meta | Shared links render without a preview card |
| Legacy `theme-color` on homepage | `#146A3A`, a pre-beige green; the other four pages use `#4B3A2F` |
| `initActiveNav()` is dead code | Its selector matches nothing; active state is hardcoded per page |

All tracked in [docs/build-log.md](docs/build-log.md) under **Open items**.

## Related project

**Community Operations Platform** — a 20-screen clickable prototype for the community
operations back-office (requests, residents, groups, tasks, calendar, events, reports, RBAC).

It previously lived inside this project root. On **2026-08-18** it was separated into its own
independent JaySys project at:

```
D:\jaysys\01.projects\community-operations-platform\
```

The two projects share a brand and a visual language but **no code** — verified at
separation: zero cross-references, zero shared assets. Each has its own stylesheet, script,
README, and repository.

## Standards

This project follows the JaySys workspace standards in [STANDARDS.md](STANDARDS.md), copied
verbatim from the approved workspace source. Do not edit that file here — update it at the
workspace level and re-copy.
