# Phase 06 - Regression Hardening and Release Checklist

## Overview

Priority: P1  
Status: In Progress  
Effort: 2h

Run cross-feature hardening for booking/admin changes and complete release readiness checks.

## Context Links

- src/app/admin/bookings/\*\*
- src/components/admin/bookings/\*\*
- src/app/admin/\*\*
- src/components/admin/\*\*
- package.json scripts

## Requirements

Functional:

- Verify all new booking enhancements work end-to-end.
- Verify translated admin panel remains navigable and understandable for Vietnamese operators.

Non-functional:

- Build must pass.
- No new TypeScript or runtime errors introduced by enhancement set.

## Architecture

- Scenario-based QA matrix:
  - Sync target edit/save/pull/refresh.
  - Booking list rendering and actions.
  - Manual create/edit with derived rental days and document links.
  - Vietnamese copy consistency across admin routes.

## Related Code Files

Modify (only if regression fix needed):

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/\*\*
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/\*\*

## Implementation Steps

1. Execute manual acceptance scenarios for all requirement groups.
2. Run `npm run build` and fix any compile/type regressions in-scope.
3. Validate no dead props/unused handlers remain from removed confirm flow.
4. Update plan progress checkboxes and final status.

## Todo List

- [ ] Complete end-to-end QA checklist for phases 2-5
- [x] Run production build and resolve regressions
- [x] Confirm no API payload/enum regressions after translation
- [x] Mark plan artifacts completed

## Success Criteria

- All requested enhancements are verified in admin UI.
- Build passes and behavior matches plan requirements.

## Risk Assessment

- Risk: late-stage UI regressions from wide translation edits.
- Mitigation: route-level smoke checklist and focused fix pass.

## Security Considerations

- Reconfirm no sensitive error details surfaced in translated UI messages.

## Next Steps

- Prepare commit grouping by phase and create implementation handoff.
