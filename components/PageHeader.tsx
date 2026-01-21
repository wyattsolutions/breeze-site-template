interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
