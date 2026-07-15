'use client'

import * as RadixSelect from '@radix-ui/react-select'
import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

export const Select = RadixSelect.Root

export function SelectItem({ className, children, ...props }: ComponentProps<typeof RadixSelect.Item>) {
  return (
    <RadixSelect.Item
      className={clsx(
        'flex cursor-pointer items-center justify-between rounded-full px-3 py-2 text-sm outline-none',
        'data-[highlighted]:bg-accent-light data-[state=checked]:font-semibold',
        className,
      )}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator aria-hidden="true">✓</RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof RadixSelect.Trigger>) {
  return (
    <RadixSelect.Trigger
      className={clsx(
        'inline-flex items-center justify-between gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm outline-none',
        focusRingClassName,
        className,
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon aria-hidden="true">▾</RadixSelect.Icon>
    </RadixSelect.Trigger>
  )
}

export function SelectValue(props: ComponentProps<typeof RadixSelect.Value>) {
  return <RadixSelect.Value {...props} />
}

export function SelectContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={clsx('z-dropdown overflow-hidden rounded-card bg-white shadow-elevated', className)}
      >
        <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  )
}
