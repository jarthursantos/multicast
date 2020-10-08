import { Request, Response } from 'express'

import { FindInvoicesWithoutAccompanimentsUseCase } from './FindInvoicesWithoutAccompanimentsUseCase'

export class FindInvoicesWithoutAccompanimentsController {
  constructor(
    private findInvoicesWithoutAccompanimentsCase: FindInvoicesWithoutAccompanimentsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await this.findInvoicesWithoutAccompanimentsCase.execute(
        id
      )

      return res.json(result)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
