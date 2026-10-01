# Shared logger (`src/lib/logger.ts`)

**Guidance pack:** this file describes the target implementation. Add `src/lib/logger.ts` when you scaffold the Next.js app (see `logging` skill). Edge Functions: add `supabase/functions/_shared/logger.ts` when you add Edge Functions.

## Rule

- **Next.js server code** imports `createLogger` from `@/lib/logger` only.
- **Do not** define per-file `const log = ...` wrappers or raw `[prefix]` `console` calls in Server Actions / `server/`.
- **Edge Functions** use `supabase/functions/_shared/logger.ts` (`createLogger`—same API, keep in sync with `src/lib/logger.ts`).

## Usage

```ts
import { createLogger } from "@/lib/logger";

const log = createLogger("users.createUser");

log.info("start");
log.error("validation_failed", { issues: { email: ["Invalid"] } });
```

## Scope naming

Use dot-separated paths matching the module: `users.createUser`, `billing.webhook`, `auth.getSession`.

## Upgrading to Pino (later)

Replace the body of `src/lib/logger.ts` to call Pino; keep `createLogger(scope)` and `.info` / `.warn` / `.error` so call sites stay unchanged.
