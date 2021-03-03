import { Request } from 'express'

// import { normalizeDate } from '~/utilities/normalizations'

export type IFindCanceledAccompanimentsRequest = Request<
  {},
  {},
  {},
  IFindCanceledAccompanimentsQueryOptions
>

export interface IFindCanceledAccompanimentsQueryOptions {
  buyers?: string
  providers?: string
}

export interface IFindCanceledAccompanimentsOptions {
  buyers: number[]
  providers: number[]
}

export function parseFindCanceledAccompanimentsOptions(
  query: IFindCanceledAccompanimentsQueryOptions
): IFindCanceledAccompanimentsOptions | undefined {
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
