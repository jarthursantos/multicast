import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerProviderUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(options: IFindPurchaseResumesDTO) {
    const providers = await this.purchaseResumeRepository.findPerProvider(
      options
    )

    return providers
  }
}
