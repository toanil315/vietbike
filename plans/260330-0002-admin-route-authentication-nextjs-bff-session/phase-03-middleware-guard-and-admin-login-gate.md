# Phase 03 - Middleware Guard and Admin Login Gate

## Context Links

- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- Phase 01: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/phase-01-auth-contract-and-session-utilities.md`
- Phase 02: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/phase-02-nextjs-bff-auth-route-handlers.md`
- Admin layout: `src/app/admin/layout.tsx`

## Overview

- Priority: P1
- Status: Pending
- Goal: block unauthorized access at request boundary for all admin pages except login.

## Key Insights

- Middleware is required for direct URL protection and SSR routes.
- Middleware alone is not enough; server actions are guarded in Phase 04.

## Requirements

- Functional: matcher for `/admin/:path*` excluding `/admin/login`.
- Functional: redirect unauthorized users to `/admin/login`.
- Functional: redirect authenticated admin away from `/admin/login` to `/admin`.
- Non-functional: avoid redirect loops and preserve intended destination using `next` query parameter.

## Architecture

- Add `middleware.ts` at project root.
- Read session cookie, parse claims, validate role + expiry.
- Handle redirection logic for both protected and login routes.

## Related Code Files

- Create: `middleware.ts`
- Create or Modify: `src/app/admin/login/page.tsx`
- Modify: `src/app/admin/layout.tsx` (minimal adjustments only)

## Implementation Steps

1. Define matcher config for admin paths.
2. Implement `isAuthorizedAdmin()` middleware check via shared utilities.
3. Redirect invalid sessions to login, clear stale cookie, append `next` destination.
4. Ensure `/admin/login` remains public for unauthenticated users.
5. Add redirect behavior when logged-in admin hits login page.
6. Ensure login page consumes `next` and redirects there after success.
7. Validate behavior for direct URL access and page refresh.

## Todo List

- [ ] Add middleware with strict admin matcher.
- [ ] Add stale-session clearing behavior.
- [ ] Add admin login route/page if absent.

## Success Criteria

- Unauthenticated access to `/admin/*` is always redirected.
- `/admin/login` is reachable without auth.
- No redirect loops in common navigation paths.

## Risk Assessment

- Risk: matcher catches non-admin assets or API routes incorrectly.
- Mitigation: narrow matcher and test static asset paths.

## Security Considerations

- Fail-closed: invalid or malformed tokens should be treated as unauthorized.
- Do not rely on UI state for authorization.

## Next Steps

- Enforce authorization in all admin server actions (Phase 04).
