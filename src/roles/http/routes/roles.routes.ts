import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import { CreateRoleController } from 'src/roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from 'src/roles/useCases/listRoles/ListRolesController'
import { ShowRoleController } from 'src/roles/useCases/showRole/ShowRoleController'
import { UpdateRoleController } from 'src/roles/useCases/updateRole/UpdateRoleController'
import { DeleteRoleController } from 'src/roles/useCases/deleteRole/DeleteRoleController'
import csrf from 'csurf'
import { isAuthenticated } from 'src/shared/http/middlewares/isAuthenticated'
import { csrfProtection } from 'src/shared/http/middlewares/csrfProtection'

const rolesRouter = Router()
const createRolesController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const showRolesController = container.resolve(ShowRoleController)
const updateRolesController = container.resolve(UpdateRoleController)
const deleteRolesController = container.resolve(DeleteRoleController)

rolesRouter.use(isAuthenticated)
rolesRouter.post(
  '/',
  csrfProtection,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createRolesController.handle(request, response)
  },
)

rolesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listRolesController.handle(request, response)
  },
)

rolesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return showRolesController.handle(request, response)
  },
)

rolesRouter.put(
  '/:id',
  csrfProtection,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return updateRolesController.handle(request, response)
  },
)

rolesRouter.delete(
  '/:id',
  csrfProtection,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return deleteRolesController.handle(request, response)
  },
)
export { rolesRouter }
