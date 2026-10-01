# Optimistic UI — patterns and examples

Reference for the `optimistic-ui` skill. Uses React [`useOptimistic`](https://react.dev/reference/react/useOptimistic) with Next.js [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

## Delete item from list

```tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { deleteTodo } from "@/features/todos/server/delete-todo";
import type { Todo } from "@/features/todos/types/todo";

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      setOptimisticTodos(optimisticTodos.filter((t) => t.id !== id));
      const result = await deleteTodo(id);
      if (!result.ok) {
        // useOptimistic reverts when transition ends without matching server state;
        // show error — user sees list restored
        toast.error(result.error);
      }
    });
  }

  return (
    <ul aria-busy={isPending}>
      {optimisticTodos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button type="button" onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```ts
// src/features/todos/server/delete-todo.ts
"use server";

import { revalidatePath } from "next/cache";

export async function deleteTodo(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await db.todo.delete({ where: { id } });
    revalidatePath("/todos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not delete todo" };
  }
}
```

## Rename / inline edit

```tsx
function handleRename(id: string, title: string) {
  startTransition(async () => {
    setOptimisticTodos(
      optimisticTodos.map((t) => (t.id === id ? { ...t, title } : t)),
    );
    const result = await renameTodo(id, title);
    if (!result.ok) toast.error(result.error);
  });
}
```

## Add item

Append to optimistic list with a **temporary id**; replace after success if the server returns the real entity:

```tsx
setOptimisticTodos([
  ...optimisticTodos,
  { id: `temp-${Date.now()}`, title, pending: true },
]);
const result = await createTodo(title);
if (!result.ok) toast.error(result.error);
// revalidatePath in action refreshes with real id
```

## Form + Server Action (`useActionState`)

For simple forms, `useActionState` can pair with optimism in the component that owns the list state—still keep the optimistic leaf as a client component.

Prefer **`startTransition` + `useOptimistic`** when updating a visible list or card in place; use pending UI on the submit button via `useFormStatus` when the whole form is the unit of work.

## When not to use (examples)

| Flow                                                | Instead                                                |
| --------------------------------------------------- | ------------------------------------------------------ |
| Checkout charge                                     | Wait for server; show explicit pending/success/failure |
| Delete account                                      | Confirm dialog; no optimism until confirmed + success  |
| Bulk delete 500 rows                                | Progress + server job; no full list optimism           |
| Create with server-assigned slug from complex rules | Show pending row or spinner until server returns       |

## Anti-patterns

| Avoid                                                    | Why                                  |
| -------------------------------------------------------- | ------------------------------------ |
| Optimistic update with no error handling                 | User thinks action succeeded         |
| Optimistic UI on server components                       | Needs client state + `useOptimistic` |
| Never calling `revalidatePath` / `revalidateTag`         | Stale RSC props after navigation     |
| Optimistic change that looks nothing like final UI       | Jarring snap when server responds    |
| Optimism on unlikely actions (e.g. invite to closed org) | Rollback feels broken                |
