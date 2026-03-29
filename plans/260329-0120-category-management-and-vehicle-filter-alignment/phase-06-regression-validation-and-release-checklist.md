# Phase 06 - Regression Validation and Release Checklist

## Overview

Priority: P1  
Status: In Progress  
Effort: 2h

Validate end-to-end behavior for category CRUD, vehicle CRUD, and filter flows before release.

## Context Links

- src/app/admin/categories/page.tsx
- src/components/admin/VehicleForm.tsx
- src/components/admin/VehicleTable.tsx
- src/app/(public)/bikes/page.tsx
- package.json

## Requirements

Functional:

- Confirm category CRUD operations work end-to-end.
- Confirm vehicle create/edit with category linkage works.
- Confirm admin/public filters return expected list behavior.

Non-functional:

- Ensure build passes with no new type errors.
- Ensure no obvious visual regressions in admin pages.

## Validation Matrix

- Admin Categories:
  - create category
  - edit category
  - delete category (including blocked-by-reference response)
- Admin Vehicles:
  - create vehicle with selected category
  - edit vehicle details (and category update behavior per backend capability)
  - filter by category/search/status
- Public Bikes:
  - filter by category/search/price/sort
  - verify removed mock filters are absent

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260329-0120-category-management-and-vehicle-filter-alignment/plan.md
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260329-0120-category-management-and-vehicle-filter-alignment/phase-\*.md

## Implementation Steps

1. Run build and lint checks.
2. Smoke test admin category and vehicle flows.
3. Smoke test public bikes filter flow.
4. Update plan statuses and checkboxes according to results.

## Todo List

- [x] Run `npm run build`
- [ ] Smoke test admin categories CRUD
- [ ] Smoke test vehicle create/edit + category linkage
- [ ] Smoke test admin/public filter behavior
- [x] Update plan progress/status fields

## Success Criteria

- Build succeeds.
- Core category/vehicle/filter user journeys are functional.
- Plan files updated with completion state and any residual risk notes.

## Risk Assessment

- Risk: backend environment instability during smoke test causes false negatives.
- Mitigation: document environment-dependent failures separately from code defects.

## Security Considerations

- Verify destructive actions remain explicit and role-scoped in admin flows.

## Next Steps

- Proceed with implementation via cook workflow.
