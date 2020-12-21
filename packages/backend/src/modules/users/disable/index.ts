import createHttpError from 'http-errors'

import { IUser } from '~/domain/IUser'
import { IUserChangesModel } from '~/models/users/changes/IUserChangesModel'
import { IUsersModel } from '~/models/users/IUsersModel'

export function createDisableUserModule(
  usersModel: IUsersModel,
  userChangesModel: IUserChangesModel
) {
  return {
    async execute(authUser: IUser, id: string) {
      const user = await usersModel.findById(id)

      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado')
      }

      await usersModel.disable(user)
      await userChangesModel.logDisabled(authUser, user)
    }
  }
}
