import { Request } from 'express'

export type ISearchProvidersRequest = Request<
  {},
  {},
  {},
  ISearchProvidersQueryOptions
>

export interface ISearchProvidersQueryOptions {
  query?: string
}

export interface ISearchProvidersOptions {
  query?: string
}

export function parseSeachProvidersOptions(
  query: ISearchProvidersQueryOptions
): ISearchProvidersOptions {
  return {
    query: query.query
  }
}
