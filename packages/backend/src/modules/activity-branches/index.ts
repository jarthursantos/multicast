import { createWinThorAcitivityBranchesModel } from '~/models/activity-branches/WinThorAcitivityBranchesModel'

import { createFindAllActivityBranchesModule } from './find-all'
import { createFindActivityBranchByIdModule } from './find-by-id'

const activityBranchesModel = createWinThorAcitivityBranchesModel()

const findAllActivityBranchesModule = createFindAllActivityBranchesModule(
  activityBranchesModel
)
const findActivityBranchByIdModule = createFindActivityBranchByIdModule(
  activityBranchesModel
)

export { findAllActivityBranchesModule, findActivityBranchByIdModule }
