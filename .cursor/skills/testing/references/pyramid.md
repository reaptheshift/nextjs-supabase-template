# Testing pyramid

Before adding a test, choose the **lowest layer that proves the behavior**.

## Decision tree

```
What are you verifying?
│
├─ Pure function, validator, mapper, permission rule?
│  └─ UNIT (Vitest) — mock nothing except external IO at boundary
│
├─ Server Action / server module with mocked DB?
│  └─ INTEGRATION (Vitest) — import and call; assert return + mock calls
│
├─ Client component or sync Server Component (RTL)?
│  └─ INTEGRATION (Vitest + RTL)
│
├─ Route handler logic (no full HTTP server)?
│  └─ INTEGRATION (Vitest) — invoke handler with Request mock
│
└─ Requires real routing, cookies, async RSC page, multi-step UI, external service, or persistence in browser?
   └─ E2E (Playwright) — one or few specs per journey; not every edge case
```

## Do not use E2E for

- Logic already covered by unit tests (duplicate slow coverage)
- Every validation branch (use unit tests)
- Implementation details (CSS pixels, internal hook order)

## Do use E2E for

- Authentication and authorization through real session
- Multi-step flows (onboarding, checkout, import wizard)
- Async RSC pages (Vitest cannot render them)
- Business-critical paths where wiring must be proven end-to-end

## Integration vs unit (this repo)

| Unit                          | Integration                         |
| ----------------------------- | ----------------------------------- |
| Single module, no React       | React render, Server Actions, hooks |
| `lib/`, `utils/` pure helpers | `*.test.tsx` for components         |
| Fast, many tests              | Still fast; mock boundaries         |

Optional subfolders under `src/features/<f>/tests/`: `unit/`, `integration/` when the feature has many tests.
