# Phase 4: Homepage Decomposition & Migration

> **Prerequisites**: Phase 2 (UI components) + Phase 3 (layouts) complete
> **Estimated effort**: Medium
> **Reference**: See `docs/migration-plan.md` for full context
> **Source file**: `src/app/(public)/page.tsx` (353 lines, currently uses `react-router-dom` and `motion/react`)

## Objective
Break the monolithic 353-line homepage into 5 focused section components, add per-page SEO metadata.

## Tasks

### Create Section Components

- [ ] **`src/components/home/HeroSection.tsx`** (~95 lines)
  - `'use client'` (uses `motion` animations)
  - Contains: hero image, animated badge, h1 title, subtitle, CTA buttons
  - Replace `<Link>` from `react-router-dom` → `next/link`
  - Replace `to=` → `href=`

- [ ] **`src/components/home/SearchBar.tsx`** (~55 lines)
  - `'use client'` (interactive select elements)
  - Contains: location selector, date picker, bike type selector, search button
  - Replace `<Link>` → `next/link`

- [ ] **`src/components/home/FeaturedBikes.tsx`** (~60 lines)
  - `'use client'` (uses `motion` `whileInView` animations)
  - Imports `VEHICLES` from `@/data/mockData`
  - Should use `BikeCard` from `@/components/bikes/BikeCard.tsx` (create if not yet available, or inline a simple version)
  - Replace `<Link>` → `next/link`

- [ ] **`src/components/home/WhyChooseUs.tsx`** (~65 lines)
  - **Server component** (static content, no interactivity)
  - Contains: "Why Choose VeloRent?" section with feature list and image
  - No router imports needed

- [ ] **`src/components/home/CTASection.tsx`** (~30 lines)
  - **Server component** (static content)
  - Contains: CTA banner with "Ready to start your Vietnamese journey?"
  - Replace `<Link>` → `next/link`

### Update Homepage Page File

- [ ] **Rewrite `src/app/(public)/page.tsx`**:
  - Remove all inline JSX (353 lines → ~30 lines)
  - Import all 5 section components
  - Add page-specific metadata:
    ```tsx
    import { Metadata } from 'next';

    export const metadata: Metadata = {
      title: 'VietBike - Premium Motorbike Rentals in Vietnam',
      description: 'Explore Vietnam on two wheels. Premium motorbike rentals in Hanoi, Da Nang, Ho Chi Minh City. Scooters, sport bikes, and touring bikes available.',
      openGraph: {
        title: 'VietBike - Premium Motorbike Rentals in Vietnam',
        description: 'Explore Vietnam on two wheels with our premium motorbike fleet.',
        type: 'website',
      },
    };

    export default function HomePage() {
      return (
        <div className="bg-surface-container/30 min-h-screen">
          <HeroSection />
          <SearchBar />
          <FeaturedBikes />
          <WhyChooseUs />
          <CTASection />
        </div>
      );
    }
    ```
  - This page file should be a **server component** (no `'use client'`)

### Shared Component (if not done in Phase 2)

- [ ] **`src/components/bikes/BikeCard.tsx`** — Extract the bike card used in FeaturedBikes
  - `'use client'` if using motion animations
  - Props: `bike: Vehicle`, `index?: number` (for staggered animation)
  - Shows: image, category badge, name, rating, location, price, arrow
  - Used on homepage AND bikes listing page

## Acceptance Criteria
- [ ] Homepage renders identically to the current design
- [ ] `View Source` shows server-rendered HTML for WhyChooseUs and CTASection
- [ ] Each section is in its own file under `src/components/home/`
- [ ] `src/app/(public)/page.tsx` is ~30 lines (just imports + composition)
- [ ] Page has correct `<title>` and `<meta description>` tags (check in browser dev tools)
- [ ] `npm run build` succeeds
