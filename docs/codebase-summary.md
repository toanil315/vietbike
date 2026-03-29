# Codebase Summary

## Tech Stack

- Framework: Next.js 15 (App Router)
- UI: React 19, Tailwind CSS v4, Framer Motion
- Language: TypeScript (strict mode)
- Forms/Validation: React Hook Form, Zod
- State: Zustand
- Charts/Admin visuals: Recharts

## Top-Level Structure

- `src/app`: Route tree, layouts, route groups, loading states, server actions
- `src/components`: Domain components (`home`, `bikes`, `booking`, `admin`) and shared (`ui`, `layout`, `common`)
- `src/lib`: API client, endpoints, validation, formatting, utilities, error handling
- `src/hooks`: Data fetching and mutation hooks
- `src/store`: Zustand stores for booking/auth/ui
- `src/types`: Shared domain and API types

## Routing Overview

Public routes are organized under route group `src/app/(public)`:

- `/`
- `/bikes`
- `/bikes/[slug]`
- `/booking`
- `/booking/confirmation`
- `/contact`

Admin routes are under `src/app/admin`:

- `/admin`
- `/admin/vehicles`
- `/admin/categories`
- `/admin/bookings`
- `/admin/customers`
- `/admin/finance`
- `/admin/vouchers`

## Architecture Snapshot

- Server-rendered route pages fetch and prepare data.
- Client components drive interactive states (filters, stepper, form flow).
- API requests go through centralized `HttpClient` in `src/lib/api.ts`.
- Endpoints are defined as builders/constants in `src/lib/api-endpoints.ts`.
- Validation rules and inferred request types are centralized in `src/lib/validation.ts`.

## Booking Flow (High Level)

1. User selects bike from listing/detail.
2. Booking state is staged in Zustand store.
3. User submits customer info, dates, payment method.
4. Server action posts booking payload to backend.
5. Confirmation data is displayed to user.

## Admin Flow (High Level)

1. Admin dashboard reads vehicles/bookings snapshots.
2. Vehicle and booking pages expose CRUD/status operations.
3. Category page exposes category CRUD operations for vehicle taxonomy.
4. Mutations trigger cache/path revalidation to refresh views.

## Notable Patterns

- Domain-first components organization
- Shared UI primitives under `src/components/ui`
- Validation-first payload modeling with Zod
- Error mapping utility for user-friendly feedback

## Known Technical Gaps

- Refund workflow is stubbed and needs backend + UI completion.
- API envelope assumptions vary by hook and should be standardized.
- Add-on booking integration appears incomplete.
- Some hydration-safe rendering workarounds should be revisited.
