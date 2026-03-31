# Phase 02 - Translation Infrastructure and Dictionaries

## Overview

Priority: P1  
Status: Pending  
Effort: 6h

Create typed translation infrastructure with per-locale dictionaries and safe fallback behavior.

## Context Links

- `src/lib`
- `src/types`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`

## Requirements

Functional:

- Add translation dictionaries for `en`, `ko`, `ru`, `zh-CN`, `vi`.
- Introduce typed message-key model to prevent key drift.
- Provide dictionary loader compatible with server and client components.
- Add fallback to English when key missing in non-default locale.

Non-functional:

- Keep dictionary organization simple and domain-first.
- Keep translation access pattern ergonomic for developers.

## Architecture

Suggested structure:

```text
src/lib/i18n/
  locales.ts
  route-locale.ts
  get-dictionary.ts
  translate.ts
  dictionaries/
    en.ts
    ko.ts
    ru.ts
    zh-CN.ts
    vi.ts
```

Type model:

- `MessageKey` inferred from default dictionary shape.
- `Dictionary` mapped type for locale entries.

Runtime behavior:

- Resolve dictionary by active locale.
- If key missing in selected locale, return English value.

## Related Code Files

Create:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/get-dictionary.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/translate.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/dictionaries/en.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/dictionaries/ko.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/dictionaries/ru.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/dictionaries/zh-CN.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/i18n/dictionaries/vi.ts`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/types/i18n.ts`

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/lib/index.ts` (if barrel export exists)

## Implementation Steps

1. Define shared `Dictionary` and `MessageKey` types from `en` baseline.
2. Create baseline English dictionary from current public labels.
3. Add other locale dictionaries with same key structure.
4. Build dictionary resolver and `t(key)` helper with locale + fallback.
5. Add minimal unit-like verification helper script for missing keys.

## Todo List

- [ ] Define strict message key typing
- [ ] Add baseline `en` dictionary and fill all keys
- [ ] Add `ko`, `ru`, `zh-CN`, `vi` dictionary files
- [ ] Implement locale dictionary resolver
- [ ] Implement safe translation helper with fallback

## Success Criteria

- All locale dictionaries compile with aligned key shape.
- Missing key fallback behavior returns English safely.
- Translation helper callable from shared and page-level components.

## Risk Assessment

- Risk: key sprawl and naming inconsistency across domains.
- Mitigation: enforce namespaced key convention (`nav.home`, `footer.support.terms`, etc.).

## Security Considerations

- Treat dictionary strings as plain text; no HTML interpolation by default.

## Next Steps

- Migrate shared public shell components to translation helper in Phase 3.
