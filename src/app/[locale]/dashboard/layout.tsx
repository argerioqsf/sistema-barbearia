import '../global.css'
import SideMenu from '@/components/organisms/SideMenu'
import { twMerge } from 'tailwind-merge'
import { GeneralProvider } from '@/contexts/general-context'
import { AuthProvider } from '@/contexts/auth-context'
import ContainerLayoutDashboard from '@/components/molecules/ContainerLayoutDashborad'
import { Toaster } from '@/components/ui/toaster'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { fetchUnitsSelect } from '@/features/units/api'
import { RoleName } from '@/features/roles/schemas'
import type { ZUnit } from '@/features/units/schemas'
import { logger } from '@/shared/logger'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  const role = session?.user?.profile?.role?.name as RoleName | undefined
  let units: ZUnit[] = []
  const currentUnitId = session?.user?.unitId

  if (role === 'ADMIN' || role === 'OWNER') {
    try {
      const unitsResponse = await fetchUnitsSelect()
      logger.debug(unitsResponse, 'unitsResponse')
      units = Array.isArray(unitsResponse) ? unitsResponse : []
    } catch {
      units = []
    }
  }

  return (
    <GeneralProvider>
      <AuthProvider initialUser={session?.user}>
        <div className={twMerge('bg-white flex flex-col')}>
          <SideMenu />
          <div className="flex flex-row justify-start">
            <ContainerLayoutDashboard
              navBarProps={{
                role,
                units,
                currentUnitId,
              }}
            >
              {children}
            </ContainerLayoutDashboard>
          </div>
          <Toaster />
        </div>
      </AuthProvider>
    </GeneralProvider>
  )
}
