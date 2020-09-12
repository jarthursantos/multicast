import { Request, Response } from 'express'

import { FindUserChangesUseCase } from './FindUserChangesUseCase'

export class FindUserChangesController {
  constructor(private findUseChangesCase: FindUserChangesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const changes = await this.findUseChangesCase.execute(id)

      return res.json(changes)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
