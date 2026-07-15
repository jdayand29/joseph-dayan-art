import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Adquirir — Joseph Dayan',
  description: 'Cómo adquirir un original o encargar una pieza a Joseph Dayan.',
}

export default function AdquirirPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-serif text-3xl font-semibold">Adquirir</h1>
      <p className="mt-4 text-ink/60">
        El flujo de adquisición de originales y encargos está en construcción. Mientras tanto,{' '}
        <Link href="/contacto" className="underline underline-offset-2">
          escríbeme directamente
        </Link>{' '}
        para consultar disponibilidad de una obra.
      </p>
    </div>
  )
}
