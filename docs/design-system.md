# Design System

**Warm Beige + Earth Tones + Selective Green.**

Beige-dominant, earth-grounded, with green used only as a selective accent — never as the
primary brand colour. Reference points: Airbnb editorial, Kinfolk, and high-end NGO impact
reports.

> This document **records** the system as currently implemented. It does not propose changes.
> The single source of truth is the `:root` block at the top of
> [`assets/css/style.css`](../assets/css/style.css). If the two disagree, the stylesheet wins
> and this file should be corrected.

## Colour tokens

All colours are CSS custom properties declared once in `:root`.

### Core surfaces

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#F6F1E7` | Dominant page background beige |
| `--surface` | `#FAF7F2` | Light sections |
| `--surface-2` | `#F1E9DA` | Slightly deeper beige |
| `--white` | `#ffffff` | Cards, contrast surfaces |

### Text

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#1E1E1E` | Primary text |
| `--muted` | `#6E6154` | Warm muted text |
| `--muted-soft` | `#8b7d6e` | Lowest-emphasis text |

### Earth tones

| Token | Value | Role |
| --- | --- | --- |
| `--brown` | `#4B3A2F` | Earth brown — primary brand tone |
| `--brown-deep` | `#2E241C` | Dark earth sections |
| `--brown-deeper` | `#211913` | Deepest earth |
| `--beige` | `#D8C3A5` | Beige accent |
| `--beige-soft` | `#E9DDC8` | Soft beige accent |
| `--cream` | `#F6EFE2` | Warm cream — text and marks on dark earth sections |

### Accents

| Token | Value | Role |
| --- | --- | --- |
| `--gold` | `#B9975B` | Gold accent — premium detail |
| `--gold-soft` | `#d0b47f` | Softer gold |
| `--green` | `#2F6B3D` | Green — **used sparingly** |
| `--green-soft` | `#3f8850` | Softer green |

### Lines

| Token | Value | Role |
| --- | --- | --- |
| `--line` | `#E4D9C6` | Warm hairline on light surfaces |
| `--line-dark` | `rgba(255,255,255,.14)` | Hairline on dark surfaces |

### The green rule

Green is an **accent, not a theme**. It appears via `var(--green)` **15 times** across the
whole stylesheet — focus rings, success states, and small emphasis marks only. Backgrounds,
headings, primary buttons, and navigation are beige, brown, or gold.

Preserving this ratio is the single most important rule in the system. A change that makes
green structural would break the identity.

## Typography

| Role | Family | Fallback stack |
| --- | --- | --- |
| Headings | **Poppins** (500, 600, 700, 800) | `system-ui, -apple-system, "Segoe UI", sans-serif` |
| Body | **Inter** (400, 500, 600, 700) | `system-ui, -apple-system, "Segoe UI", sans-serif` |

Loaded from Google Fonts with `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`.

| Property | Value |
| --- | --- |
| Base body size | `17px` |
| Base line height | `1.75` |
| Heading line height | `1.14` |
| Heading letter-spacing | `-.02em` |
| Section title size | `clamp(1.9rem, 3.4vw, 2.95rem)` |

Headings use fluid `clamp()` sizing so type scales with the viewport rather than stepping at
breakpoints.

## Layout

| Token | Value | Role |
| --- | --- | --- |
| `--maxw` | `1280px` | Maximum content width |
| `--gutter` | `24px` | Horizontal page padding |

| Helper | Width |
| --- | --- |
| `.container` | up to `--maxw` |
| `.wide` | `1160px` |
| `.narrow` | `820px` |

**Vertical rhythm:** `.section` = `120px` top and bottom; `.section--tight` = `84px`.
Generous whitespace is a defining feature of the premium feel — reducing it materially
changes the character of the site.

### Corner radii

| Token | Value |
| --- | --- |
| `--radius-sm` | `10px` |
| `--radius` | `16px` |
| `--radius-lg` | `26px` |
| `--radius-xl` | `34px` |

## Elevation

Shadows are **warm** — tinted with the earth-brown base rather than neutral black. This is
what keeps cards from looking grey against the beige.

| Token | Value |
| --- | --- |
| `--shadow-sm` | `0 1px 2px rgba(75,58,47,.06), 0 2px 6px rgba(75,58,47,.05)` |
| `--shadow` | `0 12px 30px rgba(75,58,47,.10)` |
| `--shadow-lg` | `0 30px 70px rgba(46,36,28,.18)` |
| `--shadow-gold` | `0 18px 40px rgba(185,151,91,.30)` |

## Motion

| Token | Value |
| --- | --- |
| `--ease` | `cubic-bezier(.22, .61, .36, 1)` |
| `--dur` | `.45s` |

Motion is used for scroll reveals, counter animation, hover lifts, and the sticky-header
elevation. All of it is disabled under `prefers-reduced-motion: reduce`, which is honoured
in both the stylesheet and `assets/js/main.js`.

## Image style

The intended direction, as expressed by the current layouts:

- **Documentary, not staged** — people at work, in gardens, in meetings, in classrooms
- **Warm natural light** that sits comfortably against the beige palette
- **Environmental context** — the land and the setting are part of the subject
- Presented in **editorial frames** with generous radii and warm shadows
- Split layouts and alternating rows pair one image with substantial copy

**Current reality:** all imagery is **hot-linked Unsplash placeholders** (80 references).
The layouts are built and correct; the photography is not yet the real thing. Replacing these
with owned photography of the actual community work is the highest-value open item for the
project's visual identity.

## Stylesheet organisation

`assets/css/style.css` (37 KB) is organised into 25 numbered sections:

| # | Section | # | Section |
| --- | --- | --- | --- |
| 1 | Design Tokens | 14 | Timeline (About) |
| 2 | Reset & Base | 15 | Value / Feature grid |
| 3 | Layout Helpers | 16 | Project detail rows |
| 4 | Buttons | 17 | Gallery |
| 5 | Navigation | 18 | Filter bar + search |
| 6 | Homepage Hero | 19 | Forms |
| 7 | Interior Page Hero | 20 | FAQ accordion |
| 8 | Split Layout | 21 | Intro strip / banner |
| 9 | Impact / Dark Sections | 22 | Lightbox |
| 10 | Cards Grid | 23 | Scroll Reveal |
| 11 | Commitment / Centered | 24 | Responsive |
| 12 | Final CTA | 25 | Reduced Motion |
| 13 | Footer | | |

Keep new rules inside the section they belong to rather than appending to the end.

## Accessibility

- `:focus-visible` renders a `3px solid var(--green)` outline with `3px` offset
- Skip link to `#main` is the first focusable element on every page
- `.visually-hidden` preserves screen-reader text without visual impact
- Full `prefers-reduced-motion` support

## Known deviations

Recorded honestly rather than silently corrected. **None of these were changed during the
JaySys reorganization**, which was scoped to structure only.

| # | Deviation | Location |
| --- | --- | --- |
| 1 | ~~`theme-color` is `#146A3A` — a legacy green from the pre-beige design~~ | ✅ **Fixed 2026-08-18** — now `#4B3A2F` on all five pages |
| 2 | ~~`#f6efe2` is hard-coded 13 times but is not a named token~~ | ✅ **Fixed 2026-08-18** — promoted to `--cream`, same value |
| 3 | ~28 further one-off hex literals bypass the token layer (`#241a09`, `#b3a494`, `#cf6b6b`, `#7c5f29`, …) | `assets/css/style.css` |
| 4 | 3 × `!important` declarations | `assets/css/style.css` |
| 5 | The Community Operations Platform re-declares ~15 of these same tokens independently in its own `app.css` — nothing keeps the two in sync. Since that project was separated on 2026-08-18, the two palettes can now drift freely. | `D:\jaysys\01.projects\community-operations-platform\frontend\public\assets\css\app.css` |

Items 1 and 2 were resolved on 2026-08-18 as part of the post-migration safe-fix pass.
Items 3 and 4 remain open and are tracked in [build-log.md](build-log.md).
