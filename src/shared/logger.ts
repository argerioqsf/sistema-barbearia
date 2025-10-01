export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LoggerOptions {
  scope?: string
  enabledLevels?: LogLevel[]
}

const defaultLevels: LogLevel[] = ['debug', 'info', 'warn', 'error']

function tag(scope?: string) {
  return scope ? `[${scope}]` : ''
}

export function createLogger({
  scope,
  enabledLevels = defaultLevels,
}: LoggerOptions = {}) {
  const has = (lvl: LogLevel) => enabledLevels.includes(lvl)
  return {
    debug(payload: unknown, msg?: string) {
      if (has('debug')) console.debug(tag(scope), msg ?? '', payload)
    },
    info(payload: unknown, msg?: string) {
      if (has('info')) console.info(tag(scope), msg ?? '', payload)
    },
    warn(payload: unknown, msg?: string) {
      if (has('warn')) console.warn(tag(scope), msg ?? '', payload)
    },
    error(payload: unknown, msg?: string) {
      if (has('error')) console.error(tag(scope), msg ?? '', payload)
    },
  }
}

export const logger = createLogger({ scope: 'app' })
