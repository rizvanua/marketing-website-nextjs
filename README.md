# Guesty Marketing Website

A Next.js marketing website built with TypeScript, Material UI, and mock CMS data. Demonstrates best practices for marketing sites with SEO, tracking, and CMS-driven content.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Running Tests

```bash
npm test
npm run test:watch  # Watch mode
```

## 📁 Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with header/footer
├── page.tsx           # Homepage (ISR)
├── features/          # Features page (ISR)
├── contact/           # Contact page (SSG)
└── ThemeRegistry.tsx  # MUI theme provider

components/
├── blocks/            # CMS block renderers
│   ├── HeroBlock/
│   │   ├── index.tsx
│   │   └── HeroBlock.spec.tsx
│   ├── FeatureGridBlock.tsx
│   ├── TestimonialBlock.tsx
│   ├── CtaBannerBlock.tsx
│   ├── BlockRenderer/
│   │   ├── index.tsx
│   │   ├── BlockRenderer.spec.tsx
│   │   └── BlockSkeleton.tsx  # Skeleton loading states
│   └── TrackedButton/
│       ├── index.tsx
│       └── TrackedButton.spec.tsx
├── Header/
│   ├── index.tsx
│   └── Header.spec.tsx
├── Footer/
│   ├── index.tsx
│   └── Footer.spec.tsx
├── LayoutWrapper.tsx
└── PageViewTracker.tsx

lib/
├── mockCms.ts         # Mock CMS data & types
└── tracking/
    ├── index.ts
    └── tracking.spec.ts
```

## 🏗️ Key Architectural Decisions

### CMS-Driven Architecture

All content is driven by mock CMS data (`lib/mockCms.ts`), separating content from presentation and making it easy to swap for a real headless CMS.

### Block-Based Rendering

The `BlockRenderer` component dynamically renders CMS blocks (Hero, FeatureGrid, Testimonial, CtaBanner) based on their type, with graceful handling of unknown block types.

### Hero Block Features

- Supports optional banner image (`bannerImage` prop) with Next.js Image optimization
- Responsive design with mobile-first approach
- Uses Next.js Image component for automatic image optimization

### Component Reuse

- `BlockRenderer` used on Homepage and Features page
- `TrackedButton` used in HeroBlock and CtaBannerBlock
- `PageViewTracker` used on all pages
- Header/Footer used globally via LayoutWrapper

## 🔄 Rendering Strategy

- **Homepage (`/`)** - ISR with 60s revalidation
- **Features (`/features`)** - ISR with 60s revalidation
- **Contact (`/contact`)** - SSG (static generation)

ISR provides a balance between performance and content freshness. SSG is used for rarely-changing content.

## 🔍 SEO & Accessibility

- Dynamic metadata from CMS data via `generateMetadata()`
- Semantic HTML (`<main>`, `<section>`, proper headings)
- Keyboard navigation support
- MUI components include built-in accessibility features
- Custom favicon (SVG icon) for brand consistency

## ⏳ Loading States

Skeleton loading states are implemented for better UX during data fetching:
- `BlockRendererSkeleton` - Used on homepage with Hero, FeatureGrid, and Testimonial skeletons
- `FeatureGridSkeleton` & `CtaBannerSkeleton` - Used on features page
- All skeletons use MUI's Skeleton component with appropriate styling and responsive design

## 📊 Tracking & Analytics

The tracking system (`lib/tracking/index.ts`) currently logs to console. It's structured to easily integrate with:

- **Google Tag Manager**: Push to `window.dataLayer`
- **Google Analytics 4**: Call `window.gtag()`
- **Mixpanel**: Use `mixpanel.track()`

UTM parameters (utm_source, utm_medium, utm_campaign) are automatically extracted from URLs and included in all tracking events.

## 🔌 Integration with Real CMS

### WordPress (Headless)

Replace `fetchCmsData()` in `lib/mockCms.ts`:

```typescript
export async function fetchCmsData(): Promise<CmsSiteData> {
  const baseUrl = process.env.WORDPRESS_API_URL;
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/pages`);
  return transformWordPressData(await response.json());
}
```

### GraphQL

```typescript
export async function fetchCmsData(): Promise<CmsSiteData> {
  const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '...' }),
  });
  return transformGraphQLResponse(await response.json());
}
```

## 🎨 UI Library: Material UI

MUI provides accessibility, responsive design, and theming out of the box. Theme is configured in `app/ThemeRegistry.tsx`.

## 🚀 Future Improvements

- Cookie-based UTM persistence
- Open Graph and Twitter Card metadata
- Structured data (JSON-LD)
- Error boundaries
- E2E testing with Playwright/Cypress
- Internationalization support
- Improve mobile version navigation menu

## 🧪 Testing

Unit tests are located alongside their components using the `.spec.tsx` naming convention:
- `components/blocks/HeroBlock/HeroBlock.spec.tsx`
- `components/blocks/BlockRenderer/BlockRenderer.spec.tsx`
- `components/blocks/TrackedButton/TrackedButton.spec.tsx`
- `components/Header/Header.spec.tsx`
- `components/Footer/Footer.spec.tsx`
- `lib/tracking/tracking.spec.ts`

Run tests with `npm test` or `npm run test:watch` for watch mode.

## 📝 Notes

- Content is server-rendered and visible without JavaScript
- Client components are only used where interactivity is needed (tracking, navigation)
- The project follows Next.js 13+ App Router conventions
