import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerSalesOriginController } from './FindRevenuesPerSalesOriginController'
import { FindRevenuesPerSalesOriginUseCase } from './FindRevenuesPerSalesOriginUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerSalesOriginUseCase = new FindRevenuesPerSalesOriginUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerSalesOriginController = new FindRevenuesPerSalesOriginController(
  findRevenuesPerSalesOriginUseCase
)

export {
  findRevenuesPerSalesOriginController,
  findRevenuesPerSalesOriginUseCase
}
