# Supabase Edge Functions (required)

Logging is **critical** in `supabase/functions/**`—runs are remote and harder to debug without traces.

## Every function should log

1. **Invocation** — function name, method, path (or event type), request/correlation id
2. **Auth context** — user id or `anonymous`—not JWT raw value
3. **Branch decisions** — which path taken (e.g. `webhook_verified`, `payload_invalid`)
4. **External calls** — before/after Supabase or third-party API (outcome + status, not secrets)
5. **Response** — status code or success/failure summary
6. **Unhandled errors** — catch, log, return safe HTTP response

```ts
// supabase/functions/example/index.ts
import { createLogger } from "../_shared/logger.ts";

const log = createLogger("example");

Deno.serve(async (req) => {
  const requestId = crypto.randomUUID();
  log.info("start", { requestId, method: req.method });

  try {
    // ...
    log.info("success", { requestId });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    log.error("error", {
      requestId,
      message: error instanceof Error ? error.message : "unknown",
    });
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
    });
  }
});
```

Use **`createLogger`** from `_shared/logger.ts`—same payload shape as `@/lib/logger` on the server. Check **supabase** skill for Deno/import specifics for your CLI version.

Pair with the **server** rule and **supabase** skill (if installed) for where functions live; never log service role keys or webhook signing secrets.
