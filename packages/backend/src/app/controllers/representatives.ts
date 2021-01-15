import { Request, Response } from 'express'

import { findAllRepresentativesModule } from '~/modules/representatives'

export async function handleFindAllRepresentatives(
  req: Request,
  res: Response
) {
  const result = await findAllRepresentativesModule.execute()

  res.json(result)
}
