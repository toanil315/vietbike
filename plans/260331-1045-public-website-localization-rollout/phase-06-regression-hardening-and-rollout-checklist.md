# Phase 06 - Regression Hardening and Rollout Checklist

## Overview

Priority: P1  
Status: Pending  
Effort: 2h

Validate localization rollout quality, prevent regressions, and produce release checklist for safe deployment.

## Context Links

- `plans/260331-1045-public-website-localization-rollout/plan.md`
- all `phase-*.md` in this plan directory
- `README.md`

## Requirements

Functional:

- Validate route resolution in all locales.
- Validate language switch preserves route/query.
- Validate booking core flow in all locales.
- Validate build and key smoke tests.

Non-functional:

- Detect missing translation keys and fallback overuse.
- Confirm no admin route behavior regressions.

## Architecture

Validation matrix dimensions:

- Locale: `en`, `ko`, `ru`, `zh-CN`, `vi`
- Route: `/`, `/bikes`, `/bikes/[slug]`, `/booking`, `/booking/confirmation`, `/contact`
- Device profile: desktop + mobile viewport

## Related Code Files

Modify:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260331-1045-public-website-localization-rollout/plan.md`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/plans/260331-1045-public-website-localization-rollout/phase-06-regression-hardening-and-rollout-checklist.md`

Optional docs update if needed:

- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/docs/codebase-summary.md`
- `/Users/dangcongtoan/Desktop/codes/vietbike/FE/docs/system-architecture.md`

## Implementation Steps

1. Execute build and manual smoke matrix for all locales/routes.
2. Verify no missing key warnings in runtime logs.
3. Verify fallback usage count and patch high-frequency misses.
4. Confirm admin middleware/auth behavior unaffected.
5. Finalize rollout checklist and mark phase statuses.

## Todo List

- [ ] Run `npm run build`
- [ ] Run locale-route smoke checks for all public routes
- [ ] Validate booking flow per locale
- [ ] Validate admin route auth still intact
- [ ] Complete rollout checklist and update plan status

## Success Criteria

- Build passes and critical public flows work in all target locales.
- No blocking missing translations in production-critical pages.
- Plan status updated with accurate completion state.

## Risk Assessment

- Risk: latent untranslated labels remain in less-used component states.
- Mitigation: include empty/loading/error UI states in smoke checklist.

## Security Considerations

- Ensure middleware behavior continues to enforce admin protection.

## Next Steps

- Handoff to implementation workflow using `/ck:cook` with this plan path.
