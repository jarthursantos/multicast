import { Request } from 'express'

export type FindSalesByProviderRequest = Request<
  {},
  {},
  {},
  FindSalesByProviderQueryOptions
>

export interface FindSalesByProviderQueryOptions {
  buyers?: string | string[]
  providers?: string | string[]
  departments?: string | string[]
  regions?: string | string[]
  clients?: string | string[]
  principalClients?: string | string[]
  supervisors?: string | string[]
  rcas?: string | string[]
  distribuitions?: string | string[]
  sections?: string | string[]
  squares?: string | string[]
  activityBranchs?: string | string[]
  clientWebs?: string | string[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
  periodFrom: string
  periodTo: string
}

export interface IFindSalesByProviderDTO {
  buyers?: number[]
  providers?: number[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
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
  const { situation, periodFrom, periodTo } = query

  if (!situation) {
    throw new Error('Situação é obrigatória')
  }

  const situationIsValid = [
    'all',
    'normal',
    'bonification',
    'importation'
  ].find(curr => situation === curr)

  if (!situationIsValid) {
    throw new Error('Situação é inválida')
  }

  if (!periodFrom) {
    throw new Error('Inicio do período é obrigatório')
  }

  if (!periodTo) {
    throw new Error('Fim do período é obrigatório')
  }

  let buyers: string[] = []

  if (query.buyers) {
    if (typeof query.buyers === 'string') {
      buyers = [query.buyers]
    } else {
      buyers = query.buyers
    }
  }

  let providers: string[] = []

  if (query.providers) {
    if (typeof query.providers === 'string') {
      providers = [query.providers]
    } else {
      providers = query.providers
    }
  }

  let regions: string[] = []

  if (query.regions) {
    if (typeof query.regions === 'string') {
      regions = [query.regions]
    } else {
      regions = query.regions
    }
  }

  let clients: string[] = []

  if (query.clients) {
    if (typeof query.clients === 'string') {
      clients = [query.clients]
    } else {
      clients = query.clients
    }
  }

  let departments: string[] = []

  if (query.departments) {
    if (typeof query.departments === 'string') {
      departments = [query.departments]
    } else {
      departments = query.departments
    }
  }

  let principalClients: string[] = []

  if (query.principalClients) {
    if (typeof query.principalClients === 'string') {
      principalClients = [query.principalClients]
    } else {
      principalClients = query.principalClients
    }
  }

  let supervisors: string[] = []

  if (query.supervisors) {
    if (typeof query.supervisors === 'string') {
      supervisors = [query.supervisors]
    } else {
      supervisors = query.supervisors
    }
  }

  let rcas: string[] = []

  if (query.rcas) {
    if (typeof query.rcas === 'string') {
      rcas = [query.rcas]
    } else {
      rcas = query.rcas
    }
  }

  let distribuitions: string[] = []

  if (query.distribuitions) {
    if (typeof query.distribuitions === 'string') {
      distribuitions = [query.distribuitions]
    } else {
      distribuitions = query.distribuitions
    }
  }

  let sections: string[] = []

  if (query.sections) {
    if (typeof query.sections === 'string') {
      sections = [query.sections]
    } else {
      sections = query.sections
    }
  }

  let squares: string[] = []

  if (query.squares) {
    if (typeof query.squares === 'string') {
      squares = [query.squares]
    } else {
      squares = query.squares
    }
  }

  let activityBranchs: string[] = []

  if (query.activityBranchs) {
    if (typeof query.activityBranchs === 'string') {
      activityBranchs = [query.activityBranchs]
    } else {
      activityBranchs = query.activityBranchs
    }
  }

  let clientWebs: string[] = []

  if (query.clientWebs) {
    if (typeof query.clientWebs === 'string') {
      clientWebs = [query.clientWebs]
    } else {
      clientWebs = query.clientWebs
    }
  }

  return {
    situation,
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
