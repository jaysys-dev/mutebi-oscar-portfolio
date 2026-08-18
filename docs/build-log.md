# Build Log

Chronological record of substantive work on this project. Newest entry first.

> Per JaySys **STANDARD 012**, per-session build logs also live in
> [`build_log/`](../build_log/) using the `001_build_log_DD-MM-YY.md` naming pattern.
> This file is the consolidated summary; `build_log/` holds the session detail.

---

## 2026-08-18 — Community Operations Platform separated into its own project

Removed the last structural violation: `community-operations-platform/` was living inside this
project root, breaking the JaySys rule that each project owns an independent root.

### Analysis first

Before moving anything, established four facts that made the move safe:

| Question | Finding |
| --- | --- |
| Does it contain real work? | **Yes** — 33 substantive files (398 KB): 19 clickable screens, a 30 KB design system, a 9 KB interaction layer, 6 specification documents |
| Is anything coupled to the portfolio? | **No** — zero references in either direction; no `href`/`src` escaped the folder |
| Are any assets shared? | **No** — it has its own `app.css`/`app.js`; the portfolio has its own `style.css`/`main.js` |
| Anything temporary to discard? | **No** — junk scan found nothing; all 58 files git-tracked |

### The move

Destination: `D:\jaysys\01.projects\community-operations-platform`

Executed **copy → verify → delete**, so two complete copies existed at every moment:

| Step | Result |
| --- | --- |
| Manifest of 58 files + 47 dirs (SHA-256, size, timestamps) | 407,801 bytes recorded |
| Copied to destination, timestamps restored | 58/58 files, 47/47 dirs |
| Verified every file by hash **before** touching the source | **58/58 byte-identical** |
| Served all 19 screens + assets over HTTP from the new root | **21/21 HTTP 200** |
| `git init` + initial commit at the destination | 62 tracked files |
| Removed the source copy | Only after the two gates above passed |

### Result

| Metric | Value |
| --- | --- |
| Files moved | 58 |
| Directories moved | 47 |
| Files deleted | **0** |
| Files archived | **0** |
| Portfolio tracked files | 100 → 42 |
| Portfolio link validation | 115/115 still pass |
| `style.css` / `main.js` | SHA-256 unchanged |

### Notes

- **Fresh `git init`** at the destination rather than a subtree split — only one commit in this
  repository ever touched those files, so extracting history would have added complexity for
  almost no value. The `pre-platform-separation` tag here remains the historical record.
- **One file added** to the moved project: `docs/permissions/.gitkeep`. That directory was
  empty and untracked, so a filesystem copy carried it but `git clone` would not have — while
  the platform's README points readers at it.
- **Nothing was redesigned or rewritten.** The platform's known defects (failing `ci.yml`,
  `login.html` role routing, inline styles) moved across untouched and are now open items in
  that project's own `PROJECT.md`.

---

## 2026-08-18 — Audit, migration plan, and JaySys reorganization

Three phases completed in one session: a full project-state audit, an approved migration
plan, and its execution.

### 1. Audit completed

Full inspection of the project root — every HTML, CSS, JS, Markdown, JSON and YAML file
(68 files total). Findings that shaped everything after:

- The root contained **two separate products**: the 5-page portfolio site and a 58-file,
  20-screen `community-operations-platform/` prototype with its own design system and CI.
- **No `index.html` at the root** — serving the root produced a directory listing.
- **No git repository anywhere** — all work to date was unversioned.
- **Zero asset files** — 20 empty asset directories; all 80 images hot-linked from Unsplash,
  3 videos from YouTube, fonts from Google Fonts.
- All 25 pages had **zero broken internal links** — the existing structure was sound.
- The beige/earth-tone palette was **fully applied**; one legacy green survivor
  (`theme-color="#146A3A"` on the homepage).
- `initActiveNav()` in `assets/js/main.js` is **dead code** — its selector matches nothing.
- Inconsistent naming: `homepage/home.html` vs `about/about.html`; folder names diverged from
  nav labels (`projects/` = "Mobilization Pillars").

### 2. Migration plan completed

Planned the move to the JaySys standard and, critically, **measured it before executing**.

The key finding: because every internal link used the up-and-back-down form
(`../about/about.html`), moving all five page folders into `pages/` together preserved their
relative distance. Of **113 relative references, only 29 needed to change** — three
find-and-replace patterns across five files.

Five decisions were raised and approved:

| ID | Decision | Resolution |
| --- | --- | --- |
| **D1** | Scope of `community-operations-platform/` | Left physically untouched; out of scope. Candidate for its own repository later. |
| **D2** | Root entry point | Add `index.html` at root. The target tree omitted it, which would have left the audit's top finding unfixed. |
| **D3** | `pages/home/index.html` vs `home.html` | Follow the approved structure as written; record the inconsistency rather than expand scope by 84 more edits. |
| **D4** | Contents of `components/` | Extract canonical partials as **reference only** — there is no build step to consume them. Option (c), a real include mechanism, is deferred. |
| **D5** | Root `.github/` | Create fresh. The prototype's `ci.yml` runs `npm ci` against directories with no `package.json` and would fail; it was not promoted to root. |

### 3. JaySys reorganization executed

| Step | Action | Result |
| --- | --- | --- |
| 0 | `git init`, `.gitignore`, pre-migration commit + tag | 68 files committed; tag `pre-jaysys-migration` |
| 1 | Created JaySys folder skeleton | 20 directories, 13 `.gitkeep` files |
| 2 | Moved 5 pages via `git mv` | All detected as renames — history preserved |
| 3 | Removed emptied directories | 16 empty trees removed, **0 files deleted** |
| 4 | Updated references | **29 edits**: 5 CSS, 5 JS, 19 home links |
| 5 | Copied approved JaySys `STANDARDS.md` | Byte-identical to the workspace original |
| 6 | Extracted canonical components | Header + footer, with per-page variations documented |
| 7 | Authored documentation | 10 docs files, `README.md`, `CHANGELOG.md`, `PROJECT.md` |

### 4. File paths updated

Three atomic replacements across all five pages:

| Pattern | → | Count |
| --- | --- | --- |
| `../assets/css/style.css` | `../../assets/css/style.css` | 5 |
| `../assets/js/main.js` | `../../assets/js/main.js` | 5 |
| `../homepage/home.html` | `../home/index.html` | 19 |

The remaining **84** references (`../about/about.html`, `../projects/projects.html`,
`../media/media.html`, `../community-desk/community-desk.html`) were verified unchanged —
they resolve correctly from the new depth without modification.

No image, video, icon, logo, document or font path required updating: **the project contains
no local asset files**, and all external URLs are absolute.

### 5. Validation completed

| Check | Result |
| --- | --- |
| Automated link validation (`scripts/validate-links.mjs`) | **PASS** — 113/113 local references resolve |
| Live HTTP serve, all 5 pages + root | **PASS** — all HTTP 200 |
| Shared CSS + JS over HTTP | **PASS** — HTTP 200, correct byte counts |
| Navbar links, per page | **PASS** — 6–7 links each, all resolve |
| Footer links, per page | **PASS** — 5–10 links each, all resolve |
| `style.css` integrity | **PASS** — SHA-256 identical to pre-migration baseline |
| `main.js` integrity | **PASS** — SHA-256 identical to pre-migration baseline |
| External media reachable | **PASS** — Unsplash + Google Fonts HTTP 200 |
| Files deleted | **0** |
| Duplicate top-level page folders remaining | **0** |
| Git/GitHub files intact | **PASS** — prototype `.github/`, `.gitignore`, CI preserved |

### Decisions worth remembering

- The **up-and-back-down link convention is load-bearing**. It is why this migration cost 29
  edits instead of 113. Do not "simplify" sibling links to `../about.html`.
- **Structure-only migration.** No copy, no design, no behaviour was changed. Known defects
  (the legacy `theme-color`, dead `initActiveNav()`, token leakage) were deliberately left
  in place so that any regression could be attributed unambiguously to the move.
- `components/` files are **documentation, not includes**. Nothing consumes them at runtime.

### Open items (carried forward)

| # | Item | Why it matters |
| --- | --- | --- |
| 1 | ~~Fix `theme-color="#146A3A"` on the homepage~~ | ✅ **Done 2026-08-18** — now `#4B3A2F` |
| 2 | ~~Resolve `initActiveNav()`~~ | ✅ **Done 2026-08-18** — removed as dead code; markup-set active state retained |
| 3 | Add favicon, apple-touch-icon, web manifest | Every page currently shows a default tab icon. **Blocked** — needs an icon asset |
| 4 | Add Open Graph + Twitter card meta | Shared links have no preview card. **Blocked** — needs share images |
| 5 | Replace 80 Unsplash placeholders with owned photography | Highest-value visual-identity work |
| 6 | ~~Promote `#f6efe2` (13 uses) to a token~~ | ✅ **Done 2026-08-18** — now `--cream`. ~28 other hex literals still open |
| 6b | Resolve the 6 "Read More →" links on `media.html` | Still `href="#"`. Needs a scope decision: article pages, external links, or remove |
| 6c | Supply a real phone number | Placeholder removed 2026-08-18; pages now read "Phone line coming soon" |
| 7 | ~~Split `community-operations-platform/` into its own repository~~ | ✅ **Done 2026-08-18** — moved to `D:\jaysys\01.projects\community-operations-platform` |
| 8 | Fix or scope down the prototype's failing `ci.yml` | A permanently red CI trains people to ignore CI |
| 9 | Decide on a build step so `components/` becomes real (D4c) | Ends header/footer duplication across 5 pages |
