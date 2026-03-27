# Phase 03 - Manual Create and Edit Booking

## Overview

Priority: P1  
Status: Completed  
Effort: 6h

Rebuilt manual create form and added edit booking flow with request bodies matching booking create/update APIs.

## Context Links

- Current create page: ../../src/app/admin/bookings/new/page.tsx
- Current create form: ../../src/components/admin/NewBookingForm.tsx
- Booking actions: ../../src/app/admin/bookings/actions.ts

## Requirements

Functional:

- Create booking from POST /bookings request model.
- Edit booking from PATCH /bookings/{bookingId} request model.
- Keep support for documents metadata array.

Non-functional:

- Modularize form into field groups and handler utilities.
- Remove mixed naming fields (phone vs customerPhone, durationDays vs rentalDays).
- Type-safe payload conversion and validation.

## Architecture

Upsert pattern:

- booking-upsert-form.tsx handles mode: create | edit
- booking-form-fields.tsx renders input sections
- booking-documents-input.tsx handles document metadata list
- booking-upsert-handlers.ts stores submit + transform logic
- useAdminBookingMutations.ts wraps create/update requests

Routes:

- /admin/bookings/new -> create mode
- /admin/bookings/[reference]/edit -> edit mode

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/new/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/NewBookingForm.tsx

Create:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/[reference]/edit/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-upsert-form.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-form-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-documents-input.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/handlers/booking-upsert-handlers.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/hooks/useAdminBookingMutations.ts

## Implementation Steps

1. Defined form model exactly on API fields:

- customerName
- customerPhone
- sourceApp
- licensePlate
- startDate
- rentalDays
- totalAmount
- depositAmount
- note
- documents[] { name, mimeType, sizeBytes }

2. Implemented create submit path:

- Validate with zod schema.
- Convert date to ISO string only once in handler utility.

3. Implemented edit flow:

- Prefill data from booking detail by reference.
- Submit PATCH /bookings/{bookingId} with allowed editable fields.

4. Removed non-API drift fields from old form.

5. Preserved UX quality:

- disable submit while pending
- field-level + banner errors
- redirect and refresh on success

## Todo List

- [x] Replace old NewBookingForm model with API-first field schema
- [x] Add booking edit route and page
- [x] Implement shared create/update mutation hook
- [x] Move payload transforms to dedicated handler module

## Success Criteria

- Create and edit payloads are typed and validated with no unsafe casts.
- Form code is modular and maintainable, no god component.
- Required backend fields always present before submit.

## Risk Assessment

- Risk: Update endpoint may accept subset/superset beyond Postman sample.
- Mitigation: implement minimal known fields and keep optional extension point type.

## Security Considerations

- Validate file metadata and max allowed size before submit metadata.
- Sanitize and trim text input to reduce malformed payload risk.

## Next Steps

- Integrated list/detail actions for edit navigation.
