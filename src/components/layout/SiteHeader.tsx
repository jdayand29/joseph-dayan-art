'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navLinks = [
  { href: '/obra', label: 'Obra' },
  { href: '/coleccion', label: 'Colecciones' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/diario', label: 'Diario' },
  { href: '/contacto', label: 'Contacto' },
]

export default function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4">
        <Link href="/" className="shrink-0 font-serif text-2xl font-semibold italic tracking-tight text-accent">
          Joseph Dayan
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
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
          href="/adquirir"
          className="ml-1 shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-dark"
        >
          Adquirir
        </Link>
      </div>
    </header>
  )
}
