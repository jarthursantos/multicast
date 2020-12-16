import { Request } from 'express'

export type IFindBillsToPayRequest = Request<
  { month: string; year: string },
  {},
  {},
  IFindBillsToPayQueryOptions
>

export interface IFindBillsToPayQueryOptions {
  buyers?: string
  providers?: string
}

export interface IFindBillsToPayOptions {
  buyers?: number[]
  providers?: number[]
}

export function parseBillsToPayOptions(
  query: IFindBillsToPayQueryOptions
): IFindBillsToPayOptions {
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
