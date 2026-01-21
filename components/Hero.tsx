import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroProps {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  image?: string
}

export function Hero({ headline, subheadline, ctaText, ctaLink, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {headline}
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              {subheadline}
            </p>
            {ctaText && ctaLink && (
              <Button asChild size="lg" className="text-lg">
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image
                src={image}
                alt={headline}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
