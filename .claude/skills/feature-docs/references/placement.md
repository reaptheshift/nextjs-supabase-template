# Feature doc placement

## Decision tree

```
New or updated documentation?
├─ App-wide setup, stack, deploy? → repo root README.md or docs/ (not docs/features/)
├─ Agent / Claude conventions? → CLAUDE.md, .claude/skills/ (not docs/features/)
└─ One product domain / src/features boundary?
   ├─ Top-level src/features/<slug>/ → docs/features/<slug>/
   ├─ Large sub-slice with own lifecycle (importer) → docs/features/importer/
   └─ Small slice inside invoices (generator, preview, …) → docs/features/invoices/<slice-topic>.md
```

## Slug ↔ code mapping

| Doc path                         | Code root                             | Route examples                           |
| -------------------------------- | ------------------------------------- | ---------------------------------------- |
| `docs/features/auth/`            | `src/features/auth/`                  | `/login`, `/sign-up`, `/forgot-password` |
| `docs/features/onboarding/`      | `src/features/onboarding/`            | `/onboarding`                            |
| `docs/features/company/`         | `src/features/company/`               | (embedded in settings tab)               |
| `docs/features/settings/`        | `src/features/settings/`              | `/settings`                              |
| `docs/features/notifications/`   | `src/features/notifications/`         | (bell in layout)                         |
| `docs/features/tax-obligations/` | `src/features/tax-obligations/`       | `/obaveze/doprinosi`                     |
| `docs/features/invoices/`        | `src/features/invoices/` (all slices) | `/fakture/*`                             |
| `docs/features/importer/`        | `src/features/invoices/importer/`     | `/fakture` (Sheet)                       |

When a new top-level folder appears under `src/features/`, add **`docs/features/<same-slug>/README.md`** in the same PR or immediately after the feature lands.

## What does not get a doc folder

| Path                             | Reason                                                                |
| -------------------------------- | --------------------------------------------------------------------- |
| `src/components/ui/`             | shadcn primitives — no feature doc                                    |
| `src/server/` shared modules     | Mention in the consuming feature README (**Server contract** section) |
| `src/lib/` shared utilities      | Link from feature doc when the feature depends on them                |
| One-off scripts under `scripts/` | Root README or feature local-dev doc                                  |

## Shared server code pattern

When logic lives outside the feature folder (common for settings, company):

```markdown
## Server contract (shared)

Logic lives in `src/server/`, not under this feature folder:

| Module                        | Used by                             |
| ----------------------------- | ----------------------------------- |
| `src/server/user-settings.ts` | `getMySettings`, `updateMySettings` |
```

See `docs/features/settings/README.md`.

## E2E docs

Playwright specs live under `e2e/` (or `tests/e2e/` per `testing` skill). Reference them from the feature README **Tests** section — do not duplicate spec contents in prose.
