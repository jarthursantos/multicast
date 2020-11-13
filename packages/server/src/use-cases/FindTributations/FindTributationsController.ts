import { Request, Response } from 'express'

import { FindTributationsUseCase } from './FindTributationsUseCase'

export class FindTributationsController {
  constructor(private findTributationsUseCase: FindTributationsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const tribuitations = await this.findTributationsUseCase.execute()

      return res.json(tribuitations)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
