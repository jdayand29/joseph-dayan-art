'use client'

import { useState } from 'react'

export type SubmitStatus = 'idle' | 'loading' | 'done' | 'error'

// Estado idle/loading/done/error compartido por cualquier formulario que
// postea a una API route y muestra éxito o error (SubscribeForm, ContactForm).
export function useSubmitStatus() {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function run(action: () => Promise<boolean>) {
    setStatus('loading')
    try {
      const ok = await action()
      setStatus(ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return { status, run }
}
