# Next.js patterns to avoid (this starter)

Reference for `nextjs-docs` skill. Official docs may still describe these for migration—**do not introduce them** in new code unless the user explicitly migrates a legacy area.

## Do not add (new work)

| Avoid                                                                                  | Use instead                                                                    |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Pages Router** (`pages/`, `getServerSideProps`, `getStaticProps`, `getInitialProps`) | App Router `src/app/`, Server Components, `loading.tsx`, Suspense              |
| **`useEffect` + `fetch`** for initial page data                                        | Async Server Component, or Suspense + server fetch                             |
| **API route** for internal UI mutations only the app uses                              | **Server Actions** in `src/features/<feature>/server/`                         |
| **Client-only** page wrappers to load data                                             | Server shell + client leaves (`components` skill `references/rsc-patterns.md`) |
| **`"use client"`** on large trees “to be safe”                                         | Leaf client components only                                                    |
| **Cross-feature imports** (`features/a` → `features/b`)                                | Promote to `src/lib/` or `src/server/`                                         |
| **Business logic in `src/components/ui`**                                              | Feature `components/` or feature `lib/`                                        |
| **Components, hooks, tests in `src/app/`**                                             | `src/features/` or shared `src/components/`                                    |
| **Generic loading UI** (`"Loading..."`, full-page gray box)                            | `skeleton-loading` skill (high-fidelity twins)                                 |
| **Guessing** cache/`revalidate` behavior                                               | Read bundled doc or MCP for your `next` version                                |

## Verify in docs before using

These change frequently—always read version-matched docs before adopting:

- `fetch` caching defaults and `cache` / `next: { revalidate }` options
- `middleware.ts` vs `proxy` (follow current doc naming for your version)
- Cache Components / PPR / `use cache` (only if enabled in this project’s config)
- Metadata and `generateMetadata` (Server Components only)

## When legacy code already exists

If the repo already contains Pages Router or old patterns, do not mass-delete unless asked. For **new** files and features, follow App Router + project skills only.
