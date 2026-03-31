# Phase 01 - Locale Contract and Routing Foundation

## Overview

Priority: P1  
Status: Pending  
Effort: 6h

Define supported locale contract and route behavior for public pages with `en` as unprefixed default and locale-prefixed non-default routes.

## Context Links

- `next.config.ts`
- `middleware.ts`
- `src/app/layout.tsx`
- `src/app/(public)/layout.tsx`

## Requirements

Functional:

- Declare supported locales: `en`, `ko`, `ru`, `zh-CN`, `vi`.
- Define default locale `en` and fallback behavior.
- Route strategy:
  - default English unprefixed (`/bikes`)
  - non-default prefixed (`/ko/bikes`, `/ru/bikes`, `/zh-CN/bikes`, `/vi/bikes`)
- Preserve existing admin middleware auth behavior.

Non-functional:

- Keep URL strategy deterministic and SEO-safe.
- Avoid introducing admin route regressions.

## Architecture

Routing contract:

```text
incoming /{path}
  -> if locale prefix exists and supported: use that locale
  -> else if no prefix: treat as default locale (en)

incoming /admin/*
  -> keep existing auth logic untouched
```

Locale helpers:

- `isSupportedLocale(code)`
- `normalizeLocaleFromPath(pathname)`
- `buildLocalizedPath(pathname, locale)`
- `stripLocalePrefix(pathname)`

## Related Code Files

Create:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/locales.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/route-locale.ts`

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/middleware.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/next.config.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/layout.tsx`

## Implementation Steps

1. Add locale constants and types (`SupportedLocale`, default locale, locale list).
2. Implement path parsing/building helpers for locale prefix behavior.
3. Extend middleware to handle public locale routing while preserving `/admin` auth logic.
4. Update root `html lang` derivation to read active locale context.
5. Add route behavior verification checklist for all supported locales.

## Todo List

- [ ] Add locale constants/type helpers in `src/lib/i18n`
- [ ] Add locale path parsing/building helpers
- [ ] Integrate public locale handling into middleware
- [ ] Verify admin auth route behavior unchanged
- [ ] Verify locale-prefixed and unprefixed path behavior

## Success Criteria

- All public routes resolve correctly for supported locales.
- English renders correctly via unprefixed path.
- Admin route protection remains unchanged and functional.

## Risk Assessment

- Risk: middleware matcher conflicts between locale and admin logic.
- Mitigation: explicit short-circuit for `/admin` before locale handling.

## Security Considerations

- Reject unsupported locale prefixes (normalize or redirect to safe default).
- Avoid open redirect behavior when rebuilding locale URLs.

## Next Steps

- Use stable locale contract to build dictionary layer in Phase 2.
