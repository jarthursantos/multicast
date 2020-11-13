import { WinThorPurchaseResumeRepository } from 'repositories/implementations/WinThorPurchaseResumeRepository'

import { FindPurchaseResumesPerEvolutionController } from './FindPurchaseResumesPerEvolutionController'
import { FindPurchaseResumesPerEvolutionUseCase } from './FindPurchaseResumesPerEvolutionUseCase'

const winThorPurchaseResumeRepository = new WinThorPurchaseResumeRepository()

const findPurchaseResumesPerEvolutionUseCase = new FindPurchaseResumesPerEvolutionUseCase(
  winThorPurchaseResumeRepository
)

const findPurchaseResumesPerEvolutionController = new FindPurchaseResumesPerEvolutionController(
  findPurchaseResumesPerEvolutionUseCase
)

export {
  findPurchaseResumesPerEvolutionUseCase,
  findPurchaseResumesPerEvolutionController
}
