---
name: folder-structure
description: Details where files belong under src/app, src/features, and shared folders. Use when placing or scaffolding files—hard constraints are in the always-on folder-structure rule; see references/folders.md for per-folder contents.
---

# Folder structure (details)

Hard constraints (ownership, promotion, imports, no route barrels) live in the always-on `folder-structure` rule. This skill covers route composition detail and points to the reference.

## Route file as screen map

`page.tsx` / `layout.tsx` list which feature leaves render, in what order, and which regions stream behind `<Suspense>`.

**In the route:** compose feature components; thin same-file async children for `searchParams` / soft gates; segment config.

**Out of the route:** heavy UI, domain loaders, Server Actions, Zod schemas, `"use client"` leaves.

### Route barrels (disallowed)

Extra modules that only stand between `page.tsx` and real UI/data—re-export, rename, or “fetch then return one child.” If removing the file only moves awaits + one JSX tag into `page.tsx` and the map gets clearer, it was a barrel.

**Allowed:** feature leaves with real UI; section islands that own fetch and appear in a multi-section map; shared modules used by two or more routes.

| Situation                            | Put it…                                         |
| ------------------------------------ | ----------------------------------------------- |
| Short list of sections + Suspense    | Directly in `page.tsx`                          |
| Soft gate / param parse then compose | Same-file async child                           |
| Section with own fetch + UI          | Feature `components/…`, composed from the route |
| Single screen: load then one leaf    | Awaits in route → feature leaf                  |
| Wrapper for one route only           | Delete — compose in the route                   |

## Per-folder reference

[references/folders.md](references/folders.md) — hooks, lib, server, types, styles, utils, components, tests, quick lookup table, anti-patterns.

## Canonical layout (illustrative)

Do not create folders unless instructed.

```
src/
├─ app/(dashboard)/{layout,page}.tsx, api/users/route.ts
├─ components/{ui,composites,layout}/
├─ features/users/     # full template including tests/
├─ hooks/ lib/ server/ types/ utils/   # only when promoted
└─ styles/globals.css
tests/e2e/, tests/shared/
```
