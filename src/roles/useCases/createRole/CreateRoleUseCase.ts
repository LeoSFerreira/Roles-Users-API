import { Role } from 'src/roles/entities/Role'
import { RolesRepository } from 'src/roles/repositories/RolesRepository'
import { AppError } from 'src/shared/errors/AppError'

type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  execute({ name }: CreateRoleDTO): Role {
    const roleAlreadyExists = this.rolesRepository.findByName(name)
    if (roleAlreadyExists) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.create({ name })
  }
}
