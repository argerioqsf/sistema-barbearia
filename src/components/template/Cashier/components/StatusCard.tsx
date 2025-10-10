import { Text } from '@/components/atoms'
import type { ZCashSession } from '@/features/cash-session/schemas'
import CloseButton from './CloseButton'
import { TransactionTimeline } from '@/components/molecules'

type Props = {
  session?: ZCashSession | null
}

export default function StatusCard({ session }: Props) {
  const isOpen = session?.closedAt === null
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

  return (
    <div className="w-full rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
        <Text className="font-semibold text-gray-800">Status atual</Text>

        {isOpen && <CloseButton />}
      </div>
      <div className="p-6">
        {session ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4 bg-white">
              <Text className="text-gray-500">Status</Text>
              {session && (
                <span
                  className={
                    'rounded-full px-3 py-1 text-xs font-semibold ' +
                    (isOpen
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700')
                  }
                >
                  {isOpen ? 'ABERTO' : 'FECHADO'}
                </span>
              )}
            </div>
            <div className="rounded-xl border p-4 bg-white">
              <Text className="text-gray-500">Aberto em</Text>
              <p className="mt-1 font-semibold text-gray-900">
                {formatDate(session.openedAt)}
              </p>
            </div>
            <div className="rounded-xl border p-4 bg-white">
              <Text className="text-gray-500">Valor inicial</Text>
              <p className="mt-1 font-semibold text-gray-900">
                {currency(session.initialAmount)}
              </p>
            </div>
            {session.finalAmount != null && (
              <div className="rounded-xl border p-4 bg-white">
                <Text className="text-gray-500">Valor final</Text>
                <p className="mt-1 font-semibold text-gray-900">
                  {currency(session.finalAmount)}
                </p>
              </div>
            )}
          </div>
        ) : (
          <Text className="text-gray-600">
            Nenhuma sessão de caixa encontrada.
          </Text>
        )}
      </div>
      <div className="px-6 pb-6">
        {isOpen && (
          <TransactionTimeline
            transactions={session?.transactions ?? []}
            emptyMessage="Nenhuma transação registrada nesta sessão."
            className="mt-4"
          />
        )}
      </div>
    </div>
  )
}
