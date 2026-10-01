---
description: Recommend and run the minimum validation set, then write the report
argument-hint: "[full]"
---

Act as **orchestrator** in this session: read and follow `.claude/agents/orchestrator.md`. It asks the user and launches the other agents, which subagents cannot do, so do not spawn it as one.
Launch each approved agent as a subagent (`subagent_type: <agent>`), one at a time. Arguments `full` → full validation profile; otherwise recommend the minimum set. Arguments: $ARGUMENTS
Always end with a report under `pipeline-reports/`.
