import {
  IBuyerPurchaseResume,
  IEvolutionPurchaseResume,
  IProviderPurchaseResume,
  IPurchaseResumeInvoice,
  IUFPurchaseResume
} from '~/domain/IPurchaseResume'

export interface IOptions {
  buyers?: number[]
  providers?: number[]
  situation: 'all' | 'normal' | 'bonification' | 'importation'
  periodFrom: Date | string
  periodTo: Date | string
}

export interface IPurchaseResumesModel {
  findPerBuyer(options: IOptions): Promise<IBuyerPurchaseResume[]>
  findPerBuyerInvoices(
    buyer: number,
    options: IOptions
  ): Promise<IPurchaseResumeInvoice[]>

  findPerProvider(options: IOptions): Promise<IProviderPurchaseResume[]>
  findPerProviderInvoices(
    provider: number,
    options: IOptions
  ): Promise<IPurchaseResumeInvoice[]>

  findPerEvolution(options: IOptions): Promise<IEvolutionPurchaseResume[]>
  findPerEvolutionInvoices(
    date: Date,
    options: IOptions
  ): Promise<IPurchaseResumeInvoice[]>

  findPerUF(options: IOptions): Promise<IUFPurchaseResume[]>
  findPerUFInvoices(
    uf: string,
    options: IOptions
  ): Promise<IPurchaseResumeInvoice[]>
}
