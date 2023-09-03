import { Router } from 'express'
import { rolesRouter } from 'src/roles/http/routes/roles.routes'
import { usersRouter } from 'src/users/http/routes/users.routes'
const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Olá, mundo!' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)
export { routes }
