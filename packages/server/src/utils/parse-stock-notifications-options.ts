import { Request } from 'express'

export type FindStockNotificationsRequest = Request<
  {},
  {},
  {},
  FindStockNotificationsQueryOptions
>

export interface FindStockNotificationsQueryOptions {
  buyers?: string
  providers?: string
  periodFrom: string
  periodTo: string
}

export interface IFindStockNotificationsDTO {
  buyers?: number[]
  providers?: number[]
  periodFrom: Date | string
  periodTo: Date | string
}

export function parseStockNotificationsOptions(
  query: FindStockNotificationsQueryOptions
): IFindStockNotificationsDTO {
  const { periodFrom, periodTo } = query

  if (!periodFrom) {
    throw new Error('Inicio do período é obrigatório')
  }

  if (!periodTo) {
    throw new Error('Fim do período é obrigatório')
  }

  let buyers: string[] = []

  if (query.buyers) {
    buyers = query.buyers.split(',')
  }

  let providers: string[] = []

  if (query.providers) {
    providers = query.providers.split(',')
  }

  return {
    buyers: buyers.map(curr => parseInt(curr)).filter(Boolean),
    providers: providers.map(curr => parseInt(curr)).filter(Boolean),
    periodFrom,
    periodTo
  }
}
