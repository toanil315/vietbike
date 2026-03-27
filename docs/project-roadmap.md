# Project Roadmap

## Current Status

Migration from legacy React+Vite to Next.js is marked complete in project notes.

Focus now shifts to stabilization, consistency, and production hardening.

## Phase Plan

### Phase A: Booking Reliability

Status: In Progress
Goals:

- Complete add-on integration path in booking flow
- Harden form validation and failure messaging
- Add regression tests for booking submission and confirmation

Exit criteria:

- End-to-end booking path is stable across happy path and common failure states

### Phase B: Admin Operations Maturity

Status: Planned
Goals:

- Complete refund workflow end-to-end
- Standardize booking status transitions and safeguards
- Improve admin UX for high-volume operations

Exit criteria:

- Admin can complete core operational tasks without manual workaround

### Phase C: API Contract Consistency

Status: Planned
Goals:

- Standardize response envelope assumptions in hooks
- Reduce per-hook response shape branching
- Improve typed contract confidence across API boundaries

Exit criteria:

- Shared API handling pattern adopted in all major hooks

### Phase D: Auth and Access Clarity

Status: Planned
Goals:

- Document and enforce admin route protection model
- Validate token/session lifecycle behaviors
- Define role/permission extension points

Exit criteria:

- Auth model is documented, deterministic, and validated in test coverage

### Phase E: Performance and UX Polish

Status: Planned
Goals:

- Review hydration workaround hotspots
- Optimize rendering split between server and client components
- Improve perceived speed and interaction smoothness on mobile

Exit criteria:

- Core pages meet target performance and interaction quality

## Backlog Highlights

- Voucher and pricing rule expansion
- Better analytics for conversion and admin productivity
- Localization/internationalization groundwork

## Risks

- Backend API evolution may outpace frontend contract updates.
- Feature completeness gaps can delay production confidence.
- Missing integration tests can hide regressions in booking/admin flows.

## Tracking Recommendation

- Maintain this file as the source of roadmap status.
- Update phase status after each major feature delivery.
