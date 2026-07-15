'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import IconButton from '@/components/ui/IconButton'

// Misma base de Dialog (@radix-ui/react-dialog) que Dialog.tsx, pero anclado
// a un borde en vez de centrado — para el futuro menú móvil (Fase H) y
// cualquier panel deslizante. El preset de motion real (deslizar desde el
// borde) es Fase F; por ahora aparece/desaparece sin animación.

export const Drawer = RadixDialog.Root
export const DrawerTrigger = RadixDialog.Trigger

interface DrawerContentProps {
  children: ReactNode
  title: string
  hideTitle?: boolean
  side?: 'left' | 'right'
  className?: string
}

export function DrawerContent({ children, title, hideTitle, side = 'right', className }: DrawerContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-ink/50" />
      <RadixDialog.Content
        className={clsx(
          'fixed top-0 z-modal h-full w-full max-w-sm bg-white p-6 shadow-elevated outline-none',
          side === 'right' ? 'right-0' : 'left-0',
          className,
        )}
      >
        <RadixDialog.Title className={clsx('font-serif text-xl font-medium', hideTitle && 'sr-only')}>
          {title}
        </RadixDialog.Title>
        <div className="mt-4">{children}</div>
        <RadixDialog.Close asChild>
          <IconButton aria-label="Cerrar" className="absolute right-3 top-3">
            ✕
          </IconButton>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
}
