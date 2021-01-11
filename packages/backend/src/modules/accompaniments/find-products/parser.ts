import { Request } from 'express'

export type IFindAccompanimentProductsRequest = Request<
  { id: string },
  {},
  {},
  IFindAccompanimentProductsQueryOptions
>

export interface IFindAccompanimentProductsQueryOptions {
  only?: string
}

export interface IFindAccompanimentProductsOptions {
  only: 'invoice' | 'pending' | 'delivered'
}

export function parseFindAccompanimentProductsOptions(
  query: IFindAccompanimentProductsQueryOptions
): IFindAccompanimentProductsOptions | undefined {
  if (query.only) {
    const { only } = query

    if (only === 'invoice' || only === 'pending' || only === 'delivered') {
      return { only }
    }
  }

  return undefined
}
