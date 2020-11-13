import { Request, Response } from 'express'

import { FindSubcategoryByCodeUseCase } from './FindSubcategoryByCodeUseCase'

export class FindSubcategoryByCodeController {
  constructor(private findSubcategoryUseCase: FindSubcategoryByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { sectionId, categoryId, id } = req.params

    try {
      const subcategory = await this.findSubcategoryUseCase.execute(
        parseInt(sectionId),
        parseInt(categoryId),
        parseInt(id)
      )

      return res.json(subcategory)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
