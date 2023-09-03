import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CreateLoginController } from 'src/users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from 'src/users/useCases/createUser/CreateUserController'
import { ListUsersController } from 'src/users/useCases/listUsers/ListUsersController'
import { container } from 'tsyringe'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

export { usersRouter }
