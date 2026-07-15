import clsx from 'clsx'

interface SpinnerProps {
  label?: string
  className?: string
}

export default function Spinner({ label = 'Cargando…', className }: SpinnerProps) {
  return (
    <div role="status" className="inline-flex items-center">
      <span
        aria-hidden="true"
        className={clsx(
          'h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink motion-reduce:animate-none',
          className,
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
