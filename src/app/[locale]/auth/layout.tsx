import '../global.css'
import { Inter } from 'next/font/google'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body className="bg-primary-100">
      <div className={twMerge(inter.className)}>{children}</div>
    </body>
  )
}
