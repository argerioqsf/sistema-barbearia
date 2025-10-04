import '../global.css'
import SideMenu from '@/components/organisms/SideMenu'
import { twMerge } from 'tailwind-merge'
import { GeneralProvider } from '@/contexts/general-context'
import { AuthProvider } from '@/contexts/auth-context'
import ContainerLayoutDashboard from '@/components/molecules/ContainerLayoutDashborad'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'

export async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  return (
    <GeneralProvider>
      <AuthProvider initialUser={session?.user}>
        <div className={twMerge('bg-white flex flex-col')}>
          <SideMenu />
          <div className="flex flex-row justify-start">
            <ContainerLayoutDashboard>{children}</ContainerLayoutDashboard>
          </div>
          <Toaster />
        </div>
      </AuthProvider>
    </GeneralProvider>
  )
}
