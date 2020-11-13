import { Request, Response } from 'express'

import { FindSubcategoriesUseCase } from './FindSubcategoriesUseCase'

export class FindSubcategoriesController {
  constructor(private findSubcategoriesUseCase: FindSubcategoriesUseCase) {}

  async handle(req: Request, res: Response) {
    const { sectionId, categoryId } = req.params

    try {
      const subcategories = await this.findSubcategoriesUseCase.execute(
        parseInt(sectionId),
        parseInt(categoryId)
      )

      return res.json(subcategories)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
