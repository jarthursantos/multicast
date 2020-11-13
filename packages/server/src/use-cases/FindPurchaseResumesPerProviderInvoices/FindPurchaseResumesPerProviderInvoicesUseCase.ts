import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerProviderInvoicesUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(code: number, options: IFindPurchaseResumesDTO) {
    const providers = await this.purchaseResumeRepository.findPerProviderInvoices(
      code,
      options
    )

    return providers
  }
}
