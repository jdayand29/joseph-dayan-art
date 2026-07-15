'use client'

import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
}

// TooltipProvider debe envolver la app una sola vez (delay compartido) — se
// monta en providers/ cuando el primer consumidor real lo necesite (Fase I+).
export const TooltipProvider = RadixTooltip.Provider

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={6}
          className="z-dropdown rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white"
        >
          {content}
          <RadixTooltip.Arrow className="fill-ink" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
