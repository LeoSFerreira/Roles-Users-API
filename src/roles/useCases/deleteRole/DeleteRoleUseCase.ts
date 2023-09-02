import { RolesRepository } from 'src/roles/repositories/RolesRepository'
import { AppError } from 'src/shared/errors/AppError'

type DeleteRoleParams = {
  id: string
}

export class DeleteRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  async execute({ id }: DeleteRoleParams): Promise<void> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }
    await this.rolesRepository.delete(role)
  }
}
