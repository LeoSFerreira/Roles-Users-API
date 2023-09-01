import { Router } from 'express'
import { RolesRepository } from 'src/roles/repositories/RoleRepository'
import { createRolesController } from 'src/roles/useCases/createRole'

const rolesRouter = Router()
const rolesRepository = new RolesRepository()
rolesRouter.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  const roles = rolesRepository.findAll()
  return response.json(roles)
})

export { rolesRouter }
