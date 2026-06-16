import type { Metadata, Viewport } from 'next'
import './globals.css'
import AgeGate from '@/components/AgeGate'

export const metadata: Metadata = {
  title: 'Love Dice — Jogos Íntimos',
  description: 'Jogos íntimos para casais e grupos. Esquente a noite com Love Dice.',
  robots: 'noindex',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#120818',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-brand-bg text-white min-h-dvh">
        <div className="mx-auto max-w-[430px] min-h-dvh relative">
          {children}
        </div>
        <AgeGate />
      </body>
    </html>
  )
}
