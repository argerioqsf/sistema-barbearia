import { ContainerDashboard } from '@/components/molecules'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import { Text } from '@/components/atoms'
import { getOpenCashSession, getCashSessions } from '@/actions/cash-session'
import Listing from '@/components/organisms/Listing'
import { infoListCashSessions, type CashSessionListItem } from './templates'
import type { ZCashSession } from '@/features/cash-session/schemas'
import StatusCard from './components/StatusCard'
import OpenForm from './components/OpenForm'
import ErrorState from '@/components/molecules/ErrorState'

export default async function CashierPage() {
  const { response: session, error: errorOpen } = await getOpenCashSession()
  const { response: sessions, error: errorList } = await getCashSessions()
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
  const displaySessions: CashSessionListItem[] = (sessions ?? []).map(
    (s: ZCashSession) => ({
      id: s.id,
      openedAt: formatDate(s.openedAt),
      closedAt: formatDate(s.closedAt),
      initialAmount: currency(s.initialAmount),
      finalAmount: currency(s.finalAmount),
      status: s.status,
    }),
  )
  if (errorOpen?.message || errorList?.message) {
    return (
      <ErrorState
        title="Erro ao carregar dados do caixa"
        message={String(errorOpen?.message ?? errorList?.message)}
      />
    )
  }

  return (
    <ContainerDashboard>
      <div className="p-[5vw] lg:p-[2.5vw] w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="w-full">
          <Breadcrumb />
        </div>

        <div className="w-full mt-4">
          <Text className="uppercase font-bold text-xl lg:text-2xl text-black">
            Caixa
          </Text>
        </div>

        <div className="w-full mt-4 grid gap-8">
          {session && <StatusCard session={session ?? null} />}
          <OpenForm visible={!session} />

          <div className="w-full">
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
