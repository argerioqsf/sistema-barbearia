import { Providers } from './providers'
import './global.css'

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <Providers>{children}</Providers>
    </html>
  )
}
