import { Request } from 'express'

export type ISearchEmployeesRequest = Request<
  {},
  {},
  {},
  ISearchEmployeesQueryOptions
>

export interface ISearchEmployeesQueryOptions {
  name?: string
}

export interface ISearchEmployeesOptions {
  name?: string
}

export function parseSeachEmployeesOptions(
  query: ISearchEmployeesQueryOptions
): ISearchEmployeesOptions {
  return {
    name: query.name
  }
}
