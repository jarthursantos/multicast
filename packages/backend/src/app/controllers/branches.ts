import { Request, Response } from 'express'

import { findAllBranchesModule } from '~/modules/branches'

export async function handleFindAllBranches(req: Request, res: Response) {
  const result = await findAllBranchesModule.execute()

  res.json(result)
}
