'use client'

import * as RadixSwitch from '@radix-ui/react-switch'
import type { ComponentProps } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

export default function Switch({ className, ...props }: ComponentProps<typeof RadixSwitch.Root>) {
  return (
    <RadixSwitch.Root
      className={clsx(
        'relative h-6 w-11 rounded-full bg-ink/15 transition-colors data-[state=checked]:bg-ink',
        focusRingClassName,
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-subtle transition-transform data-[state=checked]:translate-x-[22px]" />
    </RadixSwitch.Root>
  )
}
