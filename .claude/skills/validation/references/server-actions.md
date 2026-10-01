# Server-side Zod validation

Add `import "server-only"` to modules that must not run on the client when they touch secrets; schema files in `lib/` can stay universal if they only import `zod`.

## Server Action (unknown input)

```ts
"use server";

import { createUserSchema } from "../lib/create-user-schema";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export async function createUser(input: unknown) {
  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid input" };
  }

  try {
    await db.user.create({ data: parsed.data });
    revalidatePath("/users");
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Could not create user" };
  }
}
```

## FormData

```ts
export async function createUserFromForm(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
  };
  return createUser(raw);
}
```

Prefer a small `lib/form-data-to-create-user.ts` when mapping is non-trivial.

## Route handler

```ts
// src/app/api/users/route.ts — thin
import { createUser } from "@/features/users/server/create-user";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = await createUser(body);
  return Response.json(result, { status: result.ok ? 200 : 400 });
}
```

Validation stays in `createUser` (or a shared `lib/parse-*` used by both action and route).

## searchParams (RSC / page)

```ts
import { z } from "zod";

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  q: z.string().max(200).optional(),
});

export function parseListQuery(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const flat = Object.fromEntries(
    Object.entries(searchParams).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : v,
    ]),
  );
  return listQuerySchema.safeParse(flat);
}
```

Use defaults/fallbacks in the page when parse fails (empty list or 404), or redirect — do not pass raw strings to SQL.

## Errors

- **Expected invalid input:** `safeParse` → `{ ok: false, error }` (generic message to client).
- **Unexpected failures:** log server-side; return generic error — do not leak `ZodError` paths to users in production.

## Tests

Vitest `createUserSchema.safeParse({ ... })` for boundary cases; integration tests call the action with mocked DB (`testing` skill).
