import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerUFUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(options: IFindPurchaseResumesDTO) {
    const UFs = await this.purchaseResumeRepository.findPerUF(options)

    return UFs
  }
}
