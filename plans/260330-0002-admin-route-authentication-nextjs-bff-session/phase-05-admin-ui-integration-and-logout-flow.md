# Phase 05 - Admin UI Integration and Logout Flow

## Context Links

- Plan overview: `plans/260330-0002-admin-route-authentication-nextjs-bff-session/plan.md`
- Admin header/sidebar components: `src/components/layout/AdminHeader.tsx`, `src/components/layout/AdminSidebar.tsx`
- Auth store: `src/store/authStore.ts`

## Overview

- Priority: P2
- Status: Pending
- Goal: make admin UI interact with the secure auth boundary without becoming the source of truth.

## Key Insights

- Existing admin header/sidebar are currently static for auth state.
- Zustand store should be secondary UI cache, not security authority.

## Requirements

- Functional: admin login page submits to BFF login route and redirects to `next` destination when present.
- Functional: logout button calls BFF logout route and redirects login.
- Functional: optional session bootstrap endpoint to hydrate UI state.
- Non-functional: no token exposure in client components.

## Architecture

- Add login form under `/admin/login` using existing form stack (RHF + Zod).
- Update sidebar logout action and auth-aware labels in header.
- Keep protected data loading server-side where possible.

## Related Code Files

- Modify/Create: `src/app/admin/login/page.tsx`
- Modify: `src/components/layout/AdminSidebar.tsx`
- Modify: `src/components/layout/AdminHeader.tsx`
- Modify: `src/store/authStore.ts` (adapt to session-based UI state)

## Implementation Steps

1. Build login form and post credentials to `/api/admin/auth/login`.
2. Read and validate `next` query param, then redirect safely after login.
3. Handle invalid credentials and non-admin rejection states.
4. Update logout control to call `/api/admin/auth/logout` and navigate login.
5. Adjust UI state store to avoid token persistence and only store display-safe user info.
6. Ensure unauthorized responses trigger clean redirect UX.

## Todo List

- [ ] Implement admin login form flow.
- [ ] Wire logout interaction.
- [ ] Remove token-first assumptions from client store.

## Success Criteria

- Login succeeds and routes to `/admin`.
- Logout clears session and blocks admin re-entry until re-login.
- No token values present in client-accessible storage.

## Risk Assessment

- Risk: client auth state desync from server session.
- Mitigation: treat server session as source of truth and re-check on route transitions.

## Security Considerations

- Minimize auth-related data in client state.
- Keep sensitive operations through server boundary.

## Next Steps

- Validate with test matrix and document model (Phase 06).
