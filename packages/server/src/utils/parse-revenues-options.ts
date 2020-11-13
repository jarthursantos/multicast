import { Request } from 'express'

export interface FindRevenuesQueryOptions {
  situation: 'all' | 'billed' | 'nonBilled'
  clients: 'all' | 'pj' | 'pf'
  periodFrom: string
  periodTo: string
}

export type FindRevenuesRequest = Request<{}, {}, {}, FindRevenuesQueryOptions>

export type FindRevenuesRequestWithID = Request<
  { id: string },
  {},
  {},
  FindRevenuesQueryOptions
>

export interface IFindRevenuesDTO {
  periodFrom: Date | string
  periodTo: Date | string
  situation: 'all' | 'billed' | 'nonBilled'
  clients: 'all' | 'pj' | 'pf'
}

export function parseRevenuesOptions(
  query: FindRevenuesQueryOptions
): IFindRevenuesDTO {
  const { situation, clients, periodFrom, periodTo } = query

  if (!situation) {
    throw new Error('Situação é obrigatória')
  }

  const situationIsValid = ['all', 'billed', 'nonBilled'].find(
    curr => situation === curr
  )

  if (!situationIsValid) {
    throw new Error('Situação é inválida')
  }

  const clientsIsValid = ['all', 'pj', 'pf'].find(curr => clients === curr)

  if (!clientsIsValid) {
    throw new Error('Cliente é inválido')
  }

  if (!periodFrom) {
    throw new Error('Inicio do período é obrigatório')
  }

  if (!periodTo) {
    throw new Error('Fim do período é obrigatório')
  }

  return {
    situation,
    clients,
    periodFrom,
    periodTo
  }
}
