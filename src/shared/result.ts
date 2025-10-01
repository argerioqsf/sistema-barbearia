export interface Success<T> {
  readonly ok: true
  readonly value: T
}

export interface Failure<E> {
  readonly ok: false
  readonly error: E
}
export type Result<T, E = Error> = Success<T> | Failure<E>

export function ok<T>(value: T): Success<T> {
  return { ok: true, value }
}

export function err<E>(error: E): Failure<E> {
  return { ok: false, error }
}

export function isOk<T, E>(r: Result<T, E>): r is Success<T> {
  return r.ok
}

export function isErr<T, E>(r: Result<T, E>): r is Failure<E> {
  return !r.ok
}

export async function fromPromise<T, E = unknown>(
  p: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const value = await p
    return ok(value)
  } catch (e) {
    return err(e as E)
  }
}
