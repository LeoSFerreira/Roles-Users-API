import { NextFunction, Request, Response } from 'express'
import { AppError } from './AppError'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  if ((error as any).code === 'EBADCSRFTOKEN') {
    return response.status(403).json({
      status: 'error',
      message: 'Invalid CSRF token',
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
