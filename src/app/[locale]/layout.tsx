import { Providers } from './providers'
import './global.css'
import { Inter } from 'next/font/google'
import { initColorScript } from '@/utils/colorScript'

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
      <head>
        <script
          id="init-colors"
          dangerouslySetInnerHTML={{ __html: initColorScript }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
