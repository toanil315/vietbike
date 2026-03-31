---
title: "Public Website Localization Rollout"
description: "Introduce multilingual localization for public-facing VietBike pages with English default and Korean, Russian, Simplified Chinese, Vietnamese locales."
status: pending
priority: P1
effort: 30h
issue: null
branch: main
tags: [feature, frontend, localization, i18n, seo]
created: 2026-03-31
---

# Public Website Localization Rollout Plan

## Overview

Add localization to public-facing website only (exclude admin). Supported locales in phase scope:

- `en` (default, unprefixed URL)
- `ko`
- `ru` (maps requirement term "russia")
- `zh-CN` (maps requirement term "china", Simplified Chinese)
- `vi`

This plan introduces route-level locale support, translation dictionaries, language switching UX, locale-aware metadata/SEO, and regression hardening.

## Mode

hard

Rationale:

- New architecture concern in current codebase (no existing i18n framework).
- Cross-cutting impact across routing, metadata, and many public UI components.
- SEO-sensitive behavior (`hreflang`, canonical, sitemap variants) must be explicit.

## Confirmed Decisions

- Default locale: English (`en`).
- Default URL strategy: unprefixed English routes (`/`, `/bikes`, ...).
- Chinese variant: Simplified Chinese only (`zh-CN`) for first release.
- Scope boundary: public-facing pages only; admin excluded.

## Phase Map

| #   | Phase                                           | Status  | Effort | File                                                                                                                         |
| --- | ----------------------------------------------- | ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | Locale contract and routing foundation          | Pending | 6h     | [phase-01-locale-contract-and-routing-foundation.md](./phase-01-locale-contract-and-routing-foundation.md)                   |
| 2   | Translation infrastructure and dictionaries     | Pending | 6h     | [phase-02-translation-infrastructure-and-dictionaries.md](./phase-02-translation-infrastructure-and-dictionaries.md)         |
| 3   | Public layout and shared component localization | Pending | 6h     | [phase-03-public-layout-and-shared-component-localization.md](./phase-03-public-layout-and-shared-component-localization.md) |
| 4   | Page-level localization for public routes       | Pending | 7h     | [phase-04-page-level-localization-for-public-routes.md](./phase-04-page-level-localization-for-public-routes.md)             |
| 5   | Locale-aware SEO, metadata, and sitemap         | Pending | 3h     | [phase-05-locale-aware-seo-metadata-and-sitemap.md](./phase-05-locale-aware-seo-metadata-and-sitemap.md)                     |
| 6   | Regression hardening and rollout checklist      | Pending | 2h     | [phase-06-regression-hardening-and-rollout-checklist.md](./phase-06-regression-hardening-and-rollout-checklist.md)           |

## Dependency Graph

- Phase 1 first. Defines locale constants, route strategy, and middleware behavior.
- Phase 2 depends on Phase 1. Establishes translation loading and key structure.
- Phase 3 depends on Phase 2. Migrates shared public shell components.
- Phase 4 depends on Phase 2 and Phase 3. Migrates page content and route-level text.
- Phase 5 depends on Phase 1 and Phase 4. Applies metadata/SEO once URL and content model stable.
- Phase 6 depends on all phases.

## File Ownership Matrix

Phase 1 ownership:

- `next.config.ts`
- `middleware.ts`
- `src/lib/i18n/*` (new)
- `src/app/(public)/*` route path strategy updates where needed

Phase 2 ownership:

- `src/lib/i18n/dictionaries/*` (new)
- `src/lib/i18n/get-dictionary.ts` (new)
- `src/types/i18n.ts` (new)

Phase 3 ownership:

- `src/app/(public)/layout.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/common/FloatingContactButtons.tsx`

Phase 4 ownership:

- `src/app/(public)/page.tsx`
- `src/app/(public)/bikes/page.tsx`
- `src/app/(public)/bikes/[slug]/page.tsx`
- `src/app/(public)/booking/page.tsx`
- `src/app/(public)/booking/confirmation/page.tsx`
- `src/app/(public)/contact/page.tsx`
- `src/components/home/*`
- `src/components/bikes/*`
- `src/components/booking/*`

Phase 5 ownership:

- `src/app/layout.tsx`
- public route metadata generators (`generateMetadata` where required)
- `src/app/sitemap.ts`

Phase 6 ownership:

- localization plan files in this directory
- optional docs updates under `docs/` if architecture notes changed materially

## Requirement Coverage Map

1. English default value:

- Covered in Phase 1 route design and locale fallback chain.

2. Korean support:

- Covered in Phase 2 dictionaries and Phase 3-4 component/page migration.

3. Russian support (user term: "russia"):

- Covered via locale code `ru` in Phase 1-4.

4. Chinese support (user term: "china"):

- Covered via locale code `zh-CN` (Simplified Chinese) in Phase 1-4.

5. Vietnamese support:

- Covered via locale code `vi` in Phase 1-4.

## Key Technical Decisions

- Use a dictionary-driven i18n module under `src/lib/i18n` with strict typed message keys.
- Use locale-prefixed URLs for non-default locales (`/ko/...`, `/ru/...`, `/zh-CN/...`, `/vi/...`) and unprefixed default for English.
- Keep locale source single: route segment + fallback from request `Accept-Language` only for first redirect.
- Keep admin untouched for this rollout to reduce risk and scope.

## Risks

- Missing translation keys can cause runtime undefined labels.
- Mixed server/client rendering may duplicate locale derivation logic if not centralized.
- SEO regressions possible if canonical/hreflang generation is inconsistent.
- Locale switch can lose current path/query if URL builder is not robust.

## Mitigations

- Add compile-time key typing and runtime `safeGetMessage` fallback to default locale.
- Centralize locale parsing/building helpers in `src/lib/i18n`.
- Add deterministic helper to build canonical and alternate locale links.
- Add locale-switch helper preserving pathname + query.

## Success Criteria

- Public routes render localized labels/content in `en`, `ko`, `ru`, `zh-CN`, `vi`.
- English default works without locale prefix.
- Language switcher preserves current route and query params.
- SEO output includes locale-aware canonical + `hreflang` alternates.
- `npm run build` passes with no i18n-related type errors.

## Out of Scope

- Admin portal localization.
- CMS or external translation management platform integration.
- Auto machine translation pipeline.

## Execution Notes

- Task hydration intentionally deferred in this environment; plan files are complete and ready for `/ck:cook` execution.
