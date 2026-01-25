# Breeze Template Audit

**Date:** 2026-01-22
**Status:** More complete than expected, but needs production hardening

---

## What's Working

### Build & Deploy
- [x] Next.js 16 build succeeds
- [x] Static site generation works
- [x] 13 routes generated successfully
- [x] Vercel deployment exists (see .vercel folder)

### Content System
- [x] Markdown + gray-matter content parsing
- [x] Global settings (site_name, phone, email, address, social)
- [x] Homepage with hero, intro, featured services
- [x] Generic pages (About, Contact)
- [x] Condition/service pages with structured content
- [x] Blog posts with date sorting
- [x] Resources section

### Components
- [x] Header with mobile responsive Sheet menu
- [x] Footer with contact info and social links
- [x] Hero section with image support
- [x] CardGrid for listings
- [x] FAQSection with accordion
- [x] CTABlock (inline and full-width variants)
- [x] PageHeader for consistent inner pages
- [x] FadeIn animation with Intersection Observer

### SEO & Schema
- [x] LocalBusiness schema (auto-generated)
- [x] FAQPage schema on condition pages
- [x] BlogPosting schema
- [x] Website schema
- [x] Breadcrumb schema utility (not yet used)
- [x] Meta title/description on all pages
- [x] Open Graph tags on blog posts

### shadcn/ui Components
- [x] accordion
- [x] button
- [x] card
- [x] input
- [x] label
- [x] navigation-menu
- [x] sheet
- [x] textarea

### Styling
- [x] CSS custom properties for theming
- [x] oklch color space (modern)
- [x] Dark mode support (CSS ready)
- [x] Tailwind v4 setup

### CMS
- [x] Decap CMS config complete
- [x] All content types defined
- [x] Editorial workflow enabled
- [x] Admin interface at /admin

---

## What's Missing

### Critical for Tier 1

1. **No contact form**
   - Contact page is just markdown
   - Needs: Form component with Name, Email, Phone, Message
   - Needs: Form submission handler (email, webhook, or service)

2. **Brand swap is manual**
   - Colors use oklch values directly in globals.css
   - Need: Client-specific config file or .env for brand colors
   - Plan idea: Single config.ts with brand colors, logo path

3. **No sitemap.xml**
   - Next.js can auto-generate
   - Add: next-sitemap package or generateSitemap function

4. **No robots.txt**
   - Add to public/ folder

5. **Sample content needs stripping**
   - WildHer PT content throughout
   - Need: Placeholder content or clear "REPLACE ME" markers

### Important for Production

6. **No loading states**
   - No Suspense boundaries
   - No skeleton loaders
   - Could cause CLS issues

7. **No custom 404 page**
   - Uses Next.js default
   - Need: Branded not-found.tsx

8. **No favicon system**
   - Need: Favicon, apple-touch-icon, OG image defaults

9. **Editorial workflow untested**
   - CMS config has publish_mode: editorial_workflow
   - Need: Test PR → preview → merge → live cycle

10. **No image optimization guidance**
    - No max dimensions documented
    - No compression guidance for CMS uploads

### Nice to Have (Later)

11. **No accessibility audit**
    - shadcn/ui has good defaults
    - Need: Full WCAG AA audit for Premium tier

12. **No analytics integration**
    - No GA4/Plausible placeholder

13. **No dark mode toggle**
    - CSS supports dark mode but no UI to switch

14. **No blog pagination**
    - Blog index shows all posts
    - Fine for small blogs, needs pagination at scale

15. **No related posts**
    - Blog posts have no related content suggestions

---

## Premium Tier Upgrade: Animation Stack

For clients wanting a $2M build feel (higher price point), add the premium animation stack from BourbonBuddy:

### Dependencies
```bash
npm install gsap @studio-freight/lenis framer-motion
```

### What It Adds
| Feature | Tech | Effect |
|---------|------|--------|
| Buttery smooth scroll | Lenis | 60fps scrolling, premium feel |
| Parallax backgrounds | GSAP ScrollTrigger | Depth and motion on scroll |
| Staggered reveals | Framer Motion | Cards/sections animate in sequence |
| Glassmorphism | CSS | Frosted glass cards with gradient borders |
| Floating particles | GSAP | Ambient gold/brand-color particles |
| 3D reveals | CSS transforms + GSAP | Elements rotate into view on scroll |
| Film grain | SVG overlay | Subtle texture, high-end aesthetic |

### Reference Files
- **Patterns:** `~/.claude/skills/web-design-mastery/references/premium-animations.md`
- **Example:** `wyattsolutions/bourbonbuddy` (live: bourbonbuddy.vercel.app)

### Implementation
1. Copy `SmoothScroll.tsx` and `FloatingParticles.tsx` from bourbonbuddy
2. Wrap layout in `<SmoothScroll>`
3. Add GSAP ScrollTrigger to hero/section components
4. Apply glassmorphism classes to cards
5. Add grain overlay to layout

### Pricing Implication
This upgrades a Tier 1 ($3K) or Tier 2 ($5K) site to Tier 3 ($10K) territory. Use for:
- High-end service businesses
- Luxury/premium brands
- Clients specifically requesting "modern" or "impressive" sites

---

## Test Results

```
npm run build: PASS (1.4s compile, 275ms static gen)
Routes generated: 13
TypeScript: No errors
```

---

## Next Steps (Priority Order)

1. [ ] Add contact form component + submission handler
2. [ ] Create brand config system (single file for colors/logo)
3. [ ] Add sitemap.xml and robots.txt
4. [ ] Create not-found.tsx with branded design
5. [ ] Strip WildHer content, add placeholder markers
6. [ ] Add favicon/OG image system
7. [ ] Test full CMS editorial workflow
8. [ ] Document image requirements for clients
9. [ ] Build meghanbeier.com as first real test
