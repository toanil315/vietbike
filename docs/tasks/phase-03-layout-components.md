# Phase 3: Layout Components Migration

> **Prerequisites**: Phase 1 complete
> **Estimated effort**: Small
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Migrate all layout components and layout files from `react-router-dom` to Next.js equivalents.

## Tasks

### Layout Components

- [ ] **`src/components/layout/Navbar.tsx`**:
  - Add `'use client'` directive (uses interactive state for mobile menu, active link detection)
  - Replace `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
  - Replace `useLocation()` → `usePathname()` from `next/navigation`
  - Replace all `<Link to="...">` → `<Link href="...">`
  - Keep all existing styles and functionality

- [ ] **`src/components/layout/Footer.tsx`**:
  - Replace `import { Link } from 'react-router-dom'` → `import Link from 'next/link'`
  - Replace all `<Link to="...">` → `<Link href="...">`
  - Check if it uses any hooks — if not, keep as server component (no `'use client'`)

- [ ] **`src/components/layout/AdminSidebar.tsx`**:
  - Add `'use client'` directive (uses active link detection)
  - Replace `import { Link, useLocation } from 'react-router-dom'` → `import Link from 'next/link'` + `import { usePathname } from 'next/navigation'`
  - Replace all `<Link to="...">` → `<Link href="...">`
  - Replace `useLocation().pathname` → `usePathname()`

- [ ] **`src/components/layout/AdminHeader.tsx`**:
  - Add `'use client'` directive if it uses hooks
  - Replace `useLocation` → `usePathname` from `next/navigation`
  - Replace any `react-router-dom` imports

### Layout Files

- [ ] **`src/app/(public)/layout.tsx`**:
  - Remove `import { Outlet } from 'react-router-dom'`
  - Replace `<Outlet />` with `{children}` (should already receive `children` as prop)
  - Keep Navbar and Footer imports
  - This should be a **server component** (no `'use client'`)

- [ ] **`src/app/admin/layout.tsx`**:
  - Remove `import { Outlet } from 'react-router-dom'`
  - Replace `<Outlet />` with `{children}`
  - Keep AdminSidebar and AdminHeader imports
  - This should be a **server component**

## Import Replacement Quick Reference
| Before | After |
|--------|-------|
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `import { useLocation } from 'react-router-dom'` | `import { usePathname } from 'next/navigation'` |
| `<Link to="/path">` | `<Link href="/path">` |
| `useLocation().pathname` | `usePathname()` |
| `<Outlet />` | `{children}` |

## Acceptance Criteria
- [ ] No `react-router-dom` imports remain in any layout component
- [ ] No `<Outlet />` usage remains
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run dev` starts, and layouts render correctly
