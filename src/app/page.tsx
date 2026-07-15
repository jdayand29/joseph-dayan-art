import { artworks, artists, collections } from '@/lib/data/artworks'

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm text-ink/50">
        Verificación Fase 2 — datos migrados a TypeScript ({artists[0].name}, {artworks.length} obras,{' '}
        {collections.length} colecciones):
      </p>
      <ul className="mt-4 space-y-1 text-sm">
        {artworks.map((a) => (
          <li key={a.id}>
            {a.title} — {a.year} — {a.medium}
          </li>
        ))}
      </ul>
    </main>
  )
}
