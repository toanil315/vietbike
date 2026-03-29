# Phase 03 - Vehicle CRUD and Form UX Alignment

## Overview

Priority: P1  
Status: Completed  
Effort: 8h

Align vehicle create/update contracts with categoryId model and redesign vehicle form fields to match clearer booking-form style.

## Context Links

- src/components/admin/VehicleForm.tsx
- src/app/admin/vehicles/actions.ts
- src/components/admin/bookings/booking-upsert-form.tsx
- src/components/admin/bookings/booking-form-fields.tsx
- src/lib/validation.ts

## Requirements

Functional:

- Vehicle create uses category selected from backend category list.
- Vehicle update keeps backend compatibility for category update:
  - if backend accepts `categoryId` in update payload, allow update.
  - if backend rejects, keep existing behavior and avoid broken save.
- Add clear placeholders and grouped field layout.
- Reuse same form presentation pattern as booking admin form (label + input block consistency).

Non-functional:

- Keep file under maintainable size where practical (extract field blocks if needed).
- Keep Vietnamese admin copy consistent with current screen.

## Architecture

- Split `VehicleForm` into:
  - container orchestration (data load, submit, server actions)
  - reusable field section component(s) for basic info and metadata
- Optional shared admin field primitive:

```text
AdminFormField(label, required, children)
```

- Category list source: fetch from `/admin/vehicle-categories` once per form load.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/VehicleForm.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/vehicles/actions.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/validation.ts

Create (if needed to keep file size manageable):

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/vehicle-basic-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/vehicle-media-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/admin-form-field.tsx

## Implementation Steps

1. Integrate category list fetch and map to select options.
2. Replace hardcoded category option array with backend data.
3. Add placeholders for all text/number inputs.
4. Align input/label visual classes with booking form pattern.
5. Add compatibility layer for category update payload in edit mode.
6. Validate payload through existing validation utilities.

## Todo List

- [x] Replace static category options with backend category list
- [x] Add placeholders and clearer field grouping in vehicle form
- [x] Extract shared field component pattern if form file grows too large
- [x] Keep create/update payloads backend-compatible
- [x] Preserve image/feature sub-resource flows

## Success Criteria

- Vehicle create/edit UX is clearer and consistent with admin booking form style.
- Category assignment works in create flow.
- Edit flow remains stable regardless of backend category update support.

## Risk Assessment

- Risk: category select empty state blocks create flow.
- Mitigation: disable submit with explicit warning when no category options loaded.

## Security Considerations

- Trim/sanitize user-provided text before payload build where needed.
- Keep server action error mapping explicit; do not leak raw backend stack traces.

## Next Steps

- Hand off category-aware fields to filter phase for consistent query/filter labels.
