# Client forms + Zod (UX only)

Client validation improves feedback; **Server Actions must still parse** the same schema.

## Shared schema

```ts
// src/features/users/lib/create-user-schema.ts — used by server and client
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
});
```

## React Hook Form + shadcn

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createUserSchema,
  type CreateUserInput,
} from "../lib/create-user-schema";
import { createUser } from "../server/create-user";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CreateUserForm() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(values: CreateUserInput) {
    const result = await createUser(values);
    if (!result.ok) {
      form.setError("root", { message: result.error });
      return;
    }
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            {...form.register("name")}
            aria-invalid={!!form.formState.errors.name}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        {/* email field similarly */}
      </FieldGroup>
      <Button type="submit">Create</Button>
    </form>
  );
}
```

Follow **shadcn** `rules/forms.md` for `data-invalid` / `aria-invalid`.

## Server failure after client pass

Network or server rules can still fail — handle `result.ok === false` on the client (toast or `setError("root", ...)`).

## Do not

- Skip server `safeParse` because the form already validated
- Put Zod schemas only in `"use client"` files if the server cannot import them — keep schemas in `lib/` without client-only imports
