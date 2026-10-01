---
name: testing
description: "Defines the testing pyramid (Vitest unit/integration, Playwright E2E), placement, quality gates, and E2E decision workflow. Use when adding tests, reviewing coverage, completing features, or choosing unit vs integration vs E2E."
---

# Testing

**Stack:** Vitest + React Testing Library (unit/integration), Playwright (E2E). Setup: use the `nextjs-docs` skill for official Vitest/Playwright guides for your `next` version.

**Placement:** [folder-structure `references/folders.md`](../folder-structure/references/folders.md#tests).

---

## Pyramid (lowest sufficient layer)

| Layer       | Tool         | Where                        |
| ----------- | ------------ | ---------------------------- |
| Unit        | Vitest       | `src/features/<f>/tests/`    |
| Integration | Vitest + RTL | Same                         |
| E2E         | Playwright   | `tests/e2e/<business-flow>/` |

Decision tree: [references/pyramid.md](references/pyramid.md). **Vitest cannot render async Server Components**—test `server/` with mocks; prove pages in Playwright.

Shared Vitest helpers: `tests/shared/` when two or more features need them.

---

## Vitest (unit & integration)

**Test:** `lib/`, `utils/`, `server/` (mocked DB/API), client components (RTL), hooks, Server Action shapes.

**Do not:** async RSC pages, full navigation, real DB/network, cross-feature imports.

- Files: kebab-case `*.test.ts` / `*.test.tsx`
- Mock at **boundaries** only; reset in `beforeEach`
- New `server/`, `lib/`, `utils/` logic needs tests before the feature is done

Patterns: [references/patterns.md](references/patterns.md#vitest).

**Database functions (Supabase):** logic that lives in SQL (RPCs, queue claims, sweepers) is tested with pgTAP in `supabase/tests/database/*.test.sql`, run by `supabase test db` against the local stack. Wrap each file in `begin; … rollback;`.

---

## Playwright (E2E)

Organize by **user journey** (`authentication/`, `billing/`, …)—not by `src/features/` name. One focused `*.spec.ts` per behavior; kebab-case.

**Default E2E yes** when: auth, multi-step flows, persistence in UI, payments/uploads, external services, async RSC pages, business-critical wiring.

**Often skip E2E** when: refactor with unchanged behavior + green unit tests; internal helper with full unit coverage; cosmetic UI with RTL coverage.

Patterns: [references/patterns.md](references/patterns.md#playwright). Selectors: `getByRole`, `getByTestId`; no arbitrary `waitForTimeout`.

---

## Feature complete

Checklist: [references/quality-gates.md](references/quality-gates.md).

When a feature under `src/features/<name>/` is **done or materially changed**, ask: **"Should we create an end-to-end test for this feature?"** Recommend yes/no using the pyramid; if yes, propose `tests/e2e/<flow>/` and specific spec files.
