import { Request, Response } from 'express'

import { FindUsersUseCase } from './FindUsersUseCase'

export class FindUsersController {
  constructor(private findUsersCase: FindUsersUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth } = req

    try {
      if (auth.user.role !== "ADMIN") {
        throw new Error('Usuário sem acesso')
      }

      if (!auth.permissions.accessSchedules) {
        throw new Error('Usuário sem acesso')
      }
      const users = await this.findUsersCase.execute()

      users.forEach(user => delete user.password)

      return res.json(users)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
