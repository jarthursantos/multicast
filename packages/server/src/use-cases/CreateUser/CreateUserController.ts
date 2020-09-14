import { Request, Response } from 'express'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(private createUserCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { body, auth } = req

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const user = await this.createUserCase.execute(auth.user, body)

      delete user.password

      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
