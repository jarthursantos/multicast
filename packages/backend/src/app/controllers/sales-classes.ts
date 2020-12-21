import { Request, Response } from 'express'

import { findAllSalesClassesModule } from '~/modules/sales-classes'

export async function handleFindAllSalesClasses(_req: Request, res: Response) {
  const result = await findAllSalesClassesModule.execute()

  res.json(result)
}
