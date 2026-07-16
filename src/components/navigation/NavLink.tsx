'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

// Único lugar que decide "¿es la ruta activa?" — consumido por el nav de
// escritorio y por MobileMenu (components/navigation/) para no duplicar esa
// lógica. Agrega aria-current="page", ausente hasta Fase H (el link activo
// solo se distinguía visualmente).
export default function NavLink({ href, children, className, activeClassName, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  )
}
