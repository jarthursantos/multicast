import { IActivityBranchesModel } from '~/models/activity-branches/IActivityBranchesModel'

export function createFindActivityBranchByIdModule(
  activityBrancesModel: IActivityBranchesModel
) {
  return {
    async execute(code: number) {
      const acitivity = await activityBrancesModel.findById(code)

      return acitivity
    }
  }
}
