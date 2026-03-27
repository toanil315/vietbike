# Phase 03 - Booking List Financial Columns and Actions UX

## Overview

Priority: P1  
Status: Pending  
Effort: 4h

Update booking table financial display and action controls: render amount/deposit directly from API values, remove Confirm button, and improve Detail/Edit interaction quality.

## Context Links

- src/components/admin/bookings/bookings-table.tsx
- src/components/admin/bookings/bookings-management-page.tsx
- src/types/index.ts
- src/lib/utils.ts

## Requirements

Functional:

- `Amount` column renders API-returned value directly (no VN relocalization in table cell).
- Replace `Status` column with `Deposit` column using same rendering mechanism as `Amount`.
- Remove `Confirm` button from actions.
- `Detail` and `Edit` actions must have clearer interactive states.

Non-functional:

- Keep status update workflow if still needed via alternate UI control; if not required, remove dead status controls cleanly.
- Keep table responsive and readable on small viewports.
- Keep Amount/Deposit as display-only columns for this enhancement; do not add numeric sorting logic.

## Architecture

- Display-layer rule:

```text
renderMoneyCell(valueFromApi):
  if valueFromApi is null/empty -> "--"
  else -> String(valueFromApi)
```

- Remove pending-only confirm path and simplify actions area to navigation-first behavior.
- Apply hover/focus/active classes for action links/buttons.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/bookings-table.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/bookings-management-page.tsx (if status update wiring changes)
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/page.tsx (optional header/table label sync)

## Implementation Steps

1. Remove `formatPrice` usage from booking table amount/deposit cells.
2. Add new Deposit column and bind to `booking.depositAmount` with same display transform as amount.
3. Remove Confirm button branch and any now-unused status-update props if no longer needed.
4. Enhance Detail/Edit controls with consistent interaction states from Phase 1.
5. Translate table headings and empty-state text to Vietnamese.

## Todo List

- [ ] Switch amount cell to raw API value rendering
- [ ] Replace Status column with Deposit column
- [ ] Remove confirm action and dead logic
- [ ] Improve Detail/Edit interactive styling
- [ ] Translate table text to Vietnamese

## Success Criteria

- Amount and Deposit show exact API values, no forced `đ` formatting.
- Amount and Deposit remain display-only; no new sort behavior is introduced.
- Confirm button no longer appears.
- Detail/Edit controls have visible hover/focus/active feedback.

## Risk Assessment

- Risk: Users lose quick status transition controls unintentionally.
- Mitigation: confirm business acceptance; keep status update in detail page if still needed.

## Security Considerations

- Ensure direct rendering remains plain text; never inject HTML from API values.

## Next Steps

- Integrate with translation sweep in Phase 5.
