---
title: "Enhance Booking Management Module"
description: "Improve admin booking interactions, sync-target usability, list columns, manual upsert forms, and Vietnamese localization across admin panel."
status: pending
priority: P1
effort: 24h
issue: null
branch: main
tags: [feature, frontend, admin, localization, critical]
created: 2026-03-27
---

# Enhance Booking Management Module Plan

## Overview

Deliver targeted enhancements for admin booking management with better interaction feedback, corrected sync-target UI behavior, booking list column changes, manual create/edit form upgrades, and Vietnamese-first admin content.

## Mode

parallel

Rationale:

- Multiple independent implementation tracks exist in booking module.
- Clear file ownership allows safe parallel work for sync-target, list, and upsert form tracks.
- Admin-wide localization can run as a dedicated consolidation phase after booking track merges.

## Phase Map

| #   | Phase                                             | Status  | Effort | File                                                                                                                             |
| --- | ------------------------------------------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Interaction standards and labeling baseline       | Pending | 3h     | [phase-01-interaction-standards-and-shared-admin-labels.md](./phase-01-interaction-standards-and-shared-admin-labels.md)         |
| 2   | Sync target usability and pull retrigger          | Pending | 4h     | [phase-02-sync-target-usability-and-pull-retrigger.md](./phase-02-sync-target-usability-and-pull-retrigger.md)                   |
| 3   | Booking list financial columns and actions UX     | Pending | 4h     | [phase-03-booking-list-financial-columns-and-actions.md](./phase-03-booking-list-financial-columns-and-actions.md)               |
| 4   | Manual booking form model and derived rental days | Pending | 6h     | [phase-04-manual-booking-form-model-and-derived-rental-days.md](./phase-04-manual-booking-form-model-and-derived-rental-days.md) |
| 5   | Admin panel Vietnamese translation rollout        | Pending | 5h     | [phase-05-admin-panel-vietnamese-translation-rollout.md](./phase-05-admin-panel-vietnamese-translation-rollout.md)               |
| 6   | Regression hardening and release checklist        | Pending | 2h     | [phase-06-regression-hardening-and-release-checklist.md](./phase-06-regression-hardening-and-release-checklist.md)               |

## Dependency Graph

- Phase 1 starts first; creates reusable interaction and translation conventions.
- Parallel group A (after Phase 1): Phase 2, Phase 3, Phase 4.
- Phase 5 starts after Phases 2-4 merge.
- Phase 6 starts after Phase 5.

## File Ownership Matrix

Phase 1 ownership:

- src/components/ui/\*\* (only if shared interactive state utilities are required)
- src/app/globals.css (only if centralized admin interaction utility classes are required)
- src/lib/constants.ts (admin Vietnamese labels map)
- docs/design-guidelines.md (small update for Vietnamese admin copy rules)

Phase 2 ownership:

- src/components/admin/bookings/booking-sync-target-section.tsx
- src/components/admin/bookings/hooks/useBookingSyncTarget.ts
- src/components/admin/bookings/handlers/booking-sync-handlers.ts
- src/app/admin/bookings/actions.ts

Phase 3 ownership:

- src/components/admin/bookings/bookings-table.tsx
- src/components/admin/bookings/bookings-management-page.tsx
- src/app/admin/bookings/page.tsx (only when header/filter labels require alignment)
- src/lib/utils.ts (only if amount rendering helper split is needed)

Phase 4 ownership:

- src/components/admin/bookings/booking-upsert-form.tsx
- src/components/admin/bookings/booking-form-fields.tsx
- src/components/admin/bookings/booking-documents-input.tsx
- src/components/admin/bookings/handlers/booking-upsert-handlers.ts
- src/lib/validation.ts
- src/types/index.ts

Phase 5 ownership:

- src/app/admin/\*\* (excluding files already owned in phases 2-4 unless merged and unlocked)
- src/components/admin/\*\* (excluding files already owned in phases 2-4 unless merged and unlocked)
- src/lib/constants.ts (finalized VN labels/term map)

Phase 6 ownership:

- src/app/admin/\*\* (regression fixes only)
- src/components/admin/\*\* (regression fixes only)
- plans/260327-1735-enhance-booking-management-module/\*.md (status updates)

## Requirement Coverage Map

0. Make button more interactive:

- Covered in Phase 1 baseline and applied concretely in phases 2-4.

1. Booking Sync Target improvements:

- Fully covered in Phase 2 (field sizing, editable current sheet, pull retrigger on save, stronger refresh button style).

2. Booking list updates:

- Fully covered in Phase 3 (amount raw display, Deposit column replacement, remove Confirm action, stronger Detail/Edit interactions).

3. Create/Edit manual booking updates:

- Fully covered in Phase 4 (field labels, extensionInfo, documents link array, rental days from pickup/dropoff date diff).

4. Translate admin panel to Vietnamese:

- Booking area labels translated in phases 2-4, remaining admin modules in Phase 5.

## Key Technical Decisions

- Money display rule: render API amount value directly in booking list columns; avoid any client-side VND relocalization in those cells.
- Booking list money columns are display-only in this scope; no numeric sort behavior added.
- Status dropdown labels remain raw enum words (English) for operations parity.
- Derived rental days: compute from pickup/dropoff delta with minimum 1 and disabled direct manual edit to avoid data drift.
- Documents input model: maintain `BookingDocument[]` contract and move to link-oriented form array with both `name` and `url`.

## Risks

- Mixed money data types (`string | number`) may break sorting and display if not normalized for non-render operations.
- Vietnamese translation can accidentally alter API-bound enum values if display and payload mapping are mixed.
- Date delta edge cases (timezone, same-day booking) can create off-by-one rental day values.
- Editable sync sheet name may violate backend constraints if not validated before PUT.

## Done Criteria

- Booking admin screens satisfy all requested enhancements and remain API-compatible.
- Admin booking create and edit flows preserve strict validation and payload shape.
- Vietnamese content is consistent across admin pages without breaking route logic or API payloads.
- Build succeeds with no new TypeScript errors.

## Resolved Decisions

- Keep status labels in dropdown options as raw enum words (English).
- Keep booking list Amount and Deposit as display-only columns in this enhancement.
- Document link form array must support both `name` and `url` per item.
