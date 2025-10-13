import '../global.css'
import { ReactNode } from 'react'
import { GeneralProvider } from '@/contexts/general-context'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'

export default async function POSRootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <GeneralProvider>
      <AuthProvider initialUser={session?.user}>
        <div className="min-h-screen bg-white text-foreground">{children}</div>
        <Toaster />
      </AuthProvider>
    </GeneralProvider>
  )
}
