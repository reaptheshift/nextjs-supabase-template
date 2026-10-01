# Testing patterns

## Vitest

### Server Action

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createUser } from "../server/create-user";

vi.mock("@/server/db", () => ({
  db: { user: { create: vi.fn() } },
}));

import { db } from "@/server/db";

describe("createUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns ok when insert succeeds", async () => {
    vi.mocked(db.user.create).mockResolvedValue({ id: "1" });
    expect(await createUser({ name: "Ada", email: "a@b.co" })).toEqual({
      ok: true,
    });
  });

  it("returns error when insert fails", async () => {
    vi.mocked(db.user.create).mockRejectedValue(new Error("db"));
    expect((await createUser({ name: "Ada", email: "a@b.co" })).ok).toBe(false);
  });
});
```

### Client component (RTL)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { UsersTableToolbar } from "../components/users-table/users-table-toolbar";

describe("UsersTableToolbar", () => {
  it("updates search input", async () => {
    const user = userEvent.setup();
    render(<UsersTableToolbar />);
    await user.type(screen.getByRole("searchbox"), "ada");
    expect(screen.getByRole("searchbox")).toHaveValue("ada");
  });
});
```

## Playwright

### Spec

```ts
// tests/e2e/authentication/sign-in-with-email.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication › sign in with email", () => {
  test("redirects to dashboard after valid credentials", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByRole("textbox", { name: /email/i }).fill("user@test.local");
    await page.getByLabel(/password/i).fill(process.env.E2E_USER_PASSWORD!);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
```

- Auth: `storageState` / `globalSetup` → `playwright/.auth/` (gitignore)
- CI: prefer `build` + `start` via `webServer` in `playwright.config.ts`
