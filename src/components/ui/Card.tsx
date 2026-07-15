import type { ReactNode } from 'react'
import clsx from 'clsx'
import Surface from '@/components/ui/Surface'

interface CardProps {
  children: ReactNode
  elevation?: 'card' | 'elevated'
  className?: string
}

const paddingClass = 'p-6 sm:p-8'

export default function Card({ children, elevation, className }: CardProps) {
  return (
    <Surface elevation={elevation} className={clsx(paddingClass, className)}>
      {children}
    </Surface>
  )
}
