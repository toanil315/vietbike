# Phase 02 - Booking List and Detail Rebuild

## Overview

Priority: P1  
Status: Completed  
Effort: 5h

Rebuild booking list/search/detail UI with backend-driven query semantics and modular component boundaries.

## Context Links

- Existing list route: ../../src/app/admin/bookings/page.tsx
- Existing table component: ../../src/components/admin/BookingsTable.tsx
- Existing admin hook: ../../src/hooks/useAdminBookings.ts

## Requirements

Functional:

- View booking list from GET /bookings with server query params.
- Search/filter must reflect backend query model.
- View booking detail from GET /bookings/{reference}.
- Preserve status update ability through PATCH /bookings/{bookingId}/status.

Non-functional:

- Remove god component pattern from current table.
- No inline complex handlers in page-level component.
- Keep SSR-friendly list fetch + client controls.

## Architecture

Component split:

- bookings-list-page.tsx: feature container
- bookings-list-filters.tsx: filter controls only
- bookings-table.tsx: table rendering only
- booking-detail-card.tsx: detail view sectioned card blocks

Routing:

- /admin/bookings -> list page
- /admin/bookings/[reference] -> booking detail page

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/hooks/useAdminBookings.ts

Create:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/bookings/[reference]/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/bookings-list-page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/bookings-list-filters.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/bookings-table.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/bookings/booking-detail-card.tsx

Delete or deprecate:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/BookingsTable.tsx

## Implementation Steps

1. Refactor list fetch to use backend filters only:

- page, pageSize, status, licensePlate, customerName, customerPhone, startDate, endDate, sortBy, sortOrder
- Remove local post-filtering from table data.

2. Extract UI components from old BookingsTable:

- Keep each file under 200 LOC target.
- Move query param update logic into dedicated handler module if needed.

3. Add detail route:

- fetch by reference
- render customer + booking + amounts + dates + sourceApp + notes
- include recoverable error/empty states

4. Keep status update action integrated in list/detail via existing server action, with optimistic disable state.

5. Ensure loading/empty/error states aligned to design system tokens/components.

## Todo List

- [x] Replace local search behavior with API query semantics
- [x] Split booking list UI into focused components
- [x] Implement booking detail route by reference
- [x] Keep status update flow in modular handlers/actions

## Success Criteria

- Search/filter URL params map 1:1 to backend query params.
- Detail page loads from reference without manual parsing hacks.
- No large monolithic admin booking table component remains.

## Risk Assessment

- Risk: Query param mismatch with backend names.
- Mitigation: create typed query builder and validate before request.

## Security Considerations

- Encode all query params; never interpolate raw user input into URL strings.
- Avoid rendering unsanitized note fields as HTML.

## Next Steps

- Parallel merge with phase 3 and phase 4 once contract layer is ready.
