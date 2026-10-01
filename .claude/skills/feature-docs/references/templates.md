# Feature doc templates

Adapt placeholders; remove sections that do not apply.

---

## README.md (required hub)

````markdown
# <Feature title>

## Purpose

<What the user accomplishes; 1–3 sentences.>

Route: `/<path>` (omit if not a dedicated page).

## Documentation

| Doc                        | Contents     |
| -------------------------- | ------------ |
| [flow.md](./flow.md)       | End-to-end … |
| [<topic>.md](./<topic>.md) | …            |

## Feature layout (code)

| Path                              | Role                    |
| --------------------------------- | ----------------------- |
| `src/features/<slug>/components/` | UI                      |
| `src/features/<slug>/server/`     | Server Actions, queries |
| `src/features/<slug>/lib/`        | Domain helpers, schemas |
| `src/features/<slug>/hooks/`      | Client hooks            |
| `src/features/<slug>/types/`      | Types                   |
| `src/features/<slug>/tests/`      | Vitest                  |

## Good entry points

- `src/features/<slug>/server/<main-action>.ts`
- `src/app/(dashboard)/<route>/page.tsx`

## Notes

- <Coupling to other features, shared src/server modules, Edge Functions, …>

## Environment

| Variable         | Where                 | Notes |
| ---------------- | --------------------- | ----- |
| `EXACT_VAR_NAME` | `.env.local` / Vercel | …     |

(Omit entire section if no feature-specific env.)

## Tests

```bash
pnpm exec vitest run src/features/<slug>/tests
```
````

E2E (requires `E2E_EMAIL` / `E2E_PASSWORD`):

```bash
pnpm exec playwright test e2e/<flow>
```

````

---

## flow.md (multi-step features)

```markdown
# <Feature>: end-to-end flow

<One paragraph: what this doc covers.>

**Index:** [README.md](./README.md).

**Code:** `src/features/<slug>/` — brief folder reminder.

---

## Simplified product flow

1. User …
2. App …
3. User …

---

## Technical flow (implemented)

<Prose or bullet pipeline matching current code.>

```mermaid
flowchart TB
  A[Step] --> B[Step]
````

## Layers

| Layer            | Responsibility |
| ---------------- | -------------- |
| `<Component>`    | …              |
| `<serverAction>` | …              |

## Related docs

- [<topic>.md](./<topic>.md) — …

````

---

## Single-topic guide (auth-style)

```markdown
# <Topic title>

**Index:** [README.md](./README.md).

## User flow

1. …

## Code path

| Step | Location |
|------|----------|
| Form UI | `src/features/<slug>/components/<form>.tsx` |
| Server | `src/features/<slug>/server/<action>.ts` |

## Edge cases

- …
````

---

## Local dev / webhooks

```markdown
# <Feature> local dev (<webhooks|tunnel|…>)

**Index:** [README.md](./README.md).

## Prerequisites

- …

## Environment

| Variable              | Purpose       |
| --------------------- | ------------- |
| `LLAMA_*`             | …             |
| `NEXT_PUBLIC_APP_URL` | Callback base |

## Steps

1. Start tunnel …
2. Set `…_OVERRIDE_URL` in `.env.local`
3. Run webhook listener …

## Verify

- …
```
