export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LoggerOptions {
  scope?: string
  enabledLevels?: LogLevel[]
}

const defaultLevels: LogLevel[] = ['debug', 'info', 'warn', 'error']

function tag(scope?: string) {
  return scope ? `[${scope}]` : ''
}

const timestampFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

function timestamp() {
  return timestampFormatter.format(new Date())
}

export function createLogger({
  scope,
  enabledLevels = defaultLevels,
}: LoggerOptions = {}) {
  const has = (lvl: LogLevel) => enabledLevels.includes(lvl)
  return {
    debug(payload: unknown, msg?: string) {
      if (has('debug'))
        console.debug(tag(scope), msg ?? '', payload, timestamp())
    },
    info(payload: unknown, msg?: string) {
      if (has('info')) console.info(tag(scope), msg ?? '', payload, timestamp())
    },
    warn(payload: unknown, msg?: string) {
      if (has('warn')) console.warn(tag(scope), msg ?? '', payload, timestamp())
    },
    error(payload: unknown, msg?: string) {
      if (has('error'))
        console.error(tag(scope), msg ?? '', payload, timestamp())
    },
  }
}

export const logger = createLogger({ scope: 'app' })
