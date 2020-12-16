import { Request, Response } from 'express'

import {
  findActivityBranchByIdModule,
  findAllActivityBranchesModule
} from '~/modules/activity-branches'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllActivityBranches(
  req: Request,
  res: Response
) {
  const result = await findAllActivityBranchesModule.execute()

  res.json(result)
}

export async function handleFindActivityBranchById(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await findActivityBranchByIdModule.execute(normalizeInt(id))

  res.json(result)
}
