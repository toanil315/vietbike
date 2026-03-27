# Phase 05 - Admin Panel Vietnamese Translation Rollout

## Overview

Priority: P1  
Status: Pending  
Effort: 5h

Translate remaining admin panel English UI copy to Vietnamese while preserving API contracts, enum safety, and operational clarity.

## Context Links

- src/app/admin/\*\*
- src/components/admin/\*\*
- src/lib/constants.ts
- docs/design-guidelines.md

## Requirements

Functional:

- Convert visible admin content from English to Vietnamese.
- Keep technical/API enum values unchanged in payloads and internal logic.
- Keep status labels in dropdown options as raw enum words (English) for operations parity.
- Use centralized dictionary/constants for repeated phrases to reduce drift.

Non-functional:

- Translation must be consistent for operational terms.
- Avoid introducing full i18n framework in this scope.

## Architecture

- Introduce/extend centralized Vietnamese label map and reference in admin components.
- Rule:

```text
API enum value = internal logic
UI label = Vietnamese mapped label
never swap enum values with translated text
```

- Prefer incremental replacement in component text literals for maintainability.

## Related Code Files

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/\*\*
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/\*\*
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/constants.ts

## Implementation Steps

1. Build translation inventory for admin routes/pages/components.
2. Translate high-visibility navigation, headers, CTA, table labels, filter labels, empty/error/loading text.
3. Translate form labels/help text in non-booking admin modules.
4. Keep status/payment labels mapped through constants instead of inline hardcoded English.
5. Exclude status dropdown option labels from translation and preserve raw enum words.
6. Run consistency pass for duplicated terms and spelling.

## Todo List

- [ ] Complete admin translation inventory
- [ ] Translate all visible admin static text to Vietnamese
- [ ] Centralize repeated labels to constants map
- [ ] Verify enum values still unchanged in logic/payloads

## Success Criteria

- Admin-facing UI copy is Vietnamese across dashboard and modules.
- No API request/response contract break due to translation changes.

## Risk Assessment

- Risk: missing low-visibility strings (tooltips, placeholders, empty states).
- Mitigation: run route-by-route audit checklist with screenshots.

## Security Considerations

- No direct security impact; ensure translated messages do not expose sensitive backend details.

## Next Steps

- Hand off to Phase 6 for full regression and release checks.
