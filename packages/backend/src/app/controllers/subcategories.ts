import { Request, Response } from 'express'

import {
  findAllSubcategoriesModule,
  findSubcategoryByIdModule
} from '~/modules/sections/categories/subcategories'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllSubcategories(req: Request, res: Response) {
  const { sectionId, categoryId } = req.params

  const result = await findAllSubcategoriesModule.execute(
    normalizeInt(sectionId),
    normalizeInt(categoryId)
  )

  res.json(result)
}

export async function handleFindSubcategoryById(req: Request, res: Response) {
  const { sectionId, categoryId, id } = req.params

  const result = await findSubcategoryByIdModule.execute(
    normalizeInt(sectionId),
    normalizeInt(categoryId),
    normalizeInt(id)
  )

  res.json(result)
}
