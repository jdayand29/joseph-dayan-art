'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import IconButton from '@/components/ui/IconButton'

// Misma base de Dialog (@radix-ui/react-dialog) que Dialog.tsx, pero anclado
// a un borde en vez de centrado — para el futuro menú móvil (Fase H) y
// cualquier panel deslizante.
//
// Entrada/salida animadas con CSS puro vía data-state (Fase F) — mismo
// mecanismo que Dialog.tsx (ver ARCHITECTURE.md "Motion Rules").

export const Drawer = RadixDialog.Root
export const DrawerTrigger = RadixDialog.Trigger

interface DrawerContentProps extends Omit<ComponentProps<typeof RadixDialog.Content>, 'title'> {
  children: ReactNode
  title: string
  hideTitle?: boolean
  side?: 'left' | 'right'
}

export function DrawerContent({
  children,
  title,
  hideTitle,
  side = 'right',
  className,
  ...props
}: DrawerContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={clsx(
          'fixed inset-0 z-overlay bg-ink/50',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
          'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
        )}
      />
      <RadixDialog.Content
        className={clsx(
          'fixed top-0 z-modal h-full w-full max-w-sm bg-white p-6 shadow-elevated outline-none',
          side === 'right' ? 'right-0' : 'left-0',
          side === 'right'
            ? 'data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right'
            : 'data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left',
          'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
          className,
        )}
        {...props}
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
