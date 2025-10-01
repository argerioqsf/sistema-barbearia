import type { NormalizedError } from './types'

function inferTypeFromStatus(status: number): NormalizedError['type'] {
  if (status === 422) return 'validation'
  if (status >= 400 && status < 600) return 'http'
  return 'unknown'
}

export function toNormalizedError(
  message: string,
  status?: number,
): NormalizedError {
  if (status !== undefined) {
    const type = inferTypeFromStatus(status)
    if (type === 'validation') {
      return { type, message, status: 422 }
    }
    if (type === 'http') {
      return { type, message, status }
    }
  }

  return { type: 'unknown', message }
}
