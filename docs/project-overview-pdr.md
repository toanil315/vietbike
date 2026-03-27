# VietBike Project Overview (PDR)

## Product Summary

VietBike is a bike rental web application with a public booking experience and an admin back office.

Core capabilities:

- Browse and filter bikes
- View bike details and specs
- Complete multi-step booking flow
- Manage vehicles and bookings in admin panel

## Goals

- Provide a fast, clear booking journey for end users
- Give operations staff a practical admin interface for day-to-day management
- Keep the codebase maintainable with typed contracts, centralized validation, and reusable UI components

## Target Users

- Travelers and local riders booking rentals
- Admin staff managing fleet inventory and bookings

## Scope

In scope:

- Public pages: home, bikes listing, bike detail, booking, contact
- Admin pages: dashboard, vehicles, bookings, customers, finance, vouchers
- API integration through typed client and endpoint helpers

Out of scope (current state):

- Fully implemented refunds flow
- Complete add-on selection integration
- Advanced auth hardening and role-based route protection details

## Functional Requirements

1. Users can discover bikes using filters (type, category, transmission, price, sort).
2. Users can open bike detail pages and inspect specs/features.
3. Users can submit booking requests with date range and customer information.
4. Booking flow can carry state between steps and show confirmation data.
5. Admin can list, create, update, and delete vehicles.
6. Admin can view/manage bookings and statuses.

## Non-Functional Requirements

- Type safety via TypeScript strict mode
- Input and payload validation via Zod schemas
- Responsive UI on mobile and desktop
- Clear API error handling with user-friendly messages
- Maintainable structure by domain and shared layer boundaries

## Success Metrics

- Booking completion rate from bikes listing to booking confirmation
- API error rate and timeout rate
- Admin task completion time (vehicle updates, booking status updates)
- Page performance metrics (LCP, INP) on public pages

## Current Risks and Gaps

- Refund mutation hook exists as a placeholder and is not implemented end-to-end.
- Some API response shape handling appears inconsistent across hooks.
- Hydration workarounds in several client components indicate SSR/client coupling friction.
- Add-on flow appears partially implemented and needs completion.
- Admin authentication/route guard behavior is not clearly documented.

## Assumptions

- Backend API is available at `NEXT_PUBLIC_API_URL`.
- Deploy target supports Next.js 15 runtime requirements.
- Environment variable `GEMINI_API_KEY` remains required by project context.

## Release Direction (Short Term)

- Stabilize booking and admin workflows
- Close integration gaps (refunds, add-ons, auth guard clarity)
- Improve consistency of API response handling
- Add regression tests around critical user journeys
