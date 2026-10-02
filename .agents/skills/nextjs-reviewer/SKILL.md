---
name: nextjs-reviewer
description: Review React, Next.js, and Vite application architecture, component hierarchy, server/client component boundaries, performance optimization, and bundling practices.
---

# Next.js & React Architecture Reviewer Skill

Use this skill when reviewing React / Next.js / Vite web application code, evaluating routing structure, component reusability, state management patterns, and bundle optimization.

## Guidelines & Architecture Criteria

### 1. Component Boundaries & Performance
- Maintain clean separation between presentation components and business logic/data hooks.
- Use dynamic imports or React code-splitting (`import()`, React `lazy`) for heavy modules to minimize initial bundle size.
- Memoize expensive calculations (`useMemo`) and callback references (`useCallback`) to avoid redundant re-renders.

### 2. State Management & Hooks
- Prefer local component state over global state where appropriate.
- Avoid mutating React state directly; always use immutable updates.
- Keep custom hooks focused, modular, and single-purpose.

### 3. Routing & Navigation
- Ensure proper fallback states (`Loading`, `NotFound`, `ErrorBoundary`) across all routes.
- Validate route params and URL search queries to prevent undefined state crashes.
- Ensure browser history and deep linking work seamlessly across single-page routes.

### 4. Code Quality & Standards
- Enforce strict TypeScript typing across props, API responses, and event handlers.
- Eliminate dead code, unused imports, and unhandled promise rejections.

### 5. Security & Server Boundaries

- Verify secrets are never exposed to client-side code.
- Ensure API routes validate all inputs.
- Ensure authentication and authorization checks occur server-side.
- Review environment variable usage.
- Prevent accidental exposure of sensitive data through props or API responses.

### 6. Production Performance

Review:

- unnecessary client components
- large dependencies
- oversized images
- excessive API calls
- duplicate requests
- hydration issues

Recommend optimizations when identified.
