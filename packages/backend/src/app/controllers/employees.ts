import { Response } from 'express'

import {
  searchEmployeesModel,
  parseSeachEmployeesOptions,
  ISearchEmployeesRequest
} from '~/modules/employees'

export async function handleSearchEmployees(
  req: ISearchEmployeesRequest,
  res: Response
) {
  const { query } = req

  const result = await searchEmployeesModel.execute(
    parseSeachEmployeesOptions(query)
  )

  res.json(result)
}
