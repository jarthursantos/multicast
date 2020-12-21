import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { normalizeDate } from 'utils/date-intervals'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

export class FindPurchaseResumesPerEvolutionInvoicesUseCase {
  constructor(private purchaseResumeRepository: IPurchaseResumeRepository) {}

  async execute(date: Date | string, options: IFindPurchaseResumesDTO) {
    const evolutions = await this.purchaseResumeRepository.findPerEvolutionInvoices(
      normalizeDate(date),
      options
    )

    return evolutions
  }
}
