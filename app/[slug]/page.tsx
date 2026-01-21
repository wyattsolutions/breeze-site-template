import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPages } from '@/lib/content'
import { PageHeader } from '@/components/PageHeader'
import { CTABlock } from '@/components/CTABlock'
import { FadeIn } from '@/components/animations/FadeIn'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: page.seo_title || page.title,
    description: page.seo_description,
  }
}

export default async function GenericPage({ params }: Props) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <PageHeader title={page.title} />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </FadeIn>

          {page.cta_text && page.cta_link && (
            <FadeIn delay={200}>
              <div className="mt-12">
                <CTABlock text={page.cta_text} link={page.cta_link} />
              </div>
            </FadeIn>
          )}
        </div>
      </article>
    </>
  )
}
