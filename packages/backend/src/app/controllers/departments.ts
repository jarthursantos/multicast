import { Request, Response } from 'express'

import {
  findAllDepartmentsModule,
  findDepartmentByIdModule
} from '~/modules/departments'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleFindAllDepartments(req: Request, res: Response) {
  const result = await findAllDepartmentsModule.execute()

  res.json(result)
}

export async function handleFindDepartmentWebById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findDepartmentByIdModule.execute(normalizeInt(id))

  res.json(result)
}
