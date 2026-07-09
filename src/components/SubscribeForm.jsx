import { useState } from 'react'
import { useAppState } from '../store/AppState'

export default function SubscribeForm() {
  const { role } = useAppState()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl bg-accent-light/60 p-8 text-center">
        <p className="font-serif text-xl font-medium">¡Listo! Te avisaremos ✓</p>
        <p className="mt-1 text-sm text-ink/60">Gracias por unirte a ColectArt.</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-accent-light/60 p-8 text-center">
      <h2 className="font-serif text-2xl font-medium">¿Quieres que te avisemos?</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
        Nuevas obras, artistas y subastas — directo a tu correo. Sin spam.
      </p>
      <form onSubmit={handleSubmit} className="mx-auto mt-5 flex max-w-sm gap-2">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent/50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Avisarme'}
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-xs text-red-600">Algo falló, intenta de nuevo.</p>}
    </div>
  )
}
