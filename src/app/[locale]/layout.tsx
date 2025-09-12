import { Providers } from './providers'
import './global.css'
import { Inter } from 'next/font/google'
import ColorInitializer from '@/components/molecules/ColorInitialize'
import { initColorScript } from '@/utils/colorScript'
import { getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const session = await getServerSession(authOptions)
  return (
    <html className={inter.variable} lang={locale}>
      <head>
        <script
          id="init-colors"
          dangerouslySetInnerHTML={{ __html: initColorScript }}
        />
      </head>
      <body>
        <Providers messages={messages} locale={locale} session={session}>
          <ColorInitializer />
          {children}
        </Providers>
      </body>
    </html>
  )
}
