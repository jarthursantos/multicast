import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerUFController } from './FindPurchaseResumesPerUFController'
import { FindPurchaseResumesPerUFUseCase } from './FindPurchaseResumesPerUFUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerUFUseCase = new FindPurchaseResumesPerUFUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerUFController = new FindPurchaseResumesPerUFController(
  findPurchaseResumesPerUFUseCase
)

export { findPurchaseResumesPerUFUseCase, findPurchaseResumesPerUFController }
