---
description: Frontend UI constraints—RSC, skeletons, optimistic UI, shadcn, Tailwind scale over arbitrary values
paths:
  - "src/**/*.tsx"
---

# Frontend

- **RSC default:** Server Components unless hooks/browser APIs require `"use client"`. Server shell + client leaf siblings. Skill: `components`.
- **Naming:** kebab-case files/folders; PascalCase exports. Split folders hold only `.tsx` building blocks—no `index.tsx`, hooks, or tests inside.
- **Loading:** server-fetched UI needs `loading.tsx` or Suspense with a layout-matched skeleton. Skill: `skeleton-loading`.
- **Optimistic UI:** simple likely-success Server Actions only (`useOptimistic` + rollback + visible error). Skip payments, auth, bulk/destructive. Skill: `optimistic-ui`.
- **shadcn:** primitives in `src/components/ui/` via `pnpm dlx shadcn@latest add`; product UI in feature `components/`. Use `shadcn` skill if installed.
- **Tailwind:** prefer scale utilities (`p-4`, `gap-6`, `text-sm`, theme colors). Arbitrary values (`p-[17px]`, `w-[347px]`, `text-[#…]`) are **last resort**. From Figma/MCP: map to nearest scale/token first; if the design truly needs off-scale values, **ask** whether to use arbitrary classes or extend the theme / design system (`@theme` / `globals.css`). Do not paste Figma px/hex into `[]` by default.
- **Perf / UI audit:** use `vercel-react-best-practices` / `web-design-guidelines` skills if installed.
