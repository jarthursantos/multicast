import { Response } from 'express'

import {
  searchProvidersModel,
  parseSeachProvidersOptions,
  ISearchProvidersRequest
} from '~/modules/providers'

export async function handleSearchProviders(
  req: ISearchProvidersRequest,
  res: Response
) {
  const { query } = req

  const result = await searchProvidersModel.execute(
    parseSeachProvidersOptions(query)
  )

  res.json(result)
}
