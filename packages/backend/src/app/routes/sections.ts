import { Router } from 'express'

import {
  handleFindAllCategories,
  handleFindCategoryById
} from '~/app/controllers/categories'
import {
  handleFindAllSections,
  handleFindSectionById
} from '~/app/controllers/sections'
import {
  handleFindAllSubcategories,
  handleFindSubcategoryById
} from '~/app/controllers/subcategories'

const router = Router()

router.get('/', handleFindAllSections)
router.get('/:id', handleFindSectionById)

router.get('/:sectionId/categories', handleFindAllCategories)
router.get('/:sectionId/categories/:id', handleFindCategoryById)

router.get(
  '/:sectionId/categories/:categoryId/subcategories',
  handleFindAllSubcategories
)
router.get(
  '/:sectionId/categories/:categoryId/subcategories/:id',
  handleFindSubcategoryById
)

export { router as sectionsRoutes }
