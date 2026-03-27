# VietBike Frontend

VietBike is a Next.js frontend for a bike rental platform with a public booking journey and an admin management portal.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- Zustand (state management)
- Zod + React Hook Form (validation/forms)

## Features

- Public browsing and filtering of bikes
- Bike detail pages
- Multi-step booking flow with confirmation
- Admin dashboard and management pages for vehicles/bookings

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Environment

Create `.env.local` with the required values:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_ENABLE_DEBUG=false
GEMINI_API_KEY=your_key_here
```

### Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Project Structure

```text
src/
  app/          # Next.js routes, layouts, server actions
  components/   # Domain components + shared UI
  hooks/        # Data fetching and mutation hooks
  lib/          # API client, endpoints, validation, utilities
  store/        # Zustand stores
  types/        # Shared domain and API types
```

## Documentation

Project documentation lives in `docs/`:

- `docs/project-overview-pdr.md`
- `docs/codebase-summary.md`
- `docs/code-standards.md`
- `docs/system-architecture.md`
- `docs/project-roadmap.md`
- `docs/deployment-guide.md`
- `docs/design-guidelines.md`

## Current Notes

- Migration to Next.js is complete.
- Remaining focus is stabilization and consistency (refund flow completion, add-ons completion, API response standardization, auth guard clarity).
