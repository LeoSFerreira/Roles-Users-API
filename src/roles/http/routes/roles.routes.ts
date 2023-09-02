import { Router } from 'express'
import { createRolesController } from 'src/roles/useCases/createRole'
import { deleteRolesController } from 'src/roles/useCases/deleteRole'
import { listRolesController } from 'src/roles/useCases/listRoles'
import { showRolesController } from 'src/roles/useCases/showRole'
import { updateRolesController } from 'src/roles/useCases/updateRole'
import { celebrate, Joi, Segments } from 'celebrate'

const rolesRouter = Router()
rolesRouter.post(
  '/',
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
