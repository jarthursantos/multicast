import { Request, Response } from 'express'

import {
  findAllDistribuitionsModule,
  findDistribuitionsByIdModule
} from '~/modules/distribuitions'

export async function handleFindAllDistribuitions(req: Request, res: Response) {
  const result = await findAllDistribuitionsModule.execute()

  res.json(result)
}

export async function handleFindDistribuitionById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findDistribuitionsByIdModule.execute(id)

  res.json(result)
}
