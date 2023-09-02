import { Router } from 'express'
import { createRolesController } from 'src/roles/useCases/createRole'
import { listRolesController } from 'src/roles/useCases/listRoles'
import { showRolesController } from 'src/roles/useCases/showRole'
import { updateRolesController } from 'src/roles/useCases/updateRole'

const rolesRouter = Router()
rolesRouter.post('/', (request, response) => {
  return createRolesController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return showRolesController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
  return updateRolesController.handle(request, response)
})
export { rolesRouter }
