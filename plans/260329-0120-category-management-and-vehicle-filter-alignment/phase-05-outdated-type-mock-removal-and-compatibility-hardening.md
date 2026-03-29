# Phase 05 - Outdated Type/Mock Removal and Compatibility Hardening

## Overview

Priority: P1  
Status: Completed  
Effort: 3h

Remove deprecated category/type mock artifacts after new category and filter flows are fully integrated.

## Context Links

- src/types/index.ts
- src/lib/constants.ts
- src/components/bikes/CategoryNav.tsx
- src/components/ui/CategoryBadge.tsx
- src/components/admin/VehicleForm.tsx

## Requirements

Functional:

- Remove stale `VehicleCategory` string union from active runtime paths.
- Remove static category mock constants no longer used.
- Ensure category rendering uses backend-provided fields consistently.

Non-functional:

- Do not break historical payload parsing where legacy fields may still exist.
- Keep cleanup small and scoped.

## Architecture

- Runtime logic reads `categoryId/categoryName/categoryDescription` only.
- Legacy optional fields remain in compatibility edge if required by API fallback, but not used by new UI controls.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/index.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/constants.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/CategoryNav.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/ui/CategoryBadge.tsx

## Implementation Steps

1. Scan all remaining category/type mock references.
2. Remove or replace stale constants/types with backend-driven models.
3. Keep minimal compatibility typings where backend still returns legacy fields.
4. Re-run type checks and adjust narrowed unions as needed.

## Todo List

- [x] Remove stale category mock constants/usages
- [x] Reduce deprecated category union reliance
- [x] Ensure category display components use backend category fields only
- [x] Verify type safety with strict TypeScript settings

## Success Criteria

- No active UI relies on hardcoded vehicle category mock arrays.
- Category model is consistent across admin and public modules.

## Risk Assessment

- Risk: Hidden import path still depends on removed constants.
- Mitigation: full-text scan before deletion and compile validation after cleanup.

## Security Considerations

- No additional security surface introduced in this phase.

## Next Steps

- Execute final regression pass and release checklist in Phase 6.
