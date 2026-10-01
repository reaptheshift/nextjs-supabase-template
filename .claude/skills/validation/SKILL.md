---
name: validation
description: "Defines Zod schema placement, server-side parsing in Server Actions and route handlers, optional client form validation, and error shapes. Use when adding mutations, APIs, forms, searchParams parsing, or input types with Zod."
---

# Validation (Zod)

**Stack:** [Zod](https://zod.dev/) for runtime validation. Pair with skills `folder-structure`, `logging` (server observability after validate), `optimistic-ui` (action results), `shadcn` if installed (form field errors), `supabase` if installed (validate before DB/API calls), and `testing` (unit-test schemas).

**Trust boundary:** anything from the client, URL, or webhooks is **untrusted** until parsed on the server.

---

## Where validation runs

| Layer                    | Required?              | Location                                                        |
| ------------------------ | ---------------------- | --------------------------------------------------------------- |
| **Server Actions**       | Yes                    | `src/features/<f>/server/` — parse first, then DB               |
| **Route handlers**       | Yes                    | Thin `src/app/api/...` → validated logic in `server/` or `lib/` |
| **Server loaders / RSC** | When input is external | `searchParams`, headers — parse in `server/` or feature `lib/`  |
| **Client forms**         | Optional (UX)          | Same schema from `lib/` + `@hookform/resolvers/zod`             |
| **Unit tests**           | Yes for schemas        | `src/features/<f>/tests/` — `safeParse` edge cases              |

**Never** rely on client-only Zod for security. **Never** throw for expected validation failures in actions — return `{ ok: false, error }` (`optimistic-ui` skill).

---

## Where schemas live

Default: **`src/features/<feature>/lib/`** (e.g. `create-user-schema.ts`). One convention per feature; promote shared schemas to `src/lib/`.

Details: [references/schemas.md](references/schemas.md).

---

## Server pattern

Use `safeParse` at the entry of every mutation and API. Map `ZodError` to user-safe messages; log details server-side only.

Patterns: [references/server-actions.md](references/server-actions.md).

---

## Client forms (optional)

Reuse the **same** schema with React Hook Form + `zodResolver`. Server Action still re-validates.

Patterns: [references/client-forms.md](references/client-forms.md).

---

## Checklist

- [ ] Schema exported from feature `lib/` (or promoted `src/lib/`)
- [ ] Server Action / handler parses `unknown` before side effects
- [ ] Discriminated result on failure; no throw for invalid input
- [ ] Vitest covers invalid + valid branches for non-trivial schemas
