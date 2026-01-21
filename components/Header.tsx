'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Phone } from 'lucide-react'
import type { GlobalSettings } from '@/lib/types'

interface HeaderProps {
  settings: GlobalSettings
  pages: { slug: string; title: string }[]
}

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/conditions', label: 'Conditions' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export function Header({ settings, pages }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{settings.site_name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {settings.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <Phone className="mr-2 h-4 w-4" />
              {settings.phone}
            </a>
          )}
          <Button asChild>
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-4" />
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center text-muted-foreground hover:text-foreground"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {settings.phone}
                </a>
              )}
              <Button asChild className="mt-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
