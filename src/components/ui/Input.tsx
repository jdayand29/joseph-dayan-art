import { useId, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { focusRingClassName } from '@/styles/tokens/focus'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, id, className, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink/70">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={clsx(
          'w-full rounded-full border bg-white px-4 py-2.5 text-sm outline-none transition-colors',
          error ? 'border-red-400' : 'border-ink/15 focus:border-accent/50',
          focusRingClassName,
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
