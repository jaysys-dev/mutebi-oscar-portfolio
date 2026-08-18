# Project Overview

## What this project is

**OWEBYENKULAKULANA** — a premium community-impact portfolio website for **Oscar Mutebi
Francisco**, known across his region as *Owebyenkulakulana* ("The Development Champion").

The site presents his grassroots leadership, agricultural transformation work, and
socio-economic empowerment programmes across **Bukoto Central Constituency** and the wider
**Greater Masaka region of Uganda**.

> This is a professional community-impact website.
> It is **not** a government website and **not** a political campaign website.
> That boundary is deliberate and is reflected throughout the copy.

## Audience

| Audience | What they come for |
| --- | --- |
| Farmers and farmer groups | Agricultural support, seedlings, inputs, wealth-creation programmes |
| Youth groups and savings circles | Enterprise, savings, and empowerment opportunities |
| Women's associations | Economic empowerment programmes and group support |
| Schools and education partners | Partnership and school-support enquiries |
| Community members | Submitting requests, suggestions, and questions |
| Press and media | Field updates, imagery, and media enquiries |
| Partners and stakeholders | Understanding the work, its scope, and its measured results |

## The five pages

| # | Page | Route | Purpose |
| --- | --- | --- | --- |
| 1 | Homepage | `pages/home/index.html` | Entry point — mission, impact figures, three pillars, latest field updates |
| 2 | About Oscar | `pages/about/about.html` | Biography, leadership philosophy, State House service, timeline |
| 3 | Mobilization Pillars | `pages/projects/projects.html` | The three programme pillars in depth, plus project gallery |
| 4 | News & Media | `pages/media/media.html` | Field updates, video gallery, photo gallery, press mentions |
| 5 | Community Desk | `pages/community-desk/community-desk.html` | Contact, request intake, FAQ, service area |

Full structure and navigation model: [information-architecture.md](information-architecture.md).
Verbatim copy for each page: [page-copy/](page-copy/).

## Technology

- **HTML5 · CSS3 · Vanilla JavaScript** — no frameworks, no dependencies, **no build step**
- One shared stylesheet (`assets/css/style.css`) and one shared script (`assets/js/main.js`)
  serve all five pages
- **Google Fonts** — Poppins (headings) + Inter (body)
- Images are currently **Unsplash placeholder URLs**, hot-linked; video is embedded from YouTube

Because there is no build step, every page is directly openable in a browser, and the
duplicated header/footer markup must be kept in sync by hand. See
[../components/README.md](../components/README.md).

## Current stage

**Structurally complete, visually placeholder.**

| Area | Status |
| --- | --- |
| Homepage | ✅ Complete |
| About Oscar | ✅ Complete |
| Mobilization Pillars | ✅ Complete |
| News & Media | ✅ Complete |
| Community Desk | ✅ Complete |
| Shared design system | ✅ Complete — beige/earth-tone, fully applied |
| Shared JavaScript | ✅ Complete — 11 interactive systems |
| JaySys project structure | ✅ Complete — migrated 2026-08-18 |
| Owned photography | ❌ Not started — 80 Unsplash placeholders in use |
| Favicon / social share cards | ❌ Not present |
| Logo asset | ❌ Not present — brand mark is a CSS-rendered "OM" monogram |

All five pages load, all 115 internal references resolve, and every interactive system
(counters, lightbox, filters, form validation, FAQ, mobile nav) is functional.

The most valuable next step is **replacing the placeholder imagery with owned photography**
— it is the main thing standing between the current site and an authentic representation of
the community work it describes.

## Related project in this workspace

The **Community Operations Platform** is a separate product: a 20-screen clickable prototype
for the community operations back-office (requests, residents, groups, tasks, calendar,
events, reports, RBAC), with its own README, design-system implementation, and CI.

It previously lived inside this project root. On **2026-08-18** it was separated into its own
independent JaySys project at `D:\jaysys\01.projects\community-operations-platform` — see
[build-log.md](build-log.md).

The two projects share a brand and a visual language but **no code**. Verified at separation:
zero cross-references in either direction, and zero shared assets — each has its own
stylesheet and script.
