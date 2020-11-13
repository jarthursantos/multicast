import { Request, Response } from 'express'

import { FindBrandByCodeUseCase } from './FindBrandByCodeUseCase'

export class FindBrandByCodeController {
  constructor(private findBrandByCodeCase: FindBrandByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const brand = await this.findBrandByCodeCase.execute(parseInt(id))

      return res.json(brand)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
