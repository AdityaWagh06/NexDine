---
name: test-engineer
description: Design and execute unit, integration, and E2E testing strategies, build verification, TypeScript validation, and linting checks.
---

# Test Engineer Skill

Use this skill when defining test strategies, verifying TypeScript type safety, configuring Playwright/Vitest test suites, running build checks, and ensuring zero build breakage.

## Testing Protocol & Quality Assurance

### 1. Static Analysis & Type Checking
- Run `npx tsc --noEmit` or `npm run build` to enforce 100% strict TypeScript compliance.
- Verify ESLint rules pass with zero syntax or unused variable warnings.

### 2. Integration & End-to-End Testing
- Test critical user journeys end-to-end:
  - Public landing page navigation
  - Restaurant onboarding & application submission
  - Admin approval workflow
  - Restaurant owner dashboard menu management
  - Customer table ordering & live kitchen display updates
- Verify mock data fallbacks perform seamlessly when external APIs/databases are offline.

### 3. Edge Case Coverage
- Test form validation boundaries (invalid emails, short passwords, special characters).
- Test rapid repeated clicks on submit buttons to verify debounce and loading state handling.
- Test browser refresh recovery to verify local storage state persistence.

### 4. Build Verification
- Never mark a feature complete without running a clean production bundle check (`npm run build`).

### 5. Bug Fix Verification

- When fixing a bug, first identify how to reproduce it.
- Create or update a test that exposes the bug whenever possible.
- Apply the smallest safe fix.
- Re-run all affected tests.
- Verify the original issue no longer occurs.

### 6. Completion Criteria

Do not mark a task complete if:

- TypeScript checks fail
- ESLint checks fail
- Tests fail
- Production build fails

A task is only complete when verification passes successfully.