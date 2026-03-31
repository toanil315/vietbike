# Phase 03 - Public Layout and Shared Component Localization

## Overview

Priority: P1  
Status: Pending  
Effort: 6h

Localize shared public shell and reusable components so all pages inherit translated global UI controls.

## Context Links

- `src/app/(public)/layout.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/common/FloatingContactButtons.tsx`

## Requirements

Functional:

- Localize navigation labels and CTA buttons.
- Localize footer sections, support labels, and static text blocks.
- Add language switcher to Navbar (desktop + mobile variants).
- Ensure switcher preserves current route and query params.

Non-functional:

- Preserve current responsive and animation behavior.
- Do not regress existing navbar/footer structure.

## Architecture

State model:

- Locale derived from URL path.
- Shared layout fetches dictionary once and passes localized props where needed.

Switcher behavior:

- `buildLocalizedPath(currentPath, targetLocale)`
- Keep query string intact.

## Related Code Files

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/(public)/layout.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/layout/Navbar.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/layout/Footer.tsx`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/common/FloatingContactButtons.tsx`

Create (optional if needed for reuse):

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/layout/LanguageSwitcher.tsx`

## Implementation Steps

1. Wire locale + dictionary access into public layout.
2. Refactor Navbar string literals to dictionary keys.
3. Add locale switcher and route-preserving link generation.
4. Refactor Footer literals to dictionary keys.
5. Localize floating contact button tooltip/labels.

## Todo List

- [ ] Add locale context consumption in public layout
- [ ] Replace hardcoded Navbar labels with translation keys
- [ ] Add language switcher in Navbar
- [ ] Replace hardcoded Footer labels with translation keys
- [ ] Verify mobile navigation localization flow

## Success Criteria

- Navbar/Footer render in selected locale.
- Language switch updates URL correctly and keeps current location context.
- Desktop and mobile menu variants both localized.

## Risk Assessment

- Risk: client components may duplicate locale derivation logic.
- Mitigation: pass locale and dictionary-derived labels from parent where practical.

## Security Considerations

- Sanitize language-switch route construction to avoid malformed external URLs.

## Next Steps

- Apply same translation pattern to route-specific page content in Phase 4.
