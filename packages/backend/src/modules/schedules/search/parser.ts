import { Request } from 'express'

import { normalizeDate } from '~/utilities/normalizations'

export type ISearchSchedulesRequest = Request<
  {},
  {},
  {},
  ISearchSchedulesQueryOptions
>

export interface ISearchSchedulesQueryOptions {
  date?: string
  query?: string
}

export interface ISearchSchedulesOptions {
  date: Date
  query?: string
}

export function parseSearchSchedulesOptions(
  query: ISearchSchedulesQueryOptions
): ISearchSchedulesOptions | undefined {
  if (!query.date) return undefined

  return {
    date: normalizeDate(query.date),
    query: query.query
  }
}
