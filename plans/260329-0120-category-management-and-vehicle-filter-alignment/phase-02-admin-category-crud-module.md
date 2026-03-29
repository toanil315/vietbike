# Phase 02 - Admin Category CRUD Module

## Overview

Priority: P1  
Status: Completed  
Effort: 8h

Implement dedicated category management page in admin panel with create, edit, delete, and list flows.

## Context Links

- src/components/layout/AdminSidebar.tsx
- src/app/admin/layout.tsx
- src/app/admin/vehicles/page.tsx
- src/components/bikes/CategoryNav.tsx

## Requirements

Functional:

- Add `/admin/categories` route.
- Add category table with pagination-ready structure.
- Add create/edit modal or inline form for category fields (`name`, `description`, `content`).
- Add delete action with confirmation state.
- Revalidate relevant admin paths after mutations.

Non-functional:

- Follow current admin design system (buttons, card, table spacing).
- Keep UI text Vietnamese where admin is already Vietnamese.

## Architecture

- Server actions call category CRUD endpoints.
- Page fetches categories server-side (`cache: no-store`) for admin reliability.
- Client component handles interaction states (dialog open, edit mode, submitting).

Pseudo-flow:

```text
Admin page load -> fetch category list
Create/Edit submit -> server action -> revalidate /admin/categories and /admin/vehicles
Delete submit -> server action -> revalidate same paths
```

## Related Code Files

Create:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/categories/page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/app/admin/categories/actions.ts
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/categories/category-management-page.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/categories/category-table.tsx
- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/admin/categories/category-form-dialog.tsx

Modify:

- /Users/dangcongtoan/Desktop/codes/vietbike/FE/src/components/layout/AdminSidebar.tsx

## Implementation Steps

1. Add new sidebar entry for categories.
2. Build page loader + fetch wrapper for category list.
3. Implement create/update/delete server actions with shared request helper.
4. Build table and form dialog with loading/error states.
5. Add optimistic UI refresh pattern only if mutation UX needs it.

## Todo List

- [x] Add admin categories route and page scaffolding
- [x] Implement category server actions (list/create/update/delete)
- [x] Implement category table UI with edit/delete controls
- [x] Implement category form dialog with validation feedback
- [x] Wire sidebar navigation to /admin/categories

## Success Criteria

- Admin can complete category CRUD without leaving admin panel.
- Mutation errors are surfaced clearly.
- Vehicle pages can consume same category source next phase.

## Risk Assessment

- Risk: Delete category might fail if backend blocks referenced categories.
- Mitigation: Surface backend error and keep entity in table unchanged.

## Security Considerations

- Validate payload shape before sending to server action.
- Prevent accidental destructive action with explicit confirm step.

## Next Steps

- Reuse category list loader in vehicle form phase.
