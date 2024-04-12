import '../global.css'
import SideMenu from '@/components/organisms/SideMenu'
import { twMerge } from 'tailwind-merge'
import { GeneralProvider } from '@/contexts/general-context'
import ContainerLayoutDashboard from '@/components/molecules/ContainerLayoutDashborad'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GeneralProvider>
      <body className="bg-white">
        <div className={twMerge('flex flex-col')}>
          <SideMenu />
          <div className="flex flex-row justify-start">
            <ContainerLayoutDashboard>{children}</ContainerLayoutDashboard>
          </div>
        </div>
      </body>
    </GeneralProvider>
  )
}
