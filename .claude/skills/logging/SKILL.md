---
name: logging
description: "Defines required server-side logging (Server Actions, src/server, route handlers, Supabase Edge Functions) and optional client logging by feature complexity. Use when adding server code, debugging production issues, or implementing Edge Functions."
---

# Logging

**Goal:** Server behavior must be **observable**—you can see what ran, what failed, and why. Client logging is **optional** and scaled to complexity.

Pair with the `validation` skill (log after input is validated/sanitized), the `env-vars` rule (never log secrets), and the `folder-structure` rule (logs live next to the code they describe).

**Shared logger (when the app is scaffolded):** add `src/lib/logger.ts` and import `createLogger` from `@/lib/logger` on the server. Until then, follow the patterns below when writing or reviewing server logging guidance. Details: [references/logger.md](references/logger.md).

---

## Required vs optional

| Context                                           | Logging      | Detail                                                       |
| ------------------------------------------------- | ------------ | ------------------------------------------------------------ |
| **Server Actions**                                | **Required** | [references/server.md](references/server.md)                 |
| **`src/server/`**, **`src/features/<f>/server/`** | **Required** | Same patterns                                                |
| **`src/app/api/**/route.ts`** (and delegates)     | **Required** | Log in delegated `server/` modules                           |
| **Supabase Edge Functions**                       | **Required** | [references/edge-functions.md](references/edge-functions.md) |
| **Client components / hooks**                     | **Optional** | [references/when-optional.md](references/when-optional.md)   |
| **Pure `lib/` / `utils/`**                        | **Optional** | Log when non-trivial branching or external I/O               |

When unsure on the server: **log**. When unsure on the client: use the decision tree in `when-optional.md`.

---

## Principles (all layers)

- **Structured** — objects with `scope`, `action`/`operation`, `outcome`—not vague strings.
- **Functional blocks** — align logs with steps from `code-writing` rule (validate → execute → respond → errors).
- **Never log secrets** — tokens, passwords, full cookies, service role keys, raw PII; log ids/slugs instead.
- **Errors** — log `message` + safe context; stack in server/dev, avoid leaking stacks to clients.
- **Single entry point** — `createLogger(scope)` from `@/lib/logger`; no ad-hoc `console` prefixes in server code.

---

## Checklist (server / Edge)

- [ ] Entry log (what started, safe identifiers)
- [ ] Failure log before returning `{ ok: false }` or throwing unexpected errors
- [ ] Success log when outcome is non-obvious or business-critical
- [ ] Edge Functions: request id / function name on every branch
