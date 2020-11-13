import { WinThorBrandRepository } from 'repositories/implementations/WinThorBrandRepository'

import { FindBrandsController } from './FindBrandsController'
import { FindBrandsUseCase } from './FindBrandsUseCase'

const winThorBrandRepository = new WinThorBrandRepository()

const findBrandsUseCase = new FindBrandsUseCase(winThorBrandRepository)

const findBrandsController = new FindBrandsController(findBrandsUseCase)

export { findBrandsController, findBrandsUseCase }
