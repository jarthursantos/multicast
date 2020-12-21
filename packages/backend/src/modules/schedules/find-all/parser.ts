import { Request } from 'express'

import { normalizeInt } from '~/utilities/normalizations'

export type IFindAllSchedulesRequest = Request<
  {},
  {},
  {},
  IFindAllSchedulesQueryOptions
>

export interface IFindAllSchedulesQueryOptions {
  year?: string
  month?: string
}

export interface IFindAllSchedulesOptions {
  year: number
  month: number
}

export function parseFindAllSchedulesOptions(
  query: IFindAllSchedulesQueryOptions
): IFindAllSchedulesOptions | undefined {
  if (!query.month || !query.year) return undefined

  return {
    month: normalizeInt(query.month),
    year: normalizeInt(query.year)
  }
}
