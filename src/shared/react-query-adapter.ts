import type { NormalizedError } from '@/shared/errors/types'
import type { Result } from '@/shared/result'
import { isOk } from '@/shared/result'

// Converte um caso de uso que retorna Result<T, NormalizedError>
// em uma função de query que retorna T (ou lança erro normalizado)
export function makeQueryFn<T>(
  op: () => Promise<Result<T, NormalizedError>>,
): () => Promise<T> {
  return async () => {
    const res = await op()
    if (isOk(res)) return res.value
    // React Query trata erros lançados em onError
    throw res.error
  }
}

// Converte uma mutation (args -> Result<T>) em (args -> T | throw)
export function makeMutationFn<TArgs, TOut>(
  op: (args: TArgs) => Promise<Result<TOut, NormalizedError>>,
): (args: TArgs) => Promise<TOut> {
  return async (args: TArgs) => {
    const res = await op(args)
    if (isOk(res)) return res.value
    throw res.error
  }
}
