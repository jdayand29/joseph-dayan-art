import { artworks, artists, collections } from '@/data/artworks'

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold italic">Joseph Dayan</h1>
      <p className="mt-4 text-sm text-ink/50">
        Verificación Fase 2/3 — datos migrados a TypeScript ({artists[0].name}, {artworks.length} obras,{' '}
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
