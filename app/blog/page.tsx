import type { Metadata } from 'next'
import { getAllBlogPosts, getGlobalSettings } from '@/lib/content'
import { PageHeader } from '@/components/PageHeader'
import { BlogCard } from '@/components/BlogCard'
import { FadeIn } from '@/components/animations/FadeIn'

const settings = getGlobalSettings()

export const metadata: Metadata = {
  title: 'Blog',
  description: `Health tips, insights, and education from ${settings.site_name}. Learn about pelvic floor health, postpartum recovery, and more.`,
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <PageHeader
        title="Blog"
        description="Health tips, insights, and education to help you understand your body and take control of your health."
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 100}>
                <BlogCard post={post} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        )}
      </section>
    </>
  )
}
