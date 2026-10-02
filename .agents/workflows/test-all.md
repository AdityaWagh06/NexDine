---
description: 
---

# Test All Workflow

Perform full project testing.

Steps:

1. Run TypeScript validation.
2. Run ESLint validation.
3. Run unit tests.
4. Run integration tests.
5. Run Playwright E2E tests if available.
6. Run production build.
7. Start application locally.
8. Test critical user journeys in browser.

Critical Journeys:

- Home page
- Login
- Registration
- Dashboard
- Forms
- API interactions
- Navigation
- Mobile layout

If any test fails:

- identify root cause
- create or update regression tests
- fix issue
- rerun failed tests
- rerun full verification

Do not stop after the first error.

Continue until all critical tests pass.

Output:

PASS
WARNING
FAIL

Include:

- tests executed
- failures found
- fixes applied
- remaining issues