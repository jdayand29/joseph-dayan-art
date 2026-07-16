'use client'

import * as RadixPopover from '@radix-ui/react-popover'
import type { ComponentProps } from 'react'
import clsx from 'clsx'

export const Popover = RadixPopover.Root
export const PopoverTrigger = RadixPopover.Trigger

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
        className={clsx('z-dropdown rounded-card bg-white p-4 text-sm shadow-elevated outline-none', className)}
        {...props}
      >
        {children}
        <RadixPopover.Arrow className="fill-white" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}
