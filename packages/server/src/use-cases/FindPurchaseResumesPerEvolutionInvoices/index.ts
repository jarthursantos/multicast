import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerEvolutionInvoicesController } from './FindPurchaseResumesPerEvolutionInvoicesController'
import { FindPurchaseResumesPerEvolutionInvoicesUseCase } from './FindPurchaseResumesPerEvolutionInvoicesUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerEvolutionInvoicesUseCase = new FindPurchaseResumesPerEvolutionInvoicesUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerEvolutionInvoicesController = new FindPurchaseResumesPerEvolutionInvoicesController(
  findPurchaseResumesPerEvolutionInvoicesUseCase
)

export {
  findPurchaseResumesPerEvolutionInvoicesUseCase,
  findPurchaseResumesPerEvolutionInvoicesController
}
