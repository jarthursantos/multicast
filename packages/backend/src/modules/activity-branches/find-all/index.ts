import { IActivityBranchesModel } from '~/models/activity-branches/IActivityBranchesModel'

export function createFindAllActivityBranchesModule(
  activityBranchesModel: IActivityBranchesModel
) {
  return {
    async execute() {
      const activities = await activityBranchesModel.findMany()

      return activities
    }
  }
}
