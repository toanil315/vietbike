---
title: "Admin Booking Management Re-implementation Plan"
description: "Rebuild admin booking management UI and data layer to fully match backend booking and sync APIs from Swagger/Postman."
status: pending
priority: P1
effort: 22h
issue: null
branch: main
tags: [feature, frontend, api, admin, critical]
created: 2026-03-27
---

# Admin Booking Management Re-implementation Plan

## Overview

Re-implement admin booking management so list/search/detail/create/edit/sync-target flows strictly follow current backend contracts from Swagger and postman_collection.json, with modular Next.js architecture and strict TypeScript safety.

## Mode

parallel

Rationale:

- Multi-surface scope: API contract, types/validation, admin list/detail UI, create/edit forms, sync target panel.
- 3+ independent modules possible with clear file ownership.

## Phase Map

| #   | Phase                                     | Status  | Effort | File                                                                                                                     |
| --- | ----------------------------------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | Contract alignment and foundation         | Pending | 4h     | [phase-01](./phase-01-contract-alignment-and-foundation.md)                                                              |
| 2   | Booking list + detail rebuild             | Pending | 5h     | [phase-02-booking-list-and-detail-rebuild.md](./phase-02-booking-list-and-detail-rebuild.md)                             |
| 3   | Manual create + edit booking flow         | Pending | 6h     | [phase-03-manual-create-and-edit-booking.md](./phase-03-manual-create-and-edit-booking.md)                               |
| 4   | Sync target UI + pull orchestration       | Pending | 4h     | [phase-04-sync-target-management-and-pull-orchestration.md](./phase-04-sync-target-management-and-pull-orchestration.md) |
| 5   | Type safety, regression hardening, polish | Pending | 3h     | [phase-05-validation-type-safety-and-hardening.md](./phase-05-validation-type-safety-and-hardening.md)                   |

## Parallel Execution Strategy

Parallel group A (start immediately after Phase 1):

- Phase 2 (list/detail)
- Phase 3 (create/edit)
- Phase 4 (sync target panel)

Sequential gate:

- Phase 5 starts after phases 2, 3, 4 merged.

## File Ownership Matrix

Phase 1 ownership:

- src/lib/api-endpoints.ts
- src/types/index.ts
- src/lib/validation.ts
- src/lib/api.ts (small normalization updates only)

Phase 2 ownership:

- src/app/admin/bookings/page.tsx
- src/app/admin/bookings/[reference]/page.tsx (new)
- src/components/admin/bookings/bookings-list-page.tsx (new)
- src/components/admin/bookings/bookings-list-filters.tsx (new)
- src/components/admin/bookings/bookings-table.tsx (new)
- src/components/admin/bookings/booking-detail-card.tsx (new)
- src/components/admin/BookingsTable.tsx (delete/replace import path)
- src/hooks/useAdminBookings.ts

Phase 3 ownership:

- src/app/admin/bookings/new/page.tsx
- src/app/admin/bookings/[bookingId]/edit/page.tsx (new)
- src/components/admin/NewBookingForm.tsx (replace/split)
- src/components/admin/bookings/booking-upsert-form.tsx (new)
- src/components/admin/bookings/booking-form-fields.tsx (new)
- src/components/admin/bookings/booking-documents-input.tsx (new)
- src/components/admin/bookings/handlers/booking-upsert-handlers.ts (new)
- src/hooks/useAdminBookingMutations.ts (new)

Phase 4 ownership:

- src/components/admin/bookings/booking-sync-target-section.tsx (new)
- src/components/admin/bookings/hooks/useBookingSyncTarget.ts (new)
- src/components/admin/bookings/handlers/booking-sync-handlers.ts (new)
- src/app/admin/bookings/actions.ts

Phase 5 ownership:

- src/components/admin/bookings/\*\* (type fixes + loading/error states)
- src/app/admin/bookings/\*\* (route-level validation and fallback)
- docs/codebase-summary.md (small update if architecture changed significantly)

## Key API Coverage Required

Booking management:

- GET /bookings (list + search/filter)
- GET /bookings/{reference} (detail)
- POST /bookings (manual create)
- PATCH /bookings/{bookingId} (edit)
- PATCH /bookings/{bookingId}/status (status update, existing behavior retained)

Booking sync:

- GET /bookings/sync/spreadsheets
- GET /bookings/sync/target
- PUT /bookings/sync/target
- POST /bookings/sync/pull

## Hard Requirements Embedded

- Sync target section visible inside booking management page.
- Trigger POST /bookings/sync/pull:
  - on first load of sync section (after target fetched), and
  - every time target changes successfully.
- Form/list shape follows backend request model from Postman/Swagger.
- No inline heavy handlers in page components; move handlers/hooks into dedicated modules.
- Follow existing design system primitives and style semantics.
- Resolve type errors introduced by changes.

## Risks

- Current Booking type shape mismatches backend fields (customerSnapshot vs customerInfo, monetary representation).
- Existing admin list local search duplicates server search semantics.
- Manual form currently uses localized labels and mixed payload field names, likely drifting from API contract.
- Pull endpoint side-effect timing can cause duplicate triggers if not guarded.

## Done Criteria

- Admin can list/search bookings with backend-driven filters and pagination.
- Admin can open booking detail by reference.
- Admin can create and edit bookings with validated API payloads.
- Sync target section works end-to-end with pull trigger policy.
- Build passes with no new TS errors caused by this feature.
