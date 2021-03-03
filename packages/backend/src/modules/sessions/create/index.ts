import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

import { secret } from '~/configs/authentication'
import { IUsersModel } from '~/models/users/IUsersModel'

import { ICreateSessionDTO } from './dto'

export function createCreateSessionModule(usersModel: IUsersModel) {
  return {
    async execute(data: ICreateSessionDTO) {
      const { email, password } = data

      const user = await usersModel.findByEmail(email.toLowerCase())

      if (!user) {
        throw new createHttpError.NotFound('Usuário não encontrado')
      }

      if (user.password !== password) {
        throw new createHttpError.BadRequest('Senha inválida')
      }

      if (user.disabledAt) {
        throw new createHttpError.BadRequest('Usuário desativado')
      }

      delete user.password

      return { user, token: jwt.sign({ id: user.id }, secret) }
    }
  }
}
