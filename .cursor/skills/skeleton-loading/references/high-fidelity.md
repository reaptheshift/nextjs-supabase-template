# High-fidelity skeletons — examples

Reference for the `skeleton-loading` skill. Aligns with [Next.js `loading.js`](https://nextjs.org/docs/app/api-reference/file-conventions/loading) and [Suspense streaming](https://nextjs.org/docs/app/getting-started/server-and-client-components).

## Layout mirroring

**Loaded component**

```tsx
// user-card.tsx
export function UserCard({ user }: { user: User }) {
  return (
    <article className="flex gap-4 rounded-lg border p-4">
      <img src={user.avatarUrl} alt="" className="size-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <Button>View profile</Button>
      </div>
    </article>
  );
}
```

**High-fidelity skeleton (same shell, placeholders for data)**

```tsx
// user-card-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <article
      className="flex gap-4 rounded-lg border p-4"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-9 w-28" />
      </div>
    </article>
  );
}
```

## Route-level vs granular

```
Whole page slow?
  └─ src/app/.../loading.tsx → UsersPageSkeleton

Only table slow, header static?
  └─ Page (server) renders header immediately
  └─ <Suspense fallback={<UsersTableSkeleton />}><UsersTable /></Suspense>
```

## Anti-patterns

| Avoid                                                             | Why                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| `<p>Loading...</p>` in `loading.tsx` or Suspense fallback         | No layout continuity; poor UX                           |
| One full-page `<Skeleton className="h-screen" />` for a dashboard | Not high fidelity                                       |
| Skeleton in `src/app` with 80+ lines of markup                    | Violates routing-only `app/`; import from features      |
| Same generic `PageSkeleton` for every route                       | Each route should mirror **its** page layout            |
| Client spinner for initial server data                            | Bypasses streaming; use server + Suspense/`loading.tsx` |

## Drift prevention

When changing `user-card.tsx` layout, update `user-card-skeleton.tsx` in the same PR. Treat skeletons as part of the component contract.

## Table / list rows

Mirror row count and columns with a fixed number of skeleton rows (e.g. 5–10), matching header width and cell shapes—not a single bar for the whole table.

```tsx
export function UsersTableSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true">
      <div className="flex gap-4 border-b pb-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
```

## Stable chrome + deferred branch content

Use when **toolbar/actions are stable** but the main body resolves to **one of multiple layouts** after fetch (e.g. empty state vs populated grid).

| Zone                                        | While pending                                                  | After load                    |
| ------------------------------------------- | -------------------------------------------------------------- | ----------------------------- |
| Toolbar (upload, actions)                   | Real controls; disable until ready                             | Interactive                   |
| Dynamic filters (year tabs, counts unknown) | `FilterPillsRowSkeleton`                                       | Real pills from server        |
| Content body (unknown branch)               | `SectionPendingContent` (centered dots in reserved min-height) | Empty state **or** list/cards |

**Do not** skeleton the content branch (card grid vs empty panel) on first paint—that bets on the wrong outcome.

**Do not** use a full-page spinner when part of the page is already deterministic.

Shared primitives: `src/components/composites/loaders/section-pending-content.tsx`, `filter-pills-row-skeleton.tsx`.

Example: `/obaveze/doprinosi` — `PoreskeObavezeLoadingShell` + `PoreskeObavezeToolbar`.
