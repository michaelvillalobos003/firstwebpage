---
name: Workflow runtime modules
description: Why workflow commands must use a language runtime explicitly installed as a Replit module.
---

Ensure any runtime used by a workflow is installed as an explicit Replit language module rather than relying on a runtime that happens to be available in an interactive shell.

**Why:** An imported workflow can fail with “command not found” even when the same runtime was previously visible in the workspace shell; the workflow PATH is determined by configured modules.

**How to apply:** When configuring or repairing a workflow, install the supported language module first, then use the normal runtime command and restart the workflow.

Imported repositories can also have unrelated shallow histories. If `git merge-base` returns no result after fetching the remote, reconcile the branches with an explicit merge using `--allow-unrelated-histories`, resolve content conflicts, and verify the merge before committing.