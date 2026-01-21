import type { Metadata } from 'next'
import { getHomePage, getGlobalSettings } from '@/lib/content'
import { Hero } from '@/components/Hero'
import { CardGrid } from '@/components/CardGrid'
import { CTABlock } from '@/components/CTABlock'
import { FadeIn } from '@/components/animations/FadeIn'

const home = getHomePage()
const settings = getGlobalSettings()

export const metadata: Metadata = {
  title: home.seo_title || settings.site_name,
  description: home.seo_description || settings.tagline,
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        headline={home.hero_headline}
        subheadline={home.hero_subheadline}
        ctaText={home.hero_cta_text}
        ctaLink={home.hero_cta_link}
        image={home.hero_image}
      />

      {/* Intro Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {home.intro_heading}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {home.intro_body}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Featured Services */}
      {home.featured_services && home.featured_services.length > 0 && (
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                How I Can Help
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <CardGrid items={home.featured_services} columns={3} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <FadeIn>
          <CTABlock
            text="Ready to take the first step?"
            link="/contact"
            variant="default"
          />
        </FadeIn>
      </section>
    </>
  )
}
