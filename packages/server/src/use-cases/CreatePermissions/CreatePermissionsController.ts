import { Request, Response } from 'express'

import { CreatePermissionsUseCase } from './CreatePermissionsUseCase'

export class CreatePermissionsController {
  constructor(private createPermissionsCase: CreatePermissionsUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body } = req

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const permissions = await this.createPermissionsCase.execute(body)

      return res.status(201).json(permissions)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
