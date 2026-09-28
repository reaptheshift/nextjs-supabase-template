# Next.js + Supabase template

Public **Cursor-first** starter for MVP apps on **Next.js App Router**, **TypeScript**, **Tailwind**, **shadcn/ui**, and **Supabase**.

The app scaffold is intentionally thin. The real product is the **guidance pack**: rules, skills, agents, and slash commands that keep AI coding fast, consistent, and safe for small teams shipping features.

Use this repo as a **GitHub template** → open in Cursor → run `/setup-project`.

## What this is for

- Greenfield or early-stage products where agents do most of the implementation
- Teams that want **one stack opinion** instead of rediscovering structure every chat
- MVPs on Supabase **free plan** (local + two cloud projects—no Pro branching required)

## How it helps

| Layer | Job |
| --- | --- |
| **Rules** (`.cursor/rules/`) | Always-on or path-scoped constraints the model must follow |
| **Skills** (`.cursor/skills/`) | Deep how-to for a task (loaded when relevant) |
| **Agents** (`.cursor/agents/`) | Named roles: plan, review, security, tests, UI QA, git, orchestrate |
| **Commands** (`.cursor/commands/`) | Slash entry points that invoke the right agent/skill |
| **AGENTS.md** | Stack map + skill/agent index every session can see |

**Mental model:** rules = rails; skills = playbooks; agents = specialists; commands = buttons; orchestrator = which specialists to run after you manually tested a change.

---

## Stack

- **Next.js** App Router + React + TypeScript
- **pnpm** only (`pnpm add` / `exec` / `dlx` — never npm/npx/yarn)
- **Tailwind CSS** + **Prettier** (`prettier-plugin-tailwindcss`)
- **shadcn/ui** (`components.json` present)
- **Supabase** client packages included; CLI + project wiring via `/setup-project`
- **ESLint** + `eslint-plugin-boundaries` (features cannot import other features)

---

## General thinking (defaults)

1. **Simplicity first** — obvious over clever; no architecture “for later”; delete dead code with the change.
2. **Feature ownership** — business capability lives in `src/features/<name>/`; ask for the feature name before creating one; promote to `src/` only when 2+ features need it.
3. **Visible vs invisible backend**
   - User-triggered CRUD / forms → **Next.js** (Server Actions, thin APIs, feature `server/`)
   - Webhooks, provider callbacks, cron, background jobs → **Supabase** (Edge Functions, triggers, `pg_cron`) — not Vercel routes “so the UI updates faster”
4. **Job UI sync** — DB row is source of truth; **short-poll / refetch** while pending; Realtime only when polling is clearly worse.
5. **Env promote** — **local → staging → production**; never skip straight to production.
6. **Staged validation** — plan before big work; light lint/typecheck while building; full agent set only after you have manually tested (orchestrator recommends the minimum set).
7. **Evidence** — agents cite real files; missing tools → `tool_not_available`, never a fake pass.

Details: `.cursor/rules/general/*`, `docs/agents/conventions.md`.

---

## Supabase: three environments (free-plan MVP)

Do **not** depend on Supabase Pro branching. Use:

| Environment | What |
| --- | --- |
| **Local** | `supabase start` on your machine |
| **Staging** | Separate **cloud** Supabase project |
| **Production** | Separate **cloud** Supabase project |

- Same **names** in `.env.example` / `src/lib/env.ts`; different **values** per host env
- Migrate **local → staging → production** (never production first)
- Secrets in `.env.local` (gitignored); names only in `.env.example`
- RLS on exposed tables; no service-role clients in `"use client"` modules

`/setup-project` (or `/setup-project supabase`) walks the dual-cloud checklist and refreshes Supabase vendor skills.

---

## Rules (`.cursor/rules/`)

### Always-on (`alwaysApply`)

| Rule | Purpose |
| --- | --- |
| `general/code-writing` | Structure, naming, function declarations, ask-first on ambiguity |
| `general/simplicity` | No overstructure; colocate until a second consumer |
| `general/folder-structure` | `app` vs `features` vs shared; kebab-case; no feature→feature imports |
| `general/workflow` | Stages A/B/C, feature README hubs, promote discipline |
| `general/backend-placement` | Visible → Next; invisible → Supabase; poll default |
| `nextjs-docs` | Read installed Next docs before App Router / cache / actions changes |

### Path-scoped

| Rule | When |
| --- | --- |
| `frontend` | `src/**/*.tsx` — RSC, skeletons, optimistic UI, shadcn, Tailwind scale |
| `server` | Server/API/Supabase paths — Zod, logging, RLS, dual-cloud |
| `tests` | Test files / gates |
| `general/env-vars` | Env files / `env.ts` / next config |
| `meta/authoring` | Editing rules/skills/agents themselves |

Entry index for agents: **`AGENTS.md`**.

---

## Skills (`.cursor/skills/`)

### Project skills (owned by this template)

| Skill | Use when |
| --- | --- |
| `project-setup` | `/setup-project` — git, pnpm, stack refresh, Prettier, boundaries, vendor skills, Supabase checklist |
| `folder-structure` | Where a file belongs (beyond the short rule) |
| `components` | `.tsx` design, RSC split, a11y |
| `skeleton-loading` | `loading.tsx` / Suspense skeletons |
| `optimistic-ui` | Instant Server Action feedback |
| `validation` | Zod schemas + server parse |
| `logging` | Server / Edge logging |
| `testing` | Vitest / Playwright pyramid |
| `feature-docs` | `docs/features/<slug>/README.md` hubs |
| `nextjs-docs` | Installed Next.js docs + deprecations |

### Vendor skills (refreshed by `/setup-project`)

| Skill | Source intent |
| --- | --- |
| `shadcn` | Official shadcn CLI / composition |
| `supabase` | Supabase platform patterns |
| `supabase-postgres-best-practices` | Postgres / RLS / indexes |
| `vercel-react-best-practices` | React/Next performance |
| `web-design-guidelines` | UI quality checklist |
| `find-skills` | Discover additional skills |

Reference vendor skills **by name**; reinstall fresh on setup—do not hand-edit upstream content.

---

## Agents (`.cursor/agents/`)

Shared conventions: [`docs/agents/conventions.md`](docs/agents/conventions.md). Preferences: `.cursor/validation-preferences.yaml`.

| Agent | Role |
| --- | --- |
| `planner` | **profile** / **feature** / **plan** — docs only, no app source |
| `reviewer` | Lint, typecheck, maintainability, rules/skills compliance |
| `security-auditor` | Secrets, RLS, authz, validation, server/client boundary |
| `tests` | Run Vitest/Playwright, or write E2E after gates |
| `ui-qa` | Visual, responsive, a11y, optional Figma / runtime perf |
| `git-agent` | Status / commit / push / deploy — confirms each step |
| `orchestrator` | Recommends minimum validation set; runs approved agents; always writes `pipeline-reports/` |

**Typical loop:** planner → implement → you click through the UI → `/validate` (orchestrator) → fix failures → `/commit`.

---

## Commands (`.cursor/commands/`)

| Command | Invokes |
| --- | --- |
| `/setup-project` | project-setup (full / skills / supabase) |
| `/plan-feature` | planner |
| `/review` | reviewer |
| `/security-audit` | security-auditor |
| `/run-tests` | tests (run) |
| `/build-e2e-tests` | tests (write-e2e) |
| `/ui-qa` | ui-qa |
| `/validate` | orchestrator |
| `/commit` · `/push` · `/deploy-staging` | git-agent |

---

## Quick start

1. Click **Use this template** on GitHub (or clone).
2. Open the folder in **Cursor**.
3. Install deps: `pnpm install`
4. Run **`/setup-project`** — refreshes the stack, Prettier+Tailwind plugin, boundaries, vendor skills; asks before installing recommended VS Code/Cursor extensions.
5. Copy `.env.example` → `.env.local` and fill Supabase local (then staging/production host envs).
6. `pnpm dev`

Editor recommendations live in `.vscode/extensions.json` (Tailwind, Prettier, Material Icon Theme, etc.). Setup asks before installing any of them.

---

## Repo layout (what to keep)

```
AGENTS.md                 # Agent entry map
CLAUDE.md                 # Points at AGENTS.md
README.md                 # This file
.cursor/
  rules/                  # Rails
  skills/                 # Playbooks
  agents/                 # Specialists
  commands/               # Slash commands
  validation-preferences.yaml
docs/agents/              # Shared agent conventions
src/app/                  # Thin App Router shell
src/lib/utils.ts          # shadcn `cn` helper
.env.example              # Env names only
```

Product features go under `src/features/<feature>/` after you name them. Validation artifacts under `pipeline-reports/` are gitignored.

---

## License / intent

Starter template for shipping MVPs with agent discipline. Fork it, tighten rules for your team, and keep `/setup-project` in the loop so vendor skills and packages stay current.
