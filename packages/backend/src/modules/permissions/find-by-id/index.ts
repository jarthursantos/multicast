import createHttpError from 'http-errors'

import { IPermissionsModel } from '~/models/permissions/IPermissionsModel'

export function createFindPermissionsByIdModule(
  permissionsModel: IPermissionsModel
) {
  return {
    async execute(id: string) {
      const permissions = permissionsModel.findById(id)

      if (!permissions) {
        throw new createHttpError.NotFound('Permissões não encontradas')
      }

      return permissions
    }
  }
}
