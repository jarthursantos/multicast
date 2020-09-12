import { secret } from 'configs/auth'
import { Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { get } from 'lodash'
import { findPermissionsByIdUseCase } from 'use-cases/FindPermissionById'
import { findUserByIdUseCase } from 'use-cases/FindUserById'

function extractToken(authHeader: string) {
  const [, token] = authHeader.split(' ')

  return token
}

export default async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader) {
      throw new Error('Usuário não autenticado')
    }

    const token = extractToken(authHeader)

    const decoded = jwt.verify(token, secret)

    if (typeof decoded === 'object') {
      const userId: string = get(decoded, 'id')

      const user = await findUserByIdUseCase.execute(userId)

      if (user.disabledAt) {
        throw new Error('Usuário desabilitado')
      }

      if (!user.permissionsId) {
        throw new Error('Usuário não possui permissões cadastradas')
      }

      const permissions = await findPermissionsByIdUseCase.execute(
        user.permissionsId
      )

      req.auth = { user, permissions }

      return next()
    } else {
      throw new Error('Autenticação inválida')
    }
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      err.message = 'Autenticação inválida'
    }

    return res.status(400).json({
      message: err.message || 'Unexpected error'
    })
  }
}
