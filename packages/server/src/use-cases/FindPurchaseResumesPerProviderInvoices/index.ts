import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerProviderInvoicesController } from './FindPurchaseResumesPerProviderInvoicesController'
import { FindPurchaseResumesPerProviderInvoicesUseCase } from './FindPurchaseResumesPerProviderInvoicesUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerProviderInvoicesUseCase = new FindPurchaseResumesPerProviderInvoicesUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerProviderInvoicesController = new FindPurchaseResumesPerProviderInvoicesController(
  findPurchaseResumesPerProviderInvoicesUseCase
)

export {
  findPurchaseResumesPerProviderInvoicesUseCase,
  findPurchaseResumesPerProviderInvoicesController
}
