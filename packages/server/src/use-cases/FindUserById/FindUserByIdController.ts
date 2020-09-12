import { Request, Response } from 'express'

import { FindUserByIdUseCase } from './FindUserByIdUseCase'

export class FindUserByIdController {
  constructor(private findUserByIdCase: FindUserByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const user = await this.findUserByIdCase.execute(id)

      delete user.password

      return res.json(user)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
