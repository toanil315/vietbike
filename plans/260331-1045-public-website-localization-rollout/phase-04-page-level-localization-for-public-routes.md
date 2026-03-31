# Phase 04 - Page-Level Localization for Public Routes

## Overview

Priority: P1  
Status: Pending  
Effort: 7h

Migrate all public route content and key reusable page components from hardcoded English to dictionary-driven localization.

## Context Links

- `src/app/(public)/page.tsx`
- `src/app/(public)/bikes/page.tsx`
- `src/app/(public)/bikes/[slug]/page.tsx`
- `src/app/(public)/booking/page.tsx`
- `src/app/(public)/booking/confirmation/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/components/home/*`
- `src/components/bikes/*`
- `src/components/booking/*`

## Requirements

Functional:

- Localize homepage section copy and CTA labels.
- Localize bikes listing/filter labels and empty states.
- Localize bike detail labels (specs/features/booking card texts).
- Localize booking flow labels, validation-facing messages, and summary labels.
- Localize contact page titles and info labels.

Non-functional:

- Preserve existing behavior and validation logic.
- Keep numeric/currency/date formatting locale-aware where feasible.

## Architecture

Migration pattern:

- Replace direct string literals with dictionary key lookups.
- Keep business logic unchanged; only text/content wiring changes.
- Introduce locale-aware format helper wrappers for date/currency where strings currently fixed to `en-US` or `vi-VN`.

## Related Code Files

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/[slug]/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/booking/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/booking/confirmation/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/contact/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/home/HeroSection.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/home/FeaturedBikes.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/home/WhyChooseUs.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/home/CTASection.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/BikeFilterBar.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/BikeCard.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/bikes/BookingCard.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/booking/*`

Optional helper updates:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/date-utils.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/currency.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/utils.ts`

## Implementation Steps

1. Inventory all public-facing text keys from route and component files.
2. Add dictionary keys and replace string literals incrementally by domain.
3. Update locale-sensitive format helpers to accept locale parameter.
4. Ensure booking flow still submits identical payload and validation logic.
5. Smoke-check each localized route in all five locales.

## Todo List

- [ ] Localize homepage content and labels
- [ ] Localize bikes list and bike detail content
- [ ] Localize booking flow content and summary labels
- [ ] Localize contact page
- [ ] Localize date/currency helper usage where visible to users

## Success Criteria

- No hardcoded English labels remain on public pages for core flow.
- Booking journey remains functional in every supported locale.
- User-visible date/currency representations match selected locale policy.

## Risk Assessment

- Risk: accidental localization of API-bound enums/identifiers.
- Mitigation: localize only labels; keep payload values and enums unchanged.

## Security Considerations

- Keep validation/error logic deterministic; localization must not alter security checks.

## Next Steps

- Apply locale-specific metadata and SEO output in Phase 5.
