import type { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

// This is a helper function to generate metadata for pages
export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage,
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
  }
}

// Schema component for JSON-LD structured data
interface SchemaProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function Schema({ schema }: SchemaProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
