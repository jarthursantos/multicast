import createHttpError from 'http-errors'

import { IUser } from '~/domain/IUser'
import { IPermissionsModel } from '~/models/permissions/IPermissionsModel'

import { IUpdatePermissionsDTO } from './dto'

export function createUpdatePermissionsModule(
  permissionsModal: IPermissionsModel
) {
  return {
    async execute(authUser: IUser, id: string, data: IUpdatePermissionsDTO) {
      const permissions = await permissionsModal.findById(id)

      if (!permissions) {
        throw new createHttpError.NotFound('Permissões não encontradas')
      }

      if (data.title && data.title !== permissions.title) {
        const titleInUse = await permissionsModal.findByTitle(data.title)

        if (titleInUse) {
          throw new createHttpError.Conflict('Título já existe')
        }
      }

      Object.assign(permissions, data)

      const updatedPermissions = await permissionsModal.update(permissions)

      return updatedPermissions
    }
  }
}
