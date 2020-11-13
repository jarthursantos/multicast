import { Request, Response } from 'express'

import { FindCategoriesUseCase } from './FindCategoriesUseCase'

export class FindCategoriesController {
  constructor(private findCategoriesUseCase: FindCategoriesUseCase) {}

  async handle(req: Request, res: Response) {
    const { sectionId } = req.params

    try {
      const categories = await this.findCategoriesUseCase.execute(
        parseInt(sectionId)
      )

      return res.json(categories)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
