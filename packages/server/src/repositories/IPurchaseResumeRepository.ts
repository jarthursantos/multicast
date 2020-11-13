import {
  BuyerPurchaseResume,
  ProviderPurchaseResume,
  EvolutionPurchaseResume,
  UFPurchaseResume,
  PurchaseResumeInvoice
} from 'entities/PurchaseResume'

export interface Options {
  buyers?: number[]
  providers?: number[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
  periodFrom: Date | string
  periodTo: Date | string
}

export interface IPurchaseResumeRepository {
  findPerBuyer(options: Options): Promise<BuyerPurchaseResume[]>
  findPerBuyerInvoices(
    buyer: number,
    options: Options
  ): Promise<PurchaseResumeInvoice[]>

  findPerProvider(options: Options): Promise<ProviderPurchaseResume[]>
  findPerProviderInvoices(
    provider: number,
    options: Options
  ): Promise<PurchaseResumeInvoice[]>

  findPerEvolution(options: Options): Promise<EvolutionPurchaseResume[]>
  findPerEvolutionInvoices(
    date: Date,
    options: Options
  ): Promise<PurchaseResumeInvoice[]>

  findPerUF(options: Options): Promise<UFPurchaseResume[]>
  findPerUFInvoices(
    uf: string,
    options: Options
  ): Promise<PurchaseResumeInvoice[]>
}
