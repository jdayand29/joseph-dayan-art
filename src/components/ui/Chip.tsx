import type { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

// Filtro seleccionable (hoy usado inline en ArtworkCatalog) — siempre un
// <button> real con aria-pressed, nunca un <span> con onClick.
export default function Chip({ selected = false, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={clsx(
        'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
        selected ? 'border-accent bg-accent text-white' : 'border-ink/15 text-ink/70 hover:border-accent/40',
        focusRingClassName,
        className,
      )}
      {...props}
    />
  )
}
