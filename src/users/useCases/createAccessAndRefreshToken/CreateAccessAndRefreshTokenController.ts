import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateAccessAndRefreshTokenUseCase } from './CreateAccessAndRefreshTokenUseCase'

export class CreateAccessAndRefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAccessAndRefreshToken = container.resolve(
      CreateAccessAndRefreshTokenUseCase,
    )
    const user_id = request.user.id
    const { refresh_token } = request.body

    const { user, accessToken, refreshToken } =
      await createAccessAndRefreshToken.execute({
        user_id,
        refresh_token,
      })
    response
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })

    return response.status(201).json(
      instanceToInstance({
        user,
        message: 'Token refreshed',
      }),
    )
  }
}
