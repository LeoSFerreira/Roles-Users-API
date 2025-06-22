import { inject, injectable } from 'tsyringe'
import {
  IUsersRepository,
  UsersPaginateProperties,
} from 'src/users/repositories/IUsersRepository'

type ListUsersUseCaseParams = {
  page: number
  limit: number
  search: string
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    limit,
    page,
    search,
  }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.usersRepository.findAll({ page, skip, take, search })
  }
}
