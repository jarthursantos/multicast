import { Request } from 'express'

import { normalizeDate } from '~/utilities/normalizations'

export type IScheduleCostReportRequest = Request<
  {},
  {},
  {},
  IScheduleCostReportQueryOptions
>

export interface IScheduleCostReportQueryOptions {
  periodStart?: string
  periodEnd?: string
}

export interface IScheduleCostReportOptions {
  periodStart: Date
  periodEnd: Date
}

export function parseScheduleCostReportOptions(
  query: IScheduleCostReportQueryOptions
): IScheduleCostReportOptions | undefined {
  if (!query.periodEnd || !query.periodStart) return undefined

  return {
    periodStart: normalizeDate(query.periodStart),
    periodEnd: normalizeDate(query.periodEnd)
  }
}
