# Phase 0: Project Initialization & Config

> **Prerequisites**: None (this is the first phase)
> **Estimated effort**: Small
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Set up Next.js project skeleton, update all config files, and remove Vite-specific files.

## Tasks

- [ ] Create `next.config.ts` with the following:
  - `images.remotePatterns` for `picsum.photos` (used for placeholder images)
  - Any env variable forwarding needed (e.g., `GEMINI_API_KEY`)

- [ ] Create `postcss.config.mjs` for TailwindCSS v4:
  ```js
  const config = {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  export default config;
  ```

- [ ] Update `package.json`:
  - Remove from dependencies: `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `react-router-dom`
  - Remove from devDependencies: `vite`
  - Add to dependencies: `next@15`
  - Add to devDependencies: `@tailwindcss/postcss`
  - Update scripts:
    ```json
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
    ```
  - Remove old scripts: `preview`, `clean`

- [ ] Update `tsconfig.json`:
  - Ensure `"jsx": "preserve"`
  - Ensure `"module": "esnext"`, `"moduleResolution": "bundler"`
  - Ensure Next.js plugin is present: `"plugins": [{ "name": "next" }]`
  - Ensure paths: `"@/*": ["./src/*"]`
  - Ensure include has: `"next-env.d.ts"`, `"**/*.ts"`, `"**/*.tsx"`, `".next/types/**/*.ts"`

- [ ] Update `.gitignore` — Add these if not present:
  ```
  .next/
  .env.local
  out/
  ```

- [ ] Create `.env.local` from `.env.example` (copy and rename, keep same values)

- [ ] Delete these files:
  - `vite.config.ts`
  - `index.html`
  - `src/main.tsx`
  - `src/App.tsx` (will be replaced by Next.js App Router)

- [ ] Run `npm install` to install new dependencies

## Acceptance Criteria
- [ ] `npx tsc --noEmit` passes (may have import errors from deleted files — that's OK for now)
- [ ] `next.config.ts` exists and is valid
- [ ] `postcss.config.mjs` exists
- [ ] Vite files (`vite.config.ts`, `index.html`, `src/main.tsx`) are deleted
- [ ] `package.json` has correct dependencies and scripts
