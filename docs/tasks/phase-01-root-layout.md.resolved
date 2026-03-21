# Phase 1: Root Layout & Global Styles

> **Prerequisites**: Phase 0 complete
> **Estimated effort**: Small
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Set up the root Next.js layout with fonts, metadata, and unified global CSS.

## Tasks

- [ ] Update `src/app/layout.tsx`:
  - Import `Inter` from `next/font/google`
  - Set `<html lang="vi">` (Vietnamese site)
  - Add comprehensive default metadata:
    ```tsx
    export const metadata: Metadata = {
      title: {
        default: 'VietBike - Premium Motorbike Rentals in Vietnam',
        template: '%s | VietBike',
      },
      description: 'Premium bike rental & booking web application for exploring Vietnam on two wheels.',
      openGraph: {
        type: 'website',
        locale: 'vi_VN',
        siteName: 'VietBike',
      },
    };
    ```
  - Import `./globals.css`
  - Body should use `inter.className`

- [ ] Merge `src/index.css` into `src/app/globals.css`:
  - Ensure `@import "tailwindcss"` is at the top
  - Copy all custom CSS variables, utility classes, and custom styles from `index.css`
  - Make sure all existing TailwindCSS theme customizations are preserved

- [ ] Delete `src/index.css` (merged into globals.css)

- [ ] Create `src/app/not-found.tsx`:
  - Simple 404 page with "Page not found" message
  - Link back to homepage using `next/link`
  - Match the existing design aesthetic (dark bg, rounded corners, primary color CTA)

## Acceptance Criteria
- [ ] `npm run dev` starts without errors
- [ ] Root layout renders with Inter font
- [ ] Page source shows `<html lang="vi">`
- [ ] 404 page renders at any invalid URL
- [ ] All CSS from old `index.css` is available in the app
