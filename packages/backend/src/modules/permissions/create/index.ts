import createHttpError from 'http-errors'

import { createPermissions } from '~/domain/IPermissions'
import { IUser } from '~/domain/IUser'
import { IPermissionsModel } from '~/models/permissions/IPermissionsModel'

import { ICreatePermissionsDTO } from './dto'

export function createCreatePermissionsModule(
  permissionsModal: IPermissionsModel
) {
  return {
    async execute(authUser: IUser, data: ICreatePermissionsDTO) {
      const { title } = data

      const titleAlreadyInUse = await permissionsModal.findByTitle(title)

      if (titleAlreadyInUse) {
        throw new createHttpError.Conflict('Título já existe')
      }

      const permissions = createPermissions(data)

      await permissionsModal.save(permissions)

      return permissions
    }
  }
}
