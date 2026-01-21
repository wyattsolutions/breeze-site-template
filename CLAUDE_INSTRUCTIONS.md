# Breeze Site Template — Build Instructions for Claude Code

## Overview

This is a productized website system for service-based business clients. They pay for initial design/build, then can edit content themselves via CMS. Ongoing development and enhancements are handled via Claude Code.

## Core Principles

- **Client controls content** (via CMS), **developer controls structure and code**
- SEO best practices baked into templates (heading hierarchy, schema, meta tags)
- No external services for animations/interactions — everything is code Claude can write and modify
- Two editing tracks: client self-service (CMS) and Claude-powered development (code)

## The Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **shadcn/ui** (component library — we own the code)
- **Tailwind animations + CSS transitions** (no Framer Motion dependency)
- **Decap CMS** (formerly Netlify CMS) for git-based content editing
- **GitHub** for version control
- **Vercel** for hosting + preview deploys

## Client Workflow

1. Client logs into `/admin` on their site
2. Edits content (new pages, existing pages, site settings)
3. Saves as draft → creates a GitHub PR → Vercel builds a preview URL
4. Client reviews preview, clicks publish → merges to main → live
5. For design/code changes: client requests → developer uses Claude Code → PR → preview → live

---

## Content Types

### 1. Global Settings (`content/settings/global.md`)

```yaml
---
site_name: "WildHer PT"
tagline: "Expert pelvic floor therapy in Columbia, MD"
phone: "410-555-1234"
email: "emily@wildherpt.com"
address: "Columbia, MD"
social:
  instagram: "https://instagram.com/wildherpt"
  facebook: "https://facebook.com/wildherpt"
  linkedin: ""
footer_text: "© 2025 WildHer PT. All rights reserved."
---
```

### 2. Homepage (`content/pages/home.md`)

```yaml
---
hero_headline: "Pelvic Floor Physical Therapy in Columbia, MD"
hero_subheadline: "Expert care for your body, on your terms."
hero_cta_text: "Book a Consultation"
hero_cta_link: "/contact"
hero_image: "/images/hero.jpg"
intro_heading: "Compassionate, Evidence-Based Care"
intro_body: "I help women recover from pelvic pain, postpartum issues, and orthopedic conditions..."
featured_services:
  - title: "Pelvic Floor Therapy"
    link: "/conditions"
    description: "Treatment for incontinence, pelvic pain, and more"
  - title: "Postpartum Rehab"
    link: "/conditions/postpartum"
    description: "Recover strength and function after pregnancy"
seo_title: "Pelvic Floor Physical Therapy Columbia MD | WildHer PT"
seo_description: "Expert pelvic floor physical therapy in Columbia, Maryland. Treating incontinence, pelvic pain, postpartum recovery, and more."
---
```

### 3. Pages (`content/pages/`)

For About, Contact, Services overview, etc.

```yaml
---
title: "About Emily"
slug: "about"
seo_description: "Meet Emily Selby, pelvic floor physical therapist in Columbia, MD."
cta_text: "Ready to get started?"
cta_link: "/contact"
---

Your markdown body content here...
```

### 4. Condition/Service Pages (`content/conditions/`)

```yaml
---
title: "Urinary Urgency & Frequency"
slug: "urinary-urgency-frequency"
parent_category: "pelvic"
seo_description: "Treatment for urinary urgency and frequency in Columbia, MD. Expert pelvic floor physical therapy."
overview: "Urinary urgency is the sudden, strong need to urinate that can be difficult to control..."
who_it_affects: "This commonly affects postpartum women, perimenopausal women, athletes, and those with chronic stress..."
treatment_approach: "I use a combination of manual therapy, behavioral strategies, and targeted exercises..."
faqs:
  - question: "How long does treatment take?"
    answer: "Most patients see improvement within 4-6 sessions, though this varies by individual."
  - question: "Do I need a referral?"
    answer: "No, Maryland allows direct access to physical therapy without a physician referral."
  - question: "Is this covered by insurance?"
    answer: "I am an out-of-network provider. I provide superbills for insurance reimbursement."
cta_text: "Ready to find relief?"
cta_link: "/contact"
---
```

### 5. Blog Posts (`content/blog/`)

```yaml
---
title: "5 Myths About Pelvic Floor Physical Therapy"
slug: "pelvic-floor-myths"
date: "2025-01-15"
author: "Emily Selby"
excerpt: "There are a lot of misconceptions about pelvic floor PT. Let's clear them up."
featured_image: "/images/blog/myths.jpg"
seo_description: "Common myths about pelvic floor physical therapy debunked by a Columbia, MD specialist."
---

Your markdown body content here...
```

### 6. Resources/Tools (`content/resources/`) — Optional

```yaml
---
title: "Theragun Mini"
slug: "theragun-mini"
description: "A portable percussion massager I recommend for home use between sessions."
link: "https://amazon.com/..."
affiliate: true
category: "tools"
---
```

---

## Template Requirements

- **Heading hierarchy enforced:** H1 → H2 → H3 (client can't break it)
- **Meta title/description:** Auto-generated from content fields
- **Schema markup:** Auto-generated (LocalBusiness, FAQPage, BlogPosting)
- **Alt text fields:** Required for all images
- **Open Graph / social sharing tags:** Auto-generated
- **Responsive:** Mobile-first by default
- **Accessible:** shadcn/ui handles this

---

## Component Library

### shadcn/ui Components (install these)
- Button
- Card
- Accordion (for FAQs)
- Navigation Menu
- Sheet (mobile menu)
- Input, Textarea, Label (for contact forms)

### Custom Components to Build
- `Header.tsx` — nav, mobile menu, contact info
- `Footer.tsx` — contact info, links, social icons
- `Hero.tsx` — configurable hero section with H1, subheadline, CTA, image
- `CTABlock.tsx` — reusable call-to-action (multiple styles: inline, full-width)
- `FAQSection.tsx` — accordion FAQs, auto-generates FAQ schema
- `CardGrid.tsx` — for services, conditions, resources
- `BlogCard.tsx` — blog post preview card
- `SEOHead.tsx` — meta tags, schema, OG tags
- `PageHeader.tsx` — consistent H1 + intro for inner pages

### Animations (Tailwind-based, no external deps)
- Fade in on load
- Slide up on scroll (Intersection Observer)
- Hover transitions on cards/buttons
- Smooth accordion open/close

---

## Project Structure

```
breeze-site-template/
├── app/
│   ├── layout.tsx                    # Root layout with Header/Footer
│   ├── page.tsx                      # Homepage
│   ├── [slug]/page.tsx               # Generic pages (about, contact, etc.)
│   ├── conditions/
│   │   └── [slug]/page.tsx           # Condition detail pages
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/page.tsx           # Blog post pages
│   └── resources/
│       └── page.tsx                  # Resources page
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── CTABlock.tsx
│   ├── FAQSection.tsx
│   ├── CardGrid.tsx
│   ├── BlogCard.tsx
│   ├── SEOHead.tsx
│   ├── PageHeader.tsx
│   └── animations/
│       └── FadeIn.tsx                # Scroll-triggered animations
├── content/
│   ├── settings/
│   │   └── global.md
│   ├── pages/
│   │   ├── home.md
│   │   ├── about.md
│   │   └── contact.md
│   ├── conditions/
│   │   ├── urinary-urgency.md
│   │   └── pelvic-pain.md
│   ├── blog/
│   │   └── sample-post.md
│   └── resources/
│       └── sample-resource.md
├── lib/
│   ├── content.ts                    # Content fetching utilities (gray-matter, fs)
│   ├── schema.ts                     # JSON-LD schema generators
│   ├── utils.ts                      # General utilities
│   └── types.ts                      # TypeScript types for content
├── public/
│   ├── admin/
│   │   ├── index.html                # Decap CMS entry point
│   │   └── config.yml                # Decap CMS configuration
│   └── images/
│       └── placeholder.jpg
├── styles/
│   └── globals.css                   # Tailwind imports + custom styles
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md                         # Setup instructions for new clients
```

---

## Decap CMS Configuration

The `public/admin/config.yml` should define:

1. **Backend:** GitHub (with branch: `main`)
2. **Media folder:** `public/images`
3. **Collections:**
   - Settings (global, homepage)
   - Pages
   - Conditions
   - Blog
   - Resources

Each collection should have:
- Proper field types (string, text, markdown, image, list, object)
- Required vs optional fields
- Sensible defaults
- Preview paths

---

## Schema Generation

Create utilities in `lib/schema.ts` for:

### LocalBusiness Schema
```typescript
export function generateLocalBusinessSchema(settings: GlobalSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings.site_name,
    "telephone": settings.phone,
    "email": settings.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": settings.address
    }
    // ... etc
  }
}
```

### FAQPage Schema
```typescript
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
```

### BlogPosting Schema
```typescript
export function generateBlogPostSchema(post: BlogPost, settings: GlobalSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    }
    // ... etc
  }
}
```

---

## Setup Instructions for New Client Sites

1. Clone this template repo
2. Rename to `client-[name]`
3. Update `content/settings/global.md` with client info
4. Update `public/admin/config.yml` with correct GitHub repo
5. Customize Tailwind colors in `tailwind.config.ts`
6. Deploy to Vercel
7. Connect custom domain
8. Give client access to `/admin`

---

## First Client: WildHer PT

- **Business:** Pelvic floor physical therapy
- **Location:** Columbia, MD
- **Owner:** Emily Selby
- **Content types needed:** Conditions (pelvic + orthopedic), Blog, About, Contact, Resources
- **Special requirements:** FAQ schema on condition pages, local SEO focus

---

## Build Order

1. Initialize Next.js project with TypeScript
2. Install and configure Tailwind
3. Install shadcn/ui and add base components
4. Set up content folder structure with sample markdown files
5. Create content fetching utilities (`lib/content.ts`)
6. Build layout with Header and Footer
7. Build Homepage with Hero and content sections
8. Build condition page template with FAQ schema
9. Build blog index and post pages
10. Build generic page template
11. Set up Decap CMS (`public/admin/`)
12. Add SEO utilities and schema generation
13. Add Tailwind animations
14. Write README with deployment instructions
15. Test full workflow: edit in CMS → PR → preview → merge → live
