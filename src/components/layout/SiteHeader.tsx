'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import NavLink from '@/components/navigation/NavLink'
import MobileMenu from '@/components/navigation/MobileMenu'
import { primaryNav, primaryCta } from '@/config/navigation'
import { siteName } from '@/config/site'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-header border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <Container width="content" className="flex items-center gap-6 py-4">
        <Link href="/" className="shrink-0 font-serif text-2xl font-semibold italic tracking-tight text-accent">
          {siteName}
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {primaryNav.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-accent-light/60"
              activeClassName="bg-ink text-canvas hover:bg-ink"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          href={primaryCta.href}
          className="ml-auto shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark md:ml-1"
        >
          {primaryCta.label}
        </NavLink>

        <MobileMenu />
      </Container>
    </header>
  )
}
