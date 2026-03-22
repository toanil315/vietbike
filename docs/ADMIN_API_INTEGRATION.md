# Admin API Integration Guide

## Overview

Created production-ready hooks for admin vehicle and booking management following Next.js best practices.

## Admin Hooks Location

```
src/hooks/
├── useAdminVehicles.ts   (Vehicle management)
└── useAdminBookings.ts   (Booking management)
```

## Vehicle Management API

### useAdminVehicles Hook

**Purpose**: Fetch vehicles with pagination, filtering, and search

```typescript
// Usage in components
const { data, pagination, isLoading, error } = useAdminVehicles(
  page, // current page number
  limit, // items per page (default 20)
  {
    status: "available", // optional: filter by status
    type: "automatic", // optional: filter by type
    category: "scooter", // optional: filter by category
    searchTerms: ["Honda"], // optional: search keywords
  },
);
```

**Returns**:

- `data: Vehicle[]` - Array of vehicle objects
- `pagination: { total, page, limit, pages }` - Pagination info
- `isLoading: boolean` - Loading state
- `error: AppError | null` - Error object or null

### useAdminUpsertVehicle Hook

**Purpose**: Create or update a vehicle

```typescript
const { mutate, isLoading, error } = useAdminUpsertVehicle();

// Create
await mutate({
  name: "Honda SH 150i",
  pricePerDay: 30,
  type: "automatic",
  // ... other fields
});

// Update
await mutate({
  id: "v1",
  pricePerDay: 35,
  status: "maintenance",
  // ... updated fields
});
```

### useAdminDeleteVehicle Hook

**Purpose**: Delete a vehicle

```typescript
const { mutate, isLoading, error } = useAdminDeleteVehicle();

await mutate("vehicle-id");
```

## Booking Management API

### useAdminBookings Hook

**Purpose**: Fetch bookings with pagination and date filtering

```typescript
const { data, pagination, isLoading, error } = useAdminBookings(
  page, // current page number
  limit, // items per page (default 20)
  {
    status: "confirmed", // optional: pending|confirmed|active|completed|cancelled
    startDate: "2026-03-01", // optional: filter from date
    endDate: "2026-03-31", // optional: filter to date
  },
);
```

### useAdminUpdateBookingStatus Hook

**Purpose**: Update booking status

```typescript
const { mutate, isLoading, error } = useAdminUpdateBookingStatus();

// Update status
await mutate(
  "booking-id",
  "confirmed", // 'pending'|'confirmed'|'active'|'completed'|'cancelled'
);
```

### useAdminRefundBooking Hook

**Purpose**: Process refund for a booking

```typescript
const { mutate, isLoading, error } = useAdminRefundBooking();

await mutate(
  "booking-id",
  "Customer requested cancellation", // refund reason
);

// Returns:
// {
//   bookingId: string,
//   refundAmount: number,
//   status: string
// }
```

## Implementation Pattern

### Step 1: Convert Component to Client Component

```typescript
"use client";

import { useState, useCallback } from "react";
import { useAdminVehicles } from "@/hooks/useAdminVehicles";
```

### Step 2: Add Pagination State

```typescript
const [currentPage, setCurrentPage] = useState(1);
const [pageSize] = useState(20);
```

### Step 3: Fetch Data with Hook

```typescript
const {
  data: vehicles,
  pagination,
  isLoading,
  error,
} = useAdminVehicles(currentPage, pageSize, {
  status: statusFilter || undefined,
  type: typeFilter || undefined,
});
```

### Step 4: Handle Loading & Error States

```typescript
if (isLoading) {
  return <LoadingSpinner />;
}

if (error) {
  return <ErrorAlert error={error.message} />;
}
```

### Step 5: Extract Handlers

```typescript
const handleNextPage = useCallback(() => {
  setCurrentPage((prev) => (prev < pagination.pages ? prev + 1 : prev));
}, [pagination.pages]);
```

### Step 6: Render Data

```typescript
<tbody>
  {vehicles.map(vehicle => (
    <tr key={vehicle.id}>
      <td>{vehicle.name}</td>
      <td>{formatPrice(vehicle.pricePerDay)}</td>
      {/* ... */}
    </tr>
  ))}
</tbody>
```

## Error Handling

All hooks use centralized error handling:

```typescript
import { handleApiError, AppError } from "@/lib/error-handler";

// Errors are automatically mapped to user-friendly messages
if (error) {
  console.error(error.userMessage); // "Unable to fetch vehicles"
  console.error(error.code); // "FETCH_ERROR"
  console.error(error.statusCode); // 500
}
```

## Loading States

Implement loading UI during async operations:

```typescript
<button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="animate-spin" />
      Processing...
    </>
  ) : (
    "Update Status"
  )}
</button>
```

## API Endpoints Used

### Vehicles

- GET `/api/vehicles` - List vehicles (with pagination & filters)
- POST `/api/vehicles` - Create vehicle
- PUT `/api/vehicles/{id}` - Update vehicle
- DELETE `/api/vehicles/{id}` - Delete vehicle

### Bookings

- GET `/api/bookings` - List bookings (with pagination & filters)
- PUT `/api/bookings/{id}/status` - Update booking status
- POST `/api/bookings/{id}/refund` - Process refund

## Next Steps for Admin Pages

1. **VehicleTable Component**
   - Replace mock data with hook
   - Add loading spinner
   - Add error handling
   - Implement pagination navigation

2. **BookingTable Component**
   - Similar pattern to VehicleTable
   - Add status update dropdown
   - Add refund button
   - Add date range filter

3. **Vehicle Create/Edit Page**
   - Use `useAdminUpsertVehicle` hook
   - Build form with validation
   - Handle image upload
   - Show success/error messages

4. **Booking Details Modal**
   - Show booking details
   - Show update status options
   - Show refund form
   - Add payment info

## Best Practices Implemented

✅ **Type Safety** - Full TypeScript support
✅ **Error Handling** - Centralized error mapper
✅ **Loading States** - Built into hooks
✅ **Pagination** - Automatic page calculation
✅ **Filtering** - Flexible filter parameters
✅ **Memoization** - useCallback for handlers
✅ **Separation of Concerns** - Hooks handle data, components handle UI
✅ **Performance** - Proper dependency arrays
✅ **Code Reusability** - Generic hook patterns
