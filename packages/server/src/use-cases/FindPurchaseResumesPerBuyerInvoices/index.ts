import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerBuyerInvoicesController } from './FindPurchaseResumesPerBuyerInvoicesController'
import { FindPurchaseResumesPerBuyerInvoicesUseCase } from './FindPurchaseResumesPerBuyerInvoicesUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerBuyerInvoicesUseCase = new FindPurchaseResumesPerBuyerInvoicesUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerBuyerInvoicesController = new FindPurchaseResumesPerBuyerInvoicesController(
  findPurchaseResumesPerBuyerInvoicesUseCase
)

export {
  findPurchaseResumesPerBuyerInvoicesUseCase,
  findPurchaseResumesPerBuyerInvoicesController
}
