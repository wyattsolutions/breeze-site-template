import type { Metadata } from 'next'
import { getAllResources, getGlobalSettings } from '@/lib/content'
import { PageHeader } from '@/components/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'

const settings = getGlobalSettings()

export const metadata: Metadata = {
  title: 'Resources',
  description: `Recommended tools and resources from ${settings.site_name}. Products and services to support your health journey.`,
}

export default function ResourcesPage() {
  const resources = getAllResources()

  return (
    <>
      <PageHeader
        title="Resources"
        description="Tools and products I recommend to support your health journey. Some links may be affiliate links."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <FadeIn key={resource.slug} delay={index * 100}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{resource.title}</CardTitle>
                    {resource.affiliate && (
                      <span className="text-xs text-muted-foreground">
                        Affiliate Link
                      </span>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-base mb-4">
                      {resource.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Product
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No resources yet. Check back soon!
          </p>
        )}
      </section>
    </>
  )
}
