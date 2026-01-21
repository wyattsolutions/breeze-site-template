import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getConditionBySlug, getAllConditionSlugs, getGlobalSettings } from '@/lib/content'
import { generateFAQSchema } from '@/lib/schema'
import { PageHeader } from '@/components/PageHeader'
import { FAQSection } from '@/components/FAQSection'
import { CTABlock } from '@/components/CTABlock'
import { Schema } from '@/components/SEOHead'
import { FadeIn } from '@/components/animations/FadeIn'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllConditionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const condition = getConditionBySlug(slug)
  const settings = getGlobalSettings()

  if (!condition) {
    return {
      title: 'Condition Not Found',
    }
  }

  return {
    title: condition.seo_title || condition.title,
    description: condition.seo_description,
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  const condition = getConditionBySlug(slug)

  if (!condition) {
    notFound()
  }

  const faqSchema = generateFAQSchema(condition.faqs)

  return (
    <>
      <Schema schema={faqSchema} />

      <PageHeader title={condition.title} />

      <article className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Overview */}
          <FadeIn>
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {condition.overview}
              </p>
            </section>
          </FadeIn>

          {/* Who It Affects */}
          <FadeIn delay={100}>
            <section>
              <h2 className="text-2xl font-bold mb-4">Who It Affects</h2>
              <p className="text-muted-foreground leading-relaxed">
                {condition.who_it_affects}
              </p>
            </section>
          </FadeIn>

          {/* Treatment Approach */}
          <FadeIn delay={200}>
            <section>
              <h2 className="text-2xl font-bold mb-4">Treatment Approach</h2>
              <p className="text-muted-foreground leading-relaxed">
                {condition.treatment_approach}
              </p>
            </section>
          </FadeIn>

          {/* FAQs */}
          {condition.faqs && condition.faqs.length > 0 && (
            <FadeIn delay={300}>
              <FAQSection faqs={condition.faqs} />
            </FadeIn>
          )}

          {/* CTA */}
          {condition.cta_text && condition.cta_link && (
            <FadeIn delay={400}>
              <CTABlock text={condition.cta_text} link={condition.cta_link} />
            </FadeIn>
          )}
        </div>
      </article>
    </>
  )
}
