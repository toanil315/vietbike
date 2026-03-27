# Phase 05 - Validation, Type Safety, and Hardening

## Overview

Priority: P1  
Status: Completed  
Effort: 3h

Consolidate type safety, fix feature-introduced errors, and harden loading/error/empty states after parallel phase merge.

## Requirements

Functional:

- Ensure all booking admin flows compile and run after refactor.
- Ensure list/detail/create/edit/sync-target states are all covered.

Non-functional:

- No type errors introduced by the implementation.
- Keep files readable and bounded, avoid new monoliths.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/\*\*
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/\*\*
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/hooks/useAdminBookings.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts

Optional docs update:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/docs/codebase-summary.md

## Implementation Steps

1. Run build and fix all feature-related type issues.
2. Verify route-level loading/empty/error states for:

- list page
- detail page
- new/edit form page
- sync section

3. Verify status update and edit/create navigation links.
4. Remove dead imports/files from old booking components.
5. Final pass for naming consistency and query param typing.

## Todo List

- [x] Resolve all TS errors introduced by booking refactor
- [x] Verify complete admin booking user journeys
- [x] Remove dead code from replaced booking modules
- [x] Update docs if architecture changed materially (no change required after verification)

## Success Criteria

- npm run build passes after refactor.
- All required admin booking actions in user request are available.
- No blocking runtime errors in primary booking paths.

## Risk Assessment

- Risk: hidden regressions from old component replacement.
- Mitigation: focused smoke checklist over each route and mutation.

## Security Considerations

- Validate all outbound payloads with zod before mutations.
- Ensure no sensitive internal error detail leaked to user-facing toasts.

## Next Steps

- Ready for implementation handoff to /ck:cook --parallel.
