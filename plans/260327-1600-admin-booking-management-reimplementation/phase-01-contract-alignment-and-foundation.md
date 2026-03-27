# Phase 01 - Contract Alignment and Foundation

## Overview

Priority: P1  
Status: Pending  
Effort: 4h

Normalize endpoint builders, domain types, and validation schemas against live Swagger + postman_collection.json before any UI rewrite.

## Context Links

- Swagger: http://localhost:5001/api
- Postman source: ../../postman_collection.json
- Existing endpoints: ../../src/lib/api-endpoints.ts
- Existing shared types: ../../src/types/index.ts
- Existing validation: ../../src/lib/validation.ts

## Key Insights

- Existing admin booking endpoint map misses PATCH /bookings/{bookingId}.
- Existing list flow reads/filters fields likely not matching backend list payload.
- Current form sends numeric total/deposit while Postman examples are formatted currency strings.
- Need stable FE model that can accept backend string/number without breaking render math.

## Requirements

Functional:

- Add all booking and sync endpoint builders needed by UI.
- Define strict request/response types for list/detail/create/update/sync operations.
- Add zod schemas for create/update payload validation.

Non-functional:

- Keep types reusable by hooks and server actions.
- No duplicate ad-hoc DTOs across components.

## Architecture

Data contract layering:

1. Endpoint builder constants in src/lib/api-endpoints.ts
2. API DTO types in src/types/index.ts
3. Validation schemas in src/lib/validation.ts
4. Mapping helpers in hooks/components where UI-specific formatting is needed

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/api-endpoints.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/validation.ts

## Implementation Steps

1. Add missing admin booking endpoints:

- update(id) => /bookings/{id}
- syncSpreadsheets(), syncTarget(), setSyncTarget(), syncPull()

2. Introduce booking admin DTOs:

- BookingListQuery
- BookingListItem
- BookingDetail
- CreateBookingPayload
- UpdateBookingPayload
- SyncSpreadsheetItem
- SyncTarget and SetSyncTargetPayload
- PullSyncPayload and PullSyncResult

3. Add normalization helpers/types:

- currency-safe type for totalAmount/depositAmount (string | number)
- date field naming map for startDate/pickupDate/dropoffDate display

4. Create zod schemas for create/edit forms based on API:

- customerName/customerPhone/sourceApp/licensePlate/startDate/rentalDays/totalAmount/depositAmount/note/documents[]
- update payload schema aligned to PATCH /bookings/{bookingId}

5. Ensure exported types are consumed by hooks and page components only from shared types.

## Todo List

- [ ] Update endpoint constants for full booking + sync APIs
- [ ] Add booking/sync DTOs to shared types
- [ ] Add create/update booking zod schemas
- [ ] Add low-risk mapping utilities for money/date field compatibility

## Success Criteria

- Every booking/sync endpoint in Swagger has FE endpoint builder.
- No admin booking component uses undeclared object shape.
- Form payload typing can compile without any casts.

## Risk Assessment

- Risk: Over-typing unknown backend optional fields.
- Mitigation: Model unknown extras as optional and use narrow required core fields from Swagger docs.

## Security Considerations

- Treat all string fields as untrusted, validate and trim before send.
- Do not trust spreadsheetId/sheetName from UI without schema validation.

## Next Steps

- Hand off stable contracts to phases 2-4 for parallel implementation.
