---
description: Code quality—structure, comments, naming, function declarations, ask-first
---

# Code writing

## Structure

Separate larger logic into functional blocks—one block = one step. Prefer: validate → prepare → execute → respond → handle errors.

## Comments

Comment **intent** where it is not obvious from names. Never restate the code.

## Naming

Use specific, descriptive names. Avoid: `data`, `item`, `thing`, `result`, `temp`, `value`. Prefer purpose-stating names (`userPaymentInstructions`, `validatedTaxObligation`).

Filenames/folders: **kebab-case**. React exports: **PascalCase**.

## Function style

Named functions and components use **function declarations**. Arrow functions are for small inline pieces (callbacks, `map`/`filter`, one-line handlers):

```ts
export function calculateInvoiceTotal(invoiceLines: InvoiceLine[]) { ... }
export function UserCard({ user }: UserCardProps) { ... }
const activeUsers = users.filter((user) => user.isActive);

// Bad
const calculateInvoiceTotal = (invoiceLines: InvoiceLine[]) => { ... };
```

## Env

Read env only through `src/lib/env.ts` (see `env-vars` rule).

## Ask first

If unclear, risky, or incomplete—**ask first**. For larger features, outline blocks, risks, and open questions before coding.
