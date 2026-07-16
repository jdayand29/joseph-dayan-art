'use client'

import * as RadixPopover from '@radix-ui/react-popover'
import type { ComponentProps } from 'react'
import clsx from 'clsx'

export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger

// Entrada/salida animadas con CSS puro vía data-state (Fase F) — mismo
// mecanismo que Dialog.tsx (ver ARCHITECTURE.md "Motion Rules").
export function PopoverContent({
  children,
  className,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof RadixPopover.Content>) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={sideOffset}
        className={clsx(
          'z-dropdown rounded-card bg-white p-4 text-sm shadow-elevated outline-none',
          'data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out',
          'motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none',
          className,
        )}
        {...props}
      >
        {children}
        <RadixPopover.Arrow className="fill-white" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}
