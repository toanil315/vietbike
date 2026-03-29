# Brainstorming Summary

## Problem Statement

Need authentication mechanism for all admin routes in Next.js App Router app. Backend auth endpoint already exists and login returns tokens in JSON body. Requirement: follow Next.js auth best practices.

## Functional Requirements

- Protect all `/admin/*` routes except `/admin/login`.
- Block direct URL access without valid auth.
- Enforce auth in server actions (not only page navigation).
- Authorization based on JWT claims (`admin` role).
- No refresh flow for now; expired/invalid token should redirect to login.

## Evaluated Approaches

1. **Client-only guard + localStorage token**

- Description: Keep token in browser storage, protect routes with client hook redirect.
- Pros: Fastest to implement, low upfront refactor.
- Cons: Not secure enough (XSS token theft risk), weak SSR protection, inconsistent on reload/direct URL.

2. **Mixed guard with in-memory Zustand token**

- Description: Use store as auth source and partial route checks.
- Pros: Reuses existing auth store.
- Cons: Breaks on refresh, middleware cannot trust in-memory state, still brittle for server actions.

3. **Next.js BFF + httpOnly session cookie (recommended)**

- Description: Frontend route handlers call backend auth API, then set secure httpOnly cookie session. Middleware + server action guard enforce access.
- Pros: Best security posture, App Router aligned, clean SSR behavior, maintainable.
- Cons: More setup than client-only approach.

## Final Recommended Solution

Implement server-first auth boundary:

- Add Next.js auth route handlers (`/api/admin/auth/login`, `/logout`, optional `/session`) as BFF layer.
- On login: call backend auth endpoint, validate response, set signed/encrypted httpOnly cookie.
- Add `middleware.ts` matcher for `/admin/:path*` excluding `/admin/login`.
- In middleware: validate session + JWT claim role, redirect unauthorized users to `/admin/login`.
- Add shared server utility `requireAdminAuth()` and use in all admin server actions.
- On token expiry/401: clear session cookie and redirect to login.

- Reason: Meets Next.js best practice for auth boundaries and protects both routing + server action paths.
- Pros: Security, consistency, maintainability.
- Cons: Moderate implementation complexity.

## Implementation Considerations and Risks

- JWT claim schema mismatch risk.
- Cookie config mistakes across envs (secure/sameSite/domain).
- Middleware-only protection gap if server actions not guarded.
- UX trade-off with no refresh flow.

Mitigation:

- Central claim parser + schema validation.
- Shared cookie helper with env-aware options.
- Mandatory `requireAdminAuth()` in all admin server actions.
- Explicit expired-session UX + redirect message.

## Impact Analysis

Technical Impact:

- Affects auth boundary, route protection, server actions, and API call flow.

- **IMPORTANT:** `src/app/admin/*`, admin server actions, `middleware.ts`, auth utilities, optional auth UI state endpoints.
- Risks + mitigation: unauthorized access holes mitigated by dual-layer enforcement (middleware + server action guard).
- Perf/scalability/maintainability: minimal middleware overhead; improved long-term maintainability via centralized auth utilities.

## Success Metrics and Validation Criteria

- 100% admin routes blocked when unauthenticated.
- 100% admin server actions reject unauthenticated/unauthorized calls.
- 0 tokens in localStorage/sessionStorage.
- Expired token always clears session and redirects to `/admin/login`.
- Manual test matrix passes:
  - direct URL access to admin pages
  - non-admin token claim
  - expired token
  - logout + back navigation

## Next Steps and Dependencies

- Confirm JWT payload fields for role and expiry.
- Implement BFF auth handlers and cookie/session utilities.
- Add middleware guard and server action guard helper.
- Build admin login page flow.
- Add tests for middleware + auth utility + protected actions.
- Update docs for admin auth model.

## Unresolved Questions

- Exact JWT claim keys for admin role in backend token.
  => JWT contains `roleKey` array claim with `admin_operations` value for admin users.
- Token TTL and clock skew tolerance policy.
  => Token TTL is set to 4 hours, with no refresh flow. Clock skew tolerance of 5 minutes should be applied in validation.
- Whether backend supports explicit token revocation endpoint.
  => No explicit revocation endpoint; rely on short TTL and cookie clearing on logout/expiry.
