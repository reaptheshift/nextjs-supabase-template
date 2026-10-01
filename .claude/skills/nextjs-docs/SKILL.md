---
name: nextjs-docs
description: "Looks up version-matched Next.js official documentation before implementing App Router APIs. Use when adding or changing routing, RSC, Server Actions, caching, middleware, config, or data fetching—or when avoiding deprecated Next.js patterns."
---

# Next.js documentation workflow

Use this skill **before** writing Next.js-specific code. Pair with root `CLAUDE.md` and the `nextjs-docs` rule (always loaded, except when only editing `.claude/` guidance or `CLAUDE.md`).

---

## 1. Confirm version

Read `package.json` → `"next"` version. All doc lookups must match that major/minor (bundled docs and MCP both target current Next.js docs).

---

## 2. Primary source: bundled docs (preferred)

After `pnpm install`:

```
node_modules/next/dist/docs/
```

- Search or browse this tree for the API or guide (App Router paths under `app/` in the doc tree).
- **Do not** assume training-data behavior for `cache`, `fetch`, `cookies()`, `headers()`, Server Actions, or `middleware`—read the file for your version.

If `node_modules/next` is missing, install dependencies first or use §3.

---

## 3. Secondary source: MCP (next-devtools)

When bundled docs are unavailable or you need the site index / search:

1. **Fetch MCP resource** `nextjs-docs://llms-index` (server: `user-next-devtools`).
2. Find the correct path in the index for your topic.
3. Call MCP tool **`nextjs_docs`** with that **exact** `path` (optional `anchor`). Never invent paths.

When the dev server runs (Next.js 16+), also use **`nextjs_index`** / **`nextjs_call`** for live errors, routes, and project metadata.

---

## 4. React Server Components

For RSC boundaries and composition, also read [react.dev Server Components](https://react.dev/reference/rsc/server-components). Project `components` skill (`references/rsc-patterns.md`) applies stricter layout rules for this repo.

---

## 5. Project overrides

This repo’s skills **win** over generic doc snippets when they conflict:

| Concern                      | Skill                                        |
| ---------------------------- | -------------------------------------------- |
| File placement               | `folder-structure` + `references/folders.md` |
| Components / RSC file layout | `components`                                 |
| Streaming / skeletons        | `skeleton-loading`                           |
| Optimistic Server Actions UI | `optimistic-ui`                              |
| Import layers                | `folder-structure` rule (ESLint boundaries)  |

---

## 6. Deprecations and bans

Read [references/deprecations.md](references/deprecations.md) for patterns **forbidden** in this starter even if still documented for migration.

---

## 7. Checklist

- [ ] Checked `package.json` `next` version
- [ ] Read relevant doc (bundled and/or MCP)—not guessed from memory
- [ ] Confirmed API is not deprecated for this version
- [ ] Applied project skills for structure and UI
- [ ] App Router patterns only (unless repo already uses `pages/`)
