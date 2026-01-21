import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { GlobalSettings, HomePage, Page, Condition, BlogPost, Resource } from './types'

const contentDirectory = path.join(process.cwd(), 'content')

// Parse markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

// Get global settings
export function getGlobalSettings(): GlobalSettings {
  const filePath = path.join(contentDirectory, 'settings', 'global.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data as GlobalSettings
}

// Get homepage content
export function getHomePage(): HomePage {
  const filePath = path.join(contentDirectory, 'pages', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return data as HomePage
}

// Get a single page by slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const filePath = path.join(contentDirectory, 'pages', `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)

  return {
    ...data,
    content: htmlContent,
  } as Page
}

// Get all pages
export function getAllPages(): { slug: string; title: string }[] {
  const pagesDirectory = path.join(contentDirectory, 'pages')
  const filenames = fs.readdirSync(pagesDirectory)

  return filenames
    .filter(filename => filename !== 'home.md')
    .map(filename => {
      const filePath = path.join(pagesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title,
      }
    })
}

// Get all conditions
export function getAllConditions(): Condition[] {
  const conditionsDirectory = path.join(contentDirectory, 'conditions')

  if (!fs.existsSync(conditionsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(conditionsDirectory)

  return filenames.map(filename => {
    const filePath = path.join(conditionsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as Condition
  })
}

// Get a single condition by slug
export function getConditionBySlug(slug: string): Condition | null {
  const conditionsDirectory = path.join(contentDirectory, 'conditions')
  const filenames = fs.readdirSync(conditionsDirectory)

  for (const filename of filenames) {
    const filePath = path.join(conditionsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    if (data.slug === slug) {
      return data as Condition
    }
  }

  return null
}

// Get all condition slugs for static generation
export function getAllConditionSlugs(): string[] {
  const conditions = getAllConditions()
  return conditions.map(condition => condition.slug)
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(contentDirectory, 'blog')

  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(blogDirectory)

  const posts = filenames.map(filename => {
    const filePath = path.join(blogDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as BlogPost
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogDirectory = path.join(contentDirectory, 'blog')
  const filenames = fs.readdirSync(blogDirectory)

  for (const filename of filenames) {
    const filePath = path.join(blogDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (data.slug === slug) {
      const htmlContent = await markdownToHtml(content)
      return {
        ...data,
        content: htmlContent,
      } as BlogPost
    }
  }

  return null
}

// Get all blog post slugs for static generation
export function getAllBlogSlugs(): string[] {
  const posts = getAllBlogPosts()
  return posts.map(post => post.slug)
}

// Get all resources
export function getAllResources(): Resource[] {
  const resourcesDirectory = path.join(contentDirectory, 'resources')

  if (!fs.existsSync(resourcesDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(resourcesDirectory)

  return filenames.map(filename => {
    const filePath = path.join(resourcesDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return data as Resource
  })
}
