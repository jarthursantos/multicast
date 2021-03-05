import { Request } from 'express'

import { normalizeDate, normalizeInt } from '~/utilities/normalizations'

export type IFindFinishedAccompanimentsRequest = Request<
  {},
  {},
  {},
  IFindFinishedAccompanimentsQueryOptions
>

export interface IFindFinishedAccompanimentsQueryOptions {
  buyers?: string
  providers?: string
  numberFrom?: string
  numberTo?: string
  periodFrom?: string
  periodTo?: string
}

export interface IFindFinishedAccompanimentsOptions {
  buyers: number[]
  providers: number[]
  numberFrom?: number
  numberTo?: number
  periodFrom?: Date
  periodTo?: Date
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

  let numberFrom: number | undefined

  if (query.numberFrom) {
    numberFrom = normalizeInt(query.numberFrom)
  }

  let numberTo: number | undefined

  if (query.numberTo) {
    numberTo = normalizeInt(query.numberTo)
  }

  let periodFrom: Date | undefined

  if (query.periodFrom) {
    periodFrom = normalizeDate(query.periodFrom)
  }

  let periodTo: Date | undefined

  if (query.periodTo) {
    periodTo = normalizeDate(query.periodTo)
  }

  return {
    buyers: buyers.map(curr => parseInt(curr)).filter(Boolean),
    providers: providers.map(curr => parseInt(curr)).filter(Boolean),
    numberFrom,
    numberTo,
    periodFrom,
    periodTo
  }
}
