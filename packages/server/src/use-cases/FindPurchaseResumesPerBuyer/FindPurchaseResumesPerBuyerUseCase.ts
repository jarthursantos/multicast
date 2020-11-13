import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'
export class FindPurchaseResumesPerBuyerUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(options: IFindPurchaseResumesDTO) {
    const buyers = await this.purchaseResumeRepository.findPerBuyer(options)

    return buyers
  }
}
