import { Role } from 'src/roles/entities/Role'
import { IRolesRepository } from 'src/roles/repositories/IRolesRepository'
import { AppError } from 'src/shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
type ShowRoleParams = {
  id: string
}

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }
    return role
  }
}
