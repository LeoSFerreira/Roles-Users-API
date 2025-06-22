import { dataSource } from 'src/shared/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/User'
import {
  CreateUserDTO,
  IUsersRepository,
  PaginateParams,
  UsersPaginateProperties,
} from './IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }

  async create({
    name,
    email,
    password,
    isAdmin,
    role,
  }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      isAdmin,
      role,
    })
    return this.repository.save(user)
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }

  async findAll({
    search,
    page,
    skip,
    take,
  }: PaginateParams): Promise<UsersPaginateProperties> {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')

    if (search) {
      queryBuilder.andWhere(`LOWER(user.name) LIKE LOWER(:search)`, {
        search: `%${search.toLowerCase()}%`,
      })
    }

    queryBuilder.orderBy('user.name', 'ASC')

    const [users, count] = await queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result: UsersPaginateProperties = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    }

    return result
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email })
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }
}
