import { WinThorBillsToPayRepository } from 'repositories/implementations/WinThorBillsToPayRepository'

import { FindBillsToPayController } from './FindBillsToPayController'
import { FindBillsToPayUseCase } from './FindBillsToPayUseCase'

const winThorBillsToPayRepository = new WinThorBillsToPayRepository()

const findBillsToPayUseCase = new FindBillsToPayUseCase(
  winThorBillsToPayRepository
)

const findBillsToPayController = new FindBillsToPayController(
  findBillsToPayUseCase
)

export { findBillsToPayUseCase, findBillsToPayController }
