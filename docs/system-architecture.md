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

4. Domain/Contract Layer

- `src/types/index.ts`: shared entities and API types
- `src/lib/validation.ts`: schema validation + type inference

## Route and Layout Model

- Root layout (`src/app/layout.tsx`) provides global shell and metadata.
- Public route group (`src/app/(public)`) wraps customer-facing pages.
- Admin layout (`src/app/admin/layout.tsx`) wraps internal management pages.
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
2. CRUD/status actions call admin endpoints.
3. Revalidation refreshes route data after mutation.

## Error and Validation Strategy

- Input validation by Zod schemas.
- API errors translated into app-level user messages.
- Timeout/network conditions handled by centralized HTTP client.

## Deployment and Runtime Notes

- Next.js runtime with environment-based API base URL.
- Image domains configured in `next.config.ts`.
- TypeScript strict checks enabled.

## Known Architectural Risks

- Authentication guard implementation details need clearer documentation.
- Response envelope inconsistency across some hooks increases integration risk.
- Unfinished refund/add-on areas create feature completeness gaps.
