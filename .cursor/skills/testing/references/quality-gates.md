# Quality gates (feature complete)

Unless the user waives a gate:

- [ ] Unit/integration tests pass for changed `server/`, `lib/`, `utils/`
- [ ] **E2E decision** asked with a clear yes/no recommendation
- [ ] Lint/typecheck pass; test imports respect **eslint** boundaries
- [ ] No committed `test.only` / undocumented `test.skip`

**When E2E is required:** specs under `tests/e2e/<business-flow>/`; focused files; stable selectors; no flake timeouts.

**Waivers:** note what lower-level tests cover instead.
