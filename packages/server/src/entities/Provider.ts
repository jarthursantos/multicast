export class Provider {
  public code: number
  public name: string
  public fantasy: string
  public principalCode: number
  public cnpj: string

  constructor(data: Provider) {
    Object.assign(this, data)
  }
}
