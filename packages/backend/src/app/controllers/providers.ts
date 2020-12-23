import { Request, Response } from 'express'

import {
  searchProvidersModule,
  findProviderByCodeModule,
  parseSeachProvidersOptions,
  ISearchProvidersRequest
} from '~/modules/providers'
import { normalizeInt } from '~/utilities/normalizations'

export async function handleSearchProviders(
  req: ISearchProvidersRequest,
  res: Response
) {
  const { query } = req

  const result = await searchProvidersModule.execute(
    parseSeachProvidersOptions(query)
  )

  res.json(result)
}

export async function handleFindProviderByCode(req: Request, res: Response) {
  const { id } = req.params

  const result = await findProviderByCodeModule.execute(normalizeInt(id))

  res.json(result)
}
