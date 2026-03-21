# Phase 10: Cleanup & Duplicate Removal

> **Prerequisites**: Phases 4–9 all complete
> **Estimated effort**: Small
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Remove all deprecated files, verify no react-router-dom usage remains, and ensure the project is clean.

## Tasks

### Delete Deprecated Files

- [ ] Verify and delete (if not already deleted in previous phases):
  - `src/App.tsx` (Vite router entry)
  - `src/main.tsx` (Vite entry point)
  - `index.html` (Vite HTML template)
  - `vite.config.ts` (Vite configuration)
  - `src/app/(public)/bikes/page-content.tsx`
  - `src/app/(public)/bikes/[slug]/detail-content.tsx`
  - `src/app/(public)/booking/booking-content.tsx`
  - `src/app/(public)/booking/confirmation/confirmation-content.tsx`
  - `src/app/(public)/contact/contact-content.tsx`
  - `src/app/admin/dashboard-content.tsx`

### Verify No react-router-dom Usage

- [ ] Run search across entire codebase:
  ```bash
  grep -r "react-router-dom" src/
  ```
  Should return **zero results**

- [ ] Run search for old `<Link to=` pattern:
  ```bash
  grep -r 'to="/' src/ --include="*.tsx" --include="*.ts"
  ```
  Should return **zero results** (all should be `href=` now)

- [ ] Run search for `useNavigate`:
  ```bash
  grep -r "useNavigate" src/
  ```
  Should return **zero results** (all should be `useRouter` now)

- [ ] Run search for `Outlet`:
  ```bash
  grep -r "Outlet" src/
  ```
  Should return **zero results**

### Remove react-router-dom Dependency

- [ ] Verify `react-router-dom` is removed from `package.json`
- [ ] Run `npm install` to clean up `node_modules`

### Final Build Verification

- [ ] Run `npx tsc --noEmit` — should pass with zero errors
- [ ] Run `npm run build` — should succeed
- [ ] Run `npm run dev` — verify app starts

## Acceptance Criteria
- [ ] No deprecated files exist
- [ ] Zero `react-router-dom` references in codebase
- [ ] `package.json` does not list `react-router-dom`
- [ ] `npm run build` passes cleanly
- [ ] App runs correctly with `npm run dev`
