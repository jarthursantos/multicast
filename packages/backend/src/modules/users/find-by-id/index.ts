import createHttpError from 'http-errors'

import { IUsersModel } from '~/models/users/IUsersModel'

export function createFindUserByIdModule(usersModel: IUsersModel) {
  return {
    async execute(id: string) {
      const user = await usersModel.findById(id)

      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado')
      }

      delete user.password

      return user
    }
  }
}
