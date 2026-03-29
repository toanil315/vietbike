# Phase 02 - Next.js BFF Auth Route Handlers

## Context Links

- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- Phase 01: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/phase-01-auth-contract-and-session-utilities.md`
- Existing API client: `src/lib/api.ts`

## Overview

- Priority: P1
- Status: Pending
- Goal: create frontend auth boundary that talks to backend auth endpoints and manages secure cookies.

## Key Insights

- Backend returns tokens in JSON body.
- Frontend should transform token response into secure cookie-backed session.

## Requirements

- Functional: login handler receives credentials and calls backend login endpoint.
- Functional: logout handler clears session cookie.
- Functional: session handler returns minimal auth state for UI bootstrap/hydration.
- Non-functional: sanitize errors, avoid leaking backend internals.

## Architecture

- Add route handlers under `src/app/api/admin/auth/*`.
- Use server-only helpers from `src/lib/auth/*`.
- Keep response contract stable for admin login form.

## Related Code Files

- Create: `src/app/api/admin/auth/login/route.ts`
- Create: `src/app/api/admin/auth/logout/route.ts`
- Create: `src/app/api/admin/auth/session/route.ts`
- Modify: `src/lib/api.ts` (if needed for server auth call helpers)

## Implementation Steps

1. Build login route: validate request body, call backend auth login, parse response.
2. Validate claim shape (`roleKey`) and reject non-admin tokens.
3. Set secure session cookie and return success payload.
4. Build logout route: clear cookie and return success.
5. Build session route: return authenticated boolean + admin role only.
6. Include support fields needed for `next` redirect preservation flow.
7. Map backend/network errors to stable frontend error codes/messages.

## Todo List

- [ ] Add login/logout/session route handlers.
- [ ] Add request/response schema validation.
- [ ] Add consistent error mapping.

## Success Criteria

- Successful login writes cookie and returns success.
- Non-admin token is rejected by handler.
- Logout removes cookie deterministically.

## Risk Assessment

- Risk: backend login response shape drift.
- Mitigation: schema validation + fallback error messaging.

## Security Considerations

- Route handlers must be server-only and never return token to client JS.
- Rate-limit strategy should be considered in follow-up if brute-force risk rises.

## Next Steps

- Protect admin route tree with middleware (Phase 03).
