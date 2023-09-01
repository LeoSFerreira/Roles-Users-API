import { Router } from 'express'
import { RolesRepository } from 'src/roles/repositories/RoleRepository'
const rolesRouter = Router()

rolesRouter.post('/', (request, response) => {
  const { name } = request.body
  const rolesRepository = new RolesRepository()

  const role = rolesRepository.create({ name })

  return response.status(201).json(role)
})

export { rolesRouter }
