# Phase 04 - Manual Booking Form Model and Derived Rental Days

## Overview

Priority: P1  
Status: Completed  
Effort: 6h

Upgrade create/edit booking forms with explicit labels, extension info field handling, document link form-array UX, and rental-day derivation from pickup/dropoff dates.

## Context Links

- src/components/admin/bookings/booking-upsert-form.tsx
- src/components/admin/bookings/booking-form-fields.tsx
- src/components/admin/bookings/booking-documents-input.tsx
- src/components/admin/bookings/handlers/booking-upsert-handlers.ts
- src/lib/validation.ts
- src/types/index.ts

## Requirements

Functional:

- Add visible labels for each form field in create and edit modes.
- Ensure `extensionInfo` is explicitly represented and editable in both modes.
- Replace file-only documents input with form-array link input (`documents[]`) where each row includes both `name` and `url`.
- Add pickup and dropoff date pickers in create mode.
- Compute `rentalDays` from pickup/dropoff (minimum 1 day) and remove manual rental-days entry.
- Apply same date/rental-day logic to edit mode.

Non-functional:

- Keep API payload contract valid for both create and update.
- Keep validation errors clear and field-focused.

## Architecture

- Form state model includes:
  - `pickupDate`, `dropoffDate`, derived `rentalDays`.
  - `documents: BookingDocument[]` where each item must include both `name` and `url`.
- Derived days pseudo:

```text
derivedRentalDays = max(1, ceil((dropoffDate - pickupDate) / dayMs))
```

- Validation rules:
  - dropoffDate >= pickupDate
  - document name must be non-empty
  - document url must be valid URL format

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-upsert-form.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-form-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-documents-input.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/handlers/booking-upsert-handlers.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/validation.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts (only if BookingDocument contract needs tightening)

## Implementation Steps

1. Add field labels and Vietnamese text for all inputs in create/edit forms.
2. Ensure extensionInfo input is always present and wired to payload transforms.
3. Implement documents as repeatable rows with add/remove actions and both Name + URL inputs.
4. Add pickup/dropoff date fields for create mode and derive rental days automatically.
5. Refactor edit mode to use same derived-rental-days mechanism.
6. Update validation schemas and payload mappers to align with new input model.

## Todo List

- [x] Add explicit labels for all create/edit form inputs
- [x] Keep extensionInfo visible and payload-mapped in both modes
- [x] Convert documents to link-oriented form array
- [x] Derive rental days from pickup/dropoff for create/edit
- [x] Translate form text/messages to Vietnamese

## Success Criteria

- Create and edit forms no longer require manual rental-days input.
- Documents can be managed as link entries in a dynamic array with both name and URL per row.
- Validation prevents invalid date ranges and malformed document links.

## Risk Assessment

- Risk: timezone conversions create date drift when converting local datetime to ISO.
- Mitigation: normalize date conversion in one helper and test same-day/overnight cases.

## Security Considerations

- Validate URL fields strictly and render as plain text in form.
- Prevent oversized uncontrolled text in notes/extension fields by schema limits.

## Next Steps

- Feed translated labels into Phase 5 consistency sweep.
