# AI Automation Agency Website

A premium, production-ready SaaS website for an AI automation agency. Built with Next.js 16, React 19, and modern web technologies to deliver enterprise-grade AI solutions for business automation.

## Features

### Core Capabilities
- **Dynamic Content Management**: All content stored in configuration files (`/config`) for easy updates without code changes
- **Multiple Service Pages**: 6 AI services with dedicated detail pages (Customer Support, Document Processing, Workflow Automation, Predictive Analytics, RPA, Custom AI)
- **Industry Verticals**: 6 vertical market solutions (Financial, Healthcare, E-commerce, Manufacturing, Insurance, Legal)
- **Case Studies**: Dynamic case study pages showcasing real client results and ROI metrics
- **Blog System**: Full blog with categories, dates, and reading time estimates
- **Pricing Tiers**: 3-tier pricing structure with feature comparison and popular badges

### User Experience
- **Command Palette**: Global search with Cmd+K shortcut to navigate services, industries, blog posts, and pages
- **Dark/Light Mode**: Complete theme support with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **Smooth Animations**: Framer Motion scroll-triggered animations throughout the site
- **Accessibility**: Full WCAG AA compliance with semantic HTML and ARIA labels

### Business Features
- **Contact Forms**: Multi-field contact form with validation and email integration ready
- **Booking System**: Consultation booking with time slot selection
- **Admin Dashboard**: Simple admin interface for managing content
- **Testimonials**: Client testimonials with ratings and trust indicators
- **FAQ Section**: Expandable FAQ with smooth animations

### SEO & Performance
- **Sitemap Generation**: Auto-generated sitemap.ts with all dynamic routes
- **Robots.txt**: Proper indexing and crawl rules
- **Structured Data**: JSON-LD schema markup for local business and services
- **Image Optimization**: Lazy loading image component for performance
- **TypeScript**: Full type safety across the application

## Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **Runtime**: Node.js with React 19.2
- **Styling**: Tailwind CSS v4 with oklch color space
- **Database**: Ready for integration (Neon, Supabase, etc.)
- **UI Components**: shadcn/ui with customized theme
- **Animations**: Framer Motion
- **Theme Management**: next-themes for dark mode
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
├── app/                           # Next.js app directory
│   ├── page.tsx                   # Homepage with all sections
│   ├── layout.tsx                 # Root layout with theme provider
│   ├── globals.css                # Global styles and theme variables
│   ├── sitemap.ts                 # Dynamic sitemap generation
│   ├── services/[slug]/page.tsx   # Dynamic service detail pages
│   ├── industries/[slug]/page.tsx # Dynamic industry detail pages
│   ├── case-studies/[slug]/page.tsx # Case study pages
│   ├── blog/page.tsx              # Blog listing page
│   ├── blog/[slug]/page.tsx       # Blog post detail page
│   ├── contact/page.tsx           # Contact form page
│   ├── pricing/page.tsx           # Pricing page
│   ├── book-consultation/page.tsx # Booking page
│   └── admin/page.tsx             # Admin dashboard
│
├── components/
│   ├── header.tsx                 # Navigation header with theme toggle
│   ├── footer.tsx                 # Footer with links and contact info
│   ├── command-palette.tsx        # Cmd+K command palette
│   ├── theme-provider.tsx         # Next-themes wrapper
│   ├── optimized-image.tsx        # Lazy loading image component
│   └── sections/                  # Homepage sections
│       ├── hero.tsx               # Hero section with animations
│       ├── services.tsx           # Services showcase
│       ├── industries.tsx         # Industry verticals
│       ├── testimonials.tsx       # Client testimonials
│       ├── pricing.tsx            # Pricing table
│       ├── faq.tsx                # FAQ accordion
│       └── cta.tsx                # Call-to-action
│
├── config/                        # Content configuration
│   ├── site.ts                    # Site metadata and navigation
│   ├── services.ts                # Service offerings
│   ├── industries.ts              # Industry solutions
│   ├── pricing.ts                 # Pricing tiers
│   ├── faq.ts                     # FAQ content
│   ├── case-studies.ts            # Case studies data
│   └── blog.ts                    # Blog posts data
│
├── lib/
│   ├── utils.ts                   # shadcn/ui utilities (cn function)
│   ├── utils-custom.ts            # Custom utilities
│   ├── seo.ts                     # SEO utilities and metadata generation
│
├── types/
│   └── index.ts                   # TypeScript type definitions
│
├── public/
│   └── robots.txt                 # Search engine crawl rules
│
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── tailwind.config.ts             # Tailwind CSS configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone and install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   pnpm dev
   ```
   Visit `http://localhost:3000` to see the site.

3. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## Configuration

### Updating Site Content

All content is centralized in `/config` for easy management:

#### Services (`config/services.ts`)
Add or modify AI services. Each service appears on the homepage and gets a dedicated detail page:
```typescript
export const services = [
  {
    slug: 'customer-support',
    title: 'AI Customer Support',
    description: 'Automated support with 24/7 availability',
    benefits: ['24/7 availability', 'Instant responses'],
    // ... more fields
  },
  // Add more services
]
```

#### Industries (`config/industries.ts`)
Define vertical market solutions:
```typescript
export const industries = [
  {
    slug: 'financial',
    title: 'Financial Services',
    challenges: ['Regulatory compliance', 'Fraud detection'],
    // ... more fields
  },
  // Add more industries
]
```

#### Pricing (`config/pricing.ts`)
Configure pricing tiers:
```typescript
export const pricingPlans = [
  {
    name: 'Starter',
    price: 2999,
    description: 'Perfect for small businesses',
    features: ['Up to 10,000 API calls', 'Email support'],
    popular: false,
  },
  // Add more plans
]
```

#### Blog Posts (`config/blog.ts`)
Add blog content:
```typescript
export const blogPosts = [
  {
    slug: 'ai-automation-benefits',
    title: 'The Benefits of AI Automation',
    excerpt: 'Learn how AI can transform your business',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'AI & Automation',
    content: '...', // Markdown or HTML
  },
  // Add more posts
]
```

#### Case Studies (`config/case-studies.ts`)
Showcase client successes:
```typescript
export const caseStudies = [
  {
    slug: 'fintech-automation',
    title: 'FinTech Achieves 80% Cost Reduction',
    client: 'FinServe Inc',
    industry: 'Financial Services',
    results: ['80% cost reduction', '40% faster processing'],
    // ... more fields
  },
  // Add more case studies
]
```

### Theme Customization

Edit `/app/globals.css` to customize colors. The site uses oklch color space for better color consistency:

```css
:root {
  --primary: oklch(0.35 0.15 264);      /* Primary brand color */
  --secondary: oklch(0.45 0.12 264);    /* Secondary color */
  --accent: oklch(0.52 0.2 264);        /* Accent color */
  /* ... more color variables */
}
```

### Site Metadata

Update `/config/site.ts` for general site settings:
```typescript
export const siteConfig = {
  siteName: 'AI Automation Agency',
  siteDescription: 'Enterprise AI automation solutions...',
  siteUrl: 'https://ai-automation.agency',
  email: 'hello@agency.com',
  phone: '+1-800-AUTOMATE',
  // ... more settings
}
```

## Key Components

### Hero Section
Animated hero with gradient text, badges, and dual CTAs. Configured in `/components/sections/hero.tsx`.

### Services Section
6-card grid showcasing core AI services with icons and descriptions. Links to individual service detail pages.

### Command Palette
Global search (Cmd+K) for quick navigation across services, industries, blog posts, and pages. Fully keyboard accessible.

### Testimonials
Auto-scrolling testimonials with ratings and company logos. Includes smooth Framer Motion animations.

### Dynamic Pages
All service, industry, case study, and blog pages are auto-generated from configuration. Adding new entries automatically creates pages.

## Deployment

### Vercel Deployment (Recommended)

The site is optimized for Vercel deployment:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Deploy with one click

3. **Environment Variables**
   Add in Vercel dashboard under Project Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Performance Targets
- **Lighthouse Score**: 95+
- **Core Web Vitals**: All green (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- **Time to Interactive**: < 3s

## Adding New Content

### Add a New Service
1. Update `/config/services.ts` - add service object
2. Service detail page auto-generates at `/services/[slug]`
3. Service appears on homepage and in command palette

### Add a Blog Post
1. Update `/config/blog.ts` - add post object
2. Blog page auto-generates at `/blog/[slug]`
3. Post appears in blog listing with date and category

### Add a Case Study
1. Update `/config/case-studies.ts` - add case study object
2. Case study page auto-generates at `/case-studies/[slug]`
3. Appears in portfolio/case studies section

## SEO

The site includes:
- Auto-generated sitemap at `/sitemap.xml`
- `robots.txt` for search engine crawling
- JSON-LD structured data for local business
- Open Graph meta tags for social sharing
- Dynamic metadata generation for all pages

Search engines will automatically discover and index:
- Homepage
- 6 service pages
- 6 industry pages
- All blog posts
- All case studies
- Contact, pricing, and booking pages

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance Tips

1. **Images**: Use the `OptimizedImage` component for lazy loading
2. **Animations**: Framer Motion animations only trigger on scroll to save CPU
3. **Code Splitting**: All routes are automatically code-split by Next.js
4. **Caching**: Static pages are cached; dynamic pages use ISR (Incremental Static Regeneration)

## Contributing

To extend the site:

1. Create a new branch: `git checkout -b feature/new-feature`
2. Make your changes
3. Test locally: `pnpm dev`
4. Build for production: `pnpm build`
5. Commit and push: `git push origin feature/new-feature`
6. Create a pull request

## Customization Examples

### Change Primary Color
Edit `/app/globals.css`:
```css
--primary: oklch(0.52 0.2 264); /* Change the hue value (264) */
```

### Add Navigation Link
Edit `/config/site.ts` → `navLinks` array

### Modify Pricing
Edit `/config/pricing.ts` → update `pricingPlans`

### Create Custom Section
Create new component in `/components/sections/` and import in `/app/page.tsx`

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Port Already in Use
```bash
# Use different port
pnpm dev -- -p 3001
```

### Theme Not Switching
Ensure `suppressHydrationWarning` is on `<html>` tag in `app/layout.tsx`

## License

MIT License - feel free to use this project as a template for your own AI agency website.

## Support

For issues or questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the [Tailwind CSS docs](https://tailwindcss.com)
3. Consult [shadcn/ui components](https://ui.shadcn.com)

---

**Built with Next.js 16, React 19, and Tailwind CSS** ✨

Ready for production deployment and scaling to handle thousands of visitors.
