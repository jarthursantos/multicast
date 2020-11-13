import { WinThorSectionRepository } from 'repositories/implementations/WinThorSectionRepository'

import { FindSectionsController } from './FindSectionsController'
import { FindSectionsUseCase } from './FindSectionsUseCase'

const winThorSectionRepository = new WinThorSectionRepository()

const findSectionsUseCase = new FindSectionsUseCase(winThorSectionRepository)

const findSectionsController = new FindSectionsController(findSectionsUseCase)

export { findSectionsUseCase, findSectionsController }
