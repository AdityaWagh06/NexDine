---
description: 
---

# Verify Workflow

Perform a complete verification of the current project.

Steps:

1. Review changed files.
2. Run TypeScript validation.
3. Run linting checks.
4. Run production build.
5. Check browser console for errors.
6. Check network requests for failures.
7. Verify mobile responsiveness.
8. Verify desktop responsiveness.

If any issue is found:

- identify root cause
- fix the issue
- rerun verification

Do not report success until all checks pass.

Output format:

PASS
WARNING
FAIL

Include a summary of findings.