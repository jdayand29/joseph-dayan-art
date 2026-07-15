'use client'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import type { ComponentProps } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

export default function Checkbox({ className, ...props }: ComponentProps<typeof RadixCheckbox.Root>) {
  return (
    <RadixCheckbox.Root
      className={clsx(
        'flex h-5 w-5 items-center justify-center rounded border border-ink/30 bg-white data-[state=checked]:border-ink data-[state=checked]:bg-ink',
        focusRingClassName,
        className,
      )}
      {...props}
    >
      <RadixCheckbox.Indicator className="text-xs text-white" aria-hidden="true">
        ✓
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
}
