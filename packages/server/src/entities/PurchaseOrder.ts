import { Buyer } from './Buyer'
import { Provider } from './Provider'

export class PurchaseOrder {
  public number: number
  public emittedAt: Date
  public isBonification: boolean
  public provider: Provider
  public buyer: Buyer
  public freight: string
  public amountValue: number
  public deliveredValue: number

  constructor(props: PurchaseOrder) {
    Object.assign(this, props)
  }
}
