import { Router } from 'express'
import { createRolesController } from 'src/roles/useCases/createRole'
import { listRolesController } from 'src/roles/useCases/listRoles'

const rolesRouter = Router()
rolesRouter.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

export { rolesRouter }
