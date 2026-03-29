---
title: "Implement Category Management and Vehicle Alignment"
description: "Add admin vehicle category CRUD, align vehicle CRUD with category contract, and remove outdated vehicle filter/type mocks in admin and public pages."
status: in-progress
priority: P1
effort: 30h
issue: null
branch: main
tags: [feature, frontend, admin, api, refactor]
created: 2026-03-29
---

# Category Management and Vehicle Alignment Plan

## Overview

Implement full category management in admin panel, align vehicle create/update flows with backend category model, modernize vehicle form UX, and remove outdated mock/type/filter paths to match current backend filter contract.

## Mode

parallel

Rationale:

- Work spans independent layers: category CRUD module, vehicle form/contract alignment, and public/admin filter alignment.
- File ownership can be split to avoid merge conflicts.
- Cleanup can run as a dedicated hardening phase after integration.

## Phase Map

| #   | Phase                                                  | Status      | Effort | File                                                                                                                                       |
| --- | ------------------------------------------------------ | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Contract alignment and baseline cleanup                | Completed   | 4h     | [phase-01-contract-alignment-and-baseline-cleanup.md](./phase-01-contract-alignment-and-baseline-cleanup.md)                               |
| 2   | Admin category CRUD module                             | Completed   | 8h     | [phase-02-admin-category-crud-module.md](./phase-02-admin-category-crud-module.md)                                                         |
| 3   | Vehicle CRUD and form UX alignment                     | Completed   | 8h     | [phase-03-vehicle-crud-and-form-ux-alignment.md](./phase-03-vehicle-crud-and-form-ux-alignment.md)                                         |
| 4   | Admin and public vehicle filter alignment              | Completed   | 5h     | [phase-04-admin-and-public-vehicle-filter-alignment.md](./phase-04-admin-and-public-vehicle-filter-alignment.md)                           |
| 5   | Outdated type/mock removal and compatibility hardening | Completed   | 3h     | [phase-05-outdated-type-mock-removal-and-compatibility-hardening.md](./phase-05-outdated-type-mock-removal-and-compatibility-hardening.md) |
| 6   | Regression validation and release checklist            | In Progress | 2h     | [phase-06-regression-validation-and-release-checklist.md](./phase-06-regression-validation-and-release-checklist.md)                       |

## Dependency Graph

- Phase 1 starts first and defines shared contracts/type boundaries.
- Parallel group A (after Phase 1): Phase 2 and partial Phase 4 (non-category filter cleanup).
- Phase 3 starts after Phase 1 and Phase 2 (needs category contract + admin category APIs).
- Phase 4 finalization depends on Phase 2 for categoryId-based filter UX in admin/public.
- Phase 5 starts after Phase 3 and Phase 4.
- Phase 6 starts after Phase 5.

## File Ownership Matrix

Phase 1 ownership:

- src/types/index.ts
- src/lib/constants.ts
- src/lib/api-endpoints.ts

Phase 2 ownership:

- src/app/admin/categories/page.tsx (new)
- src/components/admin/categories/category-management-page.tsx (new)
- src/components/admin/categories/category-table.tsx (new)
- src/components/admin/categories/category-form-dialog.tsx (new)
- src/app/admin/categories/actions.ts (new)
- src/components/layout/AdminSidebar.tsx

Phase 3 ownership:

- src/components/admin/VehicleForm.tsx
- src/app/admin/vehicles/actions.ts
- src/lib/validation.ts
- src/components/ui/Input.tsx (only if minimally extended for reusable admin field pattern)

Phase 4 ownership:

- src/app/admin/vehicles/page.tsx
- src/components/admin/VehicleTable.tsx
- src/app/(public)/bikes/bikes-client.tsx
- src/components/bikes/BikeFilterBar.tsx
- src/components/home/SearchBar.tsx
- src/hooks/useVehicles.ts
- src/hooks/useAdminVehicles.ts

Phase 5 ownership:

- src/types/index.ts (final deprecated cleanup)
- src/components/bikes/CategoryNav.tsx
- src/components/ui/CategoryBadge.tsx
- src/lib/constants.ts (remove stale vehicle category/type mock labels if no longer used)

Phase 6 ownership:

- plans/260329-0120-category-management-and-vehicle-filter-alignment/\*.md
- docs/codebase-summary.md (only if architecture summary needs update)

## Requirement Coverage Map

1. Implement category CRUD in admin panel:

- Covered in Phase 2 (new admin categories route + list/create/update/delete actions).

2. Update vehicle CRUD to comply with new category:

- Covered in Phase 3 (category contract mapping, payload updates, backward-compatible update behavior).

3. Enhance vehicle create/edit forms with clearer UI and placeholders:

- Covered in Phase 3 (shared field pattern aligned with booking admin form visual style).

4. Remove ALL outdated types and mock:

- Covered in Phase 1 and Phase 5 (deprecated type/model/constants cleanup).

5. Update vehicle filters in admin and public page; remove mock filters and keep BE-supported filters only:

- Covered in Phase 4 using confirmed filter set: categoryId, minPrice/maxPrice, search, sortBy/sortOrder.

## Confirmed Decisions (From User Answers)

- Category CRUD base path: `/admin/vehicle-categories`.
- Public bikes filter scope: keep `categoryId`, `minPrice/maxPrice`, `search`, `sortBy/sortOrder`.
- Vehicle edit category behavior: backend-dependent; implement backward-compatible path (only send category update when endpoint accepts it, otherwise keep current behavior and avoid breaking update flow).

## Key Technical Decisions

- Keep migration incremental: introduce category management first, then wire vehicle form/selects to live category data.
- Prefer `categoryId` as single source of truth for mutation payloads; keep derived display fields read-only.
- Remove hardcoded category/type lists from vehicle form where dynamic category list is available.
- Preserve SSR-safe data loading in route pages; keep client interactivity inside existing client components.

## Risks

- Backend may reject `categoryId` in vehicle PATCH payload; edit flow can regress if not guarded.
- Removing mock filters can break URL compatibility for existing bookmarks.
- Deprecated type cleanup can break components still expecting `category` string union.

## Mitigations

- Add payload guard and fallback path for vehicle update.
- Keep query-param sanitizer that ignores unsupported params rather than throwing.
- Perform one pass of usage scan before deleting deprecated types/constants.

## Success Criteria

- Admin can create/read/update/delete categories from dedicated categories page.
- Vehicle create flow uses category list from backend and submits valid category linkage.
- Vehicle edit flow remains stable with backend-compatible category update behavior.
- Admin/public filters only expose backend-supported filter fields.
- No stale `VehicleCategory` string-union usage in runtime paths.
- `npm run build` passes.

## Progress Notes

- Completed: Phase 1, 2, 3, 4, 5 implementation.
- Completed: Production build + typecheck (`npm run build`).
- In progress: Manual smoke validation for admin/public runtime flows in browser environment.
