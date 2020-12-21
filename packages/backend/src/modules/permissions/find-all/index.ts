import { IPermissionsModel } from '~/models/permissions/IPermissionsModel'

export function createFindAllPermissionsModule(
  permissionsModel: IPermissionsModel
) {
  return {
    async execute() {
      const permissions = await permissionsModel.findMany()

      return permissions
    }
  }
}
