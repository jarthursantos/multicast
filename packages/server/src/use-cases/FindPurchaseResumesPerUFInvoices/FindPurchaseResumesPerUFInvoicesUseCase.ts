import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerUFInvoicesUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(uf: string, options: IFindPurchaseResumesDTO) {
    const UFs = await this.purchaseResumeRepository.findPerUFInvoices(
      uf,
      options
    )

    return UFs
  }
}
