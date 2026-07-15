import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TextProps {
  children: ReactNode
  /** Alias semánticos sobre los tokens de opacidad (src/styles/tokens/opacity.ts). */
  variant?: 'body' | 'muted' | 'subtle' | 'label'
  as?: 'p' | 'span'
  className?: string
}

const variantClass = {
  body: 'text-base text-ink',
  muted: 'text-sm text-ink/50',
  subtle: 'text-xs text-ink/40',
  label: 'text-xs font-medium uppercase tracking-wide text-ink/50',
} as const

export default function Text({ children, variant = 'body', as: As = 'p', className }: TextProps) {
  return <As className={clsx(variantClass[variant], className)}>{children}</As>
}
