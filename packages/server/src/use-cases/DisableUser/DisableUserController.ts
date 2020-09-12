import { Role } from '@prisma/client'
import { Request, Response } from 'express'

import { DisableUserUseCase } from './DisableUserUseCase'

export class DisableUserController {
  constructor(private disableUserCase: DisableUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (auth.user.role !== "ADMIN") {
        throw new Error('Usuário sem acesso')
      }

      await this.disableUserCase.execute(req.auth.user, id)

      return res.status(200).send()
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
