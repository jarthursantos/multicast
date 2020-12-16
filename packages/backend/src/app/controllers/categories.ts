import { Request, Response } from 'express'

import {
  findAllCategoriesModule,
  findSectionByIdModule
} from '~/modules/sections/categories'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllCategories(req: Request, res: Response) {
  const { sectionId } = req.params

  const result = await findAllCategoriesModule.execute(normalizeInt(sectionId))

  res.json(result)
}

export async function handleFindCategoryById(req: Request, res: Response) {
  const { sectionId, id } = req.params

  const result = await findSectionByIdModule.execute(
    normalizeInt(sectionId),
    normalizeInt(id)
  )

  res.json(result)
}
