'use client'

import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TooltipProps {
  children: ReactNode
  content: string
}

// TooltipProvider debe envolver la app una sola vez (delay compartido) — se
// monta en providers/ cuando el primer consumidor real lo necesite (Fase I+).
export const TooltipProvider = RadixTooltip.Provider

// Entrada/salida animadas con CSS puro vía data-state (Fase F) — mismo
// mecanismo que Dialog.tsx (ver ARCHITECTURE.md "Motion Rules").
export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={6}
          className={clsx(
            'z-dropdown rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white',
            // Radix Tooltip.Content usa data-state="delayed-open"|"instant-open"|"closed"
            // (no solo open/closed) — data-[state$=open] (termina en "open")
            // cubre ambos casos de apertura con un solo selector.
            'data-[state$=open]:animate-tooltip-in data-[state=closed]:animate-tooltip-out',
            'motion-reduce:data-[state$=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-ink" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
