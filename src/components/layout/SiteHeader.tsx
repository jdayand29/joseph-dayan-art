'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { primaryNav, primaryCta } from '@/config/navigation'
import { siteName } from '@/config/site'

export default function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-header border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="shrink-0 font-serif text-2xl font-semibold italic tracking-tight text-accent">
          {siteName}
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {primaryNav.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-3 py-2 rounded-full text-sm font-medium transition-colors',
                  isActive ? 'bg-ink text-canvas' : 'text-ink/70 hover:bg-accent-light/60',
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <Link
          href={primaryCta.href}
          className="ml-1 shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
        >
          {primaryCta.label}
        </Link>
      </div>
    </header>
  )
}
