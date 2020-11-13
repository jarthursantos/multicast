import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerBuyerController } from './FindPurchaseResumesPerBuyerController'
import { FindPurchaseResumesPerBuyerUseCase } from './FindPurchaseResumesPerBuyerUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerBuyerUseCase = new FindPurchaseResumesPerBuyerUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerBuyerController = new FindPurchaseResumesPerBuyerController(
  findPurchaseResumesPerBuyerUseCase
)

export {
  findPurchaseResumesPerBuyerUseCase,
  findPurchaseResumesPerBuyerController
}
