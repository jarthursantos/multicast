import { WinThorRegionRepository } from 'repositories/implementations/WinThorRegionRepository'

import { FindRegionsController } from './FindRegionsController'
import { FindRegionsUseCase } from './FindRegionsUseCase'

const winThorRegionRepository = new WinThorRegionRepository()

const findRegionsUseCase = new FindRegionsUseCase(winThorRegionRepository)

const findRegionsController = new FindRegionsController(findRegionsUseCase)

export { findRegionsUseCase, findRegionsController }
