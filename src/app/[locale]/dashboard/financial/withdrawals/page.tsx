import { authOptions } from '@/auth/options'
import { WithdrawalTemplate } from '@/components/template/WithdrawalTemplate'
import { getServerSession } from 'next-auth'

export default async function WithdrawalPage() {
  const session = await getServerSession(authOptions)
  return <WithdrawalTemplate unitId={session?.user?.unitId} />
}
