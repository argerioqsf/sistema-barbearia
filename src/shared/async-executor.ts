import type { NormalizedError } from '@/shared/errors/types'
import type { Result } from '@/shared/result'
import { isOk } from '@/shared/result'

export interface AsyncState<T> {
  loading: boolean
  error: string | null
  data: T | null
}

export const initialAsyncState: AsyncState<unknown> = {
  loading: false,
  error: null,
  data: null,
}

export async function execute<T>(
  operation: () => Promise<Result<T, NormalizedError>>,
  onSuccess?: (value: T) => void,
  onError?: (error: NormalizedError) => void,
): Promise<AsyncState<T>> {
  let state: AsyncState<T> = { loading: true, error: null, data: null }
  const result = await operation()
  if (isOk(result)) {
    onSuccess?.(result.value)
    state = { loading: false, error: null, data: result.value }
  } else {
    onError?.(result.error)
    state = { loading: false, error: result.error.message, data: null }
  }
  return state
}
