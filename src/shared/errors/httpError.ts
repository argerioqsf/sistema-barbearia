import { AppError } from '../../utils/error/appError'

export class HttpError extends AppError {
  constructor(status: number, message: string, details?: unknown) {
    super(message, { status, code: 'HTTP_ERROR', details })
  }
}
