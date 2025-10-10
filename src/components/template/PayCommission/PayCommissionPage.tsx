import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { checkUserPermissions } from '@/utils/checkUserPermissions'
import { listUsersAllAction } from '@/actions/user'
import { FormLayout } from '@/components/organisms/Form/FormLayout'
import { PayCommissionForm } from './components/PayCommissionForm'
import { logger } from '@/shared/logger'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'
import { SearchParams } from '@/types/general'

type PayCommissionPageProps = {
  searchParams: SearchParams['searchParams']
}

export default async function PayCommissionPage({
  searchParams,
}: PayCommissionPageProps) {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.profile?.role?.name

  if (!checkUserPermissions('user.list', userRole)) {
    redirect('/dashboard/home')
  }
  const usersResult = await listUsersAllAction()

  if (!usersResult.ok) {
    return (
      <ErrorRequestHandler result={{ ok: false, error: usersResult.error }} />
    )
  }
  const users = usersResult.data
  logger.debug({ users }, 'users')

  return (
    <FormLayout
      label="Financeiro"
      title="Pagamento de Comissão"
      description="Realize o pagamento de comissões para um colaborador."
    >
      <PayCommissionForm users={users} userIdFromQuery={searchParams?.u} />
    </FormLayout>
  )
}
