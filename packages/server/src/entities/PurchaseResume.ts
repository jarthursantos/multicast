import { Buyer } from 'entities/Buyer'
import { Provider } from 'entities/Provider'

export interface PurchaseResume {
  period: string
  entryValue: number
  amountWeight: number
  representativity: number
}

export interface BuyerPurchaseResume extends PurchaseResume {
  buyer: Buyer
  averageTime: number
}

export interface ProviderPurchaseResume extends PurchaseResume {
  provider: Provider
  invoiceCount: number
  averageTime: number
}

export interface EvolutionPurchaseResume extends PurchaseResume {
  emittedAt: Date
  weekDay: string
  invoiceCount: number
}

export interface UFPurchaseResume extends PurchaseResume {
  uf: string
  invoiceCount: number
}

export interface PurchaseResumeInvoice {
  number: number
  provider: Provider
  entryValue: number
  amountWeight: number
  averageTime: number
}
