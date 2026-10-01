---
description: Prefer readable, minimal structure—no extra layers without a clear need
---

# Simplicity

Optimize for clarity. Use the simplest structure that correctly solves the problem. Do not add architecture “for later.”

## Default posture

- Prefer obvious over clever
- Colocate by owner until a second consumer exists
- Delete unused files, empty folders, and dead exports with the change
- A wrapper or global client boundary must earn its keep

## Avoid overstructure

| Avoid                                                                       | Prefer                            |
| --------------------------------------------------------------------------- | --------------------------------- |
| Single-file folder wrapping one import                                      | Inline in the parent              |
| Route barrel (`*Route` / `*Content` / `*Section` that only fetch→one child) | Awaits + leaf in `page.tsx`       |
| Global client wrapper for one route                                         | Feature-local `"use client"` leaf |
| Abstraction used once “might reuse”                                         | Duplicate until the second use    |

## When extra structure is justified

Add a layer only when at least one is true:

1. Two or more call sites need the same behavior
2. Real variation exists and config reduces duplication
3. Framework requirement (Server/Client boundary; Suspense island that owns its fetch)
4. Extracting a heavy _section_ keeps `page.tsx` scannable (not a fetch+leaf hop)

## Checklist

1. Can this be inlined without hurting readability?
2. Is anything global that only one feature uses? → move local
3. Orphan files or unused types? → remove
4. Is the client boundary the minimum subtree?
