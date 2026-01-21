import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogSlugs, getGlobalSettings } from '@/lib/content'
import { generateBlogPostSchema } from '@/lib/schema'
import { PageHeader } from '@/components/PageHeader'
import { Schema } from '@/components/SEOHead'
import { FadeIn } from '@/components/animations/FadeIn'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  const settings = getGlobalSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

  if (!post) {
    notFound()
  }

  const blogSchema = generateBlogPostSchema(post, settings, siteUrl)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Schema schema={blogSchema} />

      <article>
        <PageHeader title={post.title} />

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Meta info */}
            <FadeIn>
              <div className="mb-8 text-muted-foreground">
                <p>
                  {formattedDate} · {post.author}
                </p>
              </div>
            </FadeIn>

            {/* Featured Image */}
            {post.featured_image && (
              <FadeIn delay={100}>
                <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </FadeIn>
            )}

            {/* Content */}
            <FadeIn delay={200}>
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </FadeIn>
          </div>
        </div>
      </article>
    </>
  )
}
