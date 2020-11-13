import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerEvolutionUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(options: IFindPurchaseResumesDTO) {
    const evolutions = await this.purchaseResumeRepository.findPerEvolution(
      options
    )

    return evolutions
  }
}
