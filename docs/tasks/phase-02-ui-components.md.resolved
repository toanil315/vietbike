# Phase 2: UI Component Library Extraction

> **Prerequisites**: Phase 1 complete
> **Estimated effort**: Medium (1–2 tasks)
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Extract reusable UI primitives from page files into `src/components/ui/`. These will be used across all pages during subsequent phases.

## Tasks

Create each component in `src/components/ui/` with proper TypeScript interfaces:

- [ ] **`Button.tsx`** — Reusable button/link component
  - Props: `variant` ('primary' | 'secondary' | 'ghost' | 'outline'), `size` ('sm' | 'md' | 'lg'), `children`, `icon?`, `href?`, `onClick?`, `className?`, `disabled?`, `type?`
  - If `href` is provided, render as `<Link>` from `next/link`; otherwise render as `<button>`
  - Extract styles from existing buttons across pages (primary CTA, secondary, ghost styles)
  - Mark as `'use client'` only if it has onClick handler logic

- [ ] **`Badge.tsx`** — Category/status badges
  - Props: `variant` ('category' | 'status'), `status?` ('available' | 'rented' | 'maintenance' | 'unavailable' | 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'), `children`, `className?`
  - Extract the `bg-emerald-100 text-emerald-700` etc. status color mapping from admin pages
  - Server component (no interactivity)

- [ ] **`Card.tsx`** — Generic card wrapper
  - Props: `className?`, `children`, `as?` (element type, default 'div')
  - Base styles: `bg-white rounded-3xl border border-outline-variant/10 shadow-sm`
  - Server component

- [ ] **`Select.tsx`** — Styled select dropdown
  - Props: `label?`, `options: { value: string, label: string }[]`, `value`, `onChange`, `className?`
  - Extract the labeled select pattern used in filter bars (label + select + chevron icon)
  - `'use client'` (interactive)

- [ ] **`Input.tsx`** — Styled text input
  - Props: `label?`, `type?`, `icon?` (Lucide icon component), `placeholder?`, `value`, `onChange`, `className?`, `readOnly?`
  - Extract the labeled input pattern from booking/admin forms
  - `'use client'` (interactive)

- [ ] **`Breadcrumbs.tsx`** — Navigation breadcrumbs
  - Props: `items: { label: string, href?: string }[]`
  - Uses `<Link>` from `next/link` for items with `href`
  - Last item renders as plain text (current page)
  - Uses `ChevronRight` icon separator from lucide-react
  - Server component

- [ ] **`Pagination.tsx`** — Page navigation
  - Props: `currentPage`, `totalPages`, `onPageChange`
  - Extract the pagination UI from bikes listing and admin vehicles page
  - `'use client'` (interactive)

- [ ] **`ToggleGroup.tsx`** — Two-option toggle (e.g., Auto/Manual)
  - Props: `options: { value: string, label: string }[]`, `value`, `onChange`
  - Extract from bikes filter bar (Auto/Manual transmission toggle)
  - `'use client'` (interactive)

- [ ] **`EmptyState.tsx`** — Empty results placeholder
  - Props: `icon?` (Lucide component), `title`, `description`, `action?` ({ label: string, onClick: () => void })
  - Extract from bikes page "No motorbikes found" and admin empty states
  - `'use client'` only if `action.onClick` is needed

- [ ] **`SectionHeading.tsx`** — Admin form section header
  - Props: `icon` (Lucide component), `title`, `subtitle?`
  - Extract the icon + title + section number pattern from admin vehicle form
  - Server component

## Design Notes
- All components should use the existing Tailwind classes from the codebase (e.g., `bg-primary`, `text-secondary`, `rounded-xl`, `transition-default`, etc.)
- Use `cn()` from `@/lib/utils` for conditional class merging
- Export each component as default export from its file
- Keep components focused — one component per file, one responsibility

## Acceptance Criteria
- [ ] All 10 component files exist in `src/components/ui/`
- [ ] Each component has a TypeScript interface for its props
- [ ] `npx tsc --noEmit` passes
- [ ] Components correctly use `'use client'` directive only when needed
