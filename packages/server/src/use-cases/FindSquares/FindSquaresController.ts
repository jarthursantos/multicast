import { Request, Response } from 'express'

import { FindSquaresUseCase } from './FindSquaresUseCase'

export class FindSquaresController {
  constructor(private findSquaresUseCase: FindSquaresUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const squares = await this.findSquaresUseCase.execute()

      return res.json(squares)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
