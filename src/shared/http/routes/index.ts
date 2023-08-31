import { Router } from 'express'
import { AppError } from 'src/shared/errors/AppError'

const routes = Router()

routes.get('/', (request, response) => {
  throw new AppError('Acesso negado')
  return response.json({ message: 'Olá, mundo!' })
})

export { routes }
