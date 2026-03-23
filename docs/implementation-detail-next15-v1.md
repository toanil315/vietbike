# FE Implementation Detail (Next.js 15 App Router)

## Objective

Refactor FE integration to be server-first with Next.js 15 App Router best practices while preserving existing UI language.

Primary goals:

- Correct server and client component boundaries
- Better SEO and performance
- Deterministic data flow using server data fetch + server actions for mutations
- Public-first delivery sequence, then admin

## Booking Contract Update (March 2026)

- Booking creation route is unified to `POST /bookings` for both public and admin flows.
- Public booking form should map directly to backend manual-form payload fields.
- UI state still uses customer-friendly controls (date range and summary), but submission must include:
  - `customerName`, `customerPhone`, `sourceApp`, `licensePlate`
  - `startDate`, `rentalDays`, `totalAmount`, `depositAmount`
  - optional `note`, `documents[]`, `voucherCode`

## Current state summary

- App Router is in use
- Heavy client-side composition remains in public bikes listing and booking flow
- Admin pages are mostly client-rendered and include mock-backed UI
- No loading.tsx route-level boundaries currently
- Deprecated connection() usage exists in booking confirmation page

## Target architecture by route segment

### Public root segment: /src/app/(public)

Required files:

- layout.tsx: server component
- loading.tsx: route-level skeleton for public transitions

Responsibilities:

- layout.tsx owns static frame and metadata-friendly structure
- Interactive nav controls can be isolated in tiny client subcomponent only if required

### Bikes segment: /src/app/(public)/bikes

Required files:

- layout.tsx
- loading.tsx
- page.tsx

Data strategy:

- page.tsx fetches list data from BE on server
- parse searchParams on server and call BE once
- pass typed data to child components
- filter controls in small client component update URL (searchParams)
- no API calls from listing client component

Performance strategy:

- use Promise.all when fetching list + auxiliary metadata in parallel
- use Suspense around slower subtrees if split fetches are needed

### Bike detail segment: /src/app/(public)/bikes/[slug]

Required files:

- page.tsx
- loading.tsx

Data strategy:

- server fetch by slug in page.tsx
- keep generateMetadata in server layer
- use ISR or timed revalidation appropriate for inventory changes

Component split:

- server: specs, structured content, static sections
- client: gallery interactions, CTA micro-interactions

### Booking segment: /src/app/(public)/booking

Required files:

- page.tsx
- loading.tsx

Data strategy:

- page.tsx preloads required reference data server-side (vehicle summary, optional locations when API exists)
- submission is handled by server action
- client components handle only form state and UI transitions

Mutation strategy:

- server action createBookingAction(payload)
- action validates payload with shared schema
- action calls BE endpoint
- action returns typed success or error object

### Booking confirmation segment: /src/app/(public)/booking/confirmation

Required files:

- page.tsx
- loading.tsx

Fixes:

- remove connection() call
- page.tsx reads search params and fetches confirmation server-side when needed
- client component only for optional interaction/animation

## Admin target architecture

### Admin root segment: /src/app/admin

Required files:

- layout.tsx
- loading.tsx

Strategy:

- layout remains server-first
- client-only wrappers limited to controls requiring navigation hooks or local UI state

### Admin vehicles: /src/app/admin/vehicles

Required files:

- page.tsx
- loading.tsx
- optional nested layout.tsx

Data strategy:

- page.tsx server fetches table data from BE
- toolbar filters update URL search params
- mutations via server actions:
  - createVehicle
  - updateVehicle
  - changeVehicleStatus
  - addImage
  - deleteImage
  - reorderImages
  - addFeature
  - deleteFeature

### Admin bookings: /src/app/admin/bookings

Required files:

- page.tsx
- loading.tsx

Data strategy:

- server fetch for list and detail
- status update through server action

## Data fetching and cache policy

### Read paths

- Fetch in server page.tsx/layout.tsx
- Avoid duplicate fetch calls in nested client components
- Use Promise.all for independent endpoints

### Cache guidance

- Public bikes list/detail:
  - revalidate with time-based policy (example 300 to 3600 seconds based on inventory volatility)
- Booking and admin routes:
  - dynamic no-store or immediate revalidation after mutations

### Revalidation after server actions

- use revalidatePath for affected list/detail pages
- optional tag-based strategy for future expansion

## Component design rules

- Keep components small and responsibility-focused
- Avoid giant page-level client components doing data fetch + filters + mutation + rendering
- Do not place heavy inline event handlers in deeply repeated lists
- Extract event handlers to named functions where practical
- Keep shared UI components presentation-only when possible

## Suggested boundary changes from current code

- Convert bikes listing pipeline from client-fetch to server-fetch in bikes/page.tsx
- Keep filter bar as client component only for URL updates
- Reduce booking flow client scope to form orchestration only
- Migrate admin data tables to server-fetched page wrappers
- Keep summary cards and static admin shell pieces server-rendered where possible

## Error and loading UX

- Add loading.tsx at each slow segment
- Add error.tsx where meaningful for segment-level failure containment
- Keep API errors mapped to user-safe messages via central FE error handler

## Type contract strategy

- Use shared FE types aligned to BE DTO shapes
- Keep strict envelope types:
  - ApiSuccess<T>
  - ApiFailure
- Ensure server actions return discriminated union to simplify client handling

## Out-of-scope for this refactor wave

- Building features that backend has not implemented yet:
  - auth and RBAC
  - customer CRUD
  - location management CRUD
  - voucher/admin promo CRUD
  - finance dashboards

## Success criteria

- Public bikes and booking flow render with server-fetched data
- All write operations occur through server actions
- App Router segment files include layout.tsx/page.tsx/loading.tsx where appropriate
- Measurable reduction in client-only component surface
- Admin vehicle and booking pages integrated with implemented BE endpoints only
