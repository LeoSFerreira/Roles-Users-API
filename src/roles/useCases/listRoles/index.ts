import { RolesRepository } from 'src/roles/repositories/RolesRepository'
import { ListRolesController } from './ListRolesController'
import { ListRolesUseCase } from './ListRolesUseCase'

const rolesRepository = RolesRepository.getInstance()
const listRoleUseCase = new ListRolesUseCase(rolesRepository)
export const listRolesController = new ListRolesController(listRoleUseCase)
