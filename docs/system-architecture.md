# System Architecture

## Overview

VietBike uses a Next.js App Router frontend with a backend API integration layer.

Architecture style:

- Layered frontend architecture
- Domain-oriented component organization
- Shared typed utility and validation layer

## High-Level Layers

1. Presentation Layer

- Route pages/layouts in `src/app`
- Domain UI components in `src/components/*`

2. Application Layer

- Custom hooks in `src/hooks` orchestrate data loading/mutations
- Zustand stores in `src/store` coordinate cross-step and global UI state

3. Integration Layer

- `src/lib/api.ts`: typed HTTP client, timeout, error parsing
- `src/lib/api-endpoints.ts`: endpoint map/builders
- Server actions in route segments for selected mutations
- Auth boundary via Next.js route handlers:
  - `src/app/api/admin/auth/login/route.ts`
  - `src/app/api/admin/auth/logout/route.ts`
  - `src/app/api/admin/auth/session/route.ts`

## Admin Authentication and Authorization

- Request-time guard: `middleware.ts` protects `/admin/:path*` and redirects unauthorized users to `/admin/login`.
- Session model: admin token stored in `httpOnly` cookie `vietbike_admin_session`.
- Claim policy: JWT must include `roleKey` with `admin_operations`.
- Expiry policy: token expiry validated with 5-minute clock skew tolerance.
- Server protection: admin server actions and server-rendered admin fetches read token server-side and forward bearer auth to backend.
- Login UX: `next` query param preserved for destination-aware post-login redirect.

4. Domain/Contract Layer

- `src/types/index.ts`: shared entities and API types
- `src/lib/validation.ts`: schema validation + type inference

## Route and Layout Model

- Root layout (`src/app/layout.tsx`) provides global shell and metadata.
- Public route group (`src/app/(public)`) wraps customer-facing pages.
- Admin layout (`src/app/admin/layout.tsx`) wraps internal management pages.
- Admin categories route (`/admin/categories`) manages vehicle taxonomy CRUD.
- Dynamic route (`/bikes/[slug]`) supports per-bike detail pages.

## Data Flow

Public browse flow:

1. User opens bikes listing.
2. Server route fetches vehicle data.
3. Client filter UI updates query params and rerenders list.

Booking flow:

1. User selects bike and enters booking details.
2. Store accumulates multi-step state.
3. Submission goes through server action/API call.
4. Confirmation route renders outcome.

Admin flow:

1. Admin pages load lists and aggregate metrics.
2. Vehicle category CRUD runs through `/admin/vehicle-categories` endpoints.
3. Vehicle and booking CRUD/status actions call admin endpoints.
4. Revalidation refreshes route data after mutation.

## Error and Validation Strategy

- Input validation by Zod schemas.
- API errors translated into app-level user messages.
- Timeout/network conditions handled by centralized HTTP client.

## Deployment and Runtime Notes

- Next.js runtime with environment-based API base URL.
- Image domains configured in `next.config.ts`.
- TypeScript strict checks enabled.

## Known Architectural Risks

- Response envelope inconsistency across some hooks increases integration risk.
- Unfinished refund/add-on areas create feature completeness gaps.
