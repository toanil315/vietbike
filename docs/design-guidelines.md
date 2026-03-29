# Design Guidelines

## Design Intent

The product should feel practical, trustworthy, and fast for both travelers and operations staff.

## Experience Principles

- Clarity first: users should always know next action.
- Speed of decision: bike comparison and booking should be low-friction.
- Operational confidence: admin actions should be explicit and reversible where possible.

## Information Architecture

Public:

- Discovery (`/`, `/bikes`)
- Decision (`/bikes/[slug]`)
- Conversion (`/booking`, `/booking/confirmation`)

Admin:

- Monitoring (`/admin`)
- Operations (`/admin/vehicles`, `/admin/bookings`, `/admin/categories`)
- Supporting modules (`/admin/customers`, `/admin/finance`, `/admin/vouchers`)

## UI System Guidance

- Reuse shared primitives from `src/components/ui`.
- Keep component states explicit: default, loading, empty, error, success.
- Use badges and status indicators consistently for booking and vehicle states.
- Maintain spacing and typographic hierarchy consistency between pages.

## Forms and Booking UX

- Break long workflows into clear steps.
- Validate early and show field-level messages.
- Keep pricing summary visible during checkout when possible.
- Preserve user-entered data across steps and route transitions.

## Motion and Feedback

- Use animation to clarify transitions, not decorate noise.
- Keep transition durations short and consistent.
- Surface async operation results with clear toast or inline feedback.

## Responsive Behavior

- Prioritize mobile-first layout for public booking journey.
- Ensure admin tables remain usable on smaller screens (scrolling, stacking, or condensed actions).
- Test core flows on common viewport ranges.

## Accessibility Baseline

- Use semantic HTML and proper heading hierarchy.
- Ensure keyboard reachability for form controls and key actions.
- Preserve contrast and readable text sizes across surfaces.
- Provide descriptive labels and error messages.

## Content Style

- Use concise, action-oriented labels.
- Prefer plain language over technical jargon for customer-facing text.
- Keep admin terminology aligned with operational terms.

## Design Debt to Address

- Consolidate hydration workaround patterns where not needed.
- Normalize visual treatment for loading and error states.
- Revisit incomplete add-on UX to avoid dead-end interactions.
