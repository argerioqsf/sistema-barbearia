import '../global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body className="bg-white">
      <div className="w-full">{children}</div>
    </body>
  )
}
