import { Request, Response } from 'express'

import {
  createDischargeTablesModule,
  findLatestDischargeTableModule
} from '~/modules/discharge-tables'

export async function handleFindLatestDischargeTable(
  req: Request,
  res: Response
) {
  const result = await findLatestDischargeTableModule.execute()

  res.json(result)
}

export async function handleCreateDischargeTables(req: Request, res: Response) {
  const result = await createDischargeTablesModule.execute(req.body)

  res.json(result)
}
