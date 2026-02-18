# Breeze Site - Features Catalog

Reusable components and features built for Breeze Site clients. Reference this when scoping new projects or presenting capabilities.

---

## Premium Features (Differentiators)

### 1. Dynamic Video Thumbnails
**Built for:** meghanbeier.com
**What it does:** Automatically fetches video thumbnails from any URL (YouTube, Vimeo, or any site with og:image)

**Technical:**
- Next.js API route at `/api/og-image`
- Extracts YouTube video IDs → uses `img.youtube.com/vi/[ID]/hqdefault.jpg`
- Falls back to og:image/twitter:image meta tags
- 24-hour in-memory caching
- Detects embedded YouTube videos in page HTML
- VideoThumbnail component with loading shimmer and graceful fallback

**Client benefit:** Videos display real thumbnails instead of placeholder gradients. No manual image uploads needed.

**Files:**
- `/src/app/api/og-image/route.ts` - API endpoint
- `/src/components/VideoThumbnail.tsx` - React component

**Pitch:** "Your video section will automatically pull thumbnails from YouTube, Vimeo, or any video platform. No manual image uploads needed."

---

### 2. Animation Stack (Apple-level polish)
**Built for:** meghanbeier.com
**What it does:** Scroll-based animations, parallax effects, smooth scrolling

**Components:**
- GSAP + ScrollTrigger - Scroll-based animations, pinning, scrubbing
- Framer Motion - React component animations, transitions
- Lenis - Buttery smooth scrolling
- CSS 3D transforms - Depth effects, perspective, parallax

**Custom components:**
- `ScrollReveal` - Fade-in on scroll
- `DramaticReveal` - Fly-in animations
- `ParallaxHero` - Parallax hero sections
- `FuseBox` - Animated border cards
- `ScrollOrbs` - Floating background orbs
- `AnimatedCounter` - Number count-up animation

**Pitch:** "Apple-level scroll animations and transitions. Your site will feel premium, not template."

---

### 3. Filterable Content Sections
**Built for:** meghanbeier.com (Publications)
**What it does:** Click a tag/category button to filter displayed items

**Technical:**
- React useState for filter state
- Filter buttons with counts
- Clear filter button
- Maintains "View All" expand/collapse

**Pitch:** "Visitors can filter your publications/portfolio/services by category without page reload."

---

### 4. Expand/Collapse Content Sections
**Built for:** meghanbeier.com
**What it does:** "View All X items" button to reveal more content

**Technical:**
- `useState` for expanded state
- Slice array to show first N items
- ExpandButton component with count

**Pitch:** "Keep pages clean but let visitors dive deeper. Show 4 items initially, reveal all 30 with one click."

---

### 5. Timeline/Accordion for History
**Built for:** meghanbeier.com (Invited Talks)
**What it does:** Collapsible year-by-year timeline

**Technical:**
- Grouped data by year
- Click year to expand/collapse
- Visual timeline line on left
- Event count badges

**Pitch:** "Perfect for speaking history, career timeline, or project history. Organized by year, expandable."

---

### 6. Accessibility Widget
**Built for:** meghanbeier.com, included in Breezesite template
**What it does:** Floating toolbar with 8 accessibility controls, giving users real-time control over readability and visual presentation.

**Controls:**
- Text Size (4 levels: Default, Large, XL, XXL)
- High Contrast (invert + hue-rotate, auto-corrects images)
- Dyslexia Font (OpenDyslexic, self-hosted woff2)
- Line Spacing (doubles line-height)
- Letter Spacing (adds 0.12em tracking)
- Highlight Links (outline + underline on all links)
- Pause Animations (kills CSS + GSAP animations)
- Reading Guide (horizontal bar follows cursor Y)
- Reset All (clears localStorage, removes all overrides)

**Technical:**
- Client component with localStorage persistence
- Data attributes on `<html>` drive all overrides via CSS
- CSS variable scoping keeps the widget itself unaffected by its own overrides
- Focus trap + Escape to close, full ARIA (role=dialog, role=switch, aria-expanded)
- Mobile: full-width bottom sheet. Desktop: popup above trigger button
- z-index 9999 (above all content including cursor trails)

**Files:**
- `components/AccessibilityWidget.tsx` - Main component
- `components/accessibility-widget.css` - CSS override rules
- `public/fonts/OpenDyslexic-Regular.woff2` - Self-hosted font

**Pitch:** "Every site ships with a built-in accessibility toolkit. No third-party widget, no monthly fee, no cookie banner. Your visitors control text size, contrast, fonts, and animations. It's a differentiator that shows you care about all users."

---

## Standard Features (Expected)

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Touch-friendly interactions

### SEO Optimization
- Meta descriptions
- Open Graph tags
- Semantic HTML
- Schema markup (where applicable)

### Performance
- Next.js static generation where possible
- Image optimization via next/image
- Code splitting

### CMS Integration
- Decap CMS for content management
- Markdown-based blog posts
- Client-friendly editing

---

## Future Features (Planned)

### Contact Form with Validation
- React Hook Form
- Zod validation
- Email delivery (Resend/SendGrid)

### Blog with Categories/Tags
- MDX support
- Syntax highlighting
- Related posts

### Event Calendar Integration
- Google Calendar embed
- or custom event listing

---

## How to Use This Catalog

**When scoping a new Breeze Site project:**
1. Review this catalog for applicable features
2. Note which premium features add value for this client's niche
3. Include in proposal as differentiators
4. Reference meghanbeier.com as example implementation

**When building:**
1. Copy relevant components from meghanbeier.com
2. Adapt styling to match new client brand
3. Update this catalog if you build something new

---

*Last updated: 2026-02-18*
