import type { Metadata } from 'next'
import { Inter, Nunito, Fredoka } from 'next/font/google'
import './globals.css'

// Kid-friendly fonts that support Cyrillic
const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Сурах Туслах - Хүүхдэд зориулсан',
  description: 'Хүүхдэд зориулсан AI туслах систем',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  )
}
