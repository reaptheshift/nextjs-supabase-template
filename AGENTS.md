<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project guidance

## Stack

- Target: Next.js App Router + TypeScript + Tailwind + shadcn/ui + Supabase
- This clone may be **guidance-only** until `/setup-project` creates the app
- Package manager: **pnpm** — use `pnpm add`, `pnpm exec`, `pnpm dlx`; never npm, npx, or yarn
- Supabase + vendor skills: installed via `/setup-project` (see **server** rule)

## Always-on principles

Follow `.cursor/rules/general/` — **code-writing**, **simplicity**, **folder-structure**, **workflow**, **backend-placement** — and **nextjs-docs**.

## Skills (project)

| Skill              | Use when                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `nextjs-docs`      | App Router / Server Actions / caching APIs                                                                              |
| `folder-structure` | Where a file goes (details beyond the rule)                                                                             |
| `components`       | `.tsx` design, RSC split, a11y                                                                                          |
| `skeleton-loading` | loading.tsx / Suspense skeletons                                                                                        |
| `optimistic-ui`    | Instant Server Action feedback                                                                                          |
| `validation`       | Zod schemas and server parse                                                                                            |
| `logging`          | Server / Edge logging                                                                                                   |
| `testing`          | Vitest / Playwright pyramid                                                                                             |
| `feature-docs`     | `docs/features/` documentation                                                                                          |
| `project-setup`    | `/setup-project` — from empty pack: create Next app, shadcn, Supabase, Prettier, boundaries, vendor skills, extensions ask, dual-cloud note |

Vendor skills (`shadcn`, `supabase`, `supabase-postgres-best-practices`, `vercel-react-best-practices`, `web-design-guidelines`, `find-skills`) are **not** in the empty template—installed fresh by `/setup-project` and referenced **by name only**.

## Agents

Shared conventions: `docs/agents/conventions.md`. Preferences: `.cursor/validation-preferences.yaml`.

| Agent              | Role                                                |
| ------------------ | --------------------------------------------------- |
| `planner`          | profile / feature / plan modes                      |
| `reviewer`         | lint, typecheck, quality, compliance                |
| `security-auditor` | secrets, RLS, authz, validation                     |
| `tests`            | run / write-e2e                                     |
| `ui-qa`            | visual, figma, a11y, runtime perf                   |
| `git-agent`        | status / commit / push / deploy (confirm each step) |
| `orchestrator`     | recommend + run approved set; always writes report  |

## Commands

`/setup-project` · `/plan-feature` · `/review` · `/security-audit` · `/run-tests` · `/build-e2e-tests` · `/ui-qa` · `/validate` · `/commit` · `/push` · `/deploy-staging`
