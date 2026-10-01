---
name: feature-docs
description: "Defines where and how to write feature documentation under docs/features/, including README hubs, flow docs, naming, and cross-links to src/features/. Use when documenting a feature, adding docs/features/, writing flow.md, updating feature README, or completing a feature that lacks docs."
---

# Feature documentation

Human-oriented docs live under **`docs/features/`**, separate from code under **`src/features/`**. Every top-level feature needs a doc folder with at least **`README.md`**.

Pair with the `folder-structure` skill (code paths) and the `testing` skill (test commands in README).

**New features:** the `planner` agent (feature mode) creates the initial doc **before implementation** using its richer template (goal, scope, flows, states, acceptance criteria, implementation breakdown, testing strategy, E2E maintenance notes). This skill governs placement, naming, and the README-hub structure; the planner template fills the content. The `tests` agent (write-e2e mode) later appends E2E scenarios, spec locations, and maintenance triggers.

---

## When to use

| Situation                                   | Action                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| New feature in `src/features/<name>/`       | Create `docs/features/<name>/README.md`                                                     |
| Multi-step user or async pipeline           | Add or update `flow.md` (or a topic-specific doc)                                           |
| Webhooks, tunnels, env-only setup           | Add `local-dev*.md` or an **Environment** section in README                                 |
| Significant behavior or architecture change | Update the relevant doc; link from README                                                   |
| Feature marked done / accepted              | Always update `docs/features/<slug>/README.md` (hub)—even if the user mainly asked for code |
| User asks only for code mid-feature         | Skip extra topic docs; still update the hub README when the feature finishes                |

---

## Placement (required)

```
docs/features/<feature-slug>/
├── README.md          # Required hub — always create/update first
├── flow.md            # End-to-end product + technical flow (when non-trivial)
└── <topic>.md         # Focused guides (auth flows, webhooks, domain rules, …)
```

**Default rule:** `<feature-slug>` = folder name under `src/features/` (kebab-case).

**Exceptions** (follow existing repo layout):

| Code path                           | Doc folder                | Notes                                                                                         |
| ----------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| `src/features/invoices/**`          | `docs/features/invoices/` | One hub for the whole invoices boundary; slice docs live here                                 |
| `src/features/invoices/importer/`   | `docs/features/importer/` | Large sub-slice with its own doc tree                                                         |
| `src/features/dashboard/` (pregled) | No dedicated folder yet   | Document under the owning product area or add `docs/features/dashboard/` when the slice grows |

Do **not** put feature docs in `src/features/`, `CLAUDE.md`, or root `README.md` except a one-line pointer when the feature is user-facing in setup guides.

Detail and decision tree: [references/placement.md](references/placement.md).

---

## Workflow

Copy and track:

```
- [ ] 1. Identify feature slug and existing docs
- [ ] 2. Read src/features/<slug>/ (and routes in src/app/)
- [ ] 3. Create or update docs/features/<slug>/README.md
- [ ] 4. Add topic docs only when README would become too long
- [ ] 5. Cross-link related features and list env vars (exact names)
- [ ] 6. Add test commands (Vitest path + Playwright path if E2E exists)
```

### Step 1 — Discover

- List `src/features/<slug>/` (`components/`, `server/`, `lib/`, `hooks/`, `types/`, `tests/`)
- Find routes: `src/app/**/page.tsx` that import the feature
- Check `docs/features/<slug>/` for existing files to extend, not replace blindly

### Step 2 — Write README.md (hub)

Every feature README must include:

1. **Purpose** — what the feature does for the user (1–3 sentences)
2. **Route(s)** — dashboard paths when applicable
3. **Documentation** — table or bullet list linking to sibling `.md` files
4. **Feature layout (code)** — table mapping `src/features/...` paths to roles
5. **Good entry points** — 5–10 concrete files newcomers should open first
6. **Notes** — couplings, shared `src/server/` modules, related features
7. **Environment** — only when the feature needs config (exact var names; see env-vars rule)
8. **Tests** — `pnpm exec vitest run src/features/<slug>/tests` and E2E path when present

Templates: [references/templates.md](references/templates.md).

### Step 3 — Topic and flow docs

| Doc kind               | Filename                               | Use when                                                      |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------- |
| End-to-end flow        | `flow.md`                              | Upload → async job → webhook → UI; wizard steps; auth journey |
| Architecture           | `architecture.md`                      | Runtime boundaries, logging contract, concurrency             |
| Local dev              | `local-dev.md`, `local-dev-webhook.md` | Tunnels, webhook secrets, dev-only flags                      |
| Single screen / action | `<topic>.md`                           | e.g. `sign-up.md`, `generator-flow.md`, `saving-data.md`      |
| Production ops         | `async-extract-production.md`          | Deployed webhook/async behavior                               |
| Follow-ups             | `fixes-and-followups.md`               | Known gaps (optional; keep short)                             |

**Naming:** kebab-case `.md` only. No `README` in subfolders.

**Flow doc content:** simplified product steps first, then technical flow; link back to README; use mermaid when the sequence helps (see `docs/features/tax-obligations/flow.md`, `docs/features/importer/flow.md`).

### Step 4 — Cross-links

- README links to every sibling doc; sibling docs link back to README in the first lines
- Related features: relative links, e.g. `[notifications](../notifications/README.md)`
- Code paths in backticks: `` `src/features/tax-obligations/server/upload.ts` ``
- Prefer tables for doc indexes and folder layout

### Step 5 — Keep docs truthful

- Derive paths and env from the codebase — do not guess
- When renaming/moving code, update docs in the same change when the user expects docs
- Match current file names (kebab-case components in newer features)

---

## Quality bar

- **Concise** — README is a map; deep detail belongs in topic docs
- **Scannable** — headings, tables, bullet lists
- **No secrets** — env table lists names and where to set them, not values
- **English** — same as existing `docs/features/` corpus (product copy in UI stays Serbian)

---

## Examples in this repo

| Feature         | Hub                                       | Notable siblings                                       |
| --------------- | ----------------------------------------- | ------------------------------------------------------ |
| Tax obligations | `docs/features/tax-obligations/README.md` | `flow.md`, IPS/QR guides, webhook local dev            |
| Importer        | `docs/features/importer/README.md`        | `flow.md`, `architecture.md`, `local-dev.md`           |
| Auth            | `docs/features/auth/README.md`            | Per-flow `login.md`, `sign-up.md`, …                   |
| Invoices        | `docs/features/invoices/README.md`        | Per-slice `generator-flow.md`, `number-patterns.md`, … |
| Onboarding      | `docs/features/onboarding/README.md`      | `saving-data.md`                                       |

---

## Related skills

- `folder-structure` — where code files live (`references/folders.md`)
- `testing` — Vitest vs Playwright placement
- `validation` / `logging` / `supabase` (if installed) — document schemas, webhook auth, migrations in topic docs when relevant
