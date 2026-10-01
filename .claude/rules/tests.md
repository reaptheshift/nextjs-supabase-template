---
description: Testing pyramid—Vitest in features, Playwright under tests/e2e
paths:
  - "src/features/**"
  - "tests/**"
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
---

# Tests

Skill: `testing`.

- Prefer the **lowest pyramid layer** that proves the behavior
- Vitest → `src/features/<feature>/tests/`; shared helpers → `tests/shared/`
- Playwright → `tests/e2e/<business-flow>/` only—never inside `src/features/`
- When a feature is complete, ask whether an E2E test is warranted (yes/no recommendation)
