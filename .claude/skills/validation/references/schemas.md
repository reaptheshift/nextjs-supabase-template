# Zod schema placement

## Per feature (default)

```
src/features/users/lib/
  create-user-schema.ts
  update-user-schema.ts
```

```ts
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

Export **`z.infer`** types from the same file (or re-export from `types/` if the team prefers types-only imports in UI).

## Pick one convention per feature

| Approach                            | Path              | When                                                              |
| ----------------------------------- | ----------------- | ----------------------------------------------------------------- |
| **Schemas in `lib/`** (recommended) | `lib/*-schema.ts` | Schema + parse helpers + domain rules together                    |
| Schemas in `types/`                 | `types/*.ts`      | Team treats Zod as contract-only; keep files free of side effects |

Do not split the same schema across both without a clear rule.

## Shared across features

Promote to `src/lib/` when **two or more** features need the same schema (pagination, id params, shared enums).

## Naming

- Files: **kebab-case** — `create-user-schema.ts`
- Exports: `createUserSchema`, `CreateUserInput`

## Do not

- Put schemas in `src/components/ui/` or route files under `src/app/`
- Duplicate divergent client/server schemas
- Import server-only DB modules from schema files (keep schemas pure)
