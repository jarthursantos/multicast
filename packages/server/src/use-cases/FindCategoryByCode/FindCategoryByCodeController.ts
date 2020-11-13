import { Request, Response } from 'express'

import { FindCategoryByCodeUseCase } from './FindCategoryByCodeUseCase'

export class FindCategoryByCodeController {
  constructor(private findCategoryByCodeUseCase: FindCategoryByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { sectionId, id } = req.params

    try {
      const category = await this.findCategoryByCodeUseCase.execute(
        parseInt(sectionId),
        parseInt(id)
      )

      return res.json(category)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
