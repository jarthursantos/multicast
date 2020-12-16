import { IPermissions } from '~/domain/IPermissions'

export interface IPermissionsModel {
  findByTitle(title: string): Promise<IPermissions | undefined>
  findById(id: string): Promise<IPermissions | undefined>
  save(permissions: IPermissions): Promise<void>
  findMany(): Promise<IPermissions[]>
  update(permissions: IPermissions): Promise<IPermissions>
}
