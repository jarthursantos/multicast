import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerProviderController } from './FindPurchaseResumesPerProviderController'
import { FindPurchaseResumesPerProviderUseCase } from './FindPurchaseResumesPerProviderUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerProviderUseCase = new FindPurchaseResumesPerProviderUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerProviderController = new FindPurchaseResumesPerProviderController(
  findPurchaseResumesPerProviderUseCase
)

export {
  findPurchaseResumesPerProviderUseCase,
  findPurchaseResumesPerProviderController
}
