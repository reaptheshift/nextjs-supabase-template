---
name: project-setup
description: Bootstraps a new or existing Next.js project—git init, pnpm, latest stack packages, ESLint boundaries, vendor skills, and optional Supabase dual-cloud guidance. Use when starting from a GitHub template, running /setup-project, adding Supabase, or refreshing skills/packages.
disable-model-invocation: true
---

# Project setup

Run via `/setup-project` (full), `/setup-project skills`, or `/setup-project supabase`.

Intended for a **GitHub template** (thin Next.js scaffold + this guidance pack). `/setup-project` always refreshes to current stack—do not rely on pinned-old template deps.

## Modes

| Mode               | Does                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **full** (default) | git → pnpm → upgrade stack → Prettier (+ Tailwind plugin) → boundaries → typecheck → vendor skills → env stubs → (if Supabase) cloud projects note |
| **skills**         | Reinstall matching vendor skills fresh                                                                                                             |
| **supabase**       | Supabase vendor skills + dual-cloud free-plan checklist                                                                                            |

## 1. Git (always)

If `.git` is missing: `git init`. Do not force first commit—ask the user. Never rewrite existing history.

## 2. Package manager

1. Require **pnpm** on PATH
2. `"packageManager": "pnpm@<version>"` in `package.json`
3. Parent home workspace? Project `.npmrc`: `ignore-workspace=true`; use `pnpm --ignore-workspace` if installs still nest under the parent
4. Prefer `pnpm-lock.yaml`; convert from npm via `pnpm import` then delete `package-lock.json`
5. `pnpm install`
6. Only `pnpm add` / `exec` / `dlx` — never npm/npx/yarn

## 3. Refresh stack to latest (full mode)

Ask before major upgrades if the app already has real product code. On a fresh template, upgrade freely:

| Piece                        | Action                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Next.js + eslint-config-next | Latest matching major for the template (App Router)                                                               |
| React / react-dom            | Versions required by that Next release                                                                            |
| Tailwind / PostCSS           | Project’s current major                                                                                           |
| shadcn                       | If `components.json`: `pnpm dlx shadcn@latest` (info / add as needed); keep **shadcn** skill fresh                |
| Supabase                     | If used: ensure CLI available (`pnpm dlx supabase` or global); `@supabase/ssr` + js client current; skills via §5 |
| Vendor skills                | Always refresh (§5)                                                                                               |

Then `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check`.

## 4. Prettier + Tailwind class sorting (always)

Required on every project start:

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Add `prettier.config.mjs` (plugins array must list `prettier-plugin-tailwindcss` **last**):

```js
/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css", // adjust if CSS entry differs
  tailwindFunctions: ["cn", "cva"],
};

export default config;
```

Add `.prettierignore` (`node_modules`, `.next`, `out`, `build`, locks, `coverage`, `pipeline-reports`, `.env*`, `.agents`, and **vendor** skill folders under `.cursor/skills/`—do not reformat upstream skills).

Scripts:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

Confirm: `pnpm format:check`.

## 4b. Editor recommendations (Cursor / VS Code)

Commit `.vscode/extensions.json` and `.vscode/settings.json` (Prettier as default formatter, format on save, **built-in** bracket pair colorization—do not install the deprecated Bracket Pair Colorizer extension).

Recommended extensions:

| ID | Purpose |
|----|---------|
| `bradlc.vscode-tailwindcss` | Tailwind IntelliSense |
| `stivo.tailwind-fold` | Fold long `className` strings |
| `oderwat.indent-rainbow` | Colored indent guides |
| `mechatroner.rainbow-csv` | CSV column colors |
| `esbenp.prettier-vscode` | Prettier in the editor (pairs with repo Prettier + Tailwind plugin) |
| `PKief.material-icon-theme` | Material Icon Theme (file/folder icons) |
| `donjayamanne.githistory` | Git file/line history |
| `mikestead.dotenv` | `.env` / `.env.example` syntax (optional but useful) |
| `pranaygp.vscode-css-peek` | Peek/go-to CSS definitions |
| `formulahendry.auto-rename-tag` | Rename matching JSX/HTML tags |

**Always ask the user** before installing any of these (CLI or otherwise). List IDs + purpose; install only approved ones via `cursor --install-extension <id>` or `code --install-extension <id>` when the CLI exists. If they decline or the CLI is missing, keep the recommendations file (workspace can still prompt) and continue setup. Never fail `/setup-project` because an extension was skipped.

## 5. ESLint boundaries

`pnpm add -D eslint-plugin-boundaries`. Merge layers matching **folder-structure** (shared / feature / app / neverImport). Use the repo’s `eslint.config.mjs` as the template. Scripts: `"lint": "eslint"`, `"typecheck": "tsc --noEmit"`. Boundaries errors → move/promote file; never disable the rule.

## 6. Vendor skills (fresh)

- Always: `vercel-react-best-practices`, `web-design-guidelines`, `find-skills`
- `components.json` → `shadcn`
- `supabase/` or `@supabase/*` → `supabase`, `supabase-postgres-best-practices`

```bash
pnpm dlx skills add <source> --skill <name> --agent cursor --yes
cp -R .agents/skills/<name> .cursor/skills/<name>
rm -rf .agents
```

| Skill                              | Source                     |
| ---------------------------------- | -------------------------- |
| `vercel-react-best-practices`      | `vercel-labs/agent-skills` |
| `web-design-guidelines`            | `vercel-labs/agent-skills` |
| `find-skills`                      | `vercel-labs/skills`       |
| `shadcn`                           | `shadcn/ui`                |
| `supabase`                         | `supabase/agent-skills`    |
| `supabase-postgres-best-practices` | `supabase/agent-skills`    |

Commit skills + `skills-lock.json`. Reference vendor skills **by name only**.

## 7. Env stubs

Ensure `.env.example` exists (names only, grouped short comments—**env-vars** rule). Secrets go in `.env.local` (gitignored). Do not invent secret values.

## 8. Supabase free-plan / MVP (when Supabase is in the stack)

Do **not** rely on Supabase Pro branching. Use **three** environments:

| Env            | What                                |
| -------------- | ----------------------------------- |
| **Local**      | `supabase start` (local stack)      |
| **Staging**    | Separate **cloud** Supabase project |
| **Production** | Separate **cloud** Supabase project |

Create two cloud projects (staging + production). Wire distinct URL/anon/service keys per env via Vercel/host env (staging vs production). Migrations apply to local first, then staging, then production—never production first. See **server** rule.

## 9. Output

Report: git status, pnpm/Next versions, Prettier + Tailwind plugin, lint + typecheck + format:check, skills installed, env stub presence, Supabase dual-cloud checklist if applicable.
