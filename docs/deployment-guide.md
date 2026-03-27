# Deployment Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Access to backend API environment

## Environment Variables

Required:

- `NEXT_PUBLIC_API_URL`: Base URL for backend API
- `NEXT_PUBLIC_API_TIMEOUT`: Request timeout in milliseconds (optional, default 30000)
- `NEXT_PUBLIC_ENABLE_DEBUG`: Set `true` only for debugging (optional)
- `GEMINI_API_KEY`: Required by current project context

Create local env file:

- Copy `.env.example` to `.env.local`
- Fill values for local/dev environments

## Local Development

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Open app:
   - `http://localhost:3000`

## Production Build

1. Install dependencies:
   - `npm ci`
2. Build:
   - `npm run build`
3. Run:
   - `npm run start`

## Deploy Targets

### Vercel (Recommended for Next.js)

1. Connect repository.
2. Configure environment variables in project settings.
3. Set build command: `npm run build`.
4. Set start command: `npm run start` (if needed by target).
5. Deploy and verify public/admin routes.

### Self-Hosted Node Runtime

1. Build with `npm run build`.
2. Run with `npm run start` behind reverse proxy.
3. Configure HTTPS and caching at proxy layer.
4. Ensure backend API is reachable from runtime network.

## Post-Deploy Checklist

- Home, bikes list/detail, booking flow pages load correctly.
- Admin dashboard, vehicles, and bookings pages load and mutate data.
- API errors are handled gracefully in UI.
- Image domains render correctly per `next.config.ts` remote patterns.
- Logs contain no critical runtime exceptions.

## Rollback Strategy

- Keep previous deploy artifact/version ready.
- Roll back immediately if booking or admin mutation paths fail.
- Validate data consistency after rollback.
