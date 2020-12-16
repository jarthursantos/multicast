import { Request, Response } from 'express'

import {
  findAllSectionsModule,
  findSectionByIdModule
} from '~/modules/sections'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllSections(req: Request, res: Response) {
  const result = await findAllSectionsModule.execute()

  res.json(result)
}

export async function handleFindSectionById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findSectionByIdModule.execute(normalizeInt(id))

  res.json(result)
}
