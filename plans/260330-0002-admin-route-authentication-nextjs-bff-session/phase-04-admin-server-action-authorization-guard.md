# Phase 04 - Admin Server Action Authorization Guard

## Context Links

- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- Admin action files under: `src/app/admin/**/actions.ts`
- Existing hooks and API wrappers: `src/hooks`, `src/lib/api.ts`

## Overview

- Priority: P1
- Status: Pending
- Goal: ensure server actions cannot be executed without valid admin session.

## Key Insights

- Middleware protects route navigation, but server actions still require explicit guard.
- Current actions call backend APIs without auth boundary checks.

## Requirements

- Functional: shared `requireAdminAuth()` utility for server actions.
- Functional: consistent unauthorized handling path (clear cookie + redirect/login error).
- Non-functional: minimal repetitive code across action files.

## Architecture

- Create `src/lib/auth/require-admin-auth.ts`.
- Utility reads session cookie and validates role + expiry.
- Return auth context (token/claims) for backend API calls.

## Related Code Files

- Create: `src/lib/auth/require-admin-auth.ts`
- Modify: `src/app/admin/bookings/actions.ts`
- Modify: `src/app/admin/vehicles/actions.ts`
- Modify: `src/app/admin/categories/actions.ts`
- Modify: other admin action modules discovered in route tree

## Implementation Steps

1. Implement `requireAdminAuth()` returning safe auth context or throwing typed error.
2. Update each admin action to call utility before backend request.
3. Inject Authorization header from server-side context only.
4. Add centralized unauthorized error mapping for action responses.
5. Ensure cache revalidation logic remains unchanged after guard integration.

## Todo List

- [ ] Create shared server action guard utility.
- [ ] Integrate guard across all admin action files.
- [ ] Normalize unauthorized response behavior.

## Success Criteria

- Every admin server action enforces guard before mutation/query.
- Unauthorized action calls fail safely and consistently.
- No duplicate auth-check code spread across files.

## Risk Assessment

- Risk: missing action files leads to partial protection.
- Mitigation: grep-based action file checklist + review pass.

## Security Considerations

- Never trust client-provided auth state for server action execution.
- Keep token handling server-side only.

## Next Steps

- Wire UI login/logout flow to new auth boundary (Phase 05).
