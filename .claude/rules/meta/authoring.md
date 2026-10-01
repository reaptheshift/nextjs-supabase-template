---
description: How to write concise Claude Code rules, skills, agents, and commands in this repo
paths:
  - ".claude/**"
  - "CLAUDE.md"
---

# Authoring guidance

## Division of work

| Kind        | Job                                 | Limit                                              |
| ----------- | ----------------------------------- | -------------------------------------------------- |
| **Rule**    | Short constraints that must hold    | ≤50 lines, one concern, concrete good/bad examples |
| **Skill**   | How-to knowledge loaded on demand   | `SKILL.md` ≤200 lines; details in `references/`    |
| **Agent**   | One role, clear scope, fixed output | Shared text in `.claude/conventions.md`        |
| **Command** | Starts one agent or mode            | 3–5 lines                                          |

## Frontmatter

- **Rule:** `description`; optional `paths` (glob list). A rule without `paths` is always loaded
- **Skill:** `name` (kebab-case), third-person `description` with WHAT + WHEN; optional `disable-model-invocation: true`
- **Agent:** `name`, third-person `description`; optional `skills:` list of project-owned skills to preload (Claude subagents only get skills listed there)
- Do **not** use unsupported skill fields like `paths:`

## No duplication

- Rules must not paste skill content. State the hard constraint once; name the skill for details.
- Reference by exact name in backticks plus kind: `` `validation` skill ``, `` `env-vars` rule `` (some names are both a rule and a skill).
- Do not add "if the skill is not loaded" fallback copies.
- One term per concept: statuses `PASS | WARN | FAIL | BLOCKED`; agents `planner`, `reviewer`, `security-auditor`, `tests`, `ui-qa`, `git-agent`, `orchestrator`.

## Layout

`.claude/` is self-contained. Edit files in place; nothing is generated or synced.

- `.claude/rules/`, `.claude/skills/`, `.claude/agents/`, `.claude/commands/`, `.claude/validation-preferences.yaml`
- `planner`, `git-agent`, `orchestrator` run in the main session (they ask the user); commands for them read `.claude/agents/<name>.md`. The rest run as subagents

## Vendor skills

Project guidance mentions vendor skills **by name only**. Install/refresh via `/setup-project` (see `project-setup` skill)—never hand-copy vendor folders into `.claude/skills/`.
