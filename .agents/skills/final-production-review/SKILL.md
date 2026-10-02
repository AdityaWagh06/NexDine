---
name: final-production-review
description: Comprehensive pre-deployment sign-off checklist reviewing build integrity, database migrations, security policies, documentation, and user readiness.
---

# Final Production Review Skill

Use this skill when performing the final quality assurance gate before deploying to production or declaring a milestone complete.

## Production Readiness Checklist

### 1. Build & Compilation Integrity
- [ ] TypeScript compilation (`tsc -b`) passes with 0 errors.
- [ ] Production bundling (`vite build` or `next build`) succeeds without unhandled chunk warnings.
- [ ] No `console.error` unhandled exceptions occur during standard user interactions.

### 2. Database & Security Verification
- [ ] Database setup SQL scripts (`database/setup.sql`) are updated, clean, and executable.
- [ ] RLS policies on all database tables allow legitimate application role queries (`anon`, `authenticated`) while preventing unauthorized data access.
- [ ] No API keys, service role credentials, or passwords are hardcoded in public source code.

### 3. User Experience & Route Verification
- [ ] All application routes load cleanly with proper 404 navigation fallbacks.
- [ ] Demo credentials, 1-Click auto-fill helpers, and authentication redirects function smoothly.
- [ ] Mobile and desktop viewports are responsive and visually polished.

### 4. Documentation Completeness
- [ ] System roles, credentials, and page routes are documented (e.g. `PASSWORDS.md`, `README.md`).
- [ ] Setup instructions for local environment and production deployment are clear and reproducible.

### 5. Cross-Skill Verification

Before approving production deployment:

- Run security-auditor
- Run test-engineer
- Run ui-ux-reviewer
- Run bug-hunter on any unresolved issues

Do not approve deployment if any critical issue remains unresolved.

Final Result:

PASS = Ready for deployment

WARNING = Deployable but improvements recommended

FAIL = Deployment should be blocked