---
name: skeleton-loading
description: "Defines high-fidelity skeleton loaders and Next.js streaming (loading.tsx, Suspense) for server-fetched UI. Use when adding or changing loading states, fallbacks, route loading.tsx, async server data boundaries, or skeleton components that mirror real layout."
---

# Skeleton Loading

Whenever UI waits on **server-fetched data** (database, server module, slow `fetch`), show a **high-fidelity skeleton**—the same layout as the loaded component, with placeholder blocks where real content will appear. Never ship generic spinners or a single gray box for a complex view.

Pair with the **components** skill (naming, folders) and **folder-structure** (`loading.tsx` only under `src/app`).

---

## 1. Choose the Next.js mechanism

| Scope                                           | Mechanism                   | Where                                                                                                      |
| ----------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Whole route segment** (page + nested content) | `loading.tsx`               | `src/app/.../loading.tsx` only (routing). Import skeleton from `src/features/...` or `src/components/...`. |
| **Part of a page** (independent async regions)  | `<Suspense fallback={...}>` | Server parent wraps each async child with its own skeleton fallback.                                       |
| **Nested slow server component**                | Suspense boundary           | Prefer granular Suspense over one giant page loader when regions load independently.                       |

**Pick one boundary per loading state** — do not stack `loading.tsx` and an in-page `<Suspense>` with the **same** skeleton for the same work.

| Page shape                                               | Use                                                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Entire segment is one async load (no sync shell)         | `loading.tsx` + async `page.tsx` — **no** inner Suspense                                           |
| Sync shell / gate, then async region                     | In-page `<Suspense>` only — **no** `loading.tsx` for that region                                   |
| Several independent async regions                        | Multiple `<Suspense>` in `page.tsx` — **no** segment `loading.tsx` unless a parent layout needs it |
| Static instant shell + dynamic body (`unstable_instant`) | Sync `page.tsx` + `<Suspense>` for dynamic part — **no** `loading.tsx` on that segment             |

**Do not** use client `useEffect` + fetch for initial page data when the App Router can stream from the server. Skeletons accompany **server** streaming, not client waterfalls.

**Avoid:** `"Loading..."` text, unstyled spinners, or one rectangle for a multi-column layout.

---

## 2. High-fidelity skeleton rule (1:1 layout)

A skeleton is a **layout twin** of the loaded UI:

- Same structure: grid, stacks, header/toolbar/footer, card chrome, table rows, avatar + text lines.
- Same spacing and approximate sizes: `h-`, `w-`, `gap-`, columns—not a unrelated placeholder.
- Place skeleton blocks **exactly where** text, images, buttons, and badges will render.

**Pattern:** For `UserCard`, create `user-card-skeleton.tsx` (or `user-card/user-card-skeleton.tsx`) that mirrors `user-card.tsx`. Share layout wrappers only if it reduces drift; do not share data-fetching logic.

**Naming:** kebab-case file `feature-widget-skeleton.tsx`, PascalCase export `FeatureWidgetSkeleton`.

Prefer **shadcn/ui `Skeleton`** (or project primitive) for blocks; compose them like real typography and media placeholders.

---

## 3. File placement

- **`loading.tsx`** — lives only in `src/app/**` per folder-structure. Keep it thin: default export that renders a imported skeleton component.
- **Skeleton components** — live in `src/features/<feature>/components/` or `src/components/composites/`, never inline large JSX only in `app/`.

Example route wiring:

```tsx
// src/app/(dashboard)/users/loading.tsx
import { UsersPageSkeleton } from "@/features/users/components/users-page-skeleton";

export default function Loading() {
  return <UsersPageSkeleton />;
}
```

---

## 4. Suspense fallback

Wrap each async server subtree with a matching skeleton fallback:

```tsx
import { Suspense } from "react";
import { UsersTable } from "@/features/users/components/users-table/users-table";
import { UsersTableSkeleton } from "@/features/users/components/users-table/users-table-skeleton";

export default function UsersPage() {
  return (
    <Suspense fallback={<UsersTableSkeleton />}>
      <UsersTable />
    </Suspense>
  );
}
```

Use **multiple** Suspense boundaries when two regions fetch independently (e.g. table + sidebar stats).

---

## 5. Checklist (before merge)

- [ ] Server data path uses `loading.tsx` and/or `Suspense`, not client fetch for first paint
- [ ] Fallback is a dedicated skeleton component, not inline generic text
- [ ] Skeleton mirrors final UI layout (high fidelity)
- [ ] `loading.tsx` imports from feature/shared components, not fat markup in `app/`
- [ ] Accessible: `aria-busy`, `aria-live="polite"`, or route-level loading semantics where appropriate

---

## 6. Additional resources

Decision tree, anti-patterns, and layout-mirroring examples: [references/high-fidelity.md](references/high-fidelity.md).

Required by the **skeleton-loading** Cursor rule when adding streaming or loading UI.
