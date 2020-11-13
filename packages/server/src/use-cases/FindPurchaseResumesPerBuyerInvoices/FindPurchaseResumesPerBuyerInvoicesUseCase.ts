import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerBuyerInvoicesUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(code: number, options: IFindPurchaseResumesDTO) {
    const buyers = await this.purchaseResumeRepository.findPerBuyerInvoices(
      code,
      options
    )

    return buyers
  }
}
