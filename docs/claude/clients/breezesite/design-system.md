# Breeze Site - Design System & Reusable Patterns

Design options, color palettes, font pairings, and component patterns available for Breeze Site client builds. Reference this when starting a new project to avoid template sameness.

---

## Color Palettes

### 1. Forest Awakening (Warm Organic)
**Built for:** WildHer PT prototype
**Vibe:** Sun-dappled forest clearing. Grounding, alive, nature-forward.

| Role | Hex | Usage |
|------|-----|-------|
| Deep Forest (primary) | `#1B3A2D` | Headers, dark sections, footer bg |
| Forest mid | `#2D5A45` | Hover states, secondary text on dark |
| Sage (secondary) | `#8BAF9E` | Badges, subtle accents, dividers |
| Light Sage | `#C5D9CE` | Card borders, light accents |
| Warm Amber (accent) | `#D4943A` | CTAs, icons, highlights |
| Terracotta | `#C2704E` | Gradient pair with amber, warmth |
| Cream (background) | `#FAF6F0` | Page backgrounds |
| Warm White | `#FFFDF9` | Card backgrounds, hero overlay |
| Parchment | `#F0E8DC` | Section alternating bg |
| Charcoal (text) | `#1E1E1E` | Body text |
| Warm Gray | `#6B6560` | Secondary body text |

**Gradient system:** Amber-to-terracotta (`#D4943A` to `#C2704E`) for buttons, borders, eyebrow labels, accent text.

**Best for:** Health/wellness, therapy, yoga, nature-connected brands.

---

### 2. Academic Warmth (Soft Professional)
**Built for:** meghanbeier.com
**Vibe:** Clean, scholarly, approachable.

| Role | Hex | Usage |
|------|-----|-------|
| Primary | oklch values in globals.css | Headers, CTAs |
| Background | White/light gray | Page bg |
| Accent | Warm tones | Highlights, badges |

**Best for:** Academic professionals, consultants, therapists.

---

### 3. Slate Corporate (template default)
**Vibe:** Neutral, safe, professional.

**Best for:** Starting point when no brand direction exists yet.

---

## Font Pairings

### 1. Fraunces + Libre Franklin
**Used in:** WildHer PT
**Display:** Fraunces (variable, with WONK + SOFT + opsz axes)
**Body:** Libre Franklin (clean humanist sans)
**Character:** Organic, warm, handcrafted feel. Fraunces has optical sizing that makes it feel alive at any scale. Nobody else in pelvic PT (or most niches) uses it.
**Setup:**
```tsx
const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
})
const libreFranklin = Libre_Franklin({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})
```
**Best for:** Wellness, organic brands, anything that should feel warm and human.

### 2. Clash Display + DM Sans
**Character:** Bold, modern, tech-forward.
**Best for:** Startups, agencies, SaaS.

### 3. Playfair Display + Lora
**Character:** Editorial, luxury, serif-on-serif.
**Best for:** Law firms, high-end services, editorial sites.

### 4. Space Grotesk + Karla
**Character:** Technical, developer-friendly.
**Best for:** Developer tools, tech companies.

### 5. Satoshi + Plus Jakarta Sans
**Character:** Friendly, approachable, rounded.
**Best for:** Education, coaching, community orgs.

### 6. Bricolage Grotesque + Figtree
**Character:** Contemporary, fresh.
**Best for:** Creative agencies, modern brands.

---

## Component Patterns

### Hero Variants

#### Full-Viewport Parallax Hero (WildHer)
- Background image with manual parallax (requestAnimationFrame scroll listener)
- Dark gradient overlay (bottom-heavy for text readability)
- Character-by-character text reveal on headline
- Gradient word highlight (e.g., "wild" in amber-to-terracotta)
- Dual CTAs: primary gradient button + outlined secondary
- Scroll indicator chevron at bottom
- `text-shadow` on subheadline for readability over images

**Files:** `components/WildHerHero.tsx`, `components/TextReveal.tsx`

#### Centered Gradient Hero (meghanbeier.com)
- Gradient/solid background
- Centered text with scroll reveal
- Single CTA

---

### Navigation

#### Transparent-to-Solid Header (WildHer)
- Starts transparent over hero image
- Becomes cream/white with shadow on scroll (threshold ~50px)
- Logo swaps between light/dark variants based on scroll state
- Full-screen mobile overlay with framer-motion AnimatePresence
- Staggered nav link animations on mobile open

**File:** `components/Header.tsx` (WildHer version)

---

### Section Dividers

#### Organic Wave Divider (WildHer)
- SVG wave path as section transition
- Configurable colors via props
- Replaces hard straight-line section breaks with organic feel

**File:** `components/OrganicDivider.tsx`

---

### Pricing Tables

#### 3-Tier with Gradient Highlight (WildHer)
- 3 cards: basic | featured (elevated) | secondary
- Featured card: gradient border wrapper (`bg-gradient-to-br from-[#D4943A] to-[#C2704E]` with 2px padding, inner white div)
- "Most Popular" badge
- Checkmark feature lists
- Hover lift + shadow

**Pattern:** Wrapper div with gradient bg + padding, inner card with `rounded-[calc(1rem-2px)]`

---

### FAQ/Accordion

#### Card-Style Accordion (WildHer)
- Individual rounded cards per item (not connected list)
- Sage border (`border-[#C5D9CE]/50`)
- Fraunces headings on triggers
- Amber chevron indicators (`[&>svg]:text-[#D4943A]`)
- Open-state shadow effect

**File:** `components/FAQSection.tsx` (WildHer version)

---

### Footer

#### Dark Section Footer (WildHer)
- Deep color background (e.g., `#1B3A2D`)
- Organic wave divider as top transition
- Light logo variant
- 3-column layout: brand story | quick links | contact info
- Trust badges (Safe Space Alliance, etc.)

---

## Animation Patterns

All animation components live in WildHer prototype (`wyattsolutions/wildher-prototype`) and can be copied into any Breeze build.

| Component | What it does | Dependency |
|-----------|-------------|------------|
| `SmoothScroll.tsx` | Lenis smooth scroll provider | `@studio-freight/lenis` |
| `ScrollReveal.tsx` | Fade/slide in on scroll (IntersectionObserver) | None |
| `StaggerContainer.tsx` + `StaggerItem.tsx` | Stagger children reveal on scroll | `framer-motion` |
| `TextReveal.tsx` | Character-by-character text animation | None (CSS transitions) |
| `ParallaxImage.tsx` | Scroll-linked image parallax | None (rAF) |
| `MagneticButton.tsx` | Magnetic hover effect on CTA | None |
| `DramaticReveal.tsx` | 3D fly-in reveal on scroll | `framer-motion` |
| `OrganicDivider.tsx` | SVG wave section divider | None |

**Reduced motion:** All components respect `prefers-reduced-motion` media query.

---

## CSS Utilities (from WildHer)

```css
/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #D4943A, #C2704E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gradient button */
.btn-gradient {
  background: linear-gradient(135deg, #D4943A, #C2704E);
  color: #fff;
}
.btn-gradient:hover {
  background: linear-gradient(135deg, #B87D2E, #A85C3D);
  box-shadow: 0 8px 24px rgba(212, 148, 58, 0.3);
}

/* Eyebrow gradient label */
.eyebrow-gradient {
  background: linear-gradient(135deg, #D4943A, #C2704E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gradient left border */
.border-l-gradient {
  border-left: 4px solid transparent;
  border-image: linear-gradient(to bottom, #D4943A, #C2704E) 1;
}

/* Film grain overlay */
.film-grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence noise */
  opacity: 0.015;
  pointer-events: none;
  z-index: 9999;
}
```

Swap the hex values to match any palette. The patterns (gradient text, gradient borders, film grain) work with any color scheme.

---

## How to Use This

**Starting a new Breeze build:**
1. Pick a color palette (or create a new one based on client brand)
2. Pick a font pairing
3. Pick component patterns that fit the client's needs
4. Copy animation components from WildHer prototype as needed
5. Adapt CSS utilities to the chosen palette
6. Update this doc if you build something new

**Source repos:**
- WildHer prototype: `wyattsolutions/wildher-prototype`
- meghanbeier.com: `wyattsolutions/meghan-beier` (or wherever it lives)
- Breeze template: `wyattsolutions/breeze-site-template`

---

*Last updated: 2026-02-18*
