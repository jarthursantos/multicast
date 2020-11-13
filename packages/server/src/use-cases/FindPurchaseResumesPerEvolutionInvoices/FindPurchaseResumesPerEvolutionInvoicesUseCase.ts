import { parseISO } from 'date-fns'
import { IPurchaseResumeRepository } from 'repositories/IPurchaseResumeRepository'
import { IFindPurchaseResumesDTO } from 'utils/parse-purchase-resume-options'

function normalizeDate(date: string | Date): Date {
  return typeof date === 'string' ? parseISO(date) : date
}

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
