import { Request, Response } from 'express'

import { FindRCAByCodeUseCase } from './FindRCAByCodeUseCase'

export class FindRCAByCodeController {
  constructor(private FindRCAByCodeUseCase: FindRCAByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const rcas = await this.FindRCAByCodeUseCase.execute(parseInt(id))

      return res.json(rcas)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
