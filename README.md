# Next.js + Supabase guidance pack

Multi-agent template for MVP apps: **rules, skills, agents, and commands** for both **Claude Code** and **Cursor**—not a pre-built Next.js app.

Use this repo as a **GitHub template** (or clone) → open in Claude Code or Cursor → run **`/setup-project`**. That command creates the app and installs the stack.

## Claude Code and Cursor

The pack ships two **independent** setups with the same rules, skills, agents, and commands. They work side by side—teammates can use either tool on the same repo—and nothing is linked or synced between them.

| Tool            | Entry point | Setup folder | Agent conventions        | Preferences                          |
| --------------- | ----------- | ------------ | ------------------------ | ------------------------------------ |
| **Claude Code** | `CLAUDE.md` | `.claude/`   | `.claude/conventions.md` | `.claude/validation-preferences.yaml` |
| **Cursor**      | `AGENTS.md` | `.cursor/`   | `docs/agents/conventions.md` | `.cursor/validation-preferences.yaml` |

**Only using one tool?** Delete the other one's files—you keep every rule, skill, agent, and command:

- Claude Code only → delete `.cursor/`, `AGENTS.md`, `docs/agents/`
- Cursor only → delete `.claude/`, `CLAUDE.md`

**Using both?** An edit on one side does not reach the other. Change both when you want them to stay in step.

## What this is

| Ships in the template | Created by `/setup-project` |
| --- | --- |
| `.claude/` + `CLAUDE.md` (Claude Code) | Next.js App Router + TypeScript + Tailwind |
| `.cursor/` + `AGENTS.md` + `docs/agents/` (Cursor) | shadcn/ui init |
| Rules, project skills, agents, commands (in each setup) | Supabase clients (+ optional `supabase init`) |
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
| **CLAUDE.md / AGENTS.md** | Stack map every session can see |

**Mental model:** rules = rails · skills = playbooks · agents = specialists · commands = buttons · `/setup-project` = build the runnable app from this pack.

---

## Quick start

1. **Use this template** on GitHub (or clone).
2. Open the folder in **Claude Code** or **Cursor** (optionally delete the other tool's files—see *Claude Code and Cursor*).
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

## Rules (`.claude/rules/` · `.cursor/rules/`)

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

Conventions: `.claude/conventions.md` (Claude Code) · [`docs/agents/conventions.md`](docs/agents/conventions.md) (Cursor). Preferences: `validation-preferences.yaml` inside each setup folder.

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
.claude/          # Claude Code: rules, project skills, agents, commands
.cursor/          # Cursor: rules, project skills, agents, commands
.vscode/          # extension + format recommendations
AGENTS.md
CLAUDE.md
README.md
docs/agents/
.gitignore
```

App files (`package.json`, `src/`, lockfiles, `skills-lock.json`, vendor skills under `.claude/skills/` or `.cursor/skills/`) appear **after** `/setup-project` and belong in your product repo—not in this empty template.
