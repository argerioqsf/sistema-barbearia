import { Providers } from './providers'
import './global.css'
import { Inter } from 'next/font/google'
import ColorInitializer from '@/components/molecules/ColorInitialize'
import { initColorScript } from '@/utils/colorScript'
import {
  getMessages,
  unstable_setRequestLocale as unstableSetRequestLocale,
} from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstableSetRequestLocale(locale)
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
        <NextTopLoader
          color="hsl(var(--secondary))"
          height={3}
          showSpinner={false}
          crawlSpeed={200}
        />
        <Providers messages={messages} locale={locale} session={session}>
          <ColorInitializer />
          {children}
        </Providers>
      </body>
    </html>
  )
}
