export interface GlobalSettings {
  site_name: string
  tagline: string
  phone: string
  email: string
  address: string
  social: {
    instagram: string
    facebook: string
    linkedin: string
  }
  footer_text: string
}

export interface HomePage {
  hero_headline: string
  hero_subheadline: string
  hero_cta_text: string
  hero_cta_link: string
  hero_image: string
  intro_heading: string
  intro_body: string
  featured_services: {
    title: string
    link: string
    description: string
  }[]
  seo_title: string
  seo_description: string
}

export interface Page {
  title: string
  slug: string
  seo_title?: string
  seo_description: string
  cta_text: string
  cta_link: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Condition {
  title: string
  slug: string
  parent_category: string
  seo_title?: string
  seo_description: string
  overview: string
  who_it_affects: string
  treatment_approach: string
  faqs: FAQ[]
  cta_text: string
  cta_link: string
}

export interface BlogPost {
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  featured_image: string
  seo_title?: string
  seo_description: string
  content: string
}

export interface Resource {
  title: string
  slug: string
  description: string
  link: string
  affiliate: boolean
  category: string
}
