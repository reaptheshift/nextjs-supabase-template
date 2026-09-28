# Component layout examples

## Single file (default)

```
src/features/users/components/user-card.tsx   → export function UserCard() { ... }
```

## Split feature component

```
src/features/users/
├─ components/users-table/
│  ├─ users-table.tsx
│  ├─ users-table-toolbar.tsx
│  └─ users-table-empty-state.tsx
├─ hooks/use-users-table.ts
├─ types/users-table.ts
└─ tests/users-table.test.tsx
```

## Shared composite

```
src/components/composites/page-header/
├─ page-header.tsx
└─ page-header-actions.tsx
```
