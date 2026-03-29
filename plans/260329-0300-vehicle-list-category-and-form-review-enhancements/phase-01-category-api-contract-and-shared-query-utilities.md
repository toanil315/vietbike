# Phase 01 - Category API Contract and Shared Query Utilities

## Overview

Priority: P1  
Status: Pending  
Effort: 4h

Unify category API response handling and establish reusable query helpers before public and admin enhancements.

## Context Links

- src/lib/api-endpoints.ts
- src/types/index.ts
- src/app/admin/categories/page.tsx
- src/components/bikes/CategoryNav.tsx
- src/app/(public)/bikes/page.tsx

## Requirements

Functional:

- Define one normalized category response model used by public and admin paths.
- Reuse endpoint builders for category list access.
- Introduce helper to parse category API envelopes consistently.

Non-functional:

- Keep helper implementation minimal and explicit.
- Avoid introducing generic abstraction unrelated to category flow.

## Architecture

Normalization target:

```text
CategoryListNormalized = {
  items: VehicleCategory[]
}
```

Accepted source envelope examples:

- `{ success: true, data: { items: [...] } }`
- `{ success: true, data: { data: [...] } }`
- raw array fallback in tolerant mode (if existing legacy path returns it)

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/api-endpoints.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/categories/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/CategoryNav.tsx

## Implementation Steps

1. Confirm/align `VehicleCategory` + list response typing in shared types.
2. Extract small normalizer function for category list responses.
3. Update current category-fetch call sites to use the normalizer.
4. Validate no type regression in category consumers.

## Todo List

- [ ] Align category list response typing
- [ ] Add category response normalizer helper
- [ ] Migrate existing category fetch call sites to helper
- [ ] Run typecheck for category consumer files

## Success Criteria

- Category list handling is consistent across admin/public fetchers.
- No duplicated envelope parsing logic remains in category consumers.

## Risk Assessment

- Risk: Over-normalization hides malformed responses.
- Mitigation: keep strict fallback and return empty list on invalid payload.

## Security Considerations

- Treat category display text as untrusted plain text only.

## Next Steps

- Feed normalized category data into public bikes composition in Phase 2.
