import { DataSource } from 'typeorm'
import { CreateRolesTable1693673167180 } from './migrations/1693673167180-CreateRolesTable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [],
  migrations: [CreateRolesTable1693673167180],
})
