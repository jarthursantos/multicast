import { IBranchRepository } from 'repositories/IBranchRepository'

export class FindBranchesUseCase {
  constructor(private branchRepository: IBranchRepository) {}

  async execute() {
    const branches = await this.branchRepository.findMany()

    return branches
  }
}
