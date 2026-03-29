---
title: "Vehicle List and Form Review Enhancements"
description: "Refactor public bikes category sourcing to API-first, rework section grouping by category catalog, migrate admin vehicle form to React Hook Form, and update code standards for form implementation guidance."
status: completed
priority: P1
effort: 22h
issue: null
branch: main
tags: [feature, frontend, admin, public, refactor]
created: 2026-03-29
---

# Vehicle List and Form Review Enhancements Plan

## Overview

Implement review-driven enhancements across public bikes listing and admin vehicle form: category options must come from category API, section grouping must be category-catalog first (not derived from vehicle list), VehicleForm must migrate to React Hook Form, and coding standards must explicitly require React Hook Form for form-related implementations.

## Mode

parallel

Rationale:

- Public listing improvements and admin form migration are separable tracks.
- Documentation update can run independently after architecture decisions are finalized.
- Regression validation should run as dedicated final phase after merge of both tracks.

## Phase Map

| #   | Phase                                            | Status      | Effort | File                                                                                                                           |
| --- | ------------------------------------------------ | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Category API contract and shared query utilities | Completed   | 4h     | [phase-01-category-api-contract-and-shared-query-utilities.md](./phase-01-category-api-contract-and-shared-query-utilities.md) |
| 2   | Public bikes category-first data composition     | Completed   | 6h     | [phase-02-public-bikes-category-first-data-composition.md](./phase-02-public-bikes-category-first-data-composition.md)         |
| 3   | VehicleForm migration to React Hook Form         | Completed   | 8h     | [phase-03-vehicle-form-migration-to-react-hook-form.md](./phase-03-vehicle-form-migration-to-react-hook-form.md)               |
| 4   | Code standards update for form stack             | Completed   | 1h     | [phase-04-code-standards-update-for-form-stack.md](./phase-04-code-standards-update-for-form-stack.md)                         |
| 5   | Regression hardening and rollout checklist       | In Progress | 3h     | [phase-05-regression-hardening-and-rollout-checklist.md](./phase-05-regression-hardening-and-rollout-checklist.md)             |

## Dependency Graph

- Phase 1 starts first and standardizes category API access + response normalization.
- Phase 2 starts after Phase 1 because it consumes shared category query/normalizer.
- Phase 3 can run in parallel after Phase 1 (independent from public section composition).
- Phase 4 starts after Phase 3 (docs must match final RHF approach).
- Phase 5 starts after Phase 2 + Phase 3 + Phase 4.

## File Ownership Matrix

Phase 1 ownership:

- src/lib/api-endpoints.ts
- src/types/index.ts
- src/lib/api.ts (only if response normalization helper extraction is needed)
- src/hooks/useVehicles.ts (only if shared query helper is introduced)

Phase 2 ownership:

- src/app/(public)/bikes/page.tsx
- src/app/(public)/bikes/bikes-client.tsx
- src/components/bikes/BikeFilterBar.tsx
- src/components/bikes/CategoryNav.tsx (if sharing category-fetch helper)
- src/lib/constants.ts (only if section icon mapping fallback constants extracted)

Phase 3 ownership:

- src/components/admin/VehicleForm.tsx
- src/app/admin/vehicles/actions.ts
- src/lib/validation.ts
- src/components/ui/Input.tsx (optional, only if required by RHF adapter)
- src/hooks/useAdminVehicles.ts (only if payload/query type coupling requires updates)

Phase 4 ownership:

- docs/code-standards.md

Phase 5 ownership:

- plans/260329-0300-vehicle-list-category-and-form-review-enhancements/\*.md
- docs/codebase-summary.md (only if architecture flow materially changes)
- docs/system-architecture.md (only if category-first composition needs documenting)

## Requirement Coverage Map

1. `categoryOptions` in `bikes-client.tsx` must be fetched from API:

- Covered in Phase 1 + Phase 2 via dedicated category API fetch and explicit prop wiring into bikes client.

2. `groupVehiclesByCategory` must use category-first approach:

- Covered in Phase 2 by fetching categories first, then assigning vehicles by categoryId with empty-category-safe output.

3. `VehicleForm` migrate to React Hook Form:

- Covered in Phase 3 with RHF-managed state, validation integration, and submit handlers for create/update.

4. Backend now supports modifying `categoryId` while updating vehicle:

- Covered in Phase 3 by removing fallback behavior and always sending `categoryId` in update payload.

5. Update `code-standards` to require RHF for form-related implementation:

- Covered in Phase 4.

6. Duplicate categoryOptions requirement:

- Treated as same requirement; enforced once in architecture and acceptance criteria.

## Key Technical Decisions

- Introduce a single category fetch normalizer to handle response envelope variants (`items` vs `data`).
- Build public sections from category catalog, not inferred vehicle categories, so categories with zero vehicles remain representable.
- Keep server-side fetching in `bikes/page.tsx` for deterministic composition and SEO-safe render.
- Use React Hook Form as single form state source in `VehicleForm` and remove parallel local state shape.

## Risks

- Category API latency can add overhead to bikes page server render.
- Category-first composition may expose categories with zero vehicles and affect current UX expectations.
- RHF migration can introduce field registration misses (especially arrays: images/features).

## Mitigations

- Cache category response with sensible revalidate window for public pages.
- Define explicit UX rule for empty category sections (hide vs show empty CTA).
- Add migration checklist mapping every current local state field to RHF `defaultValues` + submit payload.

## Success Criteria

- `bikes-client` receives `categoryOptions` from category API source, never derived from current vehicle list.
- Public section composition is category-catalog-first and no longer depends on discovered vehicle categories.
- Admin vehicle create/edit form is fully RHF-driven and still supports images/features/category updates.
- Vehicle update always supports and sends `categoryId` as backend now accepts it.
- `docs/code-standards.md` explicitly guides RHF usage for forms.
- `npm run build` passes.

## Execution Snapshot

- Completed: category API-first source wiring, category-first grouping composition, RHF migration for `VehicleForm`, `categoryId` update payload alignment, code standards update.
- Completed: homepage now runs category-first flow (fetch categories first, then fetch up to 4 vehicles per category in parallel, skip empty categories).
- Completed: bikes listing page now runs flat-list mode only (section grouping removed per latest scope update) while keeping API-sourced category options.
- Validated: `npm run build`.
- Remaining: manual browser smoke tests in Phase 5.
