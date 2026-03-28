# Phase 04 - Admin and Public Vehicle Filter Alignment

## Overview

Priority: P1  
Status: Pending  
Effort: 5h

Remove mock filter UI/params and align admin + public vehicle list filtering to confirmed backend-supported fields.

## Context Links

- src/components/admin/VehicleTable.tsx
- src/app/admin/vehicles/page.tsx
- src/app/(public)/bikes/page.tsx
- src/app/(public)/bikes/bikes-client.tsx
- src/components/bikes/BikeFilterBar.tsx
- src/components/home/SearchBar.tsx

## Requirements

Functional:

- Public bikes page filter scope:
  - `categoryId`
  - `minPrice/maxPrice`
  - `search`
  - `sortBy/sortOrder`
- Remove public mock filters not in confirmed BE scope:
  - `brand`
  - local type mock from `BikeFilterBar`
  - transmission toggle
- Admin vehicles page aligns query handling with backend-supporting fields.
- Category filtering in admin uses categoryId once category CRUD is in place.

Non-functional:

- Keep existing URL-driven state behavior and reset-to-page-1 logic.
- Keep empty/error states unchanged in tone and style.

## Architecture

- One query builder per page layer (admin/public) with allowlist-based params.
- UI controls map 1:1 with backend query keys.

Allowlist pseudo:

```text
PUBLIC_ALLOWED = [categoryId, minPrice, maxPrice, search, sortBy, sortOrder, page, pageSize]
ADMIN_ALLOWED = [search, status, categoryId, page, pageSize]
```

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/vehicles/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/VehicleTable.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/bikes-client.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/BikeFilterBar.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/home/SearchBar.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/hooks/useVehicles.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/hooks/useAdminVehicles.ts

## Implementation Steps

1. Remove brand/type/transmission controls from public filter bar.
2. Introduce search + category + price + sort controls only.
3. Update bikes client route-update helpers for allowlisted params.
4. Add category filter control in admin table backed by categoryId.
5. Ensure admin server page forwards categoryId query to backend list API.
6. Remove stale filter mapping logic in hooks.

## Todo List

- [ ] Refactor public filter bar to backend-supported fields only
- [ ] Remove mock brand/type/transmission query plumbing
- [ ] Add/align admin categoryId filter in vehicle table + page query
- [ ] Keep pagination and clear-filter actions stable
- [ ] Verify URL compatibility for unsupported legacy params

## Success Criteria

- No mock-only filter control remains in admin/public vehicle listing UIs.
- Query params in URL match backend-supported fields only.
- Filtering and pagination continue to work without UI regressions.

## Risk Assessment

- Risk: Existing links with old params behave unexpectedly.
- Mitigation: ignore unsupported params gracefully and keep page usable.

## Security Considerations

- Strictly sanitize/normalize numeric query params (min/max/page/pageSize).

## Next Steps

- Trigger final stale type/mock cleanup in Phase 5.
