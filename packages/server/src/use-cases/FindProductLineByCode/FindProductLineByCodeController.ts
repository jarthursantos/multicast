import { Request, Response } from 'express'

import { FindProductLineByCodeUseCase } from './FindProductLineByCodeUseCase'

export class FindProductLineByCodeController {
  constructor(
    private findProductLineByCodeUseCase: FindProductLineByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const line = await this.findProductLineByCodeUseCase.execute(parseInt(id))

      return res.json(line)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
