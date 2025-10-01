export type NormalizedError =
  | {
      type: 'validation'
      message: string
      issues?: unknown
      code?: string
      status?: 422
      details?: unknown
    }
  | {
      type: 'http'
      message: string
      status: number
      code?: string
      details?: unknown
    }
  | { type: 'network'; message: string; code?: string; details?: unknown }
  | { type: 'timeout'; message: string; code?: string; details?: unknown }
  | { type: 'aborted'; message: string; code?: string; details?: unknown }
  | { type: 'unknown'; message: string; code?: string; details?: unknown }
