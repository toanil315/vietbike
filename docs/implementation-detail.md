# VietBike Frontend - Comprehensive Implementation Detail

**Version**: 1.0  
**Last Updated**: March 2026  
**Technology Stack**: Next.js 15.5, React 19, TypeScript 5.8, Tailwind CSS 4, Zustand  
**Status**: Phase 1 Complete (UI Components), Phase 2 In Progress (API Integration)

---

## 1. ARCHITECTURAL OVERVIEW

### 1.1 Technology Stack

```
Framework:          Next.js 15.5 (App Router)
Language:           TypeScript 5.8 (strict mode)
State Management:   Zustand 5.x (local + booking state)
Styling:            Tailwind CSS 4.x + PostCSS
Form Management:    React Hook Form 7.7 + Zod 4.x validation
HTTP Client:        Native Fetch API (typed with TypeScript)
Data Fetching:      React Query / SWR (for caching)
Icons:              Lucide React 0.546
Charts:            Recharts 3.8
Animation:         Framer Motion 12.38
```

### 1.2 Code Structure

```
FE/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                    # Root layout (metadata, providers)
│   │   ├── globals.css                   # Global Tailwind styles
│   │   ├── robots.ts                     # SEO robots
│   │   ├── sitemap.ts                    # SEO sitemap
│   │   ├── (public)/                     # Public facing routes
│   │   │   ├── layout.tsx                # Public layout (navbar, footer)
│   │   │   ├── page.tsx                  # Homepage
│   │   │   ├── bikes/
│   │   │   │   ├── page.tsx              # Bikes listing page (SSG)
│   │   │   │   ├── bikes-client.tsx      # Client component (filters + API)
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx          # Bike detail page (SSG + ISR)
│   │   │   │   └── bike-detail-client.tsx # Client component (booking CTA)
│   │   │   ├── booking/
│   │   │   │   ├── page.tsx              # Booking form page
│   │   │   │   ├── confirmation/
│   │   │   │   │   └── page.tsx         # Booking confirmation page
│   │   │   │   └── [reference]/
│   │   │   │       └── page.tsx         # Booking status page
│   │   │   └── contact/
│   │   │       └── page.tsx              # Contact form page
│   │   └── admin/                        # Admin dashboard routes
│   │       ├── layout.tsx                # Admin layout (sidebar)
│   │       ├── page.tsx                  # Admin dashboard
│   │       ├── vehicles/
│   │       │   ├── page.tsx              # Vehicle listing (admin)
│   │       │   ├── [id]/
│   │       │   │   └── page.tsx         # Vehicle edit page
│   │       │   └── new/
│   │       │       └── page.tsx         # New vehicle page
│   │       ├── bookings/
│   │       │   ├── page.tsx              # Bookings listing (admin)
│   │       │   ├── [id]/
│   │       │   │   └── page.tsx         # Booking detail (admin)
│   │       │   └── new/
│   │       │       └── page.tsx         # New booking page (admin)
│   │       ├── customers/
│   │       │   ├── page.tsx              # Customers listing
│   │       │   └── [id]/
│   │       │       └── page.tsx         # Customer detail
│   │       ├── finance/
│   │       │   └── page.tsx              # Finance dashboard
│   │       └── vouchers/
│   │           └── page.tsx              # Vouchers management
│   │
│   ├── components/                       # Reusable React components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                # Header navigation
│   │   │   ├── Footer.tsx                # Footer component
│   │   │   ├── Sidebar.tsx               # Admin sidebar
│   │   │   └── Breadcrumb.tsx            # Breadcrumb navigation
│   │   ├── ui/                           # Base UI components (shadcn-style)
│   │   │   ├── Button.tsx                # Button component
│   │   │   ├── InputField.tsx            # Input field wrapper
│   │   │   ├── SelectField.tsx           # Select dropdown
│   │   │   ├── Modal.tsx                 # Modal dialog
│   │   │   ├── Card.tsx                  # Card container
│   │   │   ├── Badge.tsx                 # Badge/Tag component
│   │   │   ├── Skeleton.tsx              # Loading skeleton
│   │   │   ├── Toast/                    # Toast notifications
│   │   │   └── Pagination.tsx            # Pagination controls
│   │   ├── bikes/
│   │   │   ├── BikeCard.tsx              # Single bike display card
│   │   │   ├── BikeGrid.tsx              # Grid/List of bikes
│   │   │   ├── BikeFilterBar.tsx         # Filter controls
│   │   │   ├── BikeFeatures.tsx          # Features display
│   │   │   ├── BikeSpecs.tsx             # Specifications display
│   │   │   ├── BikeGallery.tsx           # Image gallery
│   │   │   └── BookingCard.tsx           # Quick booking card
│   │   ├── booking/
│   │   │   ├── BookingFlow.tsx           # Main booking flow orchestrator
│   │   │   ├── BookingStepper.tsx        # Step indicator
│   │   │   ├── RentalDatePicker.tsx      # Date range picker
│   │   │   ├── LocationSelector.tsx      # Pickup/Dropoff location
│   │   │   ├── AddonsSelector.tsx        # Optional addons (insurance, etc)
│   │   │   ├── CustomerInfoForm.tsx      # Customer details form
│   │   │   ├── PaymentMethodSelector.tsx # Payment method selection
│   │   │   ├── BookingSummary.tsx        # Order summary display
│   │   │   └── BookingConfirmation.tsx   # Confirmation dialog
│   │   ├── admin/
│   │   │   ├── VehicleForm.tsx           # Create/Edit vehicle form
│   │   │   ├── BookingManager.tsx        # Booking CRUD interface
│   │   │   ├── CustomerManager.tsx       # Customer list/detail
│   │   │   ├── VoucherManager.tsx        # Voucher management
│   │   │   ├── FinanceDashboard.tsx      # Financial charts/stats
│   │   │   └── DataTable.tsx             # Reusable data table
│   │   └── home/
│   │       ├── HeroSection.tsx           # Landing hero
│   │       ├── SearchBar.tsx             # Homepage search
│   │       ├── FeaturedBikes.tsx         # Featured bikes carousel
│   │       ├── WhyChooseUs.tsx           # Features section
│   │       └── CTASection.tsx            # Call-to-action
│   │
│   ├── hooks/                            # Custom React hooks
│   │   ├── useMobile.ts                  # Mobile detection
│   │   ├── useVehicles.ts                # 🆕 Vehicle data fetching
│   │   ├── useBooking.ts                 # 🆕 Booking management
│   │   ├── useVouchers.ts                # 🆕 Voucher validation
│   │   ├── useAddons.ts                  # 🆕 Addons fetching
│   │   ├── useLocations.ts               # 🆕 Locations fetching
│   │   ├── useInfiniteQuery.ts           # 🆕 Pagination helper
│   │   └── useLocalStorage.ts            # 🆕 Local storage persistence
│   │
│   ├── lib/                              # Utility functions & helpers
│   │   ├── utils.ts                      # Class name utilities (cn, clsx)
│   │   ├── api.ts                        # 🆕 API client + base methods
│   │   ├── api-endpoints.ts              # 🆕 All API endpoint URLs
│   │   ├── validation.ts                 # 🆕 Zod schemas for forms
│   │   ├── date-utils.ts                 # 🆕 Date calculations
│   │   ├── currency.ts                   # 🆕 Currency formatting
│   │   ├── error-handler.ts              # 🆕 Centralized error handling
│   │   └── constants.ts                  # 🆕 App constants
│   │
│   ├── store/                            # Zustand state management
│   │   ├── bookingStore.ts               # Booking state (current)
│   │   ├── authStore.ts                  # 🆕 Auth state (admin)
│   │   ├── uiStore.ts                    # 🆕 UI state (modals, toast)
│   │   └── cartStore.ts                  # 🆕 Shopping cart (optional)
│   │
│   ├── types/                            # TypeScript type definitions
│   │   └── index.ts                      # All data types (synced with BE)
│   ├── data/                             # Mock/seed data
│   │   ├── mockData.ts                   # Mock vehicles (for fallback)
│   │   ├── mockBookings.ts               # Mock bookings
│   │   └── mockFinance.ts                # Mock finance data
│   ├── middleware.ts                     # 🆕 Next.js middleware
│   └── env.ts                            # 🆕 Environment variables validation
│
├── docs/
│   ├── migration-plan.md                 # (existing)
│   ├── implementation-detail.md          # 🆕 THIS FILE
│   ├── task.md                           # 🆕 Progress tracking
│   └── tasks/
│       └── phase-*.md                    # Phase completion records
│
├── .env.local                            # 🆕 Environment variables
├── .env.example                          # 🆕 Example environment file
├── package.json                          # Dependencies (already set up)
├── tsconfig.json                         # TypeScript config
├── postcss.config.mjs                    # PostCSS config
├── next.config.ts                        # Next.js config
├── tailwind.config.ts                    # Tailwind CSS config
└── README.md
```

---

## 2. API INTEGRATION LAYER

### 2.1 API Client Architecture (`lib/api.ts`)

```typescript
// lib/api.ts - Type-safe HTTP client with automatic error handling

export interface ApiResponse<T = unknown> {
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

class ApiClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Generic methods: GET, POST, PUT, PATCH, DELETE
  async get<T>(url: string, options?: RequestInit): Promise<T>;
  async post<T>(url: string, data: any, options?: RequestInit): Promise<T>;
  async put<T>(url: string, data: any, options?: RequestInit): Promise<T>;
  async patch<T>(url: string, data: any, options?: RequestInit): Promise<T>;
  async delete<T>(url: string, options?: RequestInit): Promise<T>;

  // Built-in error handling, retry logic, type safety
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL);
```

### 2.2 API Endpoints Mapping (`lib/api-endpoints.ts`)

```typescript
// All BE API endpoints documented with request/response types

// Public APIs
export const vehiclesApi = {
  list: "/public/vehicles", // GET - list with filters/pagination
  byId: (id: string) => `/public/vehicles/${id}`,
  bySlug: (slug: string) => `/public/vehicles/slug/${slug}`,
  images: (vehicleId: string) => `/public/vehicles/${vehicleId}/images`,
  features: (vehicleId: string) => `/public/vehicles/${vehicleId}/features`,
};

export const bookingsApi = {
  create: "/public/bookings", // POST
  getByReference: (ref: string) => `/public/bookings/${ref}`,
  getCustomerBookings: "/public/bookings/me",
  updateSettlement: (id: string) => `/public/bookings/${id}/settlement-status`,
};

export const addonsApi = {
  list: "/public/addons",
};

export const locationsApi = {
  list: "/public/locations",
};

export const vouchersApi = {
  validate: "/public/vouchers/validate",
};

// Admin APIs
export const adminApi = {
  auth: {
    login: "/admin/auth/login",
    refresh: "/admin/auth/refresh",
    logout: "/admin/auth/logout",
  },
  vehicles: {
    list: "/admin/vehicles",
    create: "/admin/vehicles",
    update: (id: string) => `/admin/vehicles/${id}`,
    delete: (id: string) => `/admin/vehicles/${id}`,
  },
  // ... more admin endpoints
};
```

### 2.3 Environment Configuration (`.env.local`)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_API_TIMEOUT=30000

# Frontend Configuration
NEXT_PUBLIC_APP_NAME=VietBike
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false
```

---

## 3. DATA FETCHING & STATE MANAGEMENT

### 3.1 Custom Hooks

#### `hooks/useVehicles.ts` - Vehicle List & Filtering

```typescript
interface UseVehiclesOptions {
  page?: number;
  limit?: number;
  type?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
}

export function useVehicles(options: UseVehiclesOptions) {
  // Returns: { data, isLoading, error, mutate, hasMore, loadMore }
  // Uses SWR for caching + pagination support
}

export function useVehicleDetail(slug: string) {
  // Returns: { data, isLoading, error }
  // Includes: full specs, images, features, reviews
}
```

#### `hooks/useBooking.ts` - Booking Operations

```typescript
export function useCreateBooking() {
  // Returns: { mutate, isLoading, error, data }
  // POST /public/bookings with validation
}

export function useBookingByReference(reference: string) {
  // Returns: { data, isLoading, error }
  // GET /public/bookings/:reference
}

export function useCustomerBookings() {
  // Returns: { data, isLoading, error, pagination }
  // GET /public/bookings/me (requires auth)
}
```

### 3.2 Zustand State Management

#### `store/bookingStore.ts` - Current Booking Session

```typescript
// Preserves booking state across navigation
// Syncs with localStorage for persistence
// Resets on successful booking

Tracks: -selectedVehicle -
  rentalDates(start, end) -
  locations(pickup, dropoff) -
  customerInfo -
  selectedAddons -
  paymentMethod -
  voucherCode -
  calculatedPrice;
```

#### `store/authStore.ts` - Admin Authentication

```typescript
// Admin login & token management
// Persists JWT in localStorage
// Auto-refresh on mount
```

---

## 4. VALIDATION & ERROR HANDLING

### 4.1 Form Validation (`lib/validation.ts`)

```typescript
// Zod schemas for client-side validation + type inference

export const vehicleFilterSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["scooter", "sport", "touring"]).optional(),
  category: z.enum(["economy", "comfort", "premium"]).optional(),
  priceMin: z.number().positive().optional(),
  priceMax: z.number().positive().optional(),
});

export const bookingSchema = z.object({
  vehicleId: z.string().uuid(),
  startDate: z.date().min(new Date()),
  endDate: z.date(),
  pickupLocationId: z.string().uuid(),
  dropoffLocationId: z.string().uuid(),
  customerInfo: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[0-9\-\s()]{10,}$/),
    licenseNumber: z.string().min(5),
    nationality: z.string(),
  }),
  addons: z.array(z.string().uuid()).optional(),
  voucherCode: z.string().optional(),
  paymentMethod: z.enum(["cash", "bank_transfer", "credit_card"]),
});
```

### 4.2 Error Handling (`lib/error-handler.ts`)

```typescript
// Centralized error handling with user-friendly messages

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  statusCode?: number;
  timestamp: Date;
}

export function handleApiError(error: unknown): AppError {
  // Parse BE error response
  // Map error codes to user messages
  // Log to monitoring (optional)
}

// Usage in components:
const { mutate, error } = useCreateBooking();
if (error) {
  const appError = handleApiError(error);
  toast.error(appError.message);
}
```

---

## 5. COMPONENT INTEGRATION FLOW

### 5.1 Public Vehicle Browsing

**Flow**: Homepage → Browse Bikes Page → Bike Detail → Booking Flow

```
HomePage
├── HeroSection (static)
├── SearchBar (client) → navigates to /bikes?search=...
└── FeaturedBikes → calls useVehicles(limit: 6)

BikesPage (SSG)
└── BikesClient (client)
    ├── BikeFilterBar (state: filters)
    ├── useVehicles(filters) → API call
    └── BikeGrid
        └── BikeCard
            └── onClick → router.push('/bikes/[slug]')

BikesDetailPage (SSG + ISR)
└── BikeDetailClient (client)
    ├── useVehicleDetail(slug) → API call
    ├── BikeGallery (images from API)
    ├── BikeSpecs (specs from API)
    ├── BikeFeatures (features from API)
    └── BookingCard → onClick → /booking

BookingPage → BookingFlow (existing logic)
```

### 5.2 Booking Management

**Flow**: Create Booking → Confirm → Track Status

```
BookingFlow (Zustand store)
├── Step 1: Vehicle & Dates
│   ├── useVehicles() → selected
│   └── store.setVehicle(), setDates()
├── Step 2: Locations & Addons
│   ├── useLocations() → pickup/dropoff
│   ├── useAddons() → optional services
│   └── store functions for each
├── Step 3: Customer Info
│   └── CustomerInfoForm (React Hook Form)
├── Step 4: Payment
│   └── PaymentMethodSelector + BookingSummary
├── Step 5: Confirmation
│   └── useCreateBooking() → POST /public/bookings
│       └── Success: redirect to /booking/confirmation?ref=...
└── Confirmation Page
    └── useBookingByReference() → display booking status
```

---

## 6. SEO & PERFORMANCE OPTIMIZATION

### 6.1 SEO Strategy

```typescript
// Pages with automatic SEO optimization:

// 1. Bikes Listing Page (dynamic)
BikesPage: generateMetadata({ params, searchParams }) {
  return {
    title: `Browse Motorbikes for Rent | ${searchParams.type || 'All'}`,
    description: 'Find premium motorbike rentals...',
    openGraph: { ... },
    robots: { index: true, follow: true },
  };
}

// 2. Bike Detail Page (dynamic + ISR)
BikesDetailPage: generateMetadata({ params }) {
  const bike = (await fetchVehicleDetail(params.slug)).data;
  return {
    title: `${bike.name} - Rent Now | VietBike`,
    description: bike.description,
    openGraph: {
      images: [bike.images[0]],
    },
  };
}

// 3. Dynamic Sitemap (from BE vehicles list)
GET /sitemap.xml
  └── /bikes/{slug}

// 4. Structured Data (JSON-LD)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Vehicle",
  "name": "Honda SH 150i",
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "VND",
    "price": "500000",
  }
}
</script>
```

### 6.2 Performance Optimization

```typescript
// Image Optimization
<Image
  src={bike.image}
  alt={bike.name}
  width={800}
  height={600}
  priority={index === 0}  // Only first image
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Code Splitting & Lazy Loading
const BikeGallery = dynamic(() => import('@/components/bikes/BikeGallery'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Prefetching & Route Optimization
<Link href={`/bikes/${bike.slug}`} prefetch={true} />

// API Response Caching
- useVehicles: 5-minute SWR cache
- Vehicle detail: 10-minute cache
- Bookings: No cache (fresh always)
```

---

## 7. TYPE SAFETY & CONSISTENCY

### 7.1 Type Synchronization with Backend

```typescript
// FE types MUST match BE API responses

// From BE Swagger documentation:
GET /public/vehicles/slug/{slug}
Response 200:
{
  "status": 200,
  "data": {
    "id": "uuid",
    "slug": "honda-sh-150i",
    "name": "Honda SH 150i",
    "images": [
      { "id": "uuid", "url": "...", "displayOrder": 1 }
    ],
    "features": [
      { "id": "uuid", "name": "ABS" }
    ],
    ...
  }
}

// FE Type Definition:
export interface VehicleDetail {
  id: string;
  slug: string;
  name: string;
  images: Array<{ id: string; url: string; displayOrder: number }>;
  features: Array<{ id: string; name: string }>;
  ...
}
```

### 7.2 Strict TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true
  }
}
```

**Result**: Zero `any` types, 100% type coverage

---

## 8. TESTING STRATEGY

### 8.1 Unit Tests (components)

```typescript
// components/bikes/BikeCard.test.tsx
describe("BikeCard", () => {
  it("renders bike information from props", () => {});
  it("calls onClick handler when booking button clicked", () => {});
  it("displays loading state while fetching", () => {});
});
```

### 8.2 Integration Tests (hooks)

```typescript
// hooks/useVehicles.test.ts
describe("useVehicles", () => {
  it("fetches vehicles from API and returns data", async () => {});
  it("handles filtering query parameters", async () => {});
  it("handles pagination", async () => {});
});
```

### 8.3 E2E Tests (user journeys)

```typescript
// e2e/booking.spec.ts
describe("Booking Flow", () => {
  it("User can browse, select, and book a vehicle", async () => {
    // 1. Visit bikes page
    // 2. Filter vehicles
    // 3. Click vehicle detail
    // 4. Fill booking form
    // 5. Submit
    // 6. See confirmation
  });
});
```

---

## 9. DEPLOYMENT & ENVIRONMENT MANAGEMENT

### 9.1 Build Optimization

```bash
# Production build
npm run build
  → Generates .next/ folder
  → Optimizes images
  → Tree-shaking unused code
  → ~2-3MB bundle size (gzipped)

# Start production server
npm start
```

### 9.2 Environment Variables

```bash
# Development
NEXT_PUBLIC_API_URL=http://localhost:5001

# Production
NEXT_PUBLIC_API_URL=https://api.vietbike.com
```

---

## 10. DEVELOPMENT WORKFLOW

### 10.1 Adding a New Feature

1. **Define Types** (`types/index.ts`)
2. **Create API Endpoint** (`lib/api-endpoints.ts`)
3. **Create Hook** (`hooks/use*.ts`)
4. **Create Component** (`components/*/`)
5. **Add Page/Route** (`app/**/page.tsx`)
6. **Test & Verify**
7. **Update task.md**

### 10.2 Debugging

```bash
# Enable debug mode
NEXT_PUBLIC_ENABLE_DEBUG=true npm run dev

# Browser DevTools
- React DevTools (Zustand, component hierarchy)
- Network tab (API calls)
- Application tab (localStorage)

# Logs
console.log('API Response:', response);
```

---

## 11. KNOWN ISSUES & OPTIMIZATION OPPORTUNITIES

- [ ] Add request debouncing for filter changes
- [ ] Implement image lazy-loading for bike galleries
- [ ] Add loading skeletons for better UX
- [ ] Implement infinite scroll for vehicle listing
- [ ] Add client-side caching layer
- [ ] Optimize bundle size (code splitting)
- [ ] Add service worker for offline support
- [ ] Implement analytics (GA4)

---

## 12. FUTURE ENHANCEMENTS

- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Advanced booking calendar
- [ ] Real-time availability tracking
- [ ] Payment gateway integration (credit card)
- [ ] Review/rating system
- [ ] Loyalty program
- [ ] Mobile app (React Native)

---

## INTEGRATION CHECKLIST

- [ ] Environment variables configured (`.env.local`)
- [ ] API client created (`lib/api.ts`)
- [ ] Type definitions updated (`types/index.ts`)
- [ ] Validation schemas created (`lib/validation.ts`)
- [ ] Custom hooks created (`hooks/*.ts`)
- [ ] Vehicle listing page integrated
- [ ] Vehicle detail page integrated
- [ ] Booking creation flow integrated
- [ ] Booking status tracking integrated
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] All pages type-safe (0 `any`)
- [ ] SEO metadata updated
- [ ] Build passes without errors
- [ ] Manual testing completed
- [ ] User can browse, filter, and book bikes
