export interface FindPurchaseResumesQueryOptions {
  buyers?: string | string[]
  providers?: string | string[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
  periodFrom: string
  periodTo: string
}

export interface IFindPurchaseResumesDTO {
  buyers?: number[]
  providers?: number[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
  periodFrom: Date | string
  periodTo: Date | string
}

export function parsePurchaseResumeOptions(
  query: FindPurchaseResumesQueryOptions
): IFindPurchaseResumesDTO {
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

  return {
    situation,
    buyers: buyers.map(curr => parseInt(curr)).filter(Boolean),
    providers: providers.map(curr => parseInt(curr)).filter(Boolean),
    periodFrom,
    periodTo
  }
}
