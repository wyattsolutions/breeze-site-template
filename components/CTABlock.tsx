import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CTABlockProps {
  text: string
  link: string
  variant?: 'default' | 'inline' | 'fullwidth'
}

export function CTABlock({ text, link, variant = 'default' }: CTABlockProps) {
  if (!text || !link) return null

  if (variant === 'fullwidth') {
    return (
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{text}</h2>
          <Button asChild size="lg" variant="secondary">
            <Link href={link}>Get Started</Link>
          </Button>
        </div>
      </section>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-4 py-4">
        <p className="text-lg font-medium">{text}</p>
        <Button asChild>
          <Link href={link}>Get Started</Link>
        </Button>
      </div>
    )
  }

  // Default variant
  return (
    <section className="border rounded-lg p-8 bg-muted/50 text-center">
      <h2 className="text-2xl font-bold mb-4">{text}</h2>
      <Button asChild size="lg">
        <Link href={link}>Get Started</Link>
      </Button>
    </section>
  )
}
