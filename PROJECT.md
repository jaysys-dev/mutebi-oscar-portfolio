# PROJECT — Mutebi Oscar Portfolio

> Required by JaySys **STANDARD 006**: every substantial JaySys project carries a root-level
> `PROJECT.md` recording the project's identity, purpose, context, and confirmed decisions.
>
> Per **STANDARD 004**, this file records **confirmed decisions only** — not guesses
> presented as final facts. Anything still open is listed as open.

## Identity

| Field | Value |
| --- | --- |
| Project name | Mutebi Oscar Portfolio |
| Location | `D:\jaysys\01.projects\mutebi oscar portfolio` |
| JaySys category | `01.projects` — a build, not a lab experiment (STANDARD 001) |
| Subject | Oscar Mutebi Francisco — *Owebyenkulakulana*, "The Development Champion" |
| Region | Bukoto Central Constituency, Greater Masaka, Uganda |
| Type | Static marketing / community-impact website |
| Repository | Local git repository, initialised 2026-08-18 |
| Current version | 0.2.0 — see [CHANGELOG.md](CHANGELOG.md) |

## Purpose

Present Oscar Mutebi Francisco's grassroots community development work — agricultural
transformation, youth and women's economic empowerment, and infrastructure and education
development — to the communities he serves, to partners, and to media.

The site also acts as an **intake channel**: the Community Desk page lets farmer groups,
youth cooperatives, women's associations, schools, and individual community members submit
requests and suggestions.

## Context

**What this is not.** Not a government website. Not a political campaign website. This
boundary is stated explicitly in the copy and must be preserved in any future content work.

**Now a single-product root.** This project root previously also contained
`community-operations-platform/`, a separate 58-file operations prototype. On **2026-08-18**
it was separated into its own independent JaySys project at
`D:\jaysys\01.projects\community-operations-platform`. The two share a brand and a visual
language but no code — zero cross-references and zero shared assets, verified at separation.

**No build step.** The site is plain HTML, CSS, and vanilla JavaScript. Every page opens
directly in a browser. This constraint drives several decisions below.

## Confirmed decisions

| # | Decision | Confirmed | Rationale |
| --- | --- | --- | --- |
| 1 | Adopt the JaySys standard structure | 2026-08-18 | Consistency with other `01.projects` builds |
| 2 | Keep `community-operations-platform/` untouched during the reorganization *(D1)* | 2026-08-18 | Separate product; separate design system, README and CI |
| 2b | **Separate it into its own independent JaySys project** | 2026-08-18 | Project-isolation rule. Moved to `D:\jaysys\01.projects\community-operations-platform` after verifying zero coupling. Supersedes the "candidate for its own repository" note in decision 2. |
| 3 | Add a root `index.html` *(D2)* | 2026-08-18 | The project previously had no entry point; serving the root gave a directory listing |
| 4 | `pages/home/` uses `index.html` while the other four use named files *(D3)* | 2026-08-18 | Follows the approved target structure. Inconsistent, but changing the other four would add 84 reference edits for no functional gain. |
| 5 | `components/` holds reference partials only, not includes *(D4b)* | 2026-08-18 | No build step exists to consume them. A real include mechanism (D4c) is deferred. |
| 6 | Root `.github/` created fresh, not inherited *(D5)* | 2026-08-18 | The prototype's `ci.yml` runs `npm ci` against directories with no `package.json` and would fail |
| 7 | Preserve the up-and-back-down relative link convention | 2026-08-18 | It is why the migration cost 29 reference edits instead of 113 |
| 8 | One stylesheet, one script — no per-page CSS or JS | 2026-08-18 | Already true; keeps the system coherent and reviewable |
| 9 | Green stays a selective accent, never structural | 2026-08-18 | Defines the beige/earth-tone identity |
| 10 | Migration was structure-only; known defects left in place | 2026-08-18 | So any regression is unambiguously attributable to the move |

## Open questions

Not yet decided. Recorded so they are not mistaken for settled.

| # | Question | Blocked on |
| --- | --- | --- |
| 1 | Is a build step adopted so `components/` becomes real? | Changes how the site is developed and served |
| 2 | Where does owned photography come from, and when? | Photography not yet commissioned or collected |
| 3 | Is there a production hosting target and domain? | Not yet specified |
| 4 | Does the contact form get a real backend? | Currently client-side validation only — it does not submit anywhere |
| 5 | Do the design tokens shared with the Community Operations Platform move to a shared source? | Both projects now declare ~15 identical tokens independently, with nothing keeping them in sync |

> *(Resolved 2026-08-18: "Does the operations platform become its own repository?" — yes, see
> confirmed decision 2b.)*

> Item 4 matters more than its position suggests: the Community Desk form validates and shows
> a success state, but **does not send anything**. Anyone treating it as a live intake channel
> would be mistaken.

## Environment

| Tool | Version | Verified |
| --- | --- | --- |
| git | 2.53.0.windows.2 | 2026-08-18 (STANDARD 009) |
| node | v24.16.0 | 2026-08-18 (STANDARD 009) |
| Shell | PowerShell 7+ on Windows 11 Pro | 2026-08-18 |

No Python virtual environment is required — the project has no Python dependencies
(STANDARD 010 not applicable).

## Key documents

| Document | Contents |
| --- | --- |
| [README.md](README.md) | Orientation, how to run, structure |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [STANDARDS.md](STANDARDS.md) | JaySys workspace standards (copied verbatim — do not edit here) |
| [docs/project-overview.md](docs/project-overview.md) | Purpose, audience, pages, current stage |
| [docs/information-architecture.md](docs/information-architecture.md) | Route map, navigation model, per-page structure |
| [docs/design-system.md](docs/design-system.md) | Colour, typography, layout, motion, image style |
| [docs/build-log.md](docs/build-log.md) | Consolidated work history and open items |
| [build_log/](build_log/) | Per-session build logs (STANDARD 012) |
