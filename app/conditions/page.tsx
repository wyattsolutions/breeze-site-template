import type { Metadata } from 'next'
import { getAllConditions, getGlobalSettings } from '@/lib/content'
import { PageHeader } from '@/components/PageHeader'
import { CardGrid } from '@/components/CardGrid'
import { FadeIn } from '@/components/animations/FadeIn'

const settings = getGlobalSettings()

export const metadata: Metadata = {
  title: 'Conditions We Treat',
  description: `Expert physical therapy for pelvic floor conditions at ${settings.site_name}. Find relief from pelvic pain, incontinence, and more.`,
}

export default function ConditionsPage() {
  const conditions = getAllConditions()

  const conditionCards = conditions.map((condition) => ({
    title: condition.title,
    description: condition.overview.slice(0, 150) + '...',
    link: `/conditions/${condition.slug}`,
  }))

  return (
    <>
      <PageHeader
        title="Conditions We Treat"
        description="Expert care for a wide range of pelvic floor and orthopedic conditions. Click on a condition to learn more about symptoms and treatment."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <FadeIn>
          <CardGrid items={conditionCards} columns={3} />
        </FadeIn>
      </section>
    </>
  )
}
