# Next.js + Supabase guidance pack

**Cursor-first** template for MVP apps: **rules, skills, agents, and commands**—not a pre-built Next.js app.

Use this repo as a **GitHub template** (or clone) → open in Cursor → run **`/setup-project`**. That command creates the app and installs the stack.

## What this is

| Ships in the template | Created by `/setup-project` |
| --- | --- |
| `.cursor/` rules, project skills, agents, commands | Next.js App Router + TypeScript + Tailwind |
| `AGENTS.md` | shadcn/ui init |
| `docs/agents/` | Supabase clients (+ optional `supabase init`) |
| `.vscode/` recommendations | Prettier, ESLint boundaries, env stubs |
| This README | Vendor skills (`shadcn`, `supabase`, …) |
| | Editor extensions (asks first) |

## How it helps

| Layer | Job |
| --- | --- |
| **Rules** | Rails the model must follow |
| **Skills** | Playbooks for a task (project-owned here; vendor installed on setup) |
| **Agents** | Specialists: plan, review, security, tests, UI QA, git, orchestrate |
| **Commands** | Slash entry points |
| **AGENTS.md** | Stack map every session can see |

**Mental model:** rules = rails · skills = playbooks · agents = specialists · commands = buttons · `/setup-project` = build the runnable app from this pack.

---

## Quick start

1. **Use this template** on GitHub (or clone).
2. Open the folder in **Cursor**.
3. Run **`/setup-project`** (full).
4. Approve extensions you want when asked.
5. Copy `.env.example` → `.env.local` and fill Supabase values.
6. `pnpm dev`

Modes: `/setup-project` · `/setup-project skills` · `/setup-project supabase`.

---

## Stack (after setup)

- Next.js App Router + React + TypeScript
- **pnpm** only
- Tailwind + Prettier (`prettier-plugin-tailwindcss`)
- shadcn/ui
- Supabase (`@supabase/ssr` + js client; local + two cloud projects)
- ESLint + `eslint-plugin-boundaries`

---

## General thinking

1. **Simplicity** — obvious over clever; no architecture “for later.”
2. **Feature ownership** — `src/features/<name>/`; ask for the name before creating; promote to `src/` only when 2+ features need it.
3. **Visible vs invisible backend** — user CRUD → Next; webhooks/cron/jobs → Supabase. Job UI: poll/refetch the DB row (Realtime opt-in).
4. **Env promote** — local → staging → production; never skip to production.
5. **Staged validation** — plan → build with light checks → after you manually test, `/validate` (orchestrator).
6. **Evidence** — agents cite real files; missing tools → `tool_not_available`.

---

## Supabase: three environments (free-plan MVP)

| Env | What |
| --- | --- |
| **Local** | `supabase start` |
| **Staging** | Separate cloud Supabase project |
| **Production** | Separate cloud Supabase project |

Same env **names**; different **values** per host. Migrate local → staging → production.

---

## Rules (`.cursor/rules/`)

**Always-on:** `code-writing`, `simplicity`, `folder-structure`, `workflow`, `backend-placement`, `nextjs-docs`.

**Path-scoped:** `frontend`, `server`, `tests`, `env-vars`, `meta/authoring`.

---

## Skills

### Project-owned (in this template)

`project-setup` · `folder-structure` · `components` · `skeleton-loading` · `optimistic-ui` · `validation` · `logging` · `testing` · `feature-docs` · `nextjs-docs`

### Vendor (installed by `/setup-project`)

`shadcn` · `supabase` · `supabase-postgres-best-practices` · `vercel-react-best-practices` · `web-design-guidelines` · `find-skills`

---

## Agents

Shared: [`docs/agents/conventions.md`](docs/agents/conventions.md). Preferences: `.cursor/validation-preferences.yaml`.

| Agent | Role |
| --- | --- |
| `planner` | profile / feature / plan |
| `reviewer` | lint, typecheck, compliance |
| `security-auditor` | secrets, RLS, authz, validation |
| `tests` | run / write-e2e |
| `ui-qa` | visual, a11y, perf |
| `git-agent` | commit / push / deploy (confirm each step) |
| `orchestrator` | minimum validation set + `pipeline-reports/` |

---

## Commands

`/setup-project` · `/plan-feature` · `/review` · `/security-audit` · `/run-tests` · `/build-e2e-tests` · `/ui-qa` · `/validate` · `/commit` · `/push` · `/deploy-staging`

---

## What stays in git (template)

```
.cursor/          # rules, project skills, agents, commands
.vscode/          # extension + format recommendations
AGENTS.md
CLAUDE.md
README.md
docs/agents/
.gitignore
```

App files (`package.json`, `src/`, lockfiles, `skills-lock.json`, vendor skills under `.cursor/skills/`) appear **after** `/setup-project` and belong in your product repo—not in this empty template.
