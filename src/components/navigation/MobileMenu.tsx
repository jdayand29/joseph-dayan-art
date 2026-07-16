'use client'

import { useState } from 'react'
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/Drawer'
import IconButton from '@/components/ui/IconButton'
import NavLink from '@/components/navigation/NavLink'
import { primaryNav, primaryCta } from '@/config/navigation'

// Primer consumidor real de Drawer (Fase E/F, construido explícitamente
// para este momento). Estado controlado: es la única forma de cerrar el
// Drawer automáticamente al tocar un link — Radix no lo hace solo.
export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <IconButton aria-label="Abrir menú" className="md:hidden">
          ☰
        </IconButton>
      </DrawerTrigger>
      <DrawerContent title="Menú" hideTitle side="right">
        <nav className="flex flex-col gap-1">
          {primaryNav.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              onClick={close}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink/70 hover:bg-accent-light/60"
              activeClassName="bg-ink text-canvas hover:bg-ink"
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            href={primaryCta.href}
            onClick={close}
            className="mt-2 rounded-full bg-accent px-3 py-2 text-center text-sm font-semibold text-white hover:bg-accent-dark"
          >
            {primaryCta.label}
          </NavLink>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
