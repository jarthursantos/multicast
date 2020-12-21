import { IBranchesModel } from '~/models/branches/IBranchesModel'

export function createFindAllBranchesModule(branchesModel: IBranchesModel) {
  return {
    async execute() {
      const branches = await branchesModel.findMany()

      return branches
    }
  }
}
