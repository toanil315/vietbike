# Phase 04 - Sync Target Management and Pull Orchestration

## Overview

Priority: P1  
Status: Completed  
Effort: 4h

Add booking sync target management UI into booking management page and enforce pull trigger policy for fresh data sync.

## Context Links

- Swagger sync endpoints: http://localhost:5001/api
- Current booking actions: ../../src/app/admin/bookings/actions.ts
- Booking management UI root: ../../src/app/admin/bookings/page.tsx

## Requirements

Functional:

- Show list of sync targets from GET /bookings/sync/spreadsheets (no search UI).
- Show current active target from GET /bookings/sync/target.
- Allow changing target via PUT /bookings/sync/target.
- Trigger POST /bookings/sync/pull:
  - first load of sync section,
  - after successful target change.

Non-functional:

- Section must be embedded in booking management UI.
- Prevent duplicate pull triggers from rerenders.
- Clear loading/success/error feedback.

## Architecture

Modules:

- useBookingSyncTarget.ts for read/write/pull orchestration
- booking-sync-handlers.ts for idempotent first-load trigger and selection handling
- booking-sync-target-section.tsx for presentational UI and user interactions

State strategy:

- hasInitialPullTriggered flag in hook scope
- sequential flow on target change: setTarget -> pull -> refresh list/target + bookings list invalidation

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/actions.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/page.tsx

Create:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-sync-target-section.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/hooks/useBookingSyncTarget.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/handlers/booking-sync-handlers.ts

## Implementation Steps

1. Extend actions/api helpers for sync endpoints with typed responses.
2. Implement hook methods:

- loadTargets()
- loadActiveTarget()
- setActiveTarget(payload)
- triggerPull(payload?)

3. Add first-load orchestration:

- After active target loaded first time, call pull once.
- Guard with ref/state to avoid loops.

4. Add target change orchestration:

- On select new target, call set target then pull.
- Refresh displayed sync status and optionally revalidate bookings list path.

5. Mount sync target section in booking management page above table.

## Todo List

- [x] Implement sync target hook with guarded first-load pull
- [x] Implement sync target presentational section in booking management page
- [x] Trigger pull after every successful target change
- [x] Add failure recovery UI and retry action

## Success Criteria

- Sync section visible and interactive on booking management page.
- First open of page triggers pull once.
- Every target switch triggers pull once and updates state.

## Risk Assessment

- Risk: accidental repeated pull calls due to strict mode rerender.
- Mitigation: idempotent guard via ref + request-in-flight lock.

## Security Considerations

- Validate spreadsheetId/sheetName before PUT/POST.
- Do not expose backend error internals directly to UI.

## Next Steps

- Merge with phase 2 to ensure booking list refresh strategy is consistent.
