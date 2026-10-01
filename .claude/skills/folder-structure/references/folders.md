# Folder contents reference

Authoritative detail for `folder-structure` skill. Use with the promotion rule: **one feature only → feature folder; two or more features → promote to `src/<folder>/`.**

File naming: **kebab-case** for all non-component modules (e.g. `use-users-filters.ts`, `get-users.ts`).

---

## Promotion decision

```
New file needed?
├─ React UI (.tsx)? → components (see below + `components` skill)
├─ Route/page/API route shell? → src/app (scannable composition; heavy UI/logic in features)
└─ Logic / types / hooks / server?
   ├─ Tied to ONE feature? → src/features/<feature>/<folder>/
   └─ Used by 2+ features or no feature domain? → src/<folder>/
```

---

## `hooks/`

**Purpose:** Custom **React hooks** (`use*`).

| Location                  | Scope          | Belongs here                                                 | Examples                                                        |
| ------------------------- | -------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| `src/hooks/`              | Cross-feature  | Generic UI/browser hooks, no domain imports from `features/` | `use-debounce.ts`, `use-media-query.ts`, `use-local-storage.ts` |
| `src/features/<f>/hooks/` | Single feature | State/effects for that feature’s UI                          | `use-users-filters.ts`, `use-document-upload.ts`                |

**Does not belong:** plain functions (→ `lib` or `utils`); server data fetching via `useEffect` for initial page load (→ server component + `skeleton-loading` skill); Server Actions (→ `server/`).

**Client:** Hook files are consumed by client components; mark `"use client"` on the hook file or ensure consumers are client components.

---

## `lib/`

**Purpose:** **Modules** with dependencies—clients, config, validation, domain helpers that are not React hooks and not necessarily server-only.

| Location                | Scope          | Belongs here                                     | Examples                                                             |
| ----------------------- | -------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| `src/lib/`              | Cross-feature  | Shared clients, env, formatting used everywhere  | `cn.ts`, `env.ts`, `logger.ts`, `db.ts`, shared `api-client.ts`      |
| `src/features/<f>/lib/` | Single feature | Feature domain rules, parsers, feature constants | `user-permissions.ts`, `parse-user-payload.ts`, `users-constants.ts` |

**`lib` vs `utils`:** use **`lib`** when the file imports other packages, reads env, or encodes domain rules; use **`utils`** only for small **pure** helpers (see below). When unsure for feature code, prefer `lib/`.

---

## `server/`

**Purpose:** **Server-only** code—data access, Server Actions, modules that must not ship to the client.

| Location                   | Scope          | Belongs here                                       | Examples                                           |
| -------------------------- | -------------- | -------------------------------------------------- | -------------------------------------------------- |
| `src/server/`              | Cross-feature  | DB singleton, Supabase server client, session/auth | `db.ts`, `supabase/server.ts`, `get-session.ts`    |
| `src/features/<f>/server/` | Single feature | Queries, mutations, feature Server Actions         | `get-users.ts`, `create-user.ts`, `delete-user.ts` |

**Conventions:**

- Add `'use server'` at the top of **Server Action** files (or per exported action per team choice—stay consistent).
- Use `import 'server-only'` in modules that must never be imported from client code.
- `src/app/api/**/route.ts` stays **thin**—delegate to `src/features/<f>/server/`.
- **Supabase:** migrations in `supabase/migrations/`; use `supabase` then `supabase-postgres-best-practices` skills if installed (see `server` rule).

**Does not belong:** React components; client hooks; route files (those live under `src/app/`).

---

## `types/`

**Purpose:** **TypeScript types and interfaces**—DTOs, enums, action result types, shared generics.

| Location                  | Scope          | Belongs here                          | Examples                          |
| ------------------------- | -------------- | ------------------------------------- | --------------------------------- |
| `src/types/`              | Cross-feature  | Shared API shapes, pagination, errors | `pagination.ts`, `api-error.ts`   |
| `src/features/<f>/types/` | Single feature | Entity and input types for one domain | `user.ts`, `create-user-input.ts` |

**Does not belong:** runtime code (→ `lib`/`server`). **Zod schemas:** default `lib/*-schema.ts`; see `validation` skill. Optional `types/` only if the team standardizes contracts there—pick one per feature.

Import feature types from `src/types/` when shared; do not duplicate.

---

## `styles/`

**Purpose:** **Global** styles and design tokens—app-wide CSS, not per-feature styling.

| Location      | Scope    | Belongs here                                 | Examples      |
| ------------- | -------- | -------------------------------------------- | ------------- |
| `src/styles/` | App-wide | Tailwind entry, CSS variables, global layers | `globals.css` |

**Features have no `styles/` folder.** Feature UI uses Tailwind in components (see `components` skill). Do not put `globals.css` under `src/app/`.

---

## `utils/`

**Purpose:** Small **pure** functions with **no** React and **no** heavy dependencies—use sparingly at the global level.

| Location                  | Scope                                 | Belongs here                                          | Examples                      |
| ------------------------- | ------------------------------------- | ----------------------------------------------------- | ----------------------------- |
| `src/utils/`              | Cross-feature only when truly generic | `clamp.ts`, `format-currency.ts` (if used everywhere) |
| `src/features/<f>/utils/` | Single feature                        | Pure helpers for that domain                          | `format-user-display-name.ts` |

**Prefer `src/features/<f>/lib/`** for feature logic that imports `zod`, `date-fns`, or domain modules. **Avoid** a large global `src/utils/` dump—promote to `lib/` when logic grows.

---

## `components/`

**Purpose:** **React UI** (`.tsx`).

| Location                       | Scope                                                                                                                   | Belongs here |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------ |
| `src/components/ui/`           | shadcn/ui primitives—`pnpm dlx shadcn@latest add`; no business logic; product UI composes them in feature `components/` |
| `src/components/composites/`   | Multi-part, domain-agnostic patterns                                                                                    |
| `src/components/layout/`       | Global nav, footer, shells                                                                                              |
| `src/features/<f>/components/` | Feature-specific UI (UsersTable, UserCard)                                                                              |

Implementation rules: `components` skill (PascalCase exports, kebab-case files, RSC/client split, skeleton twins).

**Does not belong in component folders:** hooks, types, tests, `index.tsx` barrels—see `components` skill.

---

## `tests/`

**Purpose:** Automated tests. See `testing` skill.

### Feature tests (`src/features/<f>/tests/`)

| Subfolder                  | Belongs here                     | Examples                                      |
| -------------------------- | -------------------------------- | --------------------------------------------- |
| `unit/` (optional)         | Pure logic, mocked server        | `user-permissions.test.ts`                    |
| `integration/` (optional)  | RTL, Server Actions              | `users-table.test.tsx`, `create-user.test.ts` |
| `fixtures/`                | Feature test data factories      | `user.fixture.ts`                             |
| `helpers/`                 | Feature-only test utilities      | `render-with-providers.tsx`                   |
| `mocks/`                   | Feature-only mocks               | `db.ts`                                       |
| Root of `tests/` (flat OK) | Same files when feature is small | `get-users.test.ts`                           |

**Does not belong:** tests inside `src/features/<f>/components/<component>/` folders.

### Repo root `tests/` (not under `src/`)

| Path                         | Tool       | Belongs here                                                                 |
| ---------------------------- | ---------- | ---------------------------------------------------------------------------- |
| `tests/e2e/<business-flow>/` | Playwright | `authentication/sign-in.spec.ts` — **user journey**, not feature folder name |
| `tests/e2e/fixtures/`        | Playwright | Auth fixture, extended `test`                                                |
| `tests/e2e/pages/`           | Playwright | Shared Page Objects (optional)                                               |
| `tests/shared/helpers/`      | Vitest     | Cross-feature render helpers                                                 |
| `tests/shared/mocks/`        | Vitest     | Shared DB/API mocks                                                          |
| `tests/shared/fixtures/`     | Vitest     | Shared test data                                                             |

---

## Quick “where does this file go?”

| You are adding…            | Destination                      |
| -------------------------- | -------------------------------- |
| `page.tsx` / `layout.tsx`  | `src/app/...`                    |
| Shared Button              | `src/components/ui/`             |
| Users list UI              | `src/features/users/components/` |
| `useUsersFilters`          | `src/features/users/hooks/`      |
| `useDebounce`              | `src/hooks/`                     |
| `createUser` Server Action | `src/features/users/server/`     |
| Shared DB client           | `src/server/`                    |
| `User` type                | `src/features/users/types/`      |
| `Paginated<T>`             | `src/types/`                     |
| `formatUserName` (pure)    | `src/features/users/utils/`      |
| `cn()`                     | `src/lib/`                       |
| `globals.css`              | `src/styles/`                    |
| Vitest test                | `src/features/users/tests/`      |
| Playwright E2E             | `tests/e2e/<flow>/`              |
| Shared test mock           | `tests/shared/mocks/`            |

---

## Anti-patterns

| Avoid                                                                         | Instead                                                                    |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Feature A imports Feature B                                                   | Promote shared code to `src/lib` or `src/server`                           |
| Large hook + fetch in `useEffect` for page data                               | Server component + Suspense / `loading.tsx`                                |
| Business logic in `src/components/ui`                                         | Move to feature `components/` or `lib/`                                    |
| Server Action in `src/app/api/route.ts` body                                  | Delegate to `features/<f>/server/`                                         |
| `styles/` inside a feature                                                    | Tailwind on components; global CSS in `src/styles/`                        |
| Tests colocated inside `user-card/` folder                                    | `tests/user-card.test.tsx` or `tests/components/...`                       |
| Route barrel (opaque single-route fetch→one child, or pass-through re-export) | Compose load + leaf / islands in `page.tsx` — see `folder-structure` skill |
| Sibling routes: one inlines load, one hides it in `*Body`/`*Content`          | Same pattern on both—route owns the hop                                    |
