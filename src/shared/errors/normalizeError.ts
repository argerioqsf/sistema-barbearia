/* eslint-disable @typescript-eslint/no-explicit-any */
// src/shared/errors/normalize-error.ts
import { HttpError } from '@/shared/errors/httpError'
import { ValidationError } from '@/shared/errors/validationError'
import type { NormalizedError } from './types'

function isAbortError(err: unknown) {
  // Browser/Node DOMException para abort de fetch
  return err instanceof DOMException && err.name === 'AbortError'
}

export function normalizeError(err: unknown): NormalizedError {
  // Zod / validação
  if (err instanceof ValidationError) {
    return {
      type: 'validation',
      message: err.message || 'Erro de validação',
      issues: err.details ?? err.issues,
      code: 'VALIDATION_ERROR',
      status: 422,
      // details: err,
    }
  }

  // HTTP
  if (err instanceof HttpError) {
    return {
      type: 'http',
      message: err.message || `HTTP ${err.status}`,
      status: err.status ?? 500,
      code: 'HTTP_ERROR',
      // details: err,
    }
  }

  // Abort (cancelamento de request)
  if (isAbortError(err)) {
    return {
      type: 'aborted',
      message: 'Requisição cancelada',
      code: 'ABORTED',
      // details: err,
    }
  }

  // Timeout (caso você use AbortController para timeout)
  if (
    err &&
    typeof err === 'object' &&
    'code' in err &&
    (err as any).code === 'ETIMEOUT'
  ) {
    return {
      type: 'timeout',
      message: 'Tempo de requisição esgotado',
      code: 'ETIMEOUT',
      // details: err,
    }
  }

  // Network (fetch falha de rede tipicamente cai em TypeError no browser)
  if (err instanceof TypeError) {
    return {
      type: 'network',
      message: 'Falha de rede ao comunicar com o servidor',
      code: 'NETWORK_ERROR',
      // details: err,
    }
  }

  // Fallback
  const message =
    typeof err === 'object' &&
    err &&
    'message' in err &&
    typeof (err as any).message === 'string'
      ? (err as any).message
      : 'Erro desconhecido'

  return {
    type: 'unknown',
    message,
    code:
      typeof err === 'object' && err && 'code' in err
        ? String((err as any).code)
        : undefined,
    // details: err,
  }
}
