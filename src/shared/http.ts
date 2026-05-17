// Helpers for HTTP JSON utilities

export type JsonLike =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null

export async function safeJson(res: Response): Promise<JsonLike> {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function readMessage(res: Response): Promise<string> {
  let message
  try {
    const data = await res.json()
    message = data?.message ?? JSON.stringify(data)
  } catch {
    const text = await res.text()
    message = text || res.statusText || `HTTP ${res.status}`
  }

  return message
}
