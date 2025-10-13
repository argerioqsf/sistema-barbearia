import RegisterUserPage from '@/components/template/RegisterUser/RegisterUserPage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ParamsProp } from '@/types/general'

export async function generateMetadata({
  params: { locale },
}: {
  params: ParamsProp
}) {
  const meta = await getTranslations({
    locale,
    namespace: 'metadata.dashboard.users.register',
  })
  return {
    title: meta('title'),
    description: meta('description'),
  }
}

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.profile?.role?.name

  if (!checkUserPermissions('user.register', userRole)) {
    redirect('/dashboard/home')
  }

  return <RegisterUserPage />
}
