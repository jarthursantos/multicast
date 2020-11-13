import { Request, Response } from 'express'

import { FindProductByCodeUseCase } from './FindProductByCodeUseCase'

export class FindProductByCodeController {
  constructor(private findProductByCodeUseCase: FindProductByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const product = await this.findProductByCodeUseCase.execute(parseInt(id))

      return res.json(product)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
