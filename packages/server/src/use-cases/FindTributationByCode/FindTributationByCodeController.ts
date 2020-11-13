import { Request, Response } from 'express'

import { FindTributationByCodeUseCase } from './FindTributationByCodeUseCase'

export class FindTributationByCodeController {
  constructor(
    private findTributationByCodeUseCase: FindTributationByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const tribuitation = await this.findTributationByCodeUseCase.execure(
        parseInt(id)
      )

      return res.json(tribuitation)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
