import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface CardItem {
  title: string
  description: string
  link: string
}

interface CardGridProps {
  items: CardItem[]
  columns?: 2 | 3 | 4
}

export function CardGrid({ items, columns = 3 }: CardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {items.map((item, index) => (
        <Link key={index} href={item.link} className="group">
          <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {item.title}
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
