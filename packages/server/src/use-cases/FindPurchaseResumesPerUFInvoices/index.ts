import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerUFInvoicesController } from './FindPurchaseResumesPerUFInvoicesController'
import { FindPurchaseResumesPerUFInvoicesUseCase } from './FindPurchaseResumesPerUFInvoicesUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerUFInvoicesUseCase = new FindPurchaseResumesPerUFInvoicesUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerUFInvoicesController = new FindPurchaseResumesPerUFInvoicesController(
  findPurchaseResumesPerUFInvoicesUseCase
)

export {
  findPurchaseResumesPerUFInvoicesUseCase,
  findPurchaseResumesPerUFInvoicesController
}
