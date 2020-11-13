import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerSalesOriginSupervisorController } from './FindRevenuesPerSalesOriginSupervisorController'
import { FindRevenuesPerSalesOriginSupervisorUseCase } from './FindRevenuesPerSalesOriginSupervisorUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerSalesOriginSupervisorUseCase = new FindRevenuesPerSalesOriginSupervisorUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerSalesOriginSupervisorController = new FindRevenuesPerSalesOriginSupervisorController(
  findRevenuesPerSalesOriginSupervisorUseCase
)

export {
  findRevenuesPerSalesOriginSupervisorController,
  findRevenuesPerSalesOriginSupervisorUseCase
}
