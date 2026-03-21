# Phase 11: SEO Enhancements

> **Prerequisites**: Phase 10 complete (clean, working Next.js app)
> **Estimated effort**: Medium
> **Reference**: See `docs/migration-plan.md` for full context

## Objective
Add advanced SEO features that Next.js enables: sitemap, robots.txt, OG images, structured data, and image optimization.

## Tasks

### Sitemap

- [ ] **Create `src/app/sitemap.ts`**:
  ```tsx
  import { MetadataRoute } from 'next';
  import { VEHICLES } from '@/data/mockData';

  export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vietbike.vn'; // Update with actual domain

    const bikePages = VEHICLES.map((bike) => ({
      url: `${baseUrl}/bikes/${bike.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [
      { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
      { url: `${baseUrl}/bikes`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      ...bikePages,
    ];
  }
  ```

### Robots.txt

- [ ] **Create `src/app/robots.ts`**:
  ```tsx
  import { MetadataRoute } from 'next';

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/booking/'],
        },
      ],
      sitemap: 'https://vietbike.vn/sitemap.xml',
    };
  }
  ```

### Structured Data (JSON-LD)

- [ ] **Add JSON-LD to bike detail pages** (`src/app/(public)/bikes/[slug]/page.tsx`):
  - Add a `<script type="application/ld+json">` with `Product` schema:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Honda Winner X",
      "description": "...",
      "image": "...",
      "offers": {
        "@type": "Offer",
        "price": "45",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "42"
      }
    }
    ```

### Image Optimization

- [ ] **Replace `<img>` with `<Image>` from `next/image`** across all pages:
  - Homepage hero image
  - Featured bikes images
  - Bike listing cards
  - Bike detail gallery
  - Booking summary vehicle image
  - Admin vehicle table thumbnails
  - Admin booking drawer images

- [ ] **Configure `next.config.ts`** for external images:
  ```tsx
  const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'picsum.photos' },
        // Add any other image domains used
      ],
    },
  };
  ```

- [ ] **Set priority loading** for above-fold images:
  - Hero image: `priority={true}`
  - First bike card image on homepage: `priority={true}`

### Semantic HTML Audit

- [ ] Verify proper use of semantic elements across all pages:
  - `<header>` in Navbar
  - `<nav>` for navigation and breadcrumbs
  - `<main>` wrapping page content (in layouts)
  - `<footer>` in Footer
  - `<article>` for bike detail content
  - `<section>` for page sections
  - `<aside>` for sidebar filters and booking summary

## Acceptance Criteria
- [ ] `/sitemap.xml` returns valid XML with all public routes
- [ ] `/robots.txt` returns proper directives (blocks `/admin/` and `/booking/`)
- [ ] Bike detail pages have valid JSON-LD structured data
- [ ] All images use `<Image>` from `next/image`
- [ ] `npm run build` succeeds with no image-related warnings
- [ ] Lighthouse SEO score is 90+
