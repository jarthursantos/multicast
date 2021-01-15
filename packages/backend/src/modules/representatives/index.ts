import { createWinThorRepresentativesModel } from '~/models/representatives/WinThorRepresentativesModel'

import { createFindAllRepresentativesModule } from './find-all'

const representativesModel = createWinThorRepresentativesModel()

const findAllRepresentativesModule = createFindAllRepresentativesModule(
  representativesModel
)

export { findAllRepresentativesModule }
