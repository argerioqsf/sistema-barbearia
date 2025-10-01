import { normalizeError } from '@/shared/errors/normalizeError'
import type { NormalizedError } from '@/shared/errors/types'
import { ok, err, type Result } from '@/shared/result'
import { readMessage, safeJson, type JsonLike } from '@/shared/http'

type ServerApi = (typeof import('@/data/api'))['api']

export interface RequestOptions<TQuery> extends RequestInit {
  page?: string
  where?: Partial<TQuery>
  retries?: number
  retryDelayMs?: number
  next?: Record<string, unknown>
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let serverApi: ServerApi | undefined

async function getServerApi(): Promise<ServerApi> {
  if (!serverApi) {
    const moduleApi = await import('@/data/api')
    serverApi = moduleApi.api
  }
  return serverApi
}

function buildBrowserUrl<Query>(
  path: string,
  page?: string,
  where?: Partial<Query>,
) {
  const base =
    typeof window !== 'undefined' ? window.location.origin : undefined
  const isAbsolute = /^https?:\/\//.test(path)
  const url = new URL(path, isAbsolute ? undefined : base)
  if (page) url.searchParams.set('page', String(page))
  if (where) {
    Object.entries(where).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value))
      }
    })
  }
  return url
}

async function fetchFromBrowser<Query>(
  path: string,
  init: RequestInit,
  page?: string,
  where?: Partial<Query>,
) {
  const url = buildBrowserUrl<Query>(path, page, where)
  const finalInit: RequestInit = { cache: 'no-store', ...init }
  return fetch(url.toString(), finalInit)
}

export async function request<Resp = JsonLike, Query = unknown>(
  path: string,
  options: RequestOptions<Query> = {},
): Promise<Result<Resp, NormalizedError>> {
  const { retries = 0, retryDelayMs = 250, page, where, ...init } = options
  let attempt = 0
  while (true) {
    try {
      const response =
        typeof window === 'undefined'
          ? await (
              await getServerApi()
            )<Query>(path, init, page, where)
          : await fetchFromBrowser<Query>(path, init, page, where)
      if (!response.ok) {
        const message = await readMessage(response)
        return err({ type: 'http', message, status: response.status })
      }
      const json = (await safeJson(response)) as Resp
      return ok(json)
    } catch (e) {
      const normalized = normalizeError(e)
      if (attempt < retries) {
        attempt += 1
        await sleep(retryDelayMs)
        continue
      }
      return err(normalized)
    }
  }
}

export const httpClient = {
  get: <Resp = JsonLike, Query = unknown>(
    path: string,
    options?: RequestOptions<Query>,
  ) => request<Resp, Query>(path, { ...options, method: 'GET' }),
  put: <Resp = JsonLike, Query = unknown>(
    path: string,
    body?: unknown,
    options?: RequestOptions<Query>,
  ) =>
    request<Resp, Query>(path, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    }),
  post: <Resp = JsonLike, Query = unknown>(
    path: string,
    body?: unknown,
    options?: RequestOptions<Query>,
  ) =>
    request<Resp, Query>(path, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <Resp = JsonLike, Query = unknown>(
    path: string,
    body?: unknown,
    options?: RequestOptions<Query>,
  ) =>
    request<Resp, Query>(path, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    }),
  del: <Resp = JsonLike, Query = unknown>(
    path: string,
    body?: unknown,
    options?: RequestOptions<Query>,
  ) =>
    request<Resp, Query>(path, {
      ...options,
      method: 'DELETE',
      headers: body
        ? {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
          }
        : options?.headers,
      body: body ? JSON.stringify(body) : undefined,
    }),
}
