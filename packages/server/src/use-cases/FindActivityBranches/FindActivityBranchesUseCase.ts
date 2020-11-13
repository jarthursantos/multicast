import { IActivityBranchRepository } from 'repositories/IActivityBranchRepository'

export class FindActivityBranchesUseCase {
  constructor(private activityBrancesRepository: IActivityBranchRepository) {}

  async execute() {
    const activities = await this.activityBrancesRepository.findMany()

    return activities
  }
}
