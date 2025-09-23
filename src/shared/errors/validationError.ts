/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ZodError, ZodIssue } from 'zod'
import { AppError } from '../../utils/error/appError'

export class ValidationError extends AppError {
  issues: ZodIssue[]

  constructor(message: string, issues: ZodIssue[]) {
    super(message, {
      status: 422,
      code: 'VALIDATION_ERROR',
      details: { issues: compactIssues(issues) },
    })
    this.issues = issues
  }

  static fromZod(error: ZodError, message = 'Invalid schema') {
    return new ValidationError(message, error.issues)
  }
}

function compactIssues(issues: ZodIssue[]) {
  return issues.map((i) => ({
    path: i.path.join('.'),
    code: i.code,
    message: i.message,
    ...(Object.prototype.hasOwnProperty.call(i, 'expected')
      ? { expected: (i as any).expected }
      : {}),
    ...(Object.prototype.hasOwnProperty.call(i, 'received')
      ? { received: (i as any).received }
      : {}),
  }))
}
