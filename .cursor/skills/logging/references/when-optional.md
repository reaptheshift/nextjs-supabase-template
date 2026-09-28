# Client & optional logging

Server paths are **always** logged (**server.md**). Elsewhere, the agent **decides** from feature complexity.

## Decision tree

```
Is the code server-only (Server Action, src/server, Edge Function)?
├─ Yes → REQUIRED logging
└─ No → Is it client UI or hooks?
    ├─ Simple presentational change → skip client logs
    ├─ Form submit / mutation UX only → optional (errors to user often enough)
    ├─ Complex client state machine, retries, or hard-to-reproduce bug → add targeted logs
    └─ Auth/session debugging in browser → short-lived dev logs only; never tokens
```

## Usually skip

- Static UI, className tweaks, copy changes
- Pure presentational components with no I/O
- Tests (use test assertions instead, unless debugging a flaky E2E)

## Consider adding (client)

- Multi-step wizards with branching
- Heavy `useEffect` coordination or race-prone fetches (prefer fixing architecture first)
- Integration with third-party SDKs in the browser
- Features the user reports as “sometimes fails” with no server trace

## Client rules when you do log

- `console.debug` / `console.warn` in development; remove or gate behind `NODE_ENV === 'development'` before shipping verbose logs
- Never log passwords, tokens, or full `FormData` with secrets
- Prefer server logs for **source of truth** on mutations—client logs are supplementary

## `lib/` / shared modules

- **Pure helpers** — no logs
- **Network or file I/O** — log at server call sites; if shared is server-only, treat as **server.md**
