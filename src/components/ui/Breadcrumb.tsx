import NextLink from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

// Último item = página actual, sin link, marcado aria-current="page" — ej.
// futura ruta /obra/[slug]: "Obra / Dualidades / Corazón y Razón".
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink/50">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <NextLink href={item.href} className="hover:text-ink hover:underline">
                  {item.label}
                </NextLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-ink' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
