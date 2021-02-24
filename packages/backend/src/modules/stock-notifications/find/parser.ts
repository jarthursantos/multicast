import { Request } from 'express'

import { normalizeDate } from '~/utilities/normalizations'

export type IFindStockNotificationsRequest = Request<
  {},
  {},
  {},
  IFindStockNotificationsQueryOptions
>

export interface IFindStockNotificationsQueryOptions {
  periodFrom?: string
  periodTo?: string
  buyers?: string
  providers?: string
}

export interface IFindStockNotificationsOptions {
  periodFrom: Date
  periodTo: Date
  buyers: number[]
  providers: number[]
}

export function parseFindStockNotificationsOptions(
  query: IFindStockNotificationsQueryOptions
): IFindStockNotificationsOptions | undefined {
  if (!query.periodTo || !query.periodFrom) return undefined

  let buyers: string[] = []

  if (query.buyers) {
    console.log(query.buyers)
    buyers = query.buyers.split(',')
  }

  let providers: string[] = []

  if (query.providers) {
    providers = query.providers.split(',')
  }

  return {
    periodFrom: normalizeDate(query.periodFrom),
    periodTo: normalizeDate(query.periodTo),
    buyers: buyers.map(curr => parseInt(curr)).filter(Boolean),
    providers: providers.map(curr => parseInt(curr)).filter(Boolean)
  }
}
