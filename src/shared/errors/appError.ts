export class AppError extends Error {
  status?: number
  code?: string
  details?: unknown

  constructor(
    message: string,
    opts?: {
      status?: number
      code?: string
      details?: unknown
      cause?: unknown
    },
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = new.target.name
    this.status = opts?.status
    this.code = opts?.code
    this.details = opts?.details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (opts?.cause) this.cause = opts.cause
  }
}
