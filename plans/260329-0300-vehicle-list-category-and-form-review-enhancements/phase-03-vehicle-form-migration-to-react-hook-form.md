# Phase 03 - VehicleForm Migration to React Hook Form

## Overview

Priority: P1  
Status: Pending  
Effort: 8h

Migrate `VehicleForm` from local `useState` form state to React Hook Form and align update flow with backend support for `categoryId` updates.

## Context Links

- src/components/admin/VehicleForm.tsx
- src/app/admin/vehicles/actions.ts
- src/lib/validation.ts
- src/components/admin/bookings/booking-upsert-form.tsx
- src/components/admin/bookings/booking-form-fields.tsx

## Requirements

Functional:

- Replace local state form fields with RHF (`useForm`, controlled arrays where needed).
- Keep create and edit modes intact.
- Keep images/features input behavior while integrating into RHF-compatible form model.
- Always send `categoryId` in update payload (backend now supports category update).

Non-functional:

- Keep field labels/placeholders already introduced.
- Keep current admin style patterns and error banner behavior.

## Architecture

RHF form model:

```text
VehicleFormValues {
  name, slug, brand, model, year,
  licensePlate, pricePerDay, description,
  availableSeats, fuelType, transmission, type,
  categoryId, status,
  images: { url, altText }[],
  features: { featureName, featureValue }[]
}
```

Submission mapping:

- Create: map full RHF values to `createVehicleAction` payload.
- Update: map mutable fields including `categoryId` to `updateVehicleAction` payload.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/VehicleForm.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/vehicles/actions.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/validation.ts

Create (if needed to keep file maintainable):

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/vehicle-form-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/vehicle-feature-array-fields.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/vehicle-form/vehicle-image-array-fields.tsx

## Implementation Steps

1. Define RHF default values for create/edit.
2. Load vehicle detail and call `reset()` for edit mode.
3. Use `useFieldArray` for images/features input arrays if migrating these from local state.
4. Refactor submit handlers to use RHF values.
5. Remove outdated category-update fallback; always include `categoryId` in update payload.
6. Keep status update sub-action unchanged unless RHF integration requires minor adaptation.

## Todo List

- [ ] Introduce RHF form state in VehicleForm
- [ ] Map edit preload to RHF reset flow
- [ ] Migrate images/features inputs to RHF-compatible arrays
- [ ] Always include categoryId in vehicle update payload
- [ ] Validate create/edit payload integrity after migration

## Success Criteria

- VehicleForm no longer relies on large local field-level `useState` object for core form values.
- Update API payload contains `categoryId` consistently.
- Form behavior remains stable in create/edit flows.

## Risk Assessment

- Risk: array fields regress during RHF migration.
- Mitigation: migrate in small steps and preserve existing UI handlers until parity verified.

## Security Considerations

- Keep server-action error mapping sanitized; never expose raw unknown backend error objects.

## Next Steps

- Update coding standards with RHF guidance in Phase 4.
