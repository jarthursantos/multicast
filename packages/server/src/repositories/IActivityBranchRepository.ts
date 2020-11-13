import { ActivityBranch } from 'entities/ActivityBranch'

export interface IActivityBranchRepository {
  findById(id: number): Promise<ActivityBranch | undefined>
  findMany(): Promise<ActivityBranch[]>
}
