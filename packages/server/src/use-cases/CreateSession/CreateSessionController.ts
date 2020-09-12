import { Request, Response } from 'express'

import { CreateSessionRequestDTO } from './CreateSessionDTO'
import { CreateSessionUseCase } from './CreateSessionUseCase'

export class CreateSessionController {
  constructor(private createSessionCase: CreateSessionUseCase) {}

  async handle(req: Request<{}, {}, CreateSessionRequestDTO>, res: Response) {
    const { email, password } = req.body

    try {
      const session = await this.createSessionCase.execute(email, password)

      return res.json(session)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
