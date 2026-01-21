# Breeze Site Template

A productized website system for service-based businesses. Clients can edit content via CMS while developers manage code through Claude Code.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS v4**
- **shadcn/ui** (component library)
- **Decap CMS** (git-based content management)
- **Vercel** (hosting + preview deploys)

## Features

- Client-editable content via CMS at `/admin`
- SEO best practices baked in (meta tags, schema markup, heading hierarchy)
- Responsive, mobile-first design
- Scroll animations with Intersection Observer
- Editorial workflow with draft/review/publish
- TypeScript throughout

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
breeze-site-template/
├── app/                    # Next.js App Router pages
│   ├── [slug]/            # Generic pages (about, contact)
│   ├── blog/              # Blog index and posts
│   ├── conditions/        # Condition pages
│   └── resources/         # Resources page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── animations/       # Animation components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── content/              # Markdown content (CMS-editable)
│   ├── settings/        # Global settings
│   ├── pages/           # Static pages
│   ├── conditions/      # Condition entries
│   ├── blog/            # Blog posts
│   └── resources/       # Resources
├── lib/                  # Utilities
│   ├── content.ts       # Content fetching
│   ├── schema.ts        # JSON-LD schema generators
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # General utilities
└── public/
    └── admin/           # Decap CMS
```

## Setting Up for a New Client

### 1. Clone and Rename

```bash
git clone https://github.com/YOUR_USERNAME/breeze-site-template.git client-sitename
cd client-sitename
rm -rf .git
git init
```

### 2. Update Content

1. Edit `content/settings/global.md` with client info
2. Update pages in `content/pages/`
3. Add conditions, blog posts, resources as needed

### 3. Customize Branding

1. Update colors in `app/globals.css` (CSS variables)
2. Add client logo to `public/`
3. Update favicon

### 4. Configure CMS

1. Edit `public/admin/config.yml`
2. Update `backend.repo` with your GitHub repo
3. For GitHub backend, set up OAuth app or use Netlify Identity

### 5. Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production domain

### 6. Configure GitHub for CMS

For the editorial workflow (draft > review > publish):

1. Go to GitHub repo settings
2. Enable branch protection on `main`
3. Set up OAuth app for Decap CMS authentication

## CMS Workflow

1. Client logs into `/admin` on their site
2. Edits content (new pages, existing pages, site settings)
3. Saves as draft → creates a GitHub PR → Vercel builds a preview URL
4. Client reviews preview, clicks publish → merges to main → goes live

## Content Types

### Global Settings
Site name, contact info, social links, footer text.

### Pages
Generic pages like About, Contact with markdown body content.

### Conditions
Service/condition pages with overview, who it affects, treatment approach, FAQs.

### Blog Posts
Articles with title, date, author, excerpt, featured image, and markdown body.

### Resources
Recommended tools and products with affiliate link support.

## SEO Features

- **Meta tags**: Auto-generated from content fields
- **JSON-LD Schema**: LocalBusiness, FAQPage, BlogPosting, WebSite
- **Open Graph / Twitter Cards**: Auto-generated
- **Heading hierarchy**: Enforced by templates
- **Alt text**: Required for images in CMS

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

## Local CMS Development

For local CMS testing without GitHub:

1. Install Decap CMS proxy server:
   ```bash
   npx decap-server
   ```
2. Uncomment `local_backend: true` in `public/admin/config.yml`
3. Access CMS at `http://localhost:3000/admin`

## License

MIT
