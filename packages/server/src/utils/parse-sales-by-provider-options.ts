import { Request } from 'express'

export type FindSalesByProviderRequest = Request<
  {},
  {},
  {},
  FindSalesByProviderQueryOptions
>

export interface FindSalesByProviderQueryOptions {
  buyers?: string
  providers?: string
  departments?: string
  regions?: string
  clients?: string
  principalClients?: string
  supervisors?: string
  rcas?: string
  distribuitions?: string
  sections?: string
  squares?: string
  activityBranchs?: string
  clientWebs?: string
  periodFrom: string
  periodTo: string
}

export interface IFindSalesByProviderDTO {
  buyers?: number[]
  providers?: number[]
  periodFrom: Date | string
  periodTo: Date | string
  departments?: number[]
  regions?: number[]
  clients?: number[]
  principalClients?: number[]
  supervisors?: number[]
  rcas?: number[]
  distribuitions?: string[]
  sections?: number[]
  squares?: number[]
  activityBranchs?: number[]
  clientWebs?: number[]
}

export function parseSalesByProviderOptions(
  query: FindSalesByProviderQueryOptions
): IFindSalesByProviderDTO {
  const { periodFrom, periodTo } = query

  if (!periodFrom) {
    throw new Error('Inicio do período é obrigatório')
  }

  if (!periodTo) {
    throw new Error('Fim do período é obrigatório')
  }

  let buyers: string[] = []

  if (query.buyers) {
    buyers = query.buyers.split(',')
  }

  let providers: string[] = []

  if (query.providers) {
    providers = query.providers.split(',')
  }

  let regions: string[] = []

  if (query.regions) {
    regions = query.regions.split(',')
  }

  let clients: string[] = []

  if (query.clients) {
    clients = query.clients.split(',')
  }

  let departments: string[] = []

  if (query.departments) {
    departments = query.departments.split(',')
  }

  let principalClients: string[] = []

  if (query.principalClients) {
    principalClients = query.principalClients.split(',')
  }

  let supervisors: string[] = []

  if (query.supervisors) {
    supervisors = query.supervisors.split(',')
  }

  let rcas: string[] = []

  if (query.rcas) {
    rcas = query.rcas.split(',')
  }

  let distribuitions: string[] = []

  if (query.distribuitions) {
    distribuitions = query.distribuitions.split(',')
  }

  let sections: string[] = []

  if (query.sections) {
    sections = query.sections.split(',')
  }

  let squares: string[] = []

  if (query.squares) {
    squares = query.squares.split(',')
  }

  let activityBranchs: string[] = []

  if (query.activityBranchs) {
    activityBranchs = query.activityBranchs.split(',')
  }

  let clientWebs: string[] = []

  if (query.clientWebs) {
    clientWebs = query.clientWebs.split(',')
  }

  return {
    buyers: buyers.map(curr => parseInt(curr)).filter(Boolean),
    providers: providers.map(curr => parseInt(curr)).filter(Boolean),
    regions: regions.map(curr => parseInt(curr)).filter(Boolean),
    clients: clients.map(curr => parseInt(curr)).filter(Boolean),
    departments: departments.map(curr => parseInt(curr)).filter(Boolean),
    principalClients: principalClients
      .map(curr => parseInt(curr))
      .filter(Boolean),
    supervisors: supervisors.map(curr => parseInt(curr)).filter(Boolean),
    rcas: rcas.map(curr => parseInt(curr)).filter(Boolean),
    distribuitions: distribuitions,
    sections: sections.map(curr => parseInt(curr)).filter(Boolean),
    squares: squares.map(curr => parseInt(curr)).filter(Boolean),
    activityBranchs: activityBranchs
      .map(curr => parseInt(curr))
      .filter(Boolean),
    clientWebs: clientWebs.map(curr => parseInt(curr)).filter(Boolean),
    periodFrom,
    periodTo
  }
}
