import { IBuyer } from './IBuyer'
import { IProvider } from './IProvider'

export interface IPurchaseResume {
  period: string
  entryValue: number
  amountWeight: number
  representativity: number
}

export interface IBuyerPurchaseResume extends IPurchaseResume {
  buyer: IBuyer
  averageTime: number
}

export interface IProviderPurchaseResume extends IPurchaseResume {
  provider: IProvider
  invoiceCount: number
  averageTime: number
}

export interface IEvolutionPurchaseResume extends IPurchaseResume {
  emittedAt: Date
  weekDay: string
  invoiceCount: number
}

export interface IUFPurchaseResume extends IPurchaseResume {
  uf: string
  invoiceCount: number
}

export interface IPurchaseResumeInvoice {
  number: number
  provider: IProvider
  entryValue: number
  amountWeight: number
  averageTime: number
}
