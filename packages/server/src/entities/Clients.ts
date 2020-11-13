export interface ClientWeb {
  code: number
  name: string
}

export interface BaseClient {
  code: number
  name: string
}

export interface Client extends BaseClient {
  fantasy: string
  cnpj: string
}

export type PrincipalClient = Client
