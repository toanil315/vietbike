# Phase 02 - Public Bikes Category-First Data Composition

## Overview

Priority: P1  
Status: Pending  
Effort: 6h

Make public bikes listing consume category catalog directly for both filter options and section grouping.

## Context Links

- src/app/(public)/bikes/page.tsx
- src/app/(public)/bikes/bikes-client.tsx
- src/components/bikes/BikeFilterBar.tsx
- src/components/bikes/VehicleSection.tsx

## Requirements

Functional:

- `categoryOptions` in `bikes-client.tsx` must come from category API data.
- `groupVehiclesByCategory` logic must be category-first:
  - fetch categories first
  - fetch vehicles
  - map vehicles into known categories by `categoryId`
- Avoid deriving available categories solely from vehicle list.

Non-functional:

- Preserve existing filtered/unfiltered UX split.
- Keep URL query behavior unchanged for active filters.

## Architecture

Server composition flow:

```text
fetchCategories() -> fetchVehicles(filters) -> composeSections(categories, vehicles)
```

Section composer rules:

- iterate ordered categories from API
- assign `vehicles.filter(v => v.categoryId === category.id)`
- include category metadata even when no vehicles (configurable render policy)

Client input contract for `BikesClient`:

- `categoryOptions`: always passed from server category list
- `groupedSections`: server-composed, not inferred client-side

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/bikes-client.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/BikeFilterBar.tsx

Create (optional helper):

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/category-utils.ts

## Implementation Steps

1. Add category fetch in `bikes/page.tsx` using normalized helper.
2. Replace `groupVehiclesByCategory(vehicles)` with category-first composer.
3. Pass `categoryOptions` to client explicitly from server.
4. Remove client-side fallback derivation from `initialVehicles`.
5. Keep `viewAllHref` and section rendering keyed by category id.

## Todo List

- [ ] Add category API fetch in public bikes server page
- [ ] Implement category-first section composer
- [ ] Pass server categoryOptions into bikes client
- [ ] Remove derived categoryOptions fallback in bikes client
- [ ] Verify unfiltered and filtered page behavior parity

## Success Criteria

- Public category filters and sections depend on category API as source of truth.
- No category option derivation from current vehicle list remains.

## Risk Assessment

- Risk: categories with no vehicles produce empty sections and visual clutter.
- Mitigation: define render rule (`hideEmptySections` or show empty CTA).

## Security Considerations

- Ensure query params are sanitized and only allowlisted keys are forwarded.

## Next Steps

- Hand off admin form migration to Phase 3.
