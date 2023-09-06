import { container } from 'tsyringe'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { CreateLoginController } from '../useCases/createLogin/CreateLoginController'
import { CreateUserController } from '../useCases/createUser/CreateUserController'
import { ListUsersController } from '../useCases/listUsers/ListUsersController'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
