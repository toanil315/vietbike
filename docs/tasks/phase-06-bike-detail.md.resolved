# Phase 6: Bike Detail Page (SSG + Dynamic Metadata)

> **Prerequisites**: Phase 5 complete
> **Estimated effort**: Medium
> **Reference**: See `docs/migration-plan.md` for full context
> **Source file**: `src/app/(public)/bikes/[slug]/page.tsx` (259 lines, uses `react-router-dom`, `useState`, `motion`)

## Objective
Convert bike detail page to static generation with `generateStaticParams` for SEO. Each bike gets a pre-rendered HTML page with unique metadata.

## Tasks

### Extract Detail Components

- [ ] **`src/components/bikes/BikeGallery.tsx`**
  - `'use client'` (manages active image state)
  - Props: `images: string[]`, `name: string`
  - Main image + thumbnail grid with click interaction
  - Share/favorite overlay buttons

- [ ] **`src/components/bikes/BikeSpecs.tsx`**
  - Server component (static display)
  - Props: `specs: Vehicle['specs']`, `engineSize: string`
  - 4-column grid: Engine, Fuel, Weight, Top Speed

- [ ] **`src/components/bikes/BikeFeatures.tsx`**
  - Server component (static display)
  - Props: `features: string[]`
  - Renders feature list with checkmark icons

- [ ] **`src/components/bikes/BookingCard.tsx`**
  - `'use client'` (Book Now button uses zustand + router)
  - Props: `bike: Vehicle`
  - Sticky sidebar with: price, rating, pickup location, availability, Book Now CTA, trust badges
  - Uses `useBookingStore` and `useRouter` from `next/navigation`

### Rewrite Page File

- [ ] **Rewrite `src/app/(public)/bikes/[slug]/page.tsx`**:
  - Add `generateStaticParams`:
    ```tsx
    import { VEHICLES } from '@/data/mockData';

    export async function generateStaticParams() {
      return VEHICLES.map((bike) => ({
        slug: bike.slug,
      }));
    }
    ```
  - Add `generateMetadata`:
    ```tsx
    export async function generateMetadata({ params }: Props): Promise<Metadata> {
      const { slug } = await params;
      const bike = VEHICLES.find(v => v.slug === slug);
      if (!bike) return { title: 'Bike Not Found' };
      return {
        title: `Rent ${bike.name} in Vietnam`,
        description: bike.description,
        openGraph: {
          title: `Rent ${bike.name} | VietBike`,
          description: bike.description,
          images: [bike.image],
        },
      };
    }
    ```
  - Server component page that:
    1. Receives `params.slug`
    2. Finds bike from `VEHICLES`
    3. Returns `notFound()` if bike doesn't exist
    4. Renders: Breadcrumbs (server) + BikeGallery + BikeSpecs + BikeFeatures + BookingCard

### Delete Duplicate

- [ ] Delete `src/app/(public)/bikes/[slug]/detail-content.tsx` (old partial Next.js attempt)

## Key Migration Points
- `useParams()` → receive `params` as page component props: `{ params: { slug: string } }`
- `useNavigate()` → `useRouter()` from `next/navigation` (only in client components)
- `<Link to=...>` → `<Link href=...>`
- Unknown slug → call `notFound()` from `next/navigation` to trigger 404

## Acceptance Criteria
- [ ] Each bike URL (e.g., `/bikes/honda-winner-x`) renders a full HTML page
- [ ] `View Source` shows bike name, description, specs in HTML (server-rendered!)
- [ ] Each bike page has unique `<title>` and `<meta description>`
- [ ] `npm run build` output shows all bike pages as statically generated
- [ ] Visiting a non-existent slug shows the 404 page
- [ ] "Book Now" button correctly sets zustand state and navigates to `/booking`
- [ ] Image gallery thumbnail clicks work
- [ ] `detail-content.tsx` is deleted
