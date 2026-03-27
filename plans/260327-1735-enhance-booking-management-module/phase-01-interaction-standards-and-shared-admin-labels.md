# Phase 01 - Interaction Standards and Shared Admin Labels

## Overview

Priority: P1  
Status: In Progress  
Effort: 3h

Define a small baseline for interactive button states and Vietnamese admin terminology so downstream phases stay consistent and avoid duplicated styling/wording work.

## Context Links

- docs/code-standards.md
- docs/design-guidelines.md
- src/app/globals.css
- src/lib/constants.ts

## Requirements

Functional:

- Establish consistent button interaction states for admin actions (hover, focus-visible, active, disabled).
- Establish centralized Vietnamese admin text dictionary or label constants for repeated terms.

Non-functional:

- Keep implementation minimal (YAGNI); no full i18n framework in this phase.
- Avoid breaking existing component props/API contracts.

## Architecture

- Add minimal reusable interaction style convention:
  - shared utility class strategy or small shared UI wrapper if already pattern-compatible.
- Add centralized label source for repeated admin terms:
  - booking, sync target, amount, deposit, detail, edit, create, refresh.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/globals.css (if utility classes needed)
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/constants.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/docs/design-guidelines.md (short admin VN copy convention note)

## Implementation Steps

1. Audit current admin button patterns and identify duplicate classes.
2. Define a compact interaction style recipe for primary and outline actions.
3. Add shared Vietnamese label map/constants for core admin booking terms.
4. Document one-line guidance in design docs for enum-value vs display-label separation.

## Todo List

- [x] Finalize shared interaction class recipe for admin actions
- [ ] Add Vietnamese term map/constants for repeated labels
- [ ] Document rule: translate labels, never mutate API enum values

## Success Criteria

- New and existing admin actions can use one consistent interaction pattern.
- Vietnamese repeated terms are centralized and reusable.

## Risk Assessment

- Risk: Over-abstracting UI primitives too early.
- Mitigation: Keep scope to minimal class-level standardization.

## Security Considerations

- No new security surface; ensure no translation mapping is used for API payload values.

## Next Steps

- Unblock phases 2-4 with stable interaction and label conventions.
