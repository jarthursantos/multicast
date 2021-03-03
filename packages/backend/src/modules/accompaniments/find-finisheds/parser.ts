import { Request } from 'express'

// import { normalizeDate } from '~/utilities/normalizations'

export type IFindFinishedAccompanimentsRequest = Request<
  {},
  {},
  {},
  IFindFinishedAccompanimentsQueryOptions
>

export interface IFindFinishedAccompanimentsQueryOptions {
  buyers?: string
  providers?: string
}

export interface IFindFinishedAccompanimentsOptions {
  buyers: number[]
  providers: number[]
}

export function parseFindFinishedAccompanimentsOptions(
  query: IFindFinishedAccompanimentsQueryOptions
): IFindFinishedAccompanimentsOptions | undefined {
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
