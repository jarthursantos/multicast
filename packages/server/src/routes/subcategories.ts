import { Router, Request, Response } from 'express'
import { findSubcategoriesController } from 'use-cases/FindSubcategories'
import { findSubcategoryByCodeController } from 'use-cases/FindSubcategoryByCode'

const router = Router()

router.get(
  '/sections/:sectionId/categories/:categoryId/subcategories',
  (req: Request, res: Response) => {
    findSubcategoriesController.handle(req, res)
  }
)

router.get(
  '/sections/:sectionId/categories/:categoryId/subcategories/:id',
  (req: Request, res: Response) => {
    findSubcategoryByCodeController.handle(req, res)
  }
)

export { router as subcategoriesRouter }
