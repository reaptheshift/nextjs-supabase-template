---
name: optimistic-ui
description: "Applies optimistic UI for simple, likely-success Server Action mutations (add, edit, rename, delete) using useOptimistic and rollback on failure. Use when wiring client UI to Server Actions, lists, toggles, inline edits, or when the user expects instant feedback before the server responds."
---

# Optimistic UI

When a **Server Action** mutates data and the UI should update immediately, apply an **optimistic update** on the client for **simple, likely-to-succeed** operations (add/remove list item, rename title, toggle flag, inline edit). The UI shows the expected end state first; on failure, **revert** and surface an error.

Pair with **components** (client leaves, kebab-case files) and **folder-structure** (actions in `src/features/<feature>/server/`).

**Not** for initial page data—that is **skeleton-loading** + server streaming.

---

## 1. When to use optimistic UI

Use when **all** are true:

- Mutation via **Server Action** (or `useActionState` bound to one).
- User expects the UI to **change right away** (delete row, rename, add item, toggle).
- Operation is **simple** (single entity, clear before/after, no multi-step workflow).
- Success is **likely** under normal conditions (permissions already checked, valid input).

Skip optimism when **any** apply:

- Payments, auth, irreversible side effects, or compliance-sensitive flows.
- Heavy validation only the server can do (ambiguous business rules).
- Multi-entity transactions (all-or-nothing across several resources).
- File uploads or long-running jobs—use progress/pending state instead.
- Low success rate or user must see server confirmation first.

---

## 2. Implementation pattern (default)

Optimistic logic lives in a **client leaf** (`"use client"`). Server Actions stay in `src/features/<feature>/server/`.

1. Hold **committed** state (from server props or `useState` seeded from server).
2. **`useOptimistic`** for the rendered list/UI during `startTransition`.
3. Call the Server Action inside **`startTransition`** (or form action with `useActionState`).
4. On **error**: revert (React restores pre-optimistic state from `useOptimistic`), show toast/inline error.
5. On **success**: rely on `revalidatePath` / `revalidateTag` in the action so the next server render matches; optimistic state should align with server truth.

Do not block the UI on a spinner for these simple mutations unless the action is slow or optimism was skipped.

---

## 3. Server Action requirements

- Actions return a **discriminated result** when possible: `{ ok: true }` | `{ ok: false, error: string }`—never throw for expected validation failures. Parse input with Zod first (**validation** skill).
- Call **`revalidatePath` / `revalidateTag`** after successful mutations so RSC data stays correct.
- Keep actions **idempotent** where feasible so a retry after rollback is safe.

---

## 4. UX rules

- Optimistic change must match **real** post-success UI (same row removed, same title text, same toggle state).
- Disable only the **affected control** during flight if double-submit is a risk—not the whole page.
- Always handle **failure** visibly; silent rollback is not enough.
- Preserve **accessibility**: focus management after delete, `aria-busy` on submitting control if needed.

---

## 5. File naming

- Client optimistic UI: `thing-list.tsx` + optional `thing-list-row.tsx` (client leaf).
- Server Actions: `src/features/<feature>/server/<action>.ts` or `actions.ts` with `'use server'`.
- Do not put `'use client'` on action files.

---

## 6. Checklist (before merge)

- [ ] Mutation qualifies (simple, likely success, instant UI expectation)
- [ ] `useOptimistic` + `startTransition` (or `useActionState`) used on client leaf
- [ ] Error path reverts and notifies user
- [ ] Server Action revalidates cache on success
- [ ] No optimistic UI for out-of-scope flows (§1 skip list)

---

## 7. Additional resources

Patterns and code examples: [references/optimistic-patterns.md](references/optimistic-patterns.md).

Required by the **optimistic-ui** Cursor rule when adding or changing mutation UX tied to Server Actions.
