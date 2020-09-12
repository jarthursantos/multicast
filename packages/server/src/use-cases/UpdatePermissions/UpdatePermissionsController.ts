import { Request, Response } from 'express'

import { UpdatePermissionsUseCase } from './UpdatePermissionsUseCase'

export class UpdatePermissionsController {
  constructor(private updatePermissionsCase: UpdatePermissionsUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (auth.user.role !== "ADMIN") {
        throw new Error('Usuário sem acesso')
      }

      const permissions = await this.updatePermissionsCase.execute(id, body)

      return res.json(permissions)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
