import { Request, Response } from 'express'

import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(private updateUserCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const user = await this.updateUserCase.execute(auth.user, id, body)

      delete user.password

      return res.json(user)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
