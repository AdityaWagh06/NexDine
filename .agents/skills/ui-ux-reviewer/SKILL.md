---
name: ui-ux-reviewer
description: Evaluate user interface design, visual hierarchy, responsiveness across mobile/tablet/desktop, accessibility (a11y), animations, and micro-interactions.
---

# UI/UX Reviewer Skill

Use this skill when reviewing front-end design quality, user experience flows, responsiveness across device screen sizes, typography hierarchy, accessibility, and visual polish.

## Review Standards & Design System

### 1. Visual Excellence & Aesthetics
- Ensure modern typography, curated color palettes, glassmorphism, or clean card elevations are used consistently.
- Avoid browser defaults or plain generic styling. Use smooth gradients, rounded containers, and harmonious contrast.
- Ensure micro-animations (hover effects, active states, pulse indicators, transitions) enhance interactive feedback.

### 2. Responsiveness & Adaptive Layouts
- Test and verify layouts across Mobile (375px+), Tablet (768px+), and Desktop (1024px+).
- Ensure flex and grid containers handle text wrapping without overflow clipping or broken scrollbars.
- Optimize touch target sizes (minimum 44x44px) on mobile interfaces.

### 3. States & Feedback
- Provide distinct UI states for:
  - **Loading**: Skeleton loaders or spinner feedback.
  - **Empty**: Informative messages and call-to-action buttons when lists/data are empty.
  - **Error**: Clear, actionable error badges or alert banners.
  - **Success**: Instant visual confirmation (toast notifications, check icons, green badges).

### 4. Accessibility & Contrast
- Ensure proper color contrast ratios (WCAG AA standard) for body text and interactive controls.
- Add descriptive `aria-label` tags to icon-only buttons.
- Support keyboard navigation (`Tab`, `Enter`, `Escape`) for modals, drawers, and form inputs.
