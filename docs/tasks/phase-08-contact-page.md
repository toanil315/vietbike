# Phase 8: Contact Page Migration

> **Prerequisites**: Phase 3 (layouts) complete
> **Estimated effort**: Small
> **Reference**: See `docs/migration-plan.md` for full context
> **Source**: Contact JSX was inline in `App.tsx` (lines 31-58), and `src/app/(public)/contact/contact-content.tsx` (34 lines)

## Objective
Create a proper, SEO-optimized contact page as a server component.

## Tasks

- [ ] **Rewrite `src/app/(public)/contact/page.tsx`**:
  - **Server component** (the form is a simple HTML form, no client state needed for now)
  - Add metadata:
    ```tsx
    export const metadata: Metadata = {
      title: 'Contact Us',
      description: 'Get in touch with VietBike. Hanoi office location, support hours, and contact form for bike rental inquiries.',
    };
    ```
  - Move the contact page content directly into this file (it's only ~30 lines of JSX)
  - Content includes:
    - Page heading: "Contact VietBike"
    - Subtitle: "Have questions? We're here to help you plan your perfect ride."
    - Two info cards: Hanoi Office (address + phone) and Support Hours
    - Contact form: name input, message textarea, send button
  - Make form button `type="submit"` (no client handler needed yet)
  - Use semantic HTML: `<form>`, `<label>`, appropriate `<input>` types

- [ ] **Delete `src/app/(public)/contact/contact-content.tsx`** (content merged into page.tsx)

## Acceptance Criteria
- [ ] `/contact` route renders the contact page
- [ ] Page source shows all contact info server-rendered in HTML
- [ ] Page has unique `<title>` "Contact Us | VietBike"
- [ ] Page has proper `<meta description>`
- [ ] `contact-content.tsx` is deleted
- [ ] `npm run build` succeeds
