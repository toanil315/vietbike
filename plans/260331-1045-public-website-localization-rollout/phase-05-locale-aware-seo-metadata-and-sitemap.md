# Phase 05 - Locale-Aware SEO, Metadata, and Sitemap

## Overview

Priority: P2  
Status: Pending  
Effort: 3h

Ensure metadata, canonical links, and sitemap output are locale-aware and consistent with route strategy.

## Context Links

- `src/app/layout.tsx`
- `src/app/(public)/page.tsx`
- `src/app/(public)/bikes/page.tsx`
- `src/app/(public)/bikes/[slug]/page.tsx`
- `src/app/sitemap.ts`

## Requirements

Functional:

- Localize metadata title/description for primary public pages.
- Generate canonical URL per locale route strategy.
- Add `hreflang` alternate links for all supported locales.
- Extend sitemap entries to include locale-aware variants for public pages.

Non-functional:

- Prevent duplicate-content SEO conflicts.
- Keep metadata generation deterministic and cache-safe.

## Architecture

SEO helpers:

- `buildLocaleAlternateLinks(path)`
- `buildCanonicalUrl(path, locale)`

Output behavior:

- English canonical uses unprefixed path.
- Non-default locales canonical use prefixed path.

## Related Code Files

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/layout.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/bikes/[slug]/page.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/sitemap.ts`

Create (if helper extraction is needed):

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/seo.ts`

## Implementation Steps

1. Add locale-aware metadata builders for key public routes.
2. Add alternate language mapping (`en`, `ko`, `ru`, `zh-CN`, `vi`).
3. Update sitemap generation to include locale variants.
4. Validate canonical and alternate links by route samples.

## Todo List

- [ ] Add locale-aware metadata generation utilities
- [ ] Add locale alternate link output for key pages
- [ ] Update sitemap with locale variants
- [ ] Verify canonical correctness for default/unprefixed English

## Success Criteria

- Public pages emit locale-aware canonical + `hreflang` data.
- Sitemap includes expected localized URLs.
- No invalid locale URLs present in SEO output.

## Risk Assessment

- Risk: locale-route mismatch in canonical URLs causing SEO split authority.
- Mitigation: centralize URL building in one helper and reuse everywhere.

## Security Considerations

- Validate URL building against only supported locales.

## Next Steps

- Run final regression and rollout checks in Phase 6.
