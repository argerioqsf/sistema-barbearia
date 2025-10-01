/* eslint-disable no-void */
// src/shared/errors/handle-request-error.ts
import { normalizeError } from '@/shared/errors/normalizeError'
import type { NormalizedError } from './types'

type HandleOptions = {
  // Efeitos/integrações opcionais:
  onUnauthorized?: () => void | Promise<void>
  toast?: { error?: (msg: string) => void } // adapte para seu sistema de toast
  logger?: { error?: (data: unknown, msg?: string) => void }
  rethrow?: boolean // se true, relança após tratar
  // Mapeamento opcional por status
  customHttpHandlers?: Partial<
    Record<
      number,
      (err: Extract<NormalizedError, { type: 'http' }>) => void | Promise<void>
    >
  >
}

export function handleRequestError(
  err: unknown,
  opts: HandleOptions = {},
): never | NormalizedError {
  const nerr = normalizeError(err)

  // Log estruturado (se houver logger)
  opts.logger?.error?.({ error: nerr }, `[RequestError] ${nerr.type}`)

  // Roteamento por tipo
  switch (nerr.type) {
    case 'validation': {
      // Exemplo: exibir toast genérico (UI de formulário trataria issues)
      opts.toast?.error?.(nerr.message)
      if (opts.rethrow) throw err
      return nerr
    }

    case 'http': {
      // Handlers custom por status (ex.: 403, 404, 409…)
      const handler = opts.customHttpHandlers?.[nerr.status]
      if (handler) void handler(nerr)

      // Comportamento default de 401
      if (nerr.status === 401 && opts.onUnauthorized) {
        void opts.onUnauthorized()
        // geralmente você não quer continuar a request depois daqui
      }

      // Exiba toast para 500+ por padrão
      if (nerr.status >= 500) {
        opts.toast?.error?.(nerr.message || 'Erro no servidor')
      }

      if (opts.rethrow) throw err
      console.log('nerr: ', nerr)
      return nerr
    }

    case 'network': {
      opts.toast?.error?.(
        'Sem conexão. Verifique sua internet e tente novamente.',
      )
      if (opts.rethrow) throw err
      return nerr
    }

    case 'timeout': {
      opts.toast?.error?.('Tempo de espera esgotado. Tente novamente.')
      if (opts.rethrow) throw err
      return nerr
    }

    case 'aborted': {
      // Geralmente silencioso; opcionalmente logar
      if (opts.rethrow) throw err
      return nerr
    }

    case 'unknown':
    default: {
      opts.toast?.error?.('Algo deu errado. Tente novamente.')
      if (opts.rethrow) throw err
      return nerr
    }
  }
}
