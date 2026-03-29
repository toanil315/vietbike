# Phase 04 - Code Standards Update for Form Stack

## Overview

Priority: P2  
Status: Pending  
Effort: 1h

Update project coding standards to explicitly prefer React Hook Form for form implementations.

## Context Links

- docs/code-standards.md
- src/components/admin/bookings/booking-upsert-form.tsx
- src/components/admin/VehicleForm.tsx

## Requirements

Functional:

- Add explicit guidance in `docs/code-standards.md` that form-heavy features should use React Hook Form.
- Clarify relation with validation (RHF + Zod schema usage where applicable).

Non-functional:

- Keep documentation concise and actionable.
- Avoid over-prescriptive rules for trivial single-input forms.

## Architecture

Documentation update scope:

- Section: Language and Typing / Validation / Components
- Add short rule set:
  - prefer RHF for multi-field forms
  - use schema-driven validation where request DTO exists
  - keep field-level error display behavior consistent

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/docs/code-standards.md

## Implementation Steps

1. Add RHF recommendation bullet under form/validation standards.
2. Add exception note for tiny/trivial forms.
3. Reference current stack (`React Hook Form`, `Zod`).

## Todo List

- [ ] Add RHF guidance to code standards doc
- [ ] Add validation pairing guidance (RHF + Zod)
- [ ] Add concise exception for trivial forms

## Success Criteria

- Code standards clearly state RHF preference for form-related work.

## Risk Assessment

- Risk: rule becomes too rigid for small forms.
- Mitigation: keep explicit exception clause.

## Security Considerations

- None beyond existing validation recommendations.

## Next Steps

- Complete regression checklist in Phase 5.
