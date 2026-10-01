# Server logging (required)

Apply to every **Server Action**, **`src/server/`** module, and **feature `server/`** code.

## Minimum events per action

```ts
"use server";

import { createLogger } from "@/lib/logger";
import { createUserSchema } from "../lib/create-user-schema";

const log = createLogger("users.createUser");

export async function createUser(input: unknown) {
  log.info("start");

  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    log.error("validation_failed", {
      issues: parsed.error.flatten().fieldErrors,
    });
    return { ok: false as const, error: "Invalid input" };
  }

  log.info("validated", { emailDomain: parsed.data.email.split("@")[1] });

  try {
    // ... persistence
    log.info("success", { userId: "..." });
    return { ok: true as const };
  } catch (error) {
    log.error("error", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return { ok: false as const, error: "Could not create user" };
  }
}
```

See [logger.md](logger.md)—do not add local `log` helpers or string prefixes elsewhere.

## What to include

| Event       | Include                            | Omit                                    |
| ----------- | ---------------------------------- | --------------------------------------- |
| `start`     | action name, correlation id if any | raw body, passwords                     |
| `validated` | non-sensitive fields, counts       | full email if policy requires redaction |
| `success`   | entity ids, duration ms            | internal stack unless dev               |
| `error`     | safe message, error code           | secrets, SQL with credentials           |

## Route handlers

Keep routes thin—**log inside** `src/features/<f>/server/` helpers the route calls, not duplicated in both places.

## RSC / server components

Log when fetching or mutating in server-only modules (not in client leaves). Prefer one log per **logical** fetch/mutation, not per render.
