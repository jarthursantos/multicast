import { IActivityBranch } from '~/domain/IActivityBranch'

export interface IActivityBranchesModel {
  findById(id: number): Promise<IActivityBranch | undefined>
  findMany(): Promise<IActivityBranch[]>
}
