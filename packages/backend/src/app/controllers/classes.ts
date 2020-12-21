import { Request, Response } from 'express'

import { findAllClassesModule } from '~/modules/classes'

export async function handleFindAllClasses(req: Request, res: Response) {
  const result = await findAllClassesModule.execute()

  res.json(result)
}
