import { Request, Response } from 'express'

import { FindSquareByCodeUseCase } from './FindSquareByCodeUseCase'

export class FindSquareByCodeController {
  constructor(private findSquareByCodeUseCase: FindSquareByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const square = await this.findSquareByCodeUseCase.execute(parseInt(id))

      return res.json(square)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
