# Phase 05 - Regression Hardening and Rollout Checklist

## Overview

Priority: P1  
Status: In Progress  
Effort: 3h

Validate public category/API listing flows and RHF vehicle form migration before release.

## Context Links

- src/app/(public)/bikes/page.tsx
- src/app/(public)/bikes/bikes-client.tsx
- src/components/admin/VehicleForm.tsx
- src/app/admin/vehicles/actions.ts
- docs/code-standards.md

## Requirements

Functional:

- Verify public category options are API-driven and stable.
- Verify current public listing behavior remains stable with API-sourced category filters.
- Verify VehicleForm create/edit still function after RHF migration.
- Verify vehicle update includes categoryId and backend accepts it.

Non-functional:

- Build must pass with no new TypeScript errors.
- Documentation update must be merged and consistent.

## Validation Matrix

Public:

- Homepage category-first featured flow loads categories first then fetches vehicles per category in parallel.
- Homepage ignores categories with empty featured vehicle results.
- Bikes filter dropdown options match category API list and flat-list behavior remains stable.
- Empty/no-result behavior still works.

Admin:

- Vehicle create with category selection succeeds.
- Vehicle edit can change categoryId and save successfully.
- Images/features interactions remain functional.

Documentation:

- Code standards mention RHF usage for form-related tasks.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260329-0300-vehicle-list-category-and-form-review-enhancements/plan.md
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260329-0300-vehicle-list-category-and-form-review-enhancements/phase-\*.md

## Implementation Steps

1. Run `npm run build`.
2. Perform public smoke test for homepage category-first featured flow and bikes flat-list filters.
3. Perform admin vehicle form smoke test for create/edit/category change.
4. Confirm documentation update in code standards.
5. Update plan and phase statuses.

## Todo List

- [x] Run `npm run build`
- [ ] Smoke test public homepage category-first featured flow and bikes filters
- [ ] Smoke test admin vehicle create/edit category update
- [x] Verify code standards RHF update
- [x] Update plan progress and status fields

## Success Criteria

- Build passes.
- Review requirements are reflected in runtime behavior.
- Plan artifacts are fully synced.

## Risk Assessment

- Risk: backend category endpoint latency can affect SSR page performance.
- Mitigation: apply suitable revalidate and failure fallback strategy.

## Security Considerations

- Ensure query params remain allowlisted and normalized.

## Next Steps

- Execute with cook parallel workflow.

## Execution Notes

- `npm run build` passed after migration changes.
- Manual browser smoke tests for homepage/bikes/admin vehicle flows remain pending.
