# Phase 7: Booking Flow Migration

> **Prerequisites**: Phase 6 complete (bike detail page with "Book Now" button)
> **Estimated effort**: Medium
> **Reference**: See `docs/migration-plan.md` for full context
> **Source files**: `src/app/(public)/booking/page.tsx` (429 lines), `src/app/(public)/booking/confirmation/page.tsx` (180 lines)

## Objective
Migrate the 3-step booking flow and confirmation page to Next.js with proper component decomposition.

## Tasks

### Extract Booking Components

- [ ] **`src/components/booking/BookingStepper.tsx`**
  - `'use client'`
  - Props: `currentStep: number`, `steps: { id: number, name: string, icon: LucideIcon }[]`
  - Progress bar with step indicators

- [ ] **`src/components/booking/CustomerInfoForm.tsx`**
  - `'use client'`
  - Props: `customerInfo`, `onUpdate` (or use zustand directly)
  - Step 1: Name, email, phone, nationality, license number fields

- [ ] **`src/components/booking/AddonsSelector.tsx`**
  - `'use client'`
  - Props: `addons`, `selectedAddons`, `onToggle`
  - Step 2: Add-on cards with toggle selection

- [ ] **`src/components/booking/LocationSelector.tsx`**
  - `'use client'`
  - Props: `pickupLocation`, `dropoffLocation`, `onUpdate`, `locations`
  - Step 2: Pickup and dropoff location selectors

- [ ] **`src/components/booking/PaymentMethodSelector.tsx`**
  - `'use client'`
  - Props: `selectedMethod`, `onSelect`
  - Step 3: Payment method cards (Momo, ZaloPay, Credit Card, etc.)

- [ ] **`src/components/booking/BookingSummary.tsx`**
  - `'use client'`
  - Props: `vehicle`, `selectedAddons`, `voucherCode`, `onVoucherChange`, `calculateTotal`
  - Sticky sidebar: vehicle info, price breakdown, voucher input, total

- [ ] **`src/components/booking/BookingConfirmation.tsx`**
  - `'use client'`
  - Confirmation success display with booking details, QR code, next steps

### Rewrite Page Files

- [ ] **`src/app/(public)/booking/page.tsx`**:
  - Add metadata:
    ```tsx
    export const metadata: Metadata = {
      title: 'Complete Your Booking',
      description: 'Finalize your motorbike rental booking. Add extras, choose pickup location, and select payment method.',
    };
    ```
  - Server page that renders a client `<BookingFlow />` wrapper
  - The wrapper uses `useBookingStore` for all state

- [ ] **`src/app/(public)/booking/confirmation/page.tsx`**:
  - Add metadata:
    ```tsx
    export const metadata: Metadata = {
      title: 'Booking Confirmed',
      description: 'Your VietBike motorbike rental has been confirmed.',
    };
    ```
  - Renders `<BookingConfirmation />`

### Delete Duplicates

- [ ] Delete `src/app/(public)/booking/booking-content.tsx`
- [ ] Delete `src/app/(public)/booking/confirmation/confirmation-content.tsx`

## Key Migration Points
- Replace `useNavigate()` → `useRouter()` from `next/navigation`
- Replace `navigate('/path')` → `router.push('/path')`
- Replace `navigate(-1)` → `router.back()`
- Replace `<Link to=...>` → `<Link href=...>` (from `next/link`)
- `useBookingStore` stays exactly the same (zustand works in client components)

## Acceptance Criteria
- [ ] Booking flow works end-to-end: Select bike → Book Now → Fill info → Add-ons → Payment → Confirm
- [ ] All 3 steps display correctly with working step navigation
- [ ] Booking summary sidebar updates in real time
- [ ] Confirmation page shows booking details
- [ ] "Return Home" button resets booking state and navigates to `/`
- [ ] Old `*-content.tsx` files are deleted
- [ ] `npm run build` succeeds
