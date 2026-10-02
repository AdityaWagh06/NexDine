---
description: 
---

# Release Check Workflow

Perform a complete production readiness review.

Phase 1 - Code Quality

1. Run TypeScript validation.
2. Run ESLint validation.
3. Check for unused code.
4. Check for unhandled promise rejections.
5. Check for TypeScript any abuse.

Phase 2 - Build Verification

1. Run production build.
2. Verify no build errors.
3. Verify no hydration issues.
4. Verify no route failures.

Phase 3 - Security Review

Use security-auditor.

Review:

- authentication
- authorization
- API security
- secrets exposure
- environment variables
- XSS
- injection vulnerabilities

Report findings by severity.

Phase 4 - Testing

Use test-engineer.

Verify:

- unit tests
- integration tests
- E2E tests
- critical user journeys

Phase 5 - UI Review

Use ui-ux-reviewer.

Review:

- mobile responsiveness
- desktop responsiveness
- accessibility
- loading states
- error states
- empty states
- visual consistency

Phase 6 - Bug Review

Use bug-hunter.

Investigate:

- console errors
- network failures
- broken interactions
- runtime exceptions

Phase 7 - Production Readiness

Use final-production-review.

Provide:

PASS = Ready to deploy

WARNING = Deployable but improvements recommended

FAIL = Deployment blocked

Final Report:

- Issues Found
- Issues Fixed
- Remaining Risks
- Deployment Recommendation