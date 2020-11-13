import { Router, Request, Response } from 'express'
import { findCategoriesController } from 'use-cases/FindCategories'
import { findCategoryByCodeController } from 'use-cases/FindCategoryByCode'

const router = Router()

router.get('/sections/:sectionId/categories', (req: Request, res: Response) => {
  findCategoriesController.handle(req, res)
})

router.get(
  '/sections/:sectionId/categories/:id',
  (req: Request, res: Response) => {
    findCategoryByCodeController.handle(req, res)
  }
)

export { router as categoriesRouter }
