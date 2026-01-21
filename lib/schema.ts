import type { GlobalSettings, FAQ, BlogPost } from './types'

export function generateLocalBusinessSchema(settings: GlobalSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': '#localbusiness',
    name: settings.site_name,
    description: settings.tagline,
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings.address,
    },
    sameAs: [
      settings.social.instagram,
      settings.social.facebook,
      settings.social.linkedin,
    ].filter(Boolean),
  }
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBlogPostSchema(
  post: BlogPost,
  settings: GlobalSettings,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? `${siteUrl}${post.featured_image}` : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.site_name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  }
}

export function generateWebsiteSchema(settings: GlobalSettings, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.site_name,
    description: settings.tagline,
    url: siteUrl,
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}
