'use client'

import * as RadixPopover from '@radix-ui/react-popover'
import type { ReactNode } from 'react'
import clsx from 'clsx'

export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger

interface PopoverContentProps {
  children: ReactNode
  className?: string
}

export function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={8}
        className={clsx('z-dropdown rounded-card bg-white p-4 text-sm shadow-elevated outline-none', className)}
      >
        {children}
        <RadixPopover.Arrow className="fill-white" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}
