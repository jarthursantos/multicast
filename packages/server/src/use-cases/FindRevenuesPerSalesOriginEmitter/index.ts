import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerSalesOriginEmitterController } from './FindRevenuesPerSalesOriginEmitterController'
import { FindRevenuesPerSalesOriginEmitterUseCase } from './FindRevenuesPerSalesOriginEmitterUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerSalesOriginEmitterUseCase = new FindRevenuesPerSalesOriginEmitterUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerSalesOriginEmitterController = new FindRevenuesPerSalesOriginEmitterController(
  findRevenuesPerSalesOriginEmitterUseCase
)

export {
  findRevenuesPerSalesOriginEmitterController,
  findRevenuesPerSalesOriginEmitterUseCase
}
