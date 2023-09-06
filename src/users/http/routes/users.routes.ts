import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { isAuthenticated } from 'src/shared/http/middlewares/isAuthenticated'
import { CreateAccessAndRefreshTokenController } from 'src/users/useCases/createAccessAndRefreshToken/CreateAccessAndRefreshTokenController'
import { CreateLoginController } from 'src/users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from 'src/users/useCases/createUser/CreateUserController'
import { ListUsersController } from 'src/users/useCases/listUsers/ListUsersController'
import { container } from 'tsyringe'
import { addUserInfoToRequest } from '../middlewares/addUserInfoToRequest'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const createAccessAndRefreshTokenController = container.resolve(
  CreateAccessAndRefreshTokenController,
)
usersRouter.post(
  '/',
  isAuthenticated,
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
  isAuthenticated,
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

usersRouter.post(
  '/refresh_token',
  addUserInfoToRequest,
  addUserInfoToRequest,
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  (request, response) => {
    return createAccessAndRefreshTokenController.handle(request, response)
  },
)

export { usersRouter }
