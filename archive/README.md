# Archive

Holding area for files that are no longer active but should not be deleted.

## Current contents

**Empty.**

The JaySys reorganization on 2026-08-18 archived nothing, because nothing needed archiving:

- **No file was deleted or displaced.** All five pages were moved, not replaced.
- The only things removed were **16 empty directories** (15 unused per-page asset folders and
  `assets/shared/`). Each was verified to contain zero files before removal. There was
  nothing to preserve.
- No duplicate assets were found — the project contained **no asset files at all** at the
  time of migration.

## When to use this folder

Move something here instead of deleting it when:

- A file is superseded but might still be referenced or wanted
- Two versions of an asset exist and it is unclear which is authoritative — keep the better
  one in `assets/`, put the other here
- An experiment or draft is finished but worth keeping for reference

Do **not** use it for:

- Files still referenced by any page — check with `node scripts/validate-links.mjs` first
- Anything recoverable from git history alone; `git log` is the better archive for that

## Convention

Archive into a dated subfolder so the reason and timing stay attached:

```
archive/
└── 2026-08-18-original-hero-images/
    ├── README.md      ← what these are and why they were archived
    └── ...
```

Always include a short `README.md` in the subfolder. An archived file with no explanation
becomes undeletable — nobody can confirm it is safe to remove.
