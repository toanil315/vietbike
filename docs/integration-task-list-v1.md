# Integration Task List (Public First, Small Scope)

## How To Resume Later

When returning in another session:

- Open this file first.
- Continue from the first unchecked item in Current Checklist.
- Update only one task to in-progress at a time.
- After finishing a task, mark it done and add a short note in Session Log.

## Status Legend

- [x] done
- [~] in progress
- [ ] not started

## Progress Snapshot

- Last updated: 2026-03-23
- Current phase: Public integration
- Next recommended task: A2 - Admin vehicles list server fetch

## Rules for all tasks

- Keep each task small and independently testable
- Use implemented BE endpoints only
- Follow server-first fetch and server action mutation pattern
- Add loading.tsx for slow segments

## Current Checklist

### Public flow

- [x] P1 - Public bikes route loading boundary
  - Scope: add segment loading UI for bikes route
  - Files:
    - src/app/(public)/bikes/loading.tsx
  - Acceptance:
    - navigation to bikes shows immediate loading state

- [x] P2 - Server fetch for bikes list
  - Scope: fetch vehicles in bikes/page.tsx using searchParams
  - Files:
    - src/app/(public)/bikes/page.tsx
    - src/lib/api.ts (if helper update needed)
  - API:
    - GET /public/vehicles
  - Acceptance:
    - page renders server-fetched vehicles
    - query params map correctly to backend filters

- [x] P3 - URL-synced client filter controls
  - Scope: keep filter interactions in client component, update URL only
  - Files:
    - src/app/(public)/bikes/bikes-client.tsx or replacement component in bikes/\_components
  - Acceptance:
    - changing filter updates URL search params
    - refresh keeps selected filters

- [x] P4 - Bike detail loading boundary
  - Scope: add loading.tsx for bike detail segment
  - Files:
    - src/app/(public)/bikes/[slug]/loading.tsx
  - Acceptance:
    - route transition to detail has skeleton/fallback

- [x] P5 - Bike detail server data hardening
  - Scope: ensure detail and metadata are fetched server-side only
  - Files:
    - src/app/(public)/bikes/[slug]/page.tsx
  - API:
    - GET /public/vehicles/by-slug/:slug
  - Acceptance:
    - metadata and page use same canonical response shape
    - not-found handling works

- [x] P6 - Booking route loading boundary
  - Scope: add loading.tsx for booking segment
  - Files:
    - src/app/(public)/booking/loading.tsx
  - Acceptance:
    - route transition to booking has immediate fallback

- [x] P7 - Create booking server action
  - Scope: implement server action for booking creation
  - Files:
    - src/app/(public)/booking/actions.ts
    - src/components/booking/hooks/useBookingSubmit.ts (invoke action)
  - API:
    - POST /public/bookings
  - Acceptance:
    - booking submission goes through server action
    - client receives typed success/error result

- [x] P8 - Confirmation route cleanup
  - Scope: remove deprecated connection() pattern and fetch confirmation correctly
  - Files:
    - src/app/(public)/booking/confirmation/page.tsx
    - src/app/(public)/booking/confirmation/loading.tsx
  - API:
    - GET /public/bookings/:reference
  - Acceptance:
    - no connection() usage
    - confirmation loads by booking reference

### Admin flow

- [x] A1 - Admin root loading boundary
  - Scope: add loading.tsx for admin segment
  - Files:
    - src/app/admin/loading.tsx
  - Acceptance:
    - admin transitions show loading fallback

- [ ] A2 - Admin vehicles list server fetch
  - Scope: fetch vehicle list in admin vehicles page server-side
  - Files:
    - src/app/admin/vehicles/page.tsx
  - API:
    - GET /admin/vehicles
  - Acceptance:
    - table receives server data
    - pagination and filter query params handled

- [ ] A3 - Admin vehicle mutations via server actions
  - Scope: add create/update/status actions
  - Files:
    - src/app/admin/vehicles/actions.ts
    - src/components/admin/VehicleForm.tsx
    - src/components/admin/VehicleTable.tsx
  - API:
    - POST /admin/vehicles
    - PATCH /admin/vehicles/:id
    - PATCH /admin/vehicles/:id/status
  - Acceptance:
    - all listed mutations go through server actions
    - success triggers revalidation

- [ ] A4 - Admin vehicle image and feature actions
  - Scope: integrate image and feature endpoints
  - Files:
    - src/app/admin/vehicles/actions.ts
    - relevant admin vehicle UI components
  - API:
    - POST /admin/vehicles/:id/images
    - DELETE /admin/vehicles/:id/images/:imageId
    - PATCH /admin/vehicles/:id/images/reorder
    - POST /admin/vehicles/:id/features
    - DELETE /admin/vehicles/:id/features/:featureId
  - Acceptance:
    - image and feature updates work end-to-end

- [ ] A5 - Admin bookings list server fetch
  - Scope: server-side list fetch with filters
  - Files:
    - src/app/admin/bookings/page.tsx
  - API:
    - GET /admin/bookings
  - Acceptance:
    - list renders from backend
    - filter state reflected in URL params

- [ ] A6 - Admin booking status mutation
  - Scope: status update via server action
  - Files:
    - src/app/admin/bookings/actions.ts
    - src/components/admin/BookingsTable.tsx
  - API:
    - PATCH /admin/bookings/:bookingId/status
  - Acceptance:
    - status update persists and list refreshes

- [ ] A7 - Replace remaining mock dependencies in admin pages
  - Scope: remove mock data usage from integrated vehicle/booking pages
  - Files:
    - src/components/admin/BookingsTable.tsx
    - src/components/admin/DashboardContent.tsx (only if tied to implemented APIs)
  - Acceptance:
    - integrated pages no longer rely on mock datasets for core list/detail/update paths

## Session Log

- 2026-03-23:
  - Completed P1, P4, P6, P8, A1.
  - Added loading.tsx boundaries for public and admin segments.
  - Removed deprecated connection() usage from booking confirmation page.
  - Completed P2: moved bikes list fetch to server in bikes/page.tsx with searchParams-based backend query.
  - Completed P3: all bikes filter controls now sync to URL search params (city, brand, type, transmission, price, sort, page).
  - Bikes filter bar options normalized for stable URL-driven state hydration.
  - Completed P5: bike detail metadata typing hardened for nullable description and image URL shape.
  - Re-checked FE type contracts with BE model updates (notably nullable vehicle description and booking compatibility aliases).
  - Confirmed FE production build success after fixes (`npm run build`).
  - Removed legacy mock compatibility fields from shared `Vehicle` and `Booking` types to keep FE contracts aligned with BE DTOs.
  - Updated impacted UI to stop depending on removed mock-only fields (`rating`, `location`, `engineSize`, `relatedVehicles`, legacy booking fields).
  - Decoupled mock datasets from BE contract types by introducing local mock booking interfaces in mock data files.
  - Completed P7: booking create now uses server action (`src/app/(public)/booking/actions.ts`) and client flow invokes typed server result.
  - Confirmed FE production build success after P7 + type cleanup (`npm run build`, exit code 0).
  - Next task to continue: A2.

## Verification checklist

- Lint passes after each task batch
- Route-level loading UX appears for new loading.tsx segments
- Public create booking and admin status update run through server actions
- No features are built on non-implemented backend modules
