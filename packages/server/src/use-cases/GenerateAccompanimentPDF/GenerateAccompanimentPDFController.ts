import { Request, Response } from 'express'

import { GenerateAccompanimentPDFUseCase } from './GenerateAccompanimentPDFUseCase'

export class GenerateAccompanimentPDFController {
  constructor(
    private generateAccompanimentPDFCase: GenerateAccompanimentPDFUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const result = await this.generateAccompanimentPDFCase.execute(id)

      return res.json(result)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
