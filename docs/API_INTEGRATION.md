# Bike Detail Page - API Integration & ISR Documentation

## Overview

The bike detail page has been refactored to integrate with a real API while maintaining:

- ✅ Full SEO capabilities with dynamic metadata
- ✅ ISR (Incremental Static Regeneration) for performance
- ✅ JSON-LD structured data for rich snippets
- ✅ All original UI/UX features

## Architecture Changes

### 1. **API Integration**

#### Endpoints Used

```
GET /public/vehicles - Fetch list of vehicles for ISR generation
GET /public/vehicles/by-slug/{slug} - Fetch individual bike details
```

#### Base URL Configuration

```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 2. **ISR (Incremental Static Regeneration) Strategy**

**Revalidation Time:** 3600 seconds (1 hour)

#### How it works:

1. **Build Time:** First 50 bikes are pre-rendered as static pages
2. **On-Demand ISR:** When a bike page is accessed that wasn't pre-rendered:
   - Next.js builds it in the background
   - Serves it immediately after generation
   - Next request gets the cached static version
3. **Revalidation:** Every hour, pages are regenerated from fresh API data

#### Benefits:

- **Performance:** Static pages have minimal latency
- **SEO:** Pre-rendered pages are immediately crawlable
- **Scalability:** Only 50 bikes pre-built, unlimited bikes supported
- **Freshness:** Data updates automatically every hour

### 3. **Data Fetching Functions**

#### `fetchBikesForStaticGeneration()`

```typescript
// Fetches bikes for ISR static generation
// Returns first 50 bikes from API
// Handles both direct array and paginated responses
```

#### `fetchBikeBySlug(slug: string)`

```typescript
// Fetches individual bike by slug
// Used in generateMetadata() and main component
// API endpoint: GET /public/vehicles/by-slug/{slug}
```

### 4. **SEO Features Maintained**

#### Dynamic Metadata

- Unique `<title>` per bike
- Dynamic Open Graph images
- Twitter Card support
- Canonical URLs

#### JSON-LD Structured Data

```json
{
  "@type": "Product",
  "name": "Honda Air Blade 2021",
  "brand": { "@type": "Brand", "name": "Honda" },
  "aggregateRating": { "ratingValue": "4.8", "ratingCount": "156" },
  "offers": { "@type": "Offer", "price": "25", "priceCurrency": "USD" }
}
```

#### Breadcrumbs Navigation

- Home → Bikes → {Bike Name}
- Improves internal linking

### 5. **Error Handling**

- **API Unavailable:** Falls back gracefully, returns 404 page
- **Build Time Errors:** Logs warnings, continues with empty bike list
- **Missing Metadata:** Returns generic "Bike Not Found" metadata

### 6. **Related Bikes Section**

Displays bikes from `bike.relatedVehicles` array:

- Should contain 3-5 recommended alternatives
- Maintained from API response
- Falls back gracefully if not provided

## Configuration

### Environment Variables

```bash
# Development (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5001

# Production (set via deployment environment)
NEXT_PUBLIC_API_URL=https://api.vietbike.com
```

### Required API Response Format

```typescript
// GET /public/vehicles/by-slug/{slug}
{
  "data": {
    "id": "v1",
    "slug": "honda-air-blade-2021",
    "name": "Honda Air Blade 2021",
    "brand": "Honda",
    "year": 2021,
    "category": "scooter",
    "type": "automatic",
    "engineSize": "150cc",
    "pricePerDay": 25,
    "image": "https://...",
    "images": ["https://...", "https://..."],
    "description": "...",
    "specs": {
      "fuelCapacity": "7.8L",
      "weight": "133kg",
      "topSpeed": "110km/h"
    },
    "features": ["ABS", "Smart Key", "LED Lighting"],
    "rating": 4.8,
    "reviewCount": 156,
    "relatedVehicles": [
      {
        "id": "v2",
        "slug": "yamaha-exciter-2024",
        "name": "Yamaha Exciter",
        "brand": "Yamaha",
        "pricePerDay": 18,
        "image": "https://..."
      }
    ]
  }
}
```

## Performance Metrics

### Before (Mock Data)

- Build time: Included all vehicles in bundle
- Page load: Fast (client-side only)
- SEO: Good (but static at build time)

### After (API Integration + ISR)

- Build time: ~50 vehicles pre-rendered
- First request: Dynamic, ISR builds if needed
- Subsequent requests: Static, cached
- SEO: Dynamic + ISR = Best of both worlds ✅

## Testing Locally

```bash
# 1. Start the backend API
cd BE
npm run start:dev
# Backend should be running on http://localhost:5001

# 2. Start the frontend dev server
cd FE
npm run dev
# Frontend runs on http://localhost:3000

# 3. Test a bike page
# Visit: http://localhost:3000/bikes/honda-air-blade-2021

# 4. Test API endpoint directly
curl http://localhost:5001/public/vehicles/by-slug/honda-air-blade-2021
```

## Deployment Considerations

### Build Process

```bash
npm run build
# ISR generates static pages for first 50 bikes
# Other bikes are built on-demand

npm run start
# Revalidation happens every hour automatically
```

### Environment Setup

- Ensure `NEXT_PUBLIC_API_URL` is set in your hosting platform
- For Vercel: Add in Project Settings → Environment Variables
- For local Docker: Mount `.env.local` or set via ENV

### Monitoring

- Check ISR revalidation: Set `ISR_REVALIDATE` to shorter interval in development
- Monitor API response times: Slow API = slow page loads
- Log fetch errors: Check server logs for API integration issues

## Future Enhancements

1. **Cache Optimization:** Use `unstable_cache()` for frequently accessed bikes
2. **Database Query Optimization:** Add indexes on `slug` field
3. **Image Optimization:** Use Next.js Image component with ISR
4. **Related Bikes Algorithm:** Implement similar bikes recommendation
5. **Stale-While-Revalidate:** Serve stale data while refreshing in background

## Troubleshooting

### Issue: "Bike Not Found" on new bikes

**Cause:** ISR hasn't built the page yet
**Solution:** Wait 5-10 seconds, then refresh (ISR builds in background)

### Issue: Old data showing after API update

**Cause:** ISR hasn't revalidated yet
**Solution:** Data refreshes on next full hour, or trigger manual revalidation

### Issue: API connection timeout

**Cause:** Backend service not running
**Solution:** Start backend: `cd BE && npm run start:dev`

### Issue: Environment variable not loading

**Cause:** Missing .env.local or wrong variable name
**Solution:** Check `NEXT_PUBLIC_API_URL` is set (public vars need `NEXT_PUBLIC_` prefix)
