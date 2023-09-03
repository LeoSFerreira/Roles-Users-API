import { Role } from 'src/roles/entities/Role'
import { DataSource } from 'typeorm'
import { CreateRolesTable1693673167180 } from './migrations/1693673167180-CreateRolesTable'
import { CreateUserTable1693740137535 } from './migrations/1693740137535-CreateUserTable'
import { AddRoleIdToUsersTable1693740876194 } from './migrations/1693740876194-AddRoleIdToUsersTable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [
    CreateRolesTable1693673167180,
    CreateUserTable1693740137535,
    AddRoleIdToUsersTable1693740876194,
  ],
})
