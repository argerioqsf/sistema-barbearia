import ErrorState from '@/components/molecules/ErrorState'
import { onUnauthorizedDefault } from '@/shared/errors/onUnauthorized'
import { ReturnRequestFailed } from '@/types/general'

export async function ErrorRequestHandler({
  result,
}: {
  result: ReturnRequestFailed
}) {
  if (result.error.type === 'http' && result.error.status === 401) {
    console.log('Unauthorized')
    await onUnauthorizedDefault()
  }
  const errorMessage = result.error.message
  return (
    <ErrorState title="Erro ao carregar as vendas" message={errorMessage} />
  )
}
