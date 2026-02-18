import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getGlobalSettings, getAllPages } from '@/lib/content'
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/schema'
import { Schema } from '@/components/SEOHead'
import { AccessibilityWidget } from '@/components/AccessibilityWidget'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const settings = getGlobalSettings()
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

export const metadata: Metadata = {
  title: {
    default: settings.site_name,
    template: `%s | ${settings.site_name}`,
  },
  description: settings.tagline,
  metadataBase: new URL(siteUrl),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pages = getAllPages()
  const localBusinessSchema = generateLocalBusinessSchema(settings)
  const websiteSchema = generateWebsiteSchema(settings, siteUrl)

  return (
    <html lang="en">
      <head>
        <Schema schema={[localBusinessSchema, websiteSchema]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Header settings={settings} pages={pages} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <AccessibilityWidget />
      </body>
    </html>
  )
}
