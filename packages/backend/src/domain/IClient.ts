export interface IClientWeb {
  code: number
  name: string
}

export interface IBaseClient {
  code: number
  name: string
}

export interface IClient extends IBaseClient {
  fantasy: string
  cnpj: string
}

export type IPrincipalClient = IClient
