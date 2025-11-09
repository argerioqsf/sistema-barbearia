import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Text } from '@/components/atoms'
import { getOpenCashSession, getCashSessions } from '@/actions/cash-session'
import Listing from '@/components/organisms/Listing'
import { infoListCashSessions, type CashSessionListItem } from './templates'
import type { ZCashSession } from '@/features/cash-session/schemas'
import StatusCard from './components/StatusCard'
import OpenForm from './components/OpenForm'
import { ErrorRequestHandler } from '@/components/organisms/ErrorRequestHandler'

export default async function CashierPage() {
  const responseSessionOpen = await getOpenCashSession()
  const responseSessions = await getCashSessions()

  if (!responseSessionOpen.ok) {
    return <ErrorRequestHandler result={responseSessionOpen} />
  }

  if (!responseSessions.ok) {
    return <ErrorRequestHandler result={responseSessions} />
  }

  const currency = (v?: number | null) =>
    typeof v === 'number'
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(v)
      : '-'
  const formatDate = (d?: string | null) =>
    d
      ? new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(d))
      : '-'
  const sessions = responseSessions.data
  const session = responseSessionOpen.data
  const displaySessions: CashSessionListItem[] = (sessions ?? []).map(
    (s: ZCashSession) => ({
      id: s.id,
      openedAt: formatDate(s.openedAt),
      openedById: s.openedById,
      closedAt: formatDate(s.closedAt),
      initialAmount: currency(s.initialAmount),
      finalAmount: currency(s.finalAmount),
      status: s.status,
    }),
  )

  return (
    <ContainerDashboard>
      <div className="p-4 md:p-6 w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>

        <div className="w-full mt-4">
          <Text className="uppercase font-bold text-xl lg:text-2xl text-black">
            Caixa teste
          </Text>
        </div>

        <div className="w-full mt-4 grid gap-8">
          <div className="w-full">
            {session && <StatusCard session={session ?? null} />}
            <OpenForm visible={!session} />
            <Listing
              title={infoListCashSessions.title}
              list={displaySessions}
              infoList={infoListCashSessions}
              count={(sessions?.length ?? 0) as number}
            />
          </div>
        </div>
      </div>
    </ContainerDashboard>
  )
}
