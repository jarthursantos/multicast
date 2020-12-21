import { Request } from 'express'

export type FindBillsToPayRequest = Request<
  { month: string; year: string },
  {},
  {},
  FindBillsToPayQueryOptions
>

export interface FindBillsToPayQueryOptions {
  buyers?: string
  providers?: string
}

export interface IFindBillsToPayDTO {
  buyers?: number[]
  providers?: number[]
}

export function parseBillsToPayOptions(
  query: FindBillsToPayQueryOptions
): IFindBillsToPayDTO {
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
    providers: providers.map(curr => parseInt(curr)).filter(Boolean)
  }
}
