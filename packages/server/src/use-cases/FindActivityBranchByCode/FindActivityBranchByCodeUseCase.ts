import { IActivityBranchRepository } from 'repositories/IActivityBranchRepository'

export class FindActivityBranchByCodeUseCase {
  constructor(private activityBranchRepository: IActivityBranchRepository) {}

  async execute(code: number) {
    const acitivity = await this.activityBranchRepository.findById(code)

    return acitivity
  }
}
