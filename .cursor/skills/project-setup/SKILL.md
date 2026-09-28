---
name: project-setup
description: Bootstraps a Next.js + Supabase MVP from this guidance pack—create-next-app if missing, pnpm, shadcn, Supabase, Prettier, ESLint boundaries, vendor skills, env stubs, editor extensions. Use for /setup-project, fresh clones, or refreshing skills/packages.
disable-model-invocation: true
---

# Project setup

Run via `/setup-project` (full), `/setup-project skills`, or `/setup-project supabase`.

This repo is a **guidance pack** (`.cursor/` + `AGENTS.md`), not a pre-built app. **Full mode creates the app** when `package.json` is missing. Always install current stack versions—do not pin stale deps in the template.

## Modes

| Mode | Does |
| --- | --- |
| **full** (default) | Detect empty vs existing → (if needed) create Next app → git → pnpm → shadcn → Supabase clients → Prettier → ESLint boundaries → typecheck → vendor skills → env stubs → editor recs (ask before install) → dual-cloud note |
| **skills** | Reinstall vendor skills fresh |
| **supabase** | Supabase packages/skills + dual-cloud free-plan checklist |

## 0. Detect project state (full)

| State | Signal | Action |
| --- | --- | --- |
| **Empty / guidance-only** | No `package.json` | §0b bootstrap, then continue §1–9 |
| **Existing app** | `package.json` present | Skip create-next-app; ask before major upgrades if real product code exists; continue §1–9 |

### 0b. Bootstrap Next.js (when no `package.json`)

Require **pnpm** on PATH. From the repo root (where `.cursor/` and `AGENTS.md` live):

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm --yes
```

If the tool rejects a non-empty directory (because `.cursor/` exists), create into a temp dir and move app files up, **without** overwriting `.cursor/`, `AGENTS.md`, `CLAUDE.md`, `docs/`, `README.md`, or `.vscode/`:

```bash
pnpm create next-app@latest /tmp/nextjs-supabase-bootstrap --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm --yes
# copy package.json, pnpm-lock.yaml, src/, public/, next.config.*, tsconfig.json, postcss.*, eslint.* from temp into repo root
rm -rf /tmp/nextjs-supabase-bootstrap
```

Then continue with the rest of full mode (do not stop after create-next-app).

## 1. Git (always)

If `.git` is missing: `git init`. Do not force first commit—ask the user. Never rewrite existing history.

## 2. Package manager

1. Require **pnpm** on PATH
2. `"packageManager": "pnpm@<version>"` in `package.json`
3. Parent home workspace? Project `.npmrc`: `ignore-workspace=true`; use `pnpm --ignore-workspace` if installs still nest under the parent
4. Prefer `pnpm-lock.yaml`; convert from npm via `pnpm import` then delete `package-lock.json`
5. `pnpm install`
6. Only `pnpm add` / `exec` / `dlx` — never npm, npx, or yarn

## 3. Stack: Next, shadcn, Supabase (full)

Ask before major upgrades if the app already has real product code. On a fresh bootstrap, install freely.

| Piece | Action |
| --- | --- |
| Next.js + eslint-config-next | Already from create-next-app, or bump to latest matching major (App Router) |
| React / react-dom | Versions required by that Next release |
| Tailwind / PostCSS | Project’s current major |
| **shadcn** | If no `components.json`: `pnpm dlx shadcn@latest init` (defaults aligned with App Router + `src/`). Then ensure `src/lib/utils.ts` (`cn`) exists. Skill: **shadcn** (§6) |
| **Supabase** | `pnpm add @supabase/supabase-js @supabase/ssr`. Offer `pnpm dlx supabase init` if no `supabase/` folder (ask). CLI via `pnpm dlx supabase`. Skills via §6 |
| Vendor skills | Always refresh (§6) |

Scripts to ensure: `"lint": "eslint"`, `"typecheck": "tsc --noEmit"`, plus format scripts from §4.

Then `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

## 4. Prettier + Tailwind class sorting (always)

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Write `prettier.config.mjs` (or copy `references/prettier.config.mjs` from this skill). Plugins array must list `prettier-plugin-tailwindcss` **last**. Write `.prettierignore` from `references/prettierignore`.

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

Confirm: `pnpm format:check`.

## 4b. Editor recommendations (Cursor / VS Code)

Ensure `.vscode/extensions.json` and `.vscode/settings.json` exist (copy from this pack’s `.vscode/` if present, else write from skill defaults: Prettier default formatter, format on save, built-in bracket pair colorization, Material Icon Theme as `workbench.iconTheme`). Do **not** install the deprecated Bracket Pair Colorizer extension.

Recommended extensions:

| ID | Purpose |
| --- | --- |
| `bradlc.vscode-tailwindcss` | Tailwind IntelliSense |
| `stivo.tailwind-fold` | Fold long `className` strings |
| `oderwat.indent-rainbow` | Colored indent guides |
| `mechatroner.rainbow-csv` | CSV column colors |
| `esbenp.prettier-vscode` | Prettier in the editor |
| `PKief.material-icon-theme` | Material Icon Theme |
| `donjayamanne.githistory` | Git file/line history |
| `mikestead.dotenv` | `.env` syntax |
| `pranaygp.vscode-css-peek` | Peek CSS definitions |
| `formulahendry.auto-rename-tag` | Rename matching JSX/HTML tags |

**Always ask the user** before installing. List IDs + purpose; install only approved ones via `cursor --install-extension <id>` or `code --install-extension <id>`. If they decline or the CLI is missing, keep the recommendations file and continue. Never fail setup because an extension was skipped.

## 5. ESLint boundaries

```bash
pnpm add -D eslint-plugin-boundaries
```

Merge boundaries into `eslint.config.mjs` using `references/eslint-boundaries.mjs` (shared / feature / app / neverImport). Scripts: `"lint": "eslint"`, `"typecheck": "tsc --noEmit"`. Boundaries errors → move/promote file; never disable the rule.

## 6. Vendor skills (fresh)

This pack ships **project-owned** skills only. Full / skills / supabase modes install vendor skills into `.cursor/skills/` (never hand-edit upstream content).

**Always (full + skills):**

- `vercel-react-best-practices`, `web-design-guidelines`, `find-skills`, `shadcn`

**Always for this stack (full + supabase; also on skills when refreshing all):**

- `supabase`, `supabase-postgres-best-practices`

```bash
pnpm dlx skills add <source> --skill <name> --agent cursor --yes
cp -R .agents/skills/<name> .cursor/skills/<name>
rm -rf .agents
```

| Skill | Source |
| --- | --- |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` |
| `web-design-guidelines` | `vercel-labs/agent-skills` |
| `find-skills` | `vercel-labs/skills` |
| `shadcn` | `shadcn/ui` |
| `supabase` | `supabase/agent-skills` |
| `supabase-postgres-best-practices` | `supabase/agent-skills` |

Commit installed skills + `skills-lock.json` with the app (generated locally—not part of the empty template). Reference vendor skills **by name only**.

## 7. Env stubs

Write `.env.example` from `references/env.example` (names only—**env-vars** rule). Secrets go in `.env.local` (gitignored). Do not invent secret values.

## 8. Supabase free-plan / MVP (full + supabase)

Do **not** rely on Supabase Pro branching. Use **three** environments:

| Env | What |
| --- | --- |
| **Local** | `supabase start` |
| **Staging** | Separate **cloud** Supabase project |
| **Production** | Separate **cloud** Supabase project |

Create two cloud projects (staging + production). Wire distinct URL/anon/service keys per host env. Migrations: local → staging → production—never production first. See **server** + **backend-placement** rules.

## 9. Output

Report: empty vs existing start, Next/pnpm versions, shadcn init status, Supabase packages/`supabase/` folder, Prettier + boundaries, lint + typecheck + format:check, skills installed, env stub, extensions asked/installed, dual-cloud checklist.
