import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diario — Joseph Dayan',
  description: 'Notas de proceso y textos curatoriales de Joseph Dayan.',
}

export default function DiarioPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-serif text-3xl font-semibold">Diario</h1>
      <p className="mt-4 text-ink/60">
        Próximamente: notas de proceso, atelier y textos curatoriales — el archivo que crece obra a obra.
      </p>
    </div>
  )
}
