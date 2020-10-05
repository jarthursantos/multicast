export class Buyer {
  public code: number
  public name: string

  constructor(data: Buyer) {
    Object.assign(this, data)
  }
}
