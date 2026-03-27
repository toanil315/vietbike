# Phase 02 - Sync Target Usability and Pull Retrigger

## Overview

Priority: P1  
Status: Pending  
Effort: 4h

Improve Booking Sync Target panel usability and behavior: editable current sheet, balanced field sizing, stronger refresh action styling, and guaranteed pull retrigger on target save.

## Context Links

- src/components/admin/bookings/booking-sync-target-section.tsx
- src/components/admin/bookings/hooks/useBookingSyncTarget.ts
- src/components/admin/bookings/handlers/booking-sync-handlers.ts
- src/app/admin/bookings/actions.ts

## Requirements

Functional:

- Current Sheet control must match Active Spreadsheet field visual size.
- Current Sheet must be editable by admin.
- Saving new sync target (spreadsheet + sheet) must retrigger Booking Sync Pull.
- Refresh button must look and behave as a primary interactive action.

Non-functional:

- Preserve first-load pull guard behavior.
- Prevent duplicate pull calls on repeated rerenders.

## Architecture

- Convert Current Sheet from static text card to controlled input/select field bound to local draft state.
- Save flow pseudo-sequence:

```text
onSaveSyncTarget:
  validate(spreadsheetId, sheetName)
  setSyncTarget(payload)
  triggerPull(batchSize?)
  refreshTargetsAndActiveTarget()
```

- Refresh action uses primary button interaction classes from Phase 1.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-sync-target-section.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/hooks/useBookingSyncTarget.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/handlers/booking-sync-handlers.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/actions.ts (only if payload shape/result handling updates needed)

## Implementation Steps

1. Add editable `sheetName` field in sync target section with same width/height visual treatment as spreadsheet selector.
2. Add explicit Save action for sync target changes; disable while request in flight.
3. Ensure `changeTarget` path always executes `pull` only after successful set-target response.
4. Keep single-run first-load pull logic unchanged and covered by guard.
5. Update text labels to Vietnamese per Phase 1 dictionary.

## Todo List

- [ ] Replace read-only Current Sheet UI with editable field
- [ ] Add explicit save flow with pull retrigger
- [ ] Apply primary interactive styling for refresh action
- [ ] Translate panel labels/messages to Vietnamese

## Success Criteria

- Admin can edit both active spreadsheet and sheet name.
- Save action retriggers pull exactly once per successful save.
- Refresh button visually and behaviorally reads as clickable primary action.

## Risk Assessment

- Risk: Double pull trigger (save flow + effect flow).
- Mitigation: enforce idempotent pull triggers and explicit request sequencing.

## Security Considerations

- Validate trimmed non-empty `sheetName` and `spreadsheetId` before request.
- Do not expose raw backend error internals in UI messages.

## Next Steps

- Merge independently with Phase 3 and Phase 4 outputs.
