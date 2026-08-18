# Information Architecture

The site is a **flat five-page structure**. There are no sub-pages, no pagination, and no
detail routes — every page is reachable from every other page in one click.

## Route map

```
/                                            → redirects to pages/home/index.html
│
├── pages/home/index.html                    Homepage
├── pages/about/about.html                   About Oscar
├── pages/projects/projects.html             Mobilization Pillars
├── pages/media/media.html                   News & Media
└── pages/community-desk/community-desk.html Community Desk
```

### Folder-name vs. nav-label mapping

The folder names are short and technical; the labels shown to visitors are descriptive.
This mapping matters — searching for "Mobilization Pillars" will not find `projects/`.

| Folder | File | Nav label shown to visitors |
| --- | --- | --- |
| `pages/home/` | `index.html` | Home |
| `pages/about/` | `about.html` | About Oscar |
| `pages/projects/` | `projects.html` | **Mobilization Pillars** |
| `pages/media/` | `media.html` | **News & Media** |
| `pages/community-desk/` | `community-desk.html` | Community Desk |

> `pages/home/` uses `index.html` while the other four use a named file. This is a known
> deviation carried over from the approved target structure, recorded in
> [build-log.md](build-log.md) as decision **D3**.

## Navigation model

Every page carries the **same header and the same footer**. Navigation is fully
interconnected — a complete graph, not a hierarchy.

```
        ┌──────────────────────────────────────────┐
        │   Home ─── About ─── Pillars ─── Media   │
        │     └────────┴──── Community Desk ───┘   │
        │        (every page links to all five)    │
        └──────────────────────────────────────────┘
```

### Header (all five pages)

| Element | Target |
| --- | --- |
| Brand block ("OM" mark + OWEBYENKULAKULANA) | `../home/index.html` |
| Nav link — Home | `../home/index.html` |
| Nav link — About Oscar | `../about/about.html` |
| Nav link — Mobilization Pillars | `../projects/projects.html` |
| Nav link — News & Media | `../media/media.html` |
| Nav link — Community Desk | `../community-desk/community-desk.html` |
| CTA — "Contact Team" | `../community-desk/community-desk.html` — **except** on Community Desk itself, where it is the in-page anchor `#contact-form` |
| Mobile toggle | Opens `#primaryNav` |

The current page is marked with `class="nav-link is-active"` plus `aria-current="page"`.
On the homepage the marker is `is-active` only.

### Footer (all five pages)

Repeats the five primary links, plus pillar shortcuts and contact details. On
`pages/projects/projects.html` the pillar shortcuts become **in-page anchors**
(`#agriculture`, `#youth`, `#education`) because those sections live on that page.

### Relative-path convention

Every internal link uses the **up-and-back-down** form from inside `pages/`:

```html
<a href="../about/about.html">          <!-- page → sibling page -->
<link href="../../assets/css/style.css"> <!-- page → shared asset -->
```

This convention is what made the JaySys migration cheap: because sibling links traverse up
and back down, moving all five page folders into `pages/` together left **84 of 113
references valid without modification**. Preserve it.

## Page-by-page structure

### 1. Homepage — `pages/home/index.html`
Entry point and overview. Ten sections: sticky navigation, hero, introduction, impact
dashboard (6 animated counters), bridging-opportunity, three pillars, recent field updates,
community commitment, final call to action, footer.
**Interactive:** counters, scroll reveals, sticky header, mobile nav.

### 2. About Oscar — `pages/about/about.html`
Biography and philosophy. Nine sections: editorial hero, origin story, leadership philosophy
(3 convictions), State House service, roots in Bukoto Central, **timeline** of service,
leadership values, partner CTA, footer.
**Interactive:** scroll reveals, sticky header, mobile nav.

### 3. Mobilization Pillars — `pages/projects/projects.html`
The programme detail page. Eight sections covering **Agricultural Wealth Creation**,
**Youth & Women Economic Empowerment**, and **Infrastructure & Education Development** as
alternating editorial rows, plus a project gallery and a group-support CTA.
**Interactive:** 4 counters, 8 lightbox items, scroll reveals.

### 4. News & Media — `pages/media/media.html`
The news hub. Eight sections: featured story, field updates, video gallery (3 YouTube
embeds), photo gallery, press mentions, recognition, media-enquiry CTA.
**Interactive:** the only **category filter + live search** on the site, 11 lightbox items,
video modals.

### 5. Community Desk — `pages/community-desk/community-desk.html`
Contact and intake. Eight sections: intro, engagement statement, request-type cards (5, with
prefill), **validated contact form**, contact info cards, service area, **FAQ accordion**
(6 items), closing CTA.
**Interactive:** form validation with success state, request-type prefill, FAQ accordion.

## Interaction inventory

Which shared behaviours are active on which page. All are driven from the single
`assets/js/main.js`; each function early-returns where its hook is absent.

| Behaviour | Home | About | Pillars | Media | Desk |
| --- | :-: | :-: | :-: | :-: | :-: |
| Sticky header elevation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mobile navigation | ✅ | ✅ | ✅ | ✅ | ✅ |
| Scroll reveals | ✅ | ✅ | ✅ | ✅ | ✅ |
| Footer year | ✅ | ✅ | ✅ | ✅ | ✅ |
| Animated counters | ✅ | — | ✅ | — | — |
| Lightbox | — | — | ✅ | ✅ | — |
| Category filter + search | — | — | — | ✅ | — |
| FAQ accordion | — | — | — | — | ✅ |
| Form validation | — | — | — | — | ✅ |
| Request-type prefill | — | — | — | — | ✅ |

## Accessibility conventions

Applied consistently across all five pages and worth preserving:

- Skip link to `#main` as the first focusable element
- `aria-labelledby` on sections; `aria-current="page"` on the active nav link
- `aria-expanded` maintained on the mobile nav toggle and FAQ buttons
- `.visually-hidden` for screen-reader-only headings
- Visible `:focus-visible` outlines
- Keyboard handling in navigation, lightbox, and FAQ (Enter / Space / Escape)
- A `prefers-reduced-motion` block that disables reveals and counter animation

## Known gaps

| Gap | Effect |
| --- | --- |
| No favicon or web manifest | Browser tabs show a default icon |
| No Open Graph / Twitter meta | Shared links render without a preview card |
| No sitemap or robots.txt | Not required at this scale; relevant at launch |
| `initActiveNav()` is dead code | Active state is hardcoded per page rather than derived |
| Imagery is placeholder | 80 hot-linked Unsplash URLs |
