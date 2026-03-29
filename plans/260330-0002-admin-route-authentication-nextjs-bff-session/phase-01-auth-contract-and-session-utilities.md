# Phase 01 - Auth Contract and Session Utilities

## Context Links

- Brainstorm summary: `plans/260329-2356-admin-authentication-mechanism-brainstorm-summary/brainstorm-summary.md`
- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- API client: `src/lib/api.ts`
- Endpoints: `src/lib/api-endpoints.ts`
- Auth store: `src/store/authStore.ts`

## Overview

- Priority: P1
- Status: Pending
- Goal: define session model + shared auth utilities before route guards.

## Key Insights

- Current admin routes are unprotected.
- Existing auth store is not authoritative for server-side access checks.
- Need one source of truth: secure cookie session + shared parser.

## Requirements

- Functional: parse JWT claims and enforce `roleKey.includes('admin_operations')`.
- Functional: validate expiry with 5 minute skew tolerance.
- Non-functional: no token in browser storage.
- Non-functional: utilities reusable by middleware, route handlers, and server actions.

## Architecture

- Create `src/lib/auth/admin-session.ts` for read/write/clear session cookie.
- Create `src/lib/auth/admin-claims.ts` for claim parsing and role checks.
- Create `src/lib/auth/admin-auth-errors.ts` for normalized auth errors.

## Related Code Files

- Create: `src/lib/auth/admin-session.ts`
- Create: `src/lib/auth/admin-claims.ts`
- Create: `src/lib/auth/admin-auth-errors.ts`
- Modify: `src/lib/api-endpoints.ts` (ensure auth endpoint constants complete)

## Implementation Steps

1. Define TypeScript interfaces for login payload, claims, and session shape.
2. Implement claim parser with defensive checks for malformed JWT payload.
3. Add role check helper for `admin_operations`.
4. Add expiry check helper using 5 minute skew tolerance.
5. Implement secure cookie helper options for dev/prod.
6. Add clear-session helper used by logout and unauthorized responses.

## Todo List

- [ ] Define auth/session types and claim schema.
- [ ] Implement token expiry and role helpers.
- [ ] Implement cookie set/read/clear helpers.
- [ ] Align endpoint constants for auth routes.

## Success Criteria

- Helpers compile and are importable from middleware/server contexts.
- Role + expiry checks return deterministic results for valid/invalid payloads.
- No direct localStorage/sessionStorage reads introduced.

## Risk Assessment

- Risk: claim key mismatch from backend.
- Mitigation: strict parser + fail-closed behavior + explicit logs.

## Security Considerations

- Cookies: `httpOnly`, `sameSite`, `secure` in production.
- Never expose raw token through client state stores.

## Next Steps

- Use these helpers in BFF login/logout/session route handlers (Phase 02).
