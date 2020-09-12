import { Permissions } from 'entities/Permissions'

export interface IPermissionsRepository {
  findByTitle(title: string): Promise<Permissions | undefined>
  findById(id: string): Promise<Permissions | undefined>
  save(permissions: Permissions): Promise<void>
  findMany(): Promise<Permissions[]>
  update(permissions: Permissions): Promise<Permissions>
}
