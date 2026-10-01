# Server vs Client — patterns and examples

Reference for the `components` skill §10. Default: Server Component (no directive).

## Decision: does this file need `"use client"`?

Add `"use client"` only if the file uses:

- `useState`, `useEffect`, `useRef`, or other client hooks
- Browser APIs (`window`, `document`, …)
- Event handlers that must run in the browser **and** cannot be replaced by a Server Action on a `<form>`
- Client-only libraries (most chart/map/Radix-heavy leaf widgets)

Otherwise keep the file a Server Component (including async `async function` components that fetch data).

## Recommended layout (leaf client islands)

**Server shell composes client leaves.** Fetch and layout stay on the server; interactivity is pushed to the smallest child.

```
users-table/
├─ users-table.tsx              // Server: fetch, layout, passes serializable props
├─ users-table-toolbar.tsx      // Client: filters, search (if interactive)
└─ users-table-row-actions.tsx  // Client: row menu, delete confirm
```

```tsx
// users-table.tsx — no "use client"
import { getUsers } from "../server/get-users";
import { UsersTableToolbar } from "./users-table-toolbar";

export async function UsersTable() {
  const users = await getUsers();
  return (
    <section>
      <UsersTableToolbar />
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </section>
  );
}
```

```tsx
// users-table-toolbar.tsx
"use client";

export function UsersTableToolbar() {
  const [q, setQ] = useState("");
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}
```

## Optional filename signal

When a **whole file** is a client leaf, you may suffix the kebab-case filename with `-client` so the boundary is obvious in review and search (e.g. `date-picker-client.tsx`). Do **not** suffix server files. Not required—use when a folder mixes server and client siblings.

## Passing data server → client

- Props must be **JSON-serializable** (primitives, plain objects, arrays).
- Serialize `Date` → ISO string; pass `id: string`, not class instances.
- Do **not** pass inline functions from server parents; handlers live in the client file or use Server Actions.

```tsx
// user-card.tsx (server)
export async function UserCard({ userId }: { userId: string }) {
  const user = await getUser(userId);
  return (
    <UserCardActions
      userId={user.id}
      displayName={user.name}
      createdAt={user.createdAt.toISOString()}
    />
  );
}
```

## Mutations from client UI

Prefer **Server Actions** + `<form action={...}>` or `formAction` for mutations. Avoid new API routes for internal app mutations unless an external client needs REST.

```tsx
// user-row-actions.tsx
"use client";

import { deleteUser } from "../server/delete-user";

export function UserRowActions({ userId }: { userId: string }) {
  return (
    <form action={deleteUser}>
      <input type="hidden" name="userId" value={userId} />
      <button type="submit">Delete</button>
    </form>
  );
}
```

## Composition tricks

**Children / slots:** Server parent can wrap a client child; `children` passed from server to client is allowed.

```tsx
// page.tsx (server)
export default async function Page() {
  const data = await load();
  return (
    <InteractiveShell initialCount={data.count}>
      <StaticSummary data={data} />
    </InteractiveShell>
  );
}
```

**Suspense:** Wrap slow server subtrees or client children that suspend in `<Suspense fallback={...}>` from a server parent.

## Anti-patterns

| Avoid                                                                              | Do instead                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `"use client"` on a page/layout just to fetch data                                 | Async server component; fetch in `page.tsx` / feature server module |
| `async function` + `"use client"`                                                  | Fetch in server parent; pass props                                  |
| `"use client"` on a large feature tree                                             | Split; one small client leaf per concern                            |
| Passing `onClick={() => ...}` from server                                          | Handler inside client component or Server Action                    |
| `useEffect` + `fetch` for initial page data                                        | Server fetch; pass as props                                         |
| Shared parent file importing both server-only and client-only modules without care | Keep client leaves in separate files with `"use client"` at top     |

## Quick checklist

- [ ] File has no `"use client"` unless necessary
- [ ] Data fetching in server components or `server/` modules
- [ ] Client files are small and focused
- [ ] Props across boundary are serializable
- [ ] Mutations use Server Actions where possible
