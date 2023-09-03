import { Role } from 'src/roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1693673167180 } from './migrations/1693673167180-CreateRolesTable'
import { CreateUserTable1693740137535 } from './migrations/1693740137535-CreateUserTable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1693673167180, CreateUserTable1693740137535],
})
