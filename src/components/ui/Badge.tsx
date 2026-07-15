import type { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'dark' | 'light'
  className?: string
}

export default function Badge({ children, variant = 'dark', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'rounded-full px-2.5 py-1 text-xs font-medium',
        variant === 'dark' ? 'bg-ink text-white' : 'bg-white text-ink',
        className,
      )}
    >
      {children}
    </span>
  )
}
