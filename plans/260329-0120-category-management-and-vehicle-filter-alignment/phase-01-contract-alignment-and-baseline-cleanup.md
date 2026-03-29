# Phase 01 - Contract Alignment and Baseline Cleanup

## Overview

Priority: P1  
Status: Completed  
Effort: 4h

Create one contract baseline for category and vehicle domain before building new UI.

## Context Links

- src/types/index.ts
- src/lib/constants.ts
- src/lib/api-endpoints.ts
- src/hooks/useAdminVehicles.ts
- src/hooks/useVehicles.ts

## Requirements

Functional:

- Add endpoint builder group for category CRUD under admin API endpoints.
- Establish category DTOs used by admin and public components.
- Mark/remove outdated vehicle category union usage paths.

Non-functional:

- Keep backward compatibility for components still reading legacy fields in transition window.
- Avoid broad refactor outside category/vehicle scope.

## Architecture

- Source of truth for category identity: `categoryId`.
- Category display: `categoryName` and `categoryDescription` returned from backend.
- Category CRUD contract:
  - `GET /admin/vehicle-categories`
  - `POST /admin/vehicle-categories`
  - `PATCH /admin/vehicle-categories/:id`
  - `DELETE /admin/vehicle-categories/:id`

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/api-endpoints.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/constants.ts

## Implementation Steps

1. Add `adminVehicleCategoryEndpoints` in API endpoint registry.
2. Normalize category type/interface names; keep one active model for runtime.
3. Deprecate old static `VehicleCategory` union usage where no longer valid.
4. Keep temporary compatibility comments for in-flight components.

## Todo List

- [x] Add category endpoint builders in API map
- [x] Normalize category DTO types in shared types file
- [x] Mark and isolate deprecated category union paths
- [x] Verify no compile break in hooks referencing category fields

## Success Criteria

- Category endpoint constants exist and are reusable.
- Types compile with both category list and vehicle item payloads.
- Legacy category union is no longer used in active mutation paths.

## Risk Assessment

- Risk: Over-aggressive type deletion breaks unrelated views.
- Mitigation: Do staged deprecation first, hard delete in Phase 5 only.

## Security Considerations

- Treat category name/description as untrusted text; sanitize rendering points only if raw HTML is introduced (not planned).

## Next Steps

- Feed contract output into Phase 2 and Phase 3 implementation files.
