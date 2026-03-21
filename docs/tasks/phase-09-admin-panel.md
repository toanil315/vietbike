# Phase 9: Admin Panel Migration

> **Prerequisites**: Phase 3 (layouts) complete
> **Estimated effort**: Large (2–3 tasks)
> **Reference**: See `docs/migration-plan.md` for full context
> **Source files**: 5 admin page files totaling ~1,366 lines

## Objective
Migrate all admin pages from react-router-dom to Next.js. Extract large page files into focused components.

## Tasks

### Dashboard

- [ ] **`src/app/admin/page.tsx`**:
  - Keep as thin wrapper that imports `DashboardContent`
  - No metadata needed (admin pages don't need SEO)

- [ ] **`src/components/admin/DashboardContent.tsx`**:
  - `'use client'`
  - Move content from `src/app/admin/dashboard-content.tsx`
  - Replace any `react-router-dom` imports

### Vehicles

- [ ] **Extract `src/components/admin/VehicleTable.tsx`** from `src/app/admin/vehicles/page.tsx` (222 lines):
  - `'use client'`
  - Contains: search, filters, table with vehicle rows, pagination
  - Replace `<Link>` → `next/link`, `to=` → `href=`

- [ ] **Rewrite `src/app/admin/vehicles/page.tsx`**:
  - Thin wrapper importing `VehicleTable`

- [ ] **Extract `src/components/admin/VehicleForm.tsx`** from `src/app/admin/vehicles/new/page.tsx` (444 lines):
  - `'use client'`
  - Contains: full vehicle add/edit form with all sections
  - Replace `useNavigate()` → `useRouter()` from `next/navigation`
  - Replace `useParams()` → `useParams()` from `next/navigation`
  - Replace `<Link>` → `next/link`

- [ ] **Rewrite `src/app/admin/vehicles/new/page.tsx`**:
  - Thin wrapper importing `VehicleForm`

- [ ] **Create `src/app/admin/vehicles/[id]/page.tsx`**:
  - Edit page — renders `VehicleForm` with the vehicle ID passed as prop
  - `'use client'` wrapper that reads params and passes to form

### Bookings

- [ ] **Extract `src/components/admin/BookingsTable.tsx`** from `src/app/admin/bookings/page.tsx` (lines 80-247):
  - `'use client'`
  - Search, filters, booking table

- [ ] **Extract `src/components/admin/BookingDetailDrawer.tsx`** from `src/app/admin/bookings/page.tsx` (lines 249-390):
  - `'use client'`
  - Slide-in drawer with full booking details
  - Props: `booking`, `customer`, `vehicle`, `onClose`

- [ ] **Rewrite `src/app/admin/bookings/page.tsx`**:
  - Thin wrapper composing `BookingsTable` + `BookingDetailDrawer`

- [ ] **Extract `src/components/admin/NewBookingForm.tsx`** from `src/app/admin/bookings/new/page.tsx` (306 lines):
  - `'use client'`
  - Replace `useNavigate()` → `useRouter()`
  - Replace `<Link>` → `next/link`

- [ ] **Rewrite `src/app/admin/bookings/new/page.tsx`**:
  - Thin wrapper importing `NewBookingForm`

### Placeholder Pages

- [ ] **Create `src/app/admin/customers/page.tsx`**:
  - Simple "Customer Management (Coming Soon)" placeholder
  - `'use client'` or server component

- [ ] **Create `src/app/admin/vouchers/page.tsx`**:
  - Simple "Voucher Management (Coming Soon)" placeholder

- [ ] **Create `src/app/admin/finance/page.tsx`**:
  - Simple "Financial Management (Coming Soon)" placeholder

### Delete Old Files

- [ ] Delete `src/app/admin/dashboard-content.tsx` (moved to components)

## Import Replacement Quick Reference
| Before | After |
|--------|-------|
| `import { Link, useNavigate, useParams } from 'react-router-dom'` | `import Link from 'next/link'` + `import { useRouter, useParams } from 'next/navigation'` |
| `navigate('/path')` | `router.push('/path')` |
| `navigate(-1)` | `router.back()` |
| `<Link to="/admin/...">` | `<Link href="/admin/...">` |

## Acceptance Criteria
- [ ] All admin routes work: `/admin`, `/admin/vehicles`, `/admin/vehicles/new`, `/admin/vehicles/:id`, `/admin/bookings`, `/admin/bookings/new`, `/admin/customers`, `/admin/vouchers`, `/admin/finance`
- [ ] No `react-router-dom` imports remain in any admin file
- [ ] Sidebar navigation highlights the active page
- [ ] Vehicle add/edit form works
- [ ] Booking list with detail drawer works
- [ ] `npm run build` succeeds
