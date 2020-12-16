import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { get } from 'lodash'

import { secret } from '~/configs/authentication'
import { findPermissionsByIdModule } from '~/modules/permissions'
import { findUserByIdModule } from '~/modules/users'

function extractToken(authHeader: string) {
  const [, token] = authHeader.split(' ')

  return token
}

export async function auth(req: Request, res: Response, next: Function) {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader) {
      throw new createHttpError.Unauthorized('Usuário não autenticado')
    }

    const token = extractToken(authHeader)

    const decoded = jwt.verify(token, secret)

    if (typeof decoded === 'object') {
      const userId: string = get(decoded, 'id')

      const user = await findUserByIdModule.execute(userId)

      if (user.disabledAt) {
        throw new createHttpError.BadRequest('Usuário desabilitado')
      }

      if (!user.permissionsId) {
        throw new createHttpError.BadRequest(
          'Usuário não possui permissões cadastradas'
        )
      }

      const permissions = await findPermissionsByIdModule.execute(
        user.permissionsId
      )

      if (!permissions) {
        throw new createHttpError.BadRequest(
          'Usuário não possui permissões cadastradas'
        )
      }

      req.auth = { user, permissions }

      return next()
    } else {
      throw new createHttpError.Unauthorized('Autenticação inválida')
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      err.message = 'Autenticação inválida'
    }

    throw new createHttpError.BadRequest(err.message || 'Erro inesperado')
  }
}
