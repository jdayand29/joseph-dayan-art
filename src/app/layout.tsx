import type { Metadata } from 'next'
import { fraunces, inter } from '@/lib/fonts'
import SiteHeader from '@/components/layout/SiteHeader'
import './globals.css'

export const metadata: Metadata = {
  title: 'Joseph Dayan',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
