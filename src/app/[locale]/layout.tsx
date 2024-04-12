import { Providers } from './providers'
import './global.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html className={inter.variable} lang={locale}>
      <Providers>{children}</Providers>
    </html>
  )
}
