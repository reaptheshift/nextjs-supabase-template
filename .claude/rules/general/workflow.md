---
description: Staged validation, feature-doc hub updates, and env/branch promote discipline
---

# Workflow (staged validation)

Full validation is never mandatory after every change. Preferences: `.claude/validation-preferences.yaml`. Shared agent rules: `.claude/conventions.md`.

## Stages

**A — before implementing** new features/pages/integrations: run `planner` (feature mode), get approval, then `planner` (plan mode) for non-trivial work. Load only relevant skills.

**B — while implementing:** lightweight checks from preferences (lint + typecheck via `reviewer`). `security-auditor` / `tests` (run, no E2E) only when their triggers apply. Never E2E, ui-qa, or compliance during construction.

**C — after user manual test:** `orchestrator` recommends the minimum set. User chooses recommended / selected / full / skip. On FAIL: fix and resume only failed + affected agents. Orchestrator always writes the report to `pipeline-reports/`.

When a feature is **done** (accepted or merged to the working branch): update `docs/features/<slug>/README.md` per the `feature-docs` skill (purpose, layout, entry points, links)—even if the user asked mainly for code.

## Promote & deploy

Env order: **local → staging → production** (see `env-vars` rule). Never promote straight to production. Git/branch policy: preferences + `git-agent` (early `main` OK; split `staging` before real prod hosting).

## Hard rules

- Missing tool/credential ⇒ `tool_not_available` — never fabricate a pass
- Destructive git/deploy/migration needs explicit approval (`git-agent` confirms each step)
- a11y is advisory unless preferences say otherwise
- Commands run exactly the named agent/mode

## Skip validation

Guidance-only edits under `.claude/`, `CLAUDE.md` (unless asked). Question-only / read-only requests.
