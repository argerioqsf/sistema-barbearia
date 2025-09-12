// Token refresh helper: prefer updating the NextAuth JWT instead of cookies.

export async function safeJson(res: Response) {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export async function readMessage(res: Response) {
  try {
    const j = await res.json()
    // Return early if a message exists
    if (
      j &&
      typeof j === 'object' &&
      'message' in (j as Record<string, unknown>)
    ) {
      const m = (j as Record<string, unknown>).message
      return typeof m === 'string' ? m : 'Request failed'
    }
    return 'Request failed'
  } catch {
    return 'Request failed'
  }
}

export function updateTokenFromResponse(
  _res: Response, // eslint-disable-line @typescript-eslint/no-unused-vars
  _json?: unknown, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  // no-op for now — JWT is managed by NextAuth.
}
