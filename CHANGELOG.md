# Changelog

All notable changes to this project are recorded here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] — 2026-08-18

Applied the safe fixes from the post-migration validation report.

No redesign, no copy changes, no layout changes, no palette changes, no navigation changes.

### Fixed

- **Legacy green `theme-color`** on the homepage — `#146A3A` → `#4B3A2F`, matching the other
  four pages. The last survivor of the pre-beige design.
- **Placeholder phone number removed** — `tel:+256000000000` ("+256 000 000 000") appeared on
  all five pages, 6 occurrences, and dialled nothing. Replaced with the neutral text
  "Phone line coming soon". No fake contact number is published anywhere now.
- **20 non-functional footer social links disabled** — Facebook, X, Instagram and YouTube icons
  pointed at `href="#"`. Converted from `<a>` to `<span class="social-dot social-dot--soon">`
  with `role="img"` and an "— coming soon" accessible label. Styling and layout are unchanged
  because the CSS targets the `.social-dot` class, not the element.
- **Icon rendering** — 8 bare `▶` (U+25B6) glyphs could render as a colour emoji on Windows and
  Android, breaking the monochrome beige treatment. Appended U+FE0E (text presentation
  selector) to force consistent monochrome rendering. Affects the YouTube social icon on all
  five pages and the three video play buttons on the media page.

### Changed

- **`#F6EFE2` promoted to a design token** — hard-coded 13 times, now `var(--cream)`.
  Identical value; the palette is unchanged.

### Removed

- 3 unused CSS custom properties: `--muted-soft`, `--line-dark`, `--radius-sm`
- 2 unused CSS rules: `.btn-block`, `.cards-grid--2`
- `initActiveNav()` from `assets/js/main.js` — dead code. Its selector
  (`.nav-link[href*='#']`) matched nothing on any page, because every nav link is a full page
  path. Active-nav state is set in the markup and continues to work. Replaced with a comment
  explaining why, so it is not reintroduced.

### Added

- `.social-dot--soon { pointer-events: none; cursor: default; }` — suppresses the hover lift on
  the now non-interactive social icons. Base appearance unchanged.

### Deliberately not changed

- **6 "Read More →" links on `media.html`** still point at `href="#"`. These are in-content
  links, not footer links, and resolving them requires a scope decision (build article pages,
  link to external coverage, or remove the affordance).
- **Email addresses** (`info@` / `desk@owebyenkulakulana.org`) — these are plausibly real and
  were not treated as placeholder data.
- The `◎` Instagram glyph — U+25CE has no emoji presentation and renders consistently as text.
  Changing it would be a design decision.

### Verified

| Check | Result |
| --- | --- |
| Link validation | 115 / 115 resolve |
| All pages + assets over HTTP | 8 / 8 → 200 |
| Fix verification assertions | 13 / 13 pass |
| JS hooks intact across all pages | Unchanged |
| `main.js` init calls | 11 → 10, no orphan calls |
| Placeholder `#` links | 26 → 6 |

---

## [0.3.0] — 2026-08-18

Separated the **Community Operations Platform** into its own independent JaySys project.

This project root now contains one product.

### Removed from this project

- `community-operations-platform/` — 58 files, 47 directories, 398 KB, relocated to
  `D:\jaysys\01.projects\community-operations-platform`

**Relocated, not deleted.** Every file was verified byte-identical at the destination by
SHA-256, and the prototype was proven to serve standalone (21/21 HTTP 200), *before* the
source copy was removed. **0 files deleted. 0 files archived.**

### Changed

- `README.md` — project tree no longer lists the platform; "Related project" now points at its
  new independent location. Corrected a stale validation count (113 → 115).
- `PROJECT.md` — context updated to "single-product root"; decision **2b** added recording the
  separation; open question "Does it become its own repository?" closed as resolved; a new open
  question added about the now-forked design tokens.
- `docs/project-overview.md` — related-project section points at the new location.
- `docs/design-system.md` — token-duplication deviation now notes that the two palettes can
  drift freely post-separation.
- `docs/build-log.md` — separation entry added; open item 7 marked done.

### Unchanged

- All five pages in `pages/` — untouched
- `assets/css/style.css` and `assets/js/main.js` — SHA-256 unchanged
- The complete beige/earth-tone design system
- Nothing in the moved project was redesigned, rewritten, or renamed

### Verified

| Check | Result |
| --- | --- |
| Portfolio no longer contains the platform | Confirmed |
| Platform exists and runs at its new root | 21/21 HTTP 200 |
| Files verified byte-identical at destination | 58/58 SHA-256 |
| Timestamps preserved | 58/58 files, 47/47 directories |
| Portfolio link validation | 115/115 pass |
| Portfolio tracked files | 100 → 42 |
| Code references to the moved project | 0 |
| Files deleted / archived | 0 / 0 |

---

## [0.2.0] — 2026-08-18

Reorganized the project into the **JaySys web application standard**.

Structure only. **No page copy, visual design, or interactive behaviour was changed.**
The beige/earth-tone design system is byte-for-byte identical to the previous version.

### Added

- `index.html` at the project root — the site previously had **no entry point**, so serving
  the root produced a directory listing
- `pages/` — all five portfolio pages now live under route-named folders
- `docs/` — `project-overview.md`, `information-architecture.md`, `design-system.md`,
  `build-log.md`, and `page-copy/` with verbatim copy for all five pages
- `components/` — canonical `navigation/site-header.html` and `footer/site-footer.html`,
  extracted with their per-page variations documented (reference only; there is no build
  step to consume them)
- `scripts/validate-links.mjs` — resolves every local reference in every page; exits non-zero
  on any broken link
- `assets/images/`, `assets/videos/`, `assets/documents/` — consolidated destinations
- `data/`, `tests/`, `archive/`, `.github/` — JaySys standard folders
- `STANDARDS.md` — copied verbatim from the approved JaySys workspace standards
- `PROJECT.md` — project definition file (JaySys **STANDARD 006**)
- `build_log/001_build_log_18-08-26.md` — session build log (JaySys **STANDARD 012**)
- `.gitignore` at the project root (JaySys **STANDARD 011**)
- `CHANGELOG.md` — this file

### Changed

- `homepage/home.html` → `pages/home/index.html` *(moved and renamed)*
- `about/about.html` → `pages/about/about.html` *(moved)*
- `projects/projects.html` → `pages/projects/projects.html` *(moved)*
- `media/media.html` → `pages/media/media.html` *(moved)*
- `community-desk/community-desk.html` → `pages/community-desk/community-desk.html` *(moved)*
- Updated **29 relative references** across the five pages for their new depth:
  5 stylesheet links, 5 script tags, 19 homepage links
- `README.md` rewritten. The previous version contradicted itself — its structure block
  described four pages as "Structure only" while its status table marked all five complete —
  and made no mention of `community-operations-platform/`. Its content is preserved and
  expanded in `docs/project-overview.md` and `docs/design-system.md`.

### Removed

- 15 empty per-page asset directories
  (`<page>/assets/{images,videos,documents}/`) — never used, replaced by the consolidated
  `assets/` tree
- 1 empty `assets/shared/` directory — superseded by the named sibling folders

**No file was deleted.** Only empty directories were removed.

### Unchanged (deliberately)

- `assets/css/style.css` — SHA-256 verified identical
- `assets/js/main.js` — SHA-256 verified identical
- All page copy, headings, and content
- The complete beige/earth-tone design system
- `community-operations-platform/` — all 58 files, including its `.github/` workflows,
  `.gitignore`, and CI configuration
- Known defects were left in place so that any regression would be unambiguously
  attributable to the migration: the legacy `theme-color="#146A3A"` on the homepage, the
  dead `initActiveNav()` function, and hard-coded hex literals in the stylesheet.
  These are tracked in `docs/build-log.md` under **Open items**.

### Verified

| Check | Result |
| --- | --- |
| Local reference resolution | 113 / 113 pass |
| All 5 pages served over HTTP | 200 |
| Shared CSS + JS served over HTTP | 200 |
| Navbar and footer links, every page | All resolve |
| `style.css` / `main.js` integrity | SHA-256 match |
| Files deleted | 0 |

---

## [0.1.0] — Pre-migration baseline

The project state captured immediately before the JaySys reorganization, preserved at git
tag `pre-jaysys-migration`.

### Included

- Five complete portfolio pages in top-level folders (`homepage/`, `about/`, `projects/`,
  `media/`, `community-desk/`)
- One shared stylesheet (`assets/css/style.css`, 37 KB, 25 sections) and one shared script
  (`assets/js/main.js`, 11.8 KB, 11 interactive systems)
- Complete beige/earth-tone design system with ~50 CSS custom properties
- `community-operations-platform/` — a 58-file, 20-screen operations prototype
- `README.md`

### Known state at baseline

- No git repository, no version control of any kind
- No `index.html` at root — no entry point
- No local asset files: 80 images hot-linked from Unsplash, 3 videos from YouTube
- 20 empty asset directories
- No favicon, no Open Graph tags on any page
