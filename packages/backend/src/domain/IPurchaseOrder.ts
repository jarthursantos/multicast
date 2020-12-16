import { IBuyer } from './IBuyer'
import { IDetailedProvider } from './IProvider'

export interface IPurchaseOrder {
  number: number
  emittedAt: Date
  isBonification: boolean
  provider: IDetailedProvider
  buyer: IBuyer
  freight: string
  amountValue: number
  deliveredValue: number
}
