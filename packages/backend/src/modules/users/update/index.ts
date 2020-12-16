import createHttpError from 'http-errors'
import { assign } from 'lodash'

import { createUser, IUser } from '~/domain/IUser'
import { IUserChangesModel } from '~/models/users/changes/IUserChangesModel'
import { IUsersModel } from '~/models/users/IUsersModel'

import { IUpdateUserDTO } from './dto'

export function createUpdateUserModule(
  usersModel: IUsersModel,
  userChangesModel: IUserChangesModel
) {
  return {
    async execute(authUser: IUser, id: string, data: IUpdateUserDTO) {
      const user = await usersModel.findById(id)

      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado')
      }

      if (data.email && data.email !== user.email) {
        const emailInUse = await usersModel.findByEmail(data.email)

        if (emailInUse) {
          throw new createHttpError.Conflict('Email já em uso')
        }
      }

      const updateData = assign(
        createUser({ ...user, email: user.email.toLowerCase() }, user.id),
        data
      )

      const updatedUser = await usersModel.update(updateData)

      await userChangesModel.logUpdate(authUser, user, updatedUser)

      delete user.password

      return updatedUser
    }
  }
}
