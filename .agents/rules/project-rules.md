---
trigger: always_on
---

# Project Engineering Rules

## General
- Never make large changes without first understanding the existing architecture.
- Reuse existing components and patterns before creating new ones.
- Do not duplicate logic.
- Keep components small and reusable.
- Prefer TypeScript and strict typing.
- Never use `any` unless absolutely necessary.
- Never hardcode API keys, secrets, tokens, passwords, or credentials.

## Before Changing Code
1. Inspect relevant files.
2. Understand dependencies and existing architecture.
3. Explain the intended approach.
4. Identify possible regressions.
5. Implement the smallest safe change.

## After Every Change
Always run:
1. Type checking
2. ESLint
3. Relevant unit tests
4. Build
5. Relevant Playwright tests

Never report a task as complete while tests or builds are failing.

## Bug Fixing
When a bug occurs:
1. Reproduce it.
2. Find the root cause.
3. Create or update a test that exposes the bug.
4. Fix the root cause rather than hiding the symptom.
5. Run regression tests.

## Security
Every new feature must be checked for:
- authentication
- authorization
- broken access control
- input validation
- injection
- XSS
- CSRF where applicable
- insecure redirects
- API abuse
- rate limiting
- secret leakage
- sensitive-data exposure

Never trust client-side authorization.

## UI
Before finishing frontend work:
- check mobile
- tablet
- desktop
- loading states
- empty states
- errors
- accessibility
- keyboard navigation
- responsive overflow
- visual consistency

Use the browser to verify the actual UI instead of assuming from source code.

## Production
Never claim something is production-ready solely because it compiles.