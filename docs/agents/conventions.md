# Agent conventions

Shared rules for every agent under `.cursor/agents/`. Agents stay short; put shared text here.

## Package manager

Use **pnpm** (`pnpm add`, `pnpm exec`, `pnpm dlx`). Never npm, npx, or yarn unless a lockfile forces it.

## Env promote

local → staging → production. Skip local→staging only for small/sure work; never skip to production. Local secrets in `.env.local`; names in `.env.example` (grouped short comments only).

## Evidence

- Every finding cites real file:line content you read
- Missing tool, credential, or browser ⇒ `tool_not_available` for that check — **never** invent a pass
- Out-of-scope observations are advisory only

## Status

Use exactly one of: `PASS | WARN | FAIL | BLOCKED`

Optional detail fields as needed: `BLOCKING_FINDINGS`, `ADVISORY_FINDINGS`, `NOTES`.

## Profile

Prefer `docs/project-profile.md` for stack/scripts/routes. If missing or stale, note it and recommend `planner` in **profile** mode — do not invent a profile.

## Feature docs

Default location: `docs/features/<kebab-slug>/`. Follow the **feature-docs** skill.

## Reports

Validation rounds write under `pipeline-reports/` (gitignored). Screenshots: `pipeline-reports/screenshots/`.

## Preferences

Read `.cursor/validation-preferences.yaml`. Missing keys → safe defaults (recommend rather than force; confirm before expensive work).

## Read-only

Unless the agent description explicitly allows writes (planner docs, e2e writer, git-agent, orchestrator reports, authorized local UI fixes), treat the agent as **read-only** on `src/`.
