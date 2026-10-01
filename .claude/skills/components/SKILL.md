---
name: components
description: Designs and splits React + Next.js UI with RSC-first client leaves, kebab-case files, PascalCase exports, and a11y. Use when creating or reviewing .tsx components or Server/Client boundaries.
---

# Components

Placement: `folder-structure` rule + skill. Unclear props/states/a11y → ask first.

## Principles

- Small, focused components; composition over configuration
- Default to **Server Components**; `"use client"` only when required
- DRY: extract at 2+ uses; smallest reusable piece first

## Naming

- Exports: **PascalCase** (`UserCard`)
- Files and folders: **kebab-case** always (`user-card.tsx`, `user-card/`)

## Types

1. **UI primitive** — no business logic (`src/components/ui/` via shadcn CLI)
2. **Composite** — domain-agnostic patterns (`src/components/composites/`)
3. **Feature** — domain UI (`src/features/<f>/components/`)

## File layout

Default: one kebab-case `.tsx`. Split at ~200–300 lines or divergent responsibilities.

Folder components hold **only `.tsx` building blocks**—no `index.tsx`, hooks, types, utils, or tests inside:

```
user-card/
├─ user-card.tsx
├─ user-card-header.tsx
└─ user-card-body.tsx
```

Import the public API from the primary file. Hooks/types/utils → feature folders; tests → `tests/`.

## Props and state

Minimal APIs (`value`/`onChange`, `children`/slots over boolean flags). Keep state local. Avoid client state for server-fetchable data. `useMemo`/`useCallback` only when measurable. Simple mutations → `optimistic-ui` skill.

## Accessibility and styling

Semantic HTML, keyboard nav, visible focus. Dialogs/menus/selects via shadcn (`src/components/ui/`) when the `shadcn` skill is installed. Tailwind + `cn()`; CVA for variants. Prefer **scale utilities** over arbitrary `[]` values—see `frontend` rule (ask before Figma-driven arbitrary classes; prefer theme tokens). Loading UI → `skeleton-loading` skill.

## Server vs Client

No directive = Server. `"use client"` only for client hooks, browser APIs, client-only libs, or local event/state that cannot be a Server Action.

1. Server shell, client leaves
2. Optional `-client` suffix for wholly client files
3. Data down, events up; mutations via Server Actions
4. No async client components
5. Serializable props only across the boundary

Anti-patterns: `"use client"` on large trees to fetch; `useEffect`+`fetch` for server data; callbacks from server parents into client children.

Decision tree and examples: [references/rsc-patterns.md](references/rsc-patterns.md), [references/layout-examples.md](references/layout-examples.md).
