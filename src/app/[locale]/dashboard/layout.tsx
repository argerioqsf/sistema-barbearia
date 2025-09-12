import '../global.css'
import SideMenu from '@/components/organisms/SideMenu'
import { twMerge } from 'tailwind-merge'
import { GeneralProvider } from '@/contexts/general-context'
import { AuthProvider } from '@/contexts/auth-context'
import { getUserCookieServer } from '@/utils/cookieServer'
import ContainerLayoutDashboard from '@/components/molecules/ContainerLayoutDashborad'
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialUser = getUserCookieServer()
  return (
    <GeneralProvider>
      <AuthProvider initialUser={initialUser}>
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
