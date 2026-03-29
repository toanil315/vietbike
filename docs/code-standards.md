# Code Standards

This document defines practical standards for this repository.

## Core Principles

- KISS: prefer simple solutions and avoid unnecessary abstraction.
- YAGNI: implement only what current features require.
- DRY: centralize repeated logic in shared modules.

## Language and Typing

- Use TypeScript for all application logic.
- Keep `strict` mode expectations intact.
- Prefer explicit domain types from `src/types` over ad-hoc object shapes.
- Use `z.infer` from Zod schemas where request DTOs are validated.

## File and Module Organization

- Keep domain boundaries clear:
  - Routes/layouts in `src/app`
  - Reusable presentation in `src/components`
  - API and utilities in `src/lib`
  - Stateful logic in `src/store`
  - Cross-cutting fetch/mutation logic in `src/hooks`
- Use meaningful file names and avoid ambiguous names.
- Prefer adding to existing modules before creating parallel variants.

## Components

- Use server components by default where interactivity is not required.
- Add `"use client"` only when hooks, event handlers, or client state are needed.
- Keep components focused; extract subcomponents when complexity grows.
- Co-locate small helper logic with component only if not reused elsewhere.

## State Management

- Zustand stores should hold serializable, domain-relevant UI/business state.
- Keep store actions predictable and side-effect light.
- Avoid duplicating derived values if they can be computed in selectors/helpers.

## API and Data Access

- Route API calls through `src/lib/api.ts` and endpoint constants/builders.
- Avoid direct `fetch` scattering unless in controlled server-only page context.
- Normalize API response handling to reduce envelope mismatch risks.
- Surface user-facing errors through shared error utilities.

## Validation

- Validate external input with schemas in `src/lib/validation.ts`.
- Keep business rules in schema refinements when practical.
- Return field-level validation feedback for forms.
- For React form implementations, use React Hook Form as the default form state layer and pair it with Zod resolver for schema-driven validation.
- Exception: tiny forms with one or two simple fields may use local state when React Hook Form adds unnecessary complexity.

## Styling and UI

- Reuse shared UI primitives from `src/components/ui`.
- Preserve visual consistency across public and admin experiences.
- Keep utility class usage readable; extract shared patterns when repeated.

## Testing Expectations

- Prioritize tests for booking and admin critical paths.
- Add unit tests for utility and validation logic.
- Cover failure scenarios for API calls and form submission.

## Documentation Expectations

- Update docs in `docs/` when architecture, flows, or standards change.
- Keep README concise and task-oriented.
- Document known gaps with actionable next steps.

## Current Improvement Targets

- Standardize API response envelopes across hooks.
- Finalize add-on and refund workflows.
- Clarify and document admin auth/route guard model.
