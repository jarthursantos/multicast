import { createWinThorBranchesModel } from '~/models/branches/WinThorBranchesModel'

import { createFindAllBranchesModule } from './find-all'

const branchesModel = createWinThorBranchesModel()

const findAllBranchesModule = createFindAllBranchesModule(branchesModel)

export { findAllBranchesModule }
