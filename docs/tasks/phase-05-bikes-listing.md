# Phase 5: Bikes Listing Page Migration

> **Prerequisites**: Phase 3 (layouts) + Phase 4 (BikeCard component) complete
> **Estimated effort**: Medium
> **Reference**: See `docs/migration-plan.md` for full context
> **Source file**: `src/app/(public)/bikes/page.tsx` (321 lines, uses `react-router-dom`, `useState`, `useMemo`, `motion`)

## Objective
Convert the bikes listing page to a Next.js page with server-rendered metadata and client-side filtering.

## Tasks

### Extract Filter Components

- [ ] **`src/components/bikes/BikeFilterBar.tsx`**
  - `'use client'` (all interactive)
  - Props: All filter state and setters as props, OR manage state internally
  - Contains: City select, Type select, Price range slider, Brand select, Transmission toggle, Sort select
  - Can reuse `Select` and `ToggleGroup` from `src/components/ui/` if available

- [ ] **`src/components/bikes/BikeGrid.tsx`**
  - `'use client'` (uses motion animations, view mode toggle)
  - Props: `bikes: Vehicle[]`, `viewMode: 'grid' | 'list'`
  - Renders the grid/list of `BikeCard` components
  - Contains: view mode toggle buttons, results count, bike cards

### Create Client Wrapper

- [ ] **`src/app/(public)/bikes/bikes-client.tsx`**
  - `'use client'`
  - Contains ALL the interactive state (search, filters, sorting, view mode)
  - Imports and composes `BikeFilterBar` + `BikeGrid`
  - Contains the `useMemo` filter logic
  - Contains empty state when no results

### Update Page File

- [ ] **Rewrite `src/app/(public)/bikes/page.tsx`**:
  - **Server component** (no `'use client'`)
  - Add metadata:
    ```tsx
    export const metadata: Metadata = {
      title: 'Browse Motorbikes for Rent in Vietnam',
      description: 'Find your perfect ride from our curated fleet of premium motorbikes. Filter by city, type, price. Available in Hanoi, Da Nang, Ho Chi Minh City.',
    };
    ```
  - Renders breadcrumbs (server-rendered) + heading + `<BikesClient />`

### Delete Duplicate

- [ ] Delete `src/app/(public)/bikes/page-content.tsx` (old partial Next.js attempt)

## Import Replacements in All Files
| Before | After |
|--------|-------|
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `<Link to={...}>` | `<Link href={...}>` |

## Acceptance Criteria
- [ ] Bikes listing renders with all filters working
- [ ] Grid and List view modes work
- [ ] Page source shows server-rendered heading and breadcrumbs
- [ ] Page has correct `<title>` and `<meta description>`
- [ ] `page-content.tsx` is deleted
- [ ] `npm run build` succeeds
